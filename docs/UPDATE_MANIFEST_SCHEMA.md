# NEXUS — Update Manifest Schema & Verification

Purpose: formalise the update manifest format and verification steps used by `UpdateManager`.

JSON Schema (informal):

- `version` (string) — human-friendly semantic version
- `version_code` (number) — Android version code
- `apk_url` (string) — primary HTTPS or .onion download URL
- `apk_url_clearnet` (string, optional) — fallback HTTPS mirror
- `apk_hash_sha256` (hex) — SHA-256 hex of APK file
- `criticality` (string) — `critical` or `normal`
- `changelog_id` (string) — Bahasa changelog text
- `changelog_en` (string) — English changelog text
- `min_android_version` (number) — minimum supported Android SDK
- `signature` (base64) — signature of canonical manifest bytes

Verification steps (client):
1. Download manifest (prefer Tor .onion mirror when available).
2. Verify manifest signature using embedded/trusted developer public key.
   - If signature invalid: reject manifest, log locally, do not attempt download.
3. Check `version_code` > installed `version_code`.
4. If newer and `criticality` == `critical`: show blocking full-screen prompt. If `normal`: non-blocking banner.
5. On user acceptance (or auto for critical according to policy), download `apk_url` to app cache.
6. Compute SHA-256 hash of downloaded APK; compare with `apk_hash_sha256`.
   - If mismatch: delete file, log, retry up to 3 times with backoff.
7. If hash matches: trigger Android install flow (`REQUEST_INSTALL_PACKAGES` permission must have been granted during onboarding).

Security notes:
- Manifest and APK must be signed by the developer key. Consider supporting a key-rotation manifest signed-by-trust-anchors managed with CSO partners.
- All network calls for updates must avoid leaking user identifiers; only send app version and Android OS version.
- Limit download retries to avoid abusive bandwidth.

WorkManager job constraints:
- Run with `networkType: CONNECTED` and `requiresBatteryNotLow: true` (configurable)
- Timeout: 30 seconds for manifest fetch
- Retry policy: exponential backoff up to 3 retries

