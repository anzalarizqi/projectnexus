# NEXUS — Field Coordination App

Android-first, offline-resilient coordination app for lawful civic demonstrations in Indonesia.
Three-layer cascade: Internet (Matrix) → Bluetooth/WiFi Direct mesh → SMS fallback.
Bahasa Indonesia is the primary language. No servers operated by NEXUS. No Play Store.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.76+ (New Architecture / JSI) |
| Layer 1 — Internet | matrix-js-sdk → self-hosted Matrix homeserver (Conduit or Dendrite) |
| Layer 2 — Mesh | Custom BLE discovery + react-native-wifi-p2p-reborn + Kotlin JSI module |
| Layer 3 — SMS | Android SmsManager + react-native-libsodium (symmetric encryption) |
| Crypto primitives | react-native-libsodium (serenity-kit, v1.6.0+) |
| Key storage | Android Keystore (hardware-backed where available) |
| Maps | maplibre/maplibre-react-native + offline MBTiles packs |
| Local storage | SQLite + SQLCipher (Zetetic official React Native package) |
| Update system | WorkManager Kotlin module + HTTPS manifest (v1.0); Tor routing in v1.1 |
| Language | Bahasa Indonesia primary, English secondary |

---

## Key Architecture Rules (non-negotiable)

- **No NEXUS servers.** Layer 1 homeserver is run by the organising group on their own hardware.
- **Identity = keypair.** Generated at install, stored in Android Keystore. No phone number, email, or account.
- **Bahasa Indonesia is primary.** Every UI string, error message, and alert must be in BI by default.
- **No data collection.** No analytics, no crash reporting to third parties, no usage data, ever.
- **No Play Store.** Distribution via APK direct link and F-Droid only.
- **Pseudonymous development.** No real developer name in git history, commit messages, or public repos.
- **JSI native modules only.** All Kotlin native modules use the New Architecture (JSI/TurboModules). Never the old bridge.
- **Four v1.3 amendments are mandatory** before any pilot deployment — see PRD and the section below.

---

## Mandatory v1.3 Amendments (cannot ship without these)

1. **SMS Blocking Warning UI** — Full-screen red/amber overlay in Bahasa Indonesia when SMS layer activates. User must tap "Saya Mengerti Risikonya" to proceed. Persistent red banner while SMS active. See Section 8.4 of PRD.
2. **Battery Management** — GPS opt-in per use (60s pulse), adaptive BT broadcast frequency (5s/10s/20s based on battery), strict wake lock rules, Battery Saver mode. See Section 10.3 of PRD.
3. **In-App Secure Update System** — WorkManager daily check, signed manifest, SHA-256 APK hash verification, `REQUEST_INSTALL_PACKAGES`. See Section 8.7 of PRD.
4. **Terms of Use / Prohibited Use Disclaimer** — Full-screen blocking screen during onboarding, must be acknowledged. "TIDAK SETUJU" exits app. See Section 8.8 of PRD.

---

## Critical Reference Files

| File | Purpose |
|------|---------|
| `NEXUS_PRD_v1.3.md` | Canonical requirements — **always read before adding any feature** |
| `NEXUS_PRD_v1.3_Critical_Amendments.md` | The four mandatory amendments + why they exist |
| `docs/ARCHITECTURE_DETAILED.md` | Module breakdown, native module contracts, DB schema |
| `docs/INTERFACES.md` | JS API contracts, message JSON schema, update manifest schema |
| `docs/UPDATE_MANIFEST_SCHEMA.md` | Update system verification steps |
| `NEXUS_Developer_Identity_Agreement.md` | Agreement template for CSO partner identity custody |

---

## Project Structure (target)

```
src/
  screens/        — React Native screens
                    PINScreen, OnboardingToU, PseudonymSelect, QRScan,
                    ChannelList, ChatScreen, MapScreen, SOSScreen,
                    PressStatement, StatusBoard, Settings, Simulator, Training
  components/     — Shared UI components
                    NexusStatusBar, BlockingModal, ChannelItem, MessageBubble,
                    BatteryWarning, LayerBadge, PTTButton, PinDropMenu
  modules/        — JS wrappers around native modules
                    MatrixModule.js, MeshModule.js, SmsModule.js,
                    CryptoModule.js, UpdateManager.js, PowerManager.js
  transport/      — Layer orchestration
                    TransportManager.js
  crypto/         — Crypto helpers
                    keyOps.js, safetyNumber.js, smsEncoding.js
  storage/        — DB access layer
                    db.js, migrations/
  i18n/           — Strings
                    id.js (Bahasa Indonesia — primary)
                    en.js (English — secondary)

android/
  app/src/main/
    AndroidManifest.xml
    java/com/nexus/modules/
      CryptoModule.kt    — Keypair, signing, destroyKeys()
      MeshModule.kt      — BLE advertising/scanning + WiFi Direct
      SmsModule.kt       — SmsManager send + BroadcastReceiver
      UpdateManager.kt   — WorkManager + APK download/verify/install
      PowerManager.kt    — Battery monitoring + wake locks
```

---

## Message Format (canonical)

Every message in NEXUS:
```json
{
  "uuid": "uuid-v4",
  "channelId": "#semua",
  "senderPubkey": "base64",
  "senderPseudonym": "Lombok",
  "vectorClock": {"nodeA": 3, "nodeB": 1},
  "relayTag": "INET | BT | SMS",
  "payloadType": "text | location | ptt | press | status | alert",
  "payload": "base64_encrypted_blob",
  "timestamp": 1700000000,
  "signature": "base64_signature",
  "metadata": {"hopCount": 2}
}
```

Relay nodes forward messages with unseen UUIDs; duplicates are silently dropped via `seen_set`.

---

## Channel Structure (per operation)

| Channel | Access | Purpose |
|---------|--------|---------|
| `#semua` | All coordinators | General updates, movement orders |
| `#sektor-[nama]` | Sector team | Sector-specific coordination |
| `#logistik` | Logistics | Water, medical, supplies |
| `#media` | Media + leaders | Press coordination |
| `#pengamat-hukum` | Legal observers | Arrest alerts, legal response |

Channel membership enforced cryptographically via signed invitations.

---

## Build Phases (summary)

| # | Phase | Key Deliverable | v1.3? |
|---|-------|----------------|-------|
| 0 | Foundation | CLAUDE.md + deps + folder structure | — |
| 1 | Identity & Storage | Keypair + encrypted DB | — |
| 2 | Onboarding | Full flow including ToU | YES |
| 3 | UI Shell | Navigation + StatusBar + BlockingModal | — |
| 4 | Layer 1 Matrix | Internet messaging | — |
| 5 | TransportManager | Auto fallback logic | — |
| 6 | Layer 2 Mesh | BLE + WiFi Direct mesh | — |
| 7 | Layer 3 SMS | SMS fallback + warning UI | YES |
| 8 | Emergency | SOS + Panic Wipe + Decoy | — |
| 9 | Map | Offline maps + pins | — |
| 10 | PTT Audio | Voice clips over mesh | — |
| 11 | Press Statement | Leaders write, all confirm | — |
| 12 | Status Board | Action Leader overview | — |
| 13 | Battery Management | Power saving system | YES |
| 14 | Update System | Secure in-app updates | YES |
| 15 | Simulator | Training sandbox | — |
| 16 | Training Module | In-app tutorial | — |
| 17 | Hardening | Device testing + stress UX | — |
| 18 | Distribution | APK signing + F-Droid | — |

Full phase details in plan file: `.claude/plans/sunny-sleeping-goblet.md`

---

## Security Model (quick reference)

| Threat | Mitigation |
|--------|-----------|
| Internet shutdown | Layer 2 (BT/WiFi mesh) and Layer 3 (SMS) auto-activate |
| SMS metadata exposure | Blocking warning UI; persistent red banner; pseudonym training |
| Device seizure | Panic wipe (< 3s); decoy mode; AES-256 local encryption |
| Agent provocateur | Safety Number in-person verification; unverified contacts flagged |
| No update path | Built-in WorkManager update system with APK signature verification |

**Honest limitations (communicate in onboarding):**
- App cannot protect against OS-level spyware (state-level)
- Decoy mode does not survive forensic APK analysis
- SMS metadata (sender, recipient, timestamp, cell tower location) visible to carrier
- Bluetooth mesh range ~80–200m per hop depending on environment

---

## Session Log

### Session 1 — 2026-05-20
- Read and understood all PRD documents (v1.2, v1.3, Critical Amendments)
- Researched and decided revised tech stack (dropped Briar JNI, adopted WiFi Direct + BLE; dropped Signal Protocol JS, adopted libsodium; confirmed MapLibre for maps)
- Created end-to-end build plan (18 phases) — `.claude/plans/sunny-sleeping-goblet.md`
- **Phase 0 complete:**
  - Created `CLAUDE.md` (this file)
  - Updated `package.json` to React Native 0.76+ with all dependencies
  - Created full `src/` folder structure: screens, components, modules, transport, crypto, storage, i18n
  - Created all Bahasa Indonesia + English string files (`src/i18n/id.js`, `en.js`)
  - Created placeholder files for all screens, components, JS module wrappers, TransportManager
  - Created DB access layer scaffold + initial SQL migration schema (all tables)
  - Created Kotlin native module scaffolds: CryptoModule, MeshModule, SmsModule, UpdateManager, PowerManager
  - Updated `App.js` to proper entry point placeholder
  - Rewrote `README.md` as proper public-facing bilingual (EN + BI) README

---

## Next Session Should Start With

**Phase 1 — Core Identity & Encrypted Storage.**

Start by initialising the full React Native 0.76 project properly (the repo currently lacks an `android/` build folder — run `npx react-native init NexusTemp --version 0.76.9` in a temp dir, copy the `android/` folder across, rename package to `com.nexus`). Then:

1. Implement `CryptoModule.kt` — Ed25519 keypair generation using Android Keystore, sign, verify, getSafetyNumber, destroyKeys
2. Implement `src/storage/db.js` — open SQLCipher DB, key derived from Keystore, run migration 001_initial.sql
3. Wire `App.js` to generate a keypair on first launch and store public key in settings table
4. Done when: app generates a keypair on first launch, persists across restarts, DB unreadable without key
