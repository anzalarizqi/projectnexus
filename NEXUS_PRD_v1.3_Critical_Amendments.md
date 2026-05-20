# NEXUS PRD v1.3 — Critical Amendments
## Must-Have Additions to PRD v1.2

> **Context:** These three changes address critical feedback on battery management, SMS metadata exposure, update distribution, and legal disclaimers. These are not optional enhancements — they are architecture-level requirements that must be implemented before any deployment.

---

## Amendment 1: SMS Layer Metadata Warning — BLOCKING UI REQUIRED

### Problem
The current PRD (v1.2) says SMS metadata is "visible to the carrier" but this is buried in a table. Users will not understand the severity. **When SMS layer activates, the cellular provider and potentially police can see:**
- Who is sending to whom (coordinator identities if using real SIM cards)
- Exact timestamps
- Approximate location via cell tower triangulation

This is a **critical operational security risk** that must be communicated with maximum clarity.

### Required Implementation

**7.3 Layer 3 Specification — Add this row:**

| Metadata exposure | **CRITICAL:** Sender phone number, recipient phone number, timestamp, and approximate location (via cell tower) are fully visible to the cellular provider (Telkomsel, Indosat, XL, etc.) and can be accessed by authorities. The SMS *content* is encrypted, but *who is talking to whom, when, and roughly where* is NOT protected. |

**8.4 Emergency Protocols — Add new subsection:**

#### SMS Layer Activation Warning (Blocking UI)

When Layer 3 (SMS) activates — either automatically or manually — the app MUST display a full-screen blocking warning that cannot be dismissed without explicit acknowledgement:

**Visual requirements:**
- Full-screen overlay, no way to proceed without reading
- Red/amber color scheme (danger signal)
- Large text, minimum 18sp
- Requires tap on "Saya Mengerti Risikonya" (I Understand the Risk) button
- Warning persists as a red banner at top of screen while SMS layer is active

**Text (Bahasa Indonesia):**

```
⚠️ PERINGATAN: LAYER SMS AKTIF

Meskipun isi pesan Anda terenkripsi, METADATA SMS 
terlihat oleh provider seluler dan dapat diakses aparat:

• SIAPA mengirim pesan (nomor telepon Anda)
• Kepada SIAPA Anda mengirim (nomor penerima)
• KAPAN pesan dikirim (timestamp)
• LOKASI kasar Anda (via menara seluler)

Gunakan nama samaran, bukan nama asli.
Hindari menyebut lokasi atau identitas spesifik.

Apakah Anda ingin melanjutkan menggunakan SMS?

[TIDAK, MATIKAN SMS]  [SAYA MENGERTI RISIKONYA]
```

**Risk Register Update:**

Add new row:

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| SMS metadata exposes coordinator identities and locations to authorities | **High** (any time SMS layer is used) | **Critical** (arrests, targeted surveillance) | Blocking warning UI; persistent red banner while SMS active; coordinator training emphasises this risk; recommendation to use burner SIMs for operations |

---

## Amendment 2: Battery Management — Realistic Targets & Aggressive Power Saving

### Problem
Target of "< 8% per hour" for BT mesh + GPS is optimistic lab conditions. Real field scenario:
- 2-year-old Snapdragon 665 device (degraded battery, 70-80% of original capacity)
- Hot phone in pocket or bag (thermal throttling)
- Screen wakes frequently for alerts
- Actual drain: **12-15% per hour** in real use

A 6-hour operation drains 72-90% battery. If coordinator starts at 80%, phone dies mid-operation.

### Required Changes

**4.1 Product Goals — Revise G6:**

| # | Goal | Metric | Target |
|---|------|--------|--------|
| G6 | Battery efficiency (best-case) | Battery drain per hour of active Bluetooth mesh, ideal conditions (new battery, cool device, screen off) | < 8% per hour |
| G6b | Battery efficiency (worst-case) | Battery drain per hour on 2-year-old device in field conditions (hot, frequent screen wakes, degraded battery) | < 15% per hour |

**10.3 Battery & Performance — Replace existing section entirely:**

### 10.3 Battery & Performance

**Target device:** Snapdragon 665 or equivalent (Rp 2–3 juta Indonesian mid-range market). Must also function on devices with **70% degraded battery capacity** (representing 2-year-old phones in real-world condition).

**Battery drain targets:**
- Best-case (new device, ideal conditions): < 8% per hour
- Worst-case (2-year-old device, field conditions): < 15% per hour
- With Low Power Mode enabled: < 10% per hour even in worst-case

**Mandatory power management requirements:**

1. **GPS is NOT always-on**
   - Location sharing is opt-in per use, not per session
   - When not actively sharing location, GPS is fully disabled
   - User taps "Share Location Now" → GPS on for 60 seconds → sends pin → GPS off

2. **Bluetooth mesh broadcast frequency scales with battery**
   - > 50% battery: broadcast every 5 seconds (normal mode)
   - 20-50% battery: broadcast every 10 seconds (auto low-power mode)
   - < 20% battery: broadcast every 20 seconds + user warned

3. **Wake lock management is paranoid-level strict**
   - App holds wake lock ONLY when actively sending/receiving a message
   - Background mesh relay does NOT hold a full wake lock — uses AlarmManager with inexact timing
   - Screen wake for incoming message: 5 seconds max, then back to sleep

4. **Battery Saver mode (user-activated)**
   - Reduces BT mesh broadcast to every 30 seconds
   - Disables automatic location sharing entirely
   - Delays non-critical UI updates
   - Trades mesh responsiveness for battery longevity
   - Clear UI indication when enabled: "Mode Hemat Baterai Aktif — Mesh Lebih Lambat"

5. **Pre-operation battery checklist (shown in onboarding tutorial)**
   - Charge device to 100% before operation
   - Bring external powerbank (10,000mAh minimum recommended)
   - Enable Battery Saver mode if operation > 4 hours
   - Close all other apps before starting NEXUS

**App warns at:**
- 20% battery: "Baterai rendah — aktifkan mode hemat?"
- 15% battery: "PERINGATAN: Baterai kritis — cari sumber daya"
- 10% battery: Auto-enables Battery Saver mode without asking

---

## Amendment 3: In-App Update Mechanism — Core Feature, Not Afterthought

### Problem
Sideload distribution (no Play Store) means **no automatic updates**. A critical security bug discovered 3 months post-launch, with 5,000 installs across dozens of organisations — how do you push a patch?

Manual CSO outreach is the ultimate fallback, but it's **too slow for critical security patches**.

### Required Implementation

**8.7 In-App Update Mechanism (NEW SECTION)**

Add this as a new feature specification section:

---

### 8.7 In-App Secure Update System

NEXUS includes a built-in secure update checker and installer to enable rapid security patches without relying on Play Store infrastructure.

**How it works:**

1. **Update check (automatic, daily)**
   - App pings a trusted update manifest endpoint via Tor (rotates between multiple CSO-hosted mirrors for resilience)
   - Manifest format: JSON containing latest version number, APK hash (SHA-256), download URL, criticality flag, changelog
   - Check happens once per 24 hours when internet (Layer 1) is available
   - No user data transmitted during check — only app version number and Android OS version

2. **Update notification**
   - If new version available:
     - **Critical security update:** Full-screen blocking notification — "Pembaruan Keamanan Kritis — Harap Segera Perbarui"
     - **Standard update:** Non-blocking banner at top of app — "Versi baru tersedia"
   - User taps notification → taken to update screen showing changelog in Bahasa Indonesia

3. **Download and verification**
   - APK downloaded from CSO-controlled HTTPS endpoint or IPFS hash
   - Downloaded APK hash is verified against the manifest hash before installation
   - If hash mismatch: download rejected, user warned, attempt logged
   - If hash matches: user prompted to install

4. **Installation**
   - Requires `REQUEST_INSTALL_PACKAGES` permission (requested during onboarding with clear explanation: "Untuk memperbarui aplikasi tanpa Play Store")
   - Standard Android APK install flow triggered
   - After install: user must re-open app (normal Android behavior)

**Fallback mechanisms (if update system fails):**

- If Tor connection fails: Manifest also hosted on clearnet HTTPS (CSO-controlled domain)
- If all automatic methods fail: User can manually check for updates via Settings → "Periksa Pembaruan"
- Ultimate fallback: CSO partners manually notify their networks via existing secure channels (Signal, email)

**Security considerations:**

- Update manifest is signed with developer's private key; app verifies signature before trusting manifest
- APK itself is also signed with developer key (standard Android code signing)
- Man-in-the-middle attack on manifest: Signature verification fails, update rejected
- Compromised mirror serving malicious APK: Hash mismatch, rejected

**Privacy:**

- Update check does NOT transmit: user identity, device ID, contacts, location, or usage data
- Transmitted only: app version number, Android OS version (for compatibility)
- Check is routed through Tor to prevent IP-based tracking

**Update manifest example (JSON):**

```json
{
  "version": "1.2.0",
  "version_code": 12,
  "apk_url": "https://cso-updates.onion/nexus-1.2.0.apk",
  "apk_url_clearnet": "https://updates.example.org/nexus-1.2.0.apk",
  "apk_hash_sha256": "a3f5b8c...",
  "criticality": "critical",
  "changelog_id": "Memperbaiki kerentanan keamanan kritis pada enkripsi mesh. Harap perbarui segera.",
  "changelog_en": "Fixes critical mesh encryption vulnerability. Please update immediately.",
  "min_android_version": 24,
  "signature": "base64_signature_of_entire_manifest"
}
```

**Technical requirements:**

- Update checker runs as a background service (WorkManager with constraints: network available, device not in doze mode)
- Manifest download timeout: 30 seconds
- APK download shows progress bar; can be cancelled and resumed
- Downloaded APK stored in app's private cache directory, deleted after successful install
- Failed downloads auto-retry up to 3 times with exponential backoff

**11.1 Mobile App — Add to technical stack:**

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Update system | WorkManager + custom APK installer | Android-native background task management; secure APK verification and installation |

---

## Amendment 4: Terms of Use & Prohibited Use Disclaimer — Legal Protection

### Problem
Without a clear Terms of Use and Prohibited Use policy acknowledged by users, the developer has limited legal defense if the app is misused for criminal activity. The disclaimer establishes intent and puts users on notice.

### Required Implementation

**New Section 8.8: Terms of Use and Prohibited Use Disclaimer**

Add this as a new feature specification:

---

### 8.8 Terms of Use and Prohibited Use Acknowledgement

**Where it appears:**

1. **In-app during onboarding** — full-screen, must be read and acknowledged before proceeding
2. **In LICENSE.txt file** in source code repository (AGPLv3 + prohibited use addendum)
3. **In any documentation** shared with CSO partners or users

**In-App Implementation:**

During onboarding (step 2, after key pair generation, before pseudonym selection), display full-screen Terms of Use:

**Text (Bahasa Indonesia, scrollable, minimum 14sp):**

```
SYARAT PENGGUNAAN NEXUS

NEXUS adalah alat komunikasi yang dirancang untuk koordinasi sipil yang sah dan damai, termasuk demonstrasi, aksi sosial, dan pengorganisasian komunitas sesuai hukum Indonesia.

PENGGUNAAN YANG DILARANG:

Anda TIDAK diperbolehkan menggunakan NEXUS untuk:

1. Merencanakan, mengkoordinasikan, atau memfasilitasi kegiatan kriminal apa pun, termasuk:
   - Kekerasan terhadap orang atau properti
   - Penipuan, pencurian, atau kejahatan ekonomi
   - Terorisme atau ekstremisme kekerasan
   - Perdagangan narkoba atau senjata ilegal
   - Kejahatan terorganisir

2. Menyebarkan konten ilegal menurut hukum Indonesia, termasuk:
   - Materi eksploitasi anak
   - Ujaran kebencian atau hasutan
   - Ancaman kekerasan

3. Melanggar privasi, hak cipta, atau hak kekayaan intelektual orang lain

PENOLAKAN TANGGUNG JAWAB:

- Pengembang NEXUS tidak bertanggung jawab atas bagaimana Anda menggunakan aplikasi ini
- Anda bertanggung jawab penuh atas kepatuhan terhadap semua hukum yang berlaku
- Penggunaan aplikasi ini sepenuhnya risiko Anda sendiri

NEXUS adalah perangkat lunak sumber terbuka tanpa garansi apa pun.

Dengan mengetuk "Saya Menerima", Anda mengonfirmasi bahwa:
✓ Anda telah membaca dan memahami syarat ini
✓ Anda akan menggunakan NEXUS hanya untuk tujuan yang sah
✓ Anda memahami bahwa penggunaan untuk kegiatan kriminal melanggar syarat ini dan dapat mengakibatkan tuntutan hukum

[TIDAK SETUJU - KELUAR]  [SAYA MENERIMA]
```

**If user taps "TIDAK SETUJU":** App exits immediately and will show this screen again on next launch (cannot proceed without acceptance)

**If user taps "SAYA MENERIMA":** Timestamp and acceptance logged locally (encrypted); user proceeds to pseudonym selection

**English version also required** (displayed if system language is not Indonesian)

**LICENSE.txt addendum (for source code repository):**

```
NEXUS Field Coordination App
Copyright (C) 2026 [Developer Pseudonym]

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

[Standard AGPLv3 text...]

---

PROHIBITED USE ADDENDUM

This software is designed and intended for lawful civic coordination,
including peaceful demonstrations, community organizing, and other
legitimate uses protected under Indonesian law and international
human rights norms.

You MAY NOT use this software to:
- Plan, coordinate, or facilitate any criminal activity
- Violate any applicable laws in your jurisdiction
- Infringe upon the rights of others

The developer explicitly condemns any use of this software for
illegal purposes and bears no responsibility for misuse.

Use of this software for prohibited purposes is a material breach
of this license and may subject you to legal liability.
```

**4.2 MVP Launch Criteria — Already added:**

- [x] Terms of Use and Prohibited Use disclaimer implemented in-app, requiring explicit user acknowledgement during onboarding
- [x] LICENSE.txt file present in source code repository with AGPLv3 license + prohibited use addendum

---

## Summary: Critical Changes for v1.3

| Amendment | Status | Impact If Skipped |
|-----------|--------|-------------------|
| **#1: SMS Blocking Warning** | MANDATORY | Coordinators unknowingly expose their identity and location via SMS metadata → arrests |
| **#2: Battery Management** | MANDATORY | Phones die mid-operation → coordinators lose all communication → operational failure |
| **#3: Update Mechanism** | MANDATORY | Critical security bug cannot be patched → months-long exposure → mass compromise |
| **#4: ToS/Disclaimer** | MANDATORY | Developer has no legal defense if app is misused for crime → prosecution risk |

**All four amendments must be implemented before any pilot deployment.**

---

*NEXUS PRD v1.3 Critical Amendments — February 2026*
*These changes are non-negotiable for safety, security, and legal protection.*
