# NEXUS — Field Coordination App
## Product Requirements Document (PRD)
### Version 1.3 | February 2026

> **Document status:** Decisions resolved. Ready for development. This file consolidates v1.2 and the critical amendments from v1.3.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Goals & Success Metrics](#4-goals--success-metrics)
5. [Non-Goals & Explicit Exclusions](#5-non-goals--explicit-exclusions)
6. [System Architecture Overview](#6-system-architecture-overview)
7. [Connectivity Layer Specification](#7-connectivity-layer-specification)
8. [Feature Specifications](#8-feature-specifications)
9. [Security & Privacy Requirements](#9-security--privacy-requirements)
10. [UX & Accessibility Requirements](#10-ux--accessibility-requirements)
11. [Technical Stack](#11-technical-stack)
12. [Risk Register](#12-risk-register)
13. [Go-to-Market Strategy](#13-go-to-market-strategy)
14. [Resolved Decisions Log](#14-resolved-decisions-log)
15. [Appendix: Prior Art & References](#15-appendix-prior-art--references)

---

## 1. Executive Summary

NEXUS is an Android-first, offline-resilient field coordination app designed for lawful civic demonstrations in Indonesia. It provides encrypted group communication, movement coordination, and authoritative press statement distribution across three connectivity layers — internet, Bluetooth mesh, and SMS — with automatic fallback requiring zero manual switching from users.

The app is built for a specific, documented threat environment and prioritises usability under stress and operational security. Development is pseudonymous; distribution is via trust networks (CSO partners) and sideloading/F-Droid only.

---

## 2. Problem Statement

(See original PRD v1.2 — internet shutdowns, agent provocateurs, information blackouts, no unified tool.)

---

## 3. Target Users

(See original PRD v1.2 — Field Coordinator, Action Leader, Legal Observer, Media Coordinator.)

---

## 4. Goals & Success Metrics

(Condensed from v1.2 with battery amendment. Key goals retained.)

| # | Goal | Metric | Target |
|---|------|--------|--------|
| G1 | Seamless connectivity fallback | Time from internet loss to Bluetooth mesh activation, requiring no user action | < 10 seconds |
| G2 | Mesh message delivery | Message delivery rate across Bluetooth mesh in a crowd of 500+ | > 95% within 30 seconds |
| G3 | Stress usability | Task completion rate: send an alert, first-time user, no prior tutorial | > 90% in usability test |
| G4 | Identity security | Successful impersonation attacks in red-team exercise | 0 |
| G5 | Panic wipe speed | Time from trigger to full data erasure on device | < 3 seconds |
| G6 | Battery efficiency (best-case) | Battery drain per hour of active Bluetooth mesh, ideal conditions (new battery, cool device, screen off) | < 8% per hour |
| G6b | Battery efficiency (worst-case) | Battery drain per hour on 2-year-old device in field conditions (hot, frequent screen wakes, degraded battery) | < 15% per hour |
| G7 | Onboarding speed | Time from APK install to first message sent, guided flow | < 5 minutes |

---

## 5. Non-Goals & Explicit Exclusions

(As v1.2 — no LoRa v1.0, Android-only, no Play Store, no social features, etc.)

---

## 6. System Architecture Overview

(Three-layer cascade, message anatomy, identity model, homeserver notes — preserved from v1.2.)

---

## 7. Connectivity Layer Specification

### 7.1 Layer 1 — Internet (Matrix Protocol)

(Parameters retained from v1.2)

### 7.2 Layer 2 — Bluetooth Mesh (Briar Protocol)

(Parameters retained from v1.2)

### 7.3 Layer 3 — SMS (UPDATED)

| Parameter | Value |
|-----------|-------|
| Transport | Standard SMS via cellular voice/SMS network |
| Encryption | Signal Protocol compressed and base64-encoded into 160-character SMS segments |
| Features | Text messages only — no media, no location, no PTT |
| Activation | Manual toggle, or automatic when Layers 1 and 2 both unavailable |
| Key requirement | Pre-exchanged keys required; automatically satisfied if contacts were previously verified on higher layers |
| User indicator | Amber "SMS" badge in persistent status bar |
| Metadata warning | **CRITICAL:** Sender phone number, recipient phone number, timestamp, and approximate location (via cell tower) are fully visible to the cellular provider (Telkomsel, Indosat, XL, etc.) and can be accessed by authorities. The SMS *content* is encrypted, but *who is talking to whom, when, and roughly where* is NOT protected. |

When Layer 3 (SMS) activates, the app MUST display a full-screen blocking warning (see Section 8.4) that requires user acknowledgement before continuing. A persistent red banner must remain visible while SMS is active.

---

## 8. Feature Specifications

(Channels & messaging, PTT, Movement Map, Emergency Protocols, Press Statement, Coordinator Status Board)

### 8.4 Emergency Protocols (UPDATED)

- SOS Broadcast: unchanged, but ensure SMS activation shows blocking warning before sending SMS-based alerts.

#### SMS Layer Activation Warning (Blocking UI)

When Layer 3 (SMS) activates — either automatically or manually — the app MUST display a full-screen blocking warning that cannot be dismissed without explicit acknowledgement.

Visual requirements:
- Full-screen overlay, no way to proceed without reading
- Red/amber color scheme (danger signal)
- Large text, minimum 18sp
- Requires tap on "Saya Mengerti Risikonya" (I Understand the Risk) button
- Warning persists as a red banner at top of screen while SMS layer is active

Text (Bahasa Indonesia):

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

(Implement UI copy and persistent banner exactly as above.)

### 8.7 In-App Secure Update System (NEW)

NEXUS includes a built-in secure update checker and installer to enable rapid security patches without relying on Play Store infrastructure.

Key points:
- Daily manifest check via Tor (rotates between CSO-hosted mirrors); manifest is signed and contains APK hash.
- Critical updates trigger a blocking full-screen prompt; normal updates use non-blocking banner.
- APK verified by SHA-256 and developer signature before install.
- Uses WorkManager (Android) for background checks; requires `REQUEST_INSTALL_PACKAGES` and clear onboarding consent.
- Privacy: only app version and Android OS transmitted; routing via Tor; fallback to clearnet HTTPS mirrors if needed.

Include manifest format, example JSON, and implementation constraints (timeouts, retries, storage in cache, etc.).

### 8.8 Terms of Use and Prohibited Use Acknowledgement (NEW)

- Full-screen Terms of Use in Bahasa Indonesia during onboarding; user must accept to proceed.
- "TIDAK SETUJU" exits app; acceptance logged locally (encrypted).
- LICENSE.txt must include AGPLv3 + prohibited-use addendum.

(Include the ToU text and LICENSE addendum from the amendments.)

---

## 9. Security & Privacy Requirements

(Encryption table retained; add explicit SMS metadata risk and ToU enforcement; data minimisation remains.)

---

## 10. UX & Accessibility Requirements (UPDATED — Battery & Power)

### 10.3 Battery & Performance (REPLACED)

Target device: Snapdragon 665 or equivalent. The app must function on devices with 70% degraded battery capacity.

Battery drain targets:
- Best-case (new device, ideal conditions): < 8% per hour
- Worst-case (2-year-old device, field conditions): < 15% per hour
- With Low Power Mode enabled: < 10% per hour even in worst-case

Mandatory power management requirements:
1. GPS is NOT always-on — opt-in pulses (60s) when user taps "Share Location Now".
2. Bluetooth mesh broadcast frequency scales with battery: >50%: 5s, 20-50%: 10s, <20%: 20s.
3. Wake lock management: hold wake lock only when actively sending/receiving; mesh relay uses AlarmManager with inexact timing.
4. Battery Saver mode: user-activated reduces broadcasts to 30s, disables auto-location sharing, delays non-critical UI updates.
5. Pre-operation battery checklist in onboarding.

App warns at: 20% (suggest enable saver), 15% (critical warning), 10% (auto-enable saver).

---

## 11. Technical Stack

(As v1.2 with addition of WorkManager and Tor/manifest update components.)

Key components:
- React Native mobile app
- Briar Core via JNI bridge for mesh
- matrix-js-sdk for Matrix client
- SQLite + SQLCipher for encrypted local storage
- libsodium for crypto primitives
- WorkManager + custom APK installer for update system

---

## 12. Risk Register (UPDATED)

Additions:
- SMS metadata exposes coordinator identities and locations to authorities — High probability when SMS is used; Critical impact; Mitigation: blocking UI warning, persistent banner, training, recommendation to use burner SIMs.
- Battery failure in field — High probability; Critical impact; Mitigation: revised battery targets, power modes, onboarding checklist.
- No update mechanism — High probability; Critical impact; Mitigation: built-in secure update system.

(Other risks retained from v1.2.)

---

## 13. Go-to-Market Strategy

(Phases retained: Silent Build, Trusted Outreach & Security Review, Controlled Pilot, CSO-Led Expansion.)

---

## 14. Resolved Decisions Log

(Decisions from v1.2 retained; note added that v1.3 amendments are mandatory before pilot.)

---

## 15. Appendix: Prior Art & References

(Kept from v1.2; include Briar audit, Matrix spec, Automerge, etc.)

---

*This consolidated PRD v1.3 combines v1.2 and the Critical Amendments v1.3. All changes in v1.3 are mandatory before pilot deployment.*

NEXUS PRD v1.3 — February 2026 — Ready for development
