# NEXUS — Module Interfaces and Message Formats

This document lists the public JS APIs and outlines native module bindings.

1. JS public APIs (Transport & Core)

- TransportManager
  - `init(config: TransportConfig): Promise<void>`
  - `sendMessage(msg: Message): Promise<SendResult>`
  - `onMessage(callback: (msg: Message)=>void): Subscription`
  - `getReachability(): ReachabilityState`
  - `activateSms(): Promise<void>` // triggers blocking UI flow

- Crypto
  - `createIdentity(): Promise<Identity>`
  - `signPayload(payload: Uint8Array): Promise<string>`
  - `verifySignature(payload: Uint8Array, signature: string, pubkey: string): Promise<boolean>`
  - `computeSafetyNumber(pubkeyA: string, pubkeyB: string): string`

- UpdateManager (JS facade)
  - `checkForUpdates(): Promise<UpdateState>`
  - `installUpdate(manifest: Manifest): Promise<void>`

2. Native module event semantics

- All `on(...)` events take a single JSON-compatible argument. Callbacks must be registered/unregistered to avoid leaks.
- Event names (examples): `messageReceived`, `meshStatusChanged`, `matrixSyncState`, `smsActivation`, `criticalUpdateAvailable`, `panicWipeComplete`.

3. Message JSON schema (TypeScript-like)

type Message = {
  uuid: string;
  channelId: string;
  senderPubkey: string;
  relayTag: 'INET'|'BT'|'SMS';
  payloadType: 'text'|'location'|'ptt'|'press'|'status'|'alert';
  payload: string; // base64 ciphertext
  timestamp: number;
  signature: string; // base64
}

4. Update manifest JSON schema (formal fields)

{
  "version": "string",
  "version_code": "number",
  "apk_url": "string",
  "apk_url_clearnet": "string",
  "apk_hash_sha256": "hexstring",
  "criticality": "critical|normal",
  "changelog_id": "string",
  "changelog_en": "string",
  "min_android_version": "number",
  "signature": "base64_signature_of_manifest"
}

Notes:
- `signature` is a signature of the canonical manifest bytes signed with developer key. App verifies using embedded developer public key (rotating-key strategy to be designed with CSO partners).
- Manifest MUST include `apk_hash_sha256` and optional multiple `apk_url` mirrors.

5. Storage API expectations

- Use a single DB access layer `DB` with methods: `query(sql, params)`, `get(table, id)`, `put(table, object)`, `delete(table, id)`.
- Migrations handled by versioned SQL migration scripts.

6. UI contract for blocking flows

- `BlockingModal.show(options)` where options contain `title`, `body`, `primaryButton`, `secondaryButton`, and `onPrimary`, `onSecondary` callbacks.
- Blocking modals used for: ToU, SMS activation warning, Critical update prompt.

7. Testing hooks

- Expose a `Simulator` mode enabling fake mesh nodes, injected network conditions, and battery level overrides for automated UI testing.

