# NEXUS — Detailed System Architecture

Purpose: provide a developer-facing breakdown of modules, responsibilities, and high-level interfaces for Phase B implementation.

1. High-level modules

- UI Layer (React Native)
  - Screens: Onboarding, Channels, Chat, Map, Press Statement, SOS, Settings, Simulator
  - UX primitives: persistent status bar (layer badge), full-screen blocking overlays (SMS warning, critical update, ToU)

- Networking & Transport
  - Layer 1 — Matrix client (matrix-js-sdk) wrapped in native module `MatrixModule`
  - Layer 2 — Briar Core (native Java/Kotlin) exposed via JNI bridge `BriarModule`
  - Layer 3 — SMS transport `SmsModule` (Android SMS APIs + Signal-over-SMS encoder)
  - Transport orchestrator `TransportManager` (JS): selects preferred route per-message, handles retries, deduplication, seen-set

- Crypto & Identity
  - `CryptoModule` (native): keypair generation (Android Keystore), signing/verification, safety number calculation, signature formats
  - Key backup/export helper: encrypted QR/backup code for off-device key recovery (user-held)

- Storage
  - Local DB: SQLite + SQLCipher
  - Tables: `contacts`, `channels`, `messages`, `seen_set`, `press_statements`, `incident_logs`, `settings`, `update_manifest_cache`

- Power & Device Management
  - `PowerManager` (JS + native hooks): broadcast scheduling, wake-locks, battery thresholds, low-power mode enforcement

- Update System
  - `UpdateManager` (native/JS): WorkManager background check, manifest verification, APK download & verification, installation trigger

- Background Relays & Services
  - Mesh relay service (native): relay-only mode, charging-station optimisations
  - Background job scheduling: WorkManager constraints and backoff policies

2. Message model (canonical JSON)

{
  "uuid": "uuid-v4",
  "channel_id": "#sektor-utara",
  "sender_pubkey": "base64",
  "sender_pseudonym": "Pseudonym",
  "vector_clock": {"nodeA": 10, "nodeB": 5},
  "relay_tag": "INET|BT|SMS",
  "payload_type": "text|location|ptt|press_statement|status|alert",
  "payload": "base64_encrypted_blob",
  "timestamp": 1670000000,
  "signature": "base64_signature",
  "metadata": {"hop_count": 2}
}

Notes:
- Encrypted payload contains logical message body and any type-specific fields; relay nodes cannot decrypt.
- `signature` signs the ciphertext and relevant headers to bind sender identity to message.
- `vector_clock` used for causal ordering and conflict resolution.

3. Storage schema (simplified)

- contacts(id, pubkey, pseudonym, verified BOOLEAN, safety_number, last_seen)
- channels(id, name, type, members_json)
- messages(id, uuid, channel_id, sender_pubkey, payload_blob, relay_tag, timestamp, status TEXT)
- seen_set(uuid)
- press_statements(id, version, author_pubkey, body, signed_blob, confirmed_count)
- incident_logs(id, type, payload, signed_blob, timestamp)
- update_manifest_cache(json_blob, fetched_at)

4. TransportManager responsibilities

- Choose best transport for each recipient (INET preferred if available)
- Fallback logic with automatic activation/deactivation detection
- Deduplication using `uuid` and `seen_set` persisted to DB
- Expose JS API: `sendMessage(messageObject)`, `onMessage(callback)`, `getReachability()`

5. Native module contracts (summary)

- MatrixModule:
  - init(config)
  - start()
  - stop()
  - sendRoomMessage(roomId, encryptedPayload)
  - on('message', callback)
  - getSyncStatus()

- BriarModule:
  - init(config)
  - startMesh()
  - stopMesh()
  - sendMeshMessage(payload, options)
  - setRelayMode(enabled)
  - on('meshMessage', callback)

- SmsModule:
  - sendSms(phoneNumber, segmentPayload)
  - on('smsReceived', callback)
  - setSmsActive(enabled)

- CryptoModule:
  - generateKeyPair()
  - sign(message)
  - verify(message, signature, pubkey)
  - getSafetyNumber(otherPubkey)
  - destroyKeys()  // used by panic wipe

- UpdateManager:
  - checkForUpdates()
  - fetchManifest(url)
  - verifyManifest(manifestBlob)
  - downloadApk(url)
  - verifyApk(hash)
  - triggerInstall(apkPath)

6. Events and error handling

- All native modules MUST emit errors with codes and human-readable messages (i18n-ready). JS layer translates to user-facing strings in Bahasa Indonesia by default.
- Critical events (SMS activation, critical update available, ToU rejection) must cause full-screen blocking UI via a unified `BlockingModal` component.

7. Security & privacy notes

- All crypto operations use native secure implementations; private keys stored in Android Keystore where possible.
- Panic wipe must reliably call `CryptoModule.destroyKeys()` and delete DB files; key destruction is primary guarantee.
- UpdateManager must verify manifest signature and APK hash before any install.


