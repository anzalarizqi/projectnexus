# NEXUS Architecture Overview

This document summarises the high-level architecture for NEXUS.

Components:
- React Native frontend (Android)
- Matrix client (matrix-js-sdk) for Layer 1
- Briar Core (Java/Kotlin) exposed via JNI bridge for Layer 2
- SMS fallback using Android SMS APIs, with Signal Protocol over SMS encoding
- Local encrypted storage: SQLite + SQLCipher
- Cryptography: libsodium for primitives; Android Keystore for key storage
- Update system: WorkManager background task, manifest verification, Tor routing where available

Message flow:
- Messages created in UI → signed/encrypted → sent over preferred layer (INET > BT > SMS) → relayed by nodes where applicable → received and decrypted → persisted to local DB

Security considerations:
- All messages E2E encrypted; relays cannot read payloads
- Safety Number verification required for in-person verification
- Panic wipe destroys keys to render data unreadable

