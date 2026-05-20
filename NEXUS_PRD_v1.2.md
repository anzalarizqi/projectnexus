# NEXUS — Field Coordination App
## Product Requirements Document (PRD)
### Version 1.2 | February 2026

> **Document status:** Decisions resolved. Ready for development.
> **Changes from v1.1:** All specific CSO names removed. Replaced with neutral "trusted CSO partner(s)" language throughout. Developer identity agreement referenced as a separate document. No other changes to architecture or feature scope.

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

The app is built for a specific, documented threat environment:
- Internet can be legally shut down by Indonesian authorities in designated areas
- The ITE Law creates real prosecution risk for visible digital organising
- Agent provocateurs are a documented recurring threat to peaceful demonstrations
- Most field coordinators are non-technical people operating under significant stress

NEXUS is built on existing audited open-source protocols (Briar, Matrix) rather than inventing new cryptography. It will be developed pseudonymously and distributed exclusively through community trust networks — seeded through vetted civil society organisation (CSO) partners to be approached upon completion — with no dependency on the Google Play Store.

The product differentiator is **usability under stress.** A 19-year-old first-time coordinator should be fully operational within 5 minutes of installation, with no technical background required.

---

## 2. Problem Statement

### 2.1 Internet Shutdowns Are a Documented Tool of Information Control

Indonesia has used internet throttling and targeted shutdowns since the 2019 Papua protests and the 2019 Jakarta post-election demonstrations. The legal basis has since been formalised, giving authorities explicit authority to restrict connectivity in designated "hotspot areas." When shutdowns happen, Signal, WhatsApp, and Telegram become fully inoperable — and coordinators have no fallback.

### 2.2 Agent Provocateurs Collapse Peaceful Actions

Multiple documented Indonesian demonstrations have turned violent not from within the movement, but from outside actors who infiltrate coordinator channels or physically incite confrontation. In 2025, the coordinator of the Student Movement cancelled a planned September rally explicitly due to fear of agent provocateurs. Current tools offer no mechanism for verifying that a participant in a coordination channel is who they claim to be — especially when operating offline.

### 2.3 Information Blackouts Distort the Public Narrative

During the August 2025 protests, platforms were pressured to remove content documenting police conduct, including alleged footage of the National Police Chief ordering to open fire on demonstrators. Coordinators need a way to distribute an authoritative, pre-written statement to press *before* a blackout hits — so the public record is established independently of platform compliance or removal.

### 2.4 No Unified Tool Exists for This Context

The current best practice requires manually combining 3–5 separate apps with no interoperability, no unified identity model, and no graceful degradation when connectivity changes. Non-technical users cannot manage this under field conditions. There is no single tool that handles the full coordination lifecycle — planning, real-time communication, press, and emergency response — while surviving an internet shutdown.

---

## 3. Target Users

### 3.1 Primary: Field Coordinator

**Profile:** Student, labour organiser, or civil society member aged 19–35. Limited technical background. Responsible for a sector of 50–500 people. Operating under time pressure, in crowds, with adrenaline affecting motor control and decision-making.

**Core needs:**
- See at a glance who is reachable and on which connection
- Send and receive location-tagged status updates
- Receive movement orders and confirm receipt
- Raise an emergency alert with one action

**Hard constraint:** Cannot be expected to configure network settings, understand cryptography, manage keys, or read more than two lines of text per screen interaction while in the field.

### 3.2 Secondary: Action Leader / Lead Coordinator

**Profile:** Experienced organiser. Typically positioned off-field or at a command point. Manages cross-sector communication, journalist relations, and overall movement flow. One of only two people (alongside Co-Leader) who can write or modify the official press statement.

**Core needs:**
- Broadcast authoritative orders to all sectors simultaneously
- Monitor real-time coordinator reachability across all connectivity layers
- Write and push the authoritative press statement
- Trigger emergency protocols affecting the whole operation

### 3.3 Tertiary: Legal Observer

**Profile:** Lawyer, law student, or trained volunteer. Positioned at entrances, police lines, or detention points. Documents incidents and provides real-time legal status updates.

**Core needs:**
- Log timestamped incident reports, stored locally and signed cryptographically
- Receive arrest alerts and confirm lawyer dispatch
- Maintain reliable location sharing even in degraded connectivity

### 3.4 Tertiary: Media Coordinator / Journalist Liaison

**Profile:** Communications officer managing information flow to press. Works closely with Action Leader on press statement timing and distribution.

**Core needs:**
- Access the authoritative press statement at all times, even offline
- Push the approved statement to pre-registered journalist contacts via SMS when internet is down
- Know when a new version of the statement has been published

---

## 4. Goals & Success Metrics

### 4.1 Product Goals

| # | Goal | Metric | Target |
|---|------|--------|--------|
| G1 | Seamless connectivity fallback | Time from internet loss to Bluetooth mesh activation, requiring no user action | < 10 seconds |
| G2 | Mesh message delivery | Message delivery rate across Bluetooth mesh in a crowd of 500+ | > 95% within 30 seconds |
| G3 | Stress usability | Task completion rate: send an alert, first-time user, no prior tutorial | > 90% in usability test |
| G4 | Identity security | Successful impersonation attacks in red-team exercise | 0 |
| G5 | Panic wipe speed | Time from trigger to full data erasure on device | < 3 seconds |
| G6 | Battery efficiency | Battery drain per hour of active Bluetooth mesh operation | < 8% on Snapdragon 665-class device |
| G7 | Onboarding speed | Time from APK install to first message sent, guided flow | < 5 minutes |

### 4.2 MVP Launch Criteria

The following must all be true before any real-world use:

- [ ] Bluetooth mesh chat stable across minimum 10 concurrent nodes
- [ ] End-to-end encryption reviewed by at least one independent cybersecurity professional (referred by a trusted CSO partner)
- [ ] Panic wipe tested and confirmed functional on the 10 most common mid-range Android devices sold in Indonesia
- [ ] Bahasa Indonesia fully implemented as primary language across all screens, including all error messages and alerts
- [ ] APK sideloadable without Google Play or any Google account
- [ ] In-app onboarding tutorial complete and tested with non-technical users
- [ ] Decoy mode functional
- [ ] No external analytics, no crash reporting to third-party servers
- [ ] Developer identity agreement signed with at least one CSO partner before any pilot use

---

## 5. Non-Goals & Explicit Exclusions

The following are explicitly out of scope for v1.0 and must not creep in:

- **No LoRa / long-range radio layer.** Hardware cost and setup complexity make this a barrier. Designed as a clean extension point for v2.
- **No iOS version.** Android-only for v1.0. iOS Bluetooth background restrictions require a fundamentally different mesh approach. Revisit for v2.
- **No Play Store distribution.** Intentional. Distribution through trust networks only.
- **No social features.** No profiles, follower counts, likes, or public feeds. This is a coordination tool.
- **No collaborative press release editing.** The v1.0 press statement model is write-by-leaders, read-by-all. See Section 8.5.
- **No blockchain timestamping.** Removed for simplicity. Revisit in v2 if CSO partners identify this as a real need.
- **No anonymous tip or whistleblower system.** Different product, different threat model.
- **No NEXUS-operated servers of any kind.** All infrastructure is either peer-to-peer or self-hosted by the organising group.
- **No live audio or video streaming.** Push-to-talk audio clips (max 30 seconds) are supported. Streaming is not.

---

## 6. System Architecture Overview

### 6.1 Three-Layer Cascade

NEXUS v1.0 operates across three connectivity layers. The app monitors all layers continuously and automatically selects the best available channel per message, per recipient. Users never manually switch layers — the transition is invisible.

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1 — Internet                                         │
│  Matrix protocol · Optional Tor routing                     │
│  Full feature set · Checked first · Unlimited range         │
│  Deactivates: on 3 consecutive failed server pings          │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 — Bluetooth Mesh                                   │
│  Briar protocol · BLE + WiFi Direct                         │
│  ~80–120m per hop · Scales with crowd size                  │
│  Most features supported · Auto-activates on Layer 1 loss   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3 — SMS                                              │
│  Signal Protocol compressed into 160-char SMS segments      │
│  Text only · Metadata visible to carrier · Last resort      │
│  Activates: when Layers 1 and 2 both fail                   │
│  Requires pre-exchanged keys (handled automatically if      │
│  contacts were previously verified on higher layers)        │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Message Anatomy

Every message in NEXUS carries:

| Field | Purpose |
|-------|---------|
| UUID | Globally unique ID — enables deduplication across all layers |
| Vector clock | Causal ordering independent of device wall-clock time |
| Relay tag | Which layer carried this message (shown to user: INET / BT / SMS) |
| Encrypted payload | End-to-end encrypted; relay nodes cannot read content |
| Sender signature | Cryptographic proof of sender identity |

Relay nodes (any NEXUS device in range) forward messages with unseen UUIDs and silently drop duplicates. The seen-set is persisted to disk to survive app restarts.

### 6.3 Identity Model

A user's identity IS their cryptographic key pair, generated on first install and stored in the device's Android Keystore (hardware-backed secure enclave where available).

There is no central account. No username and password. No phone number. No email.

Contact verification uses Safety Numbers: two coordinators physically meet, compare a 60-digit code displayed by both apps, and tap "Verified." This verified relationship persists across all connectivity layers — a verified contact on Bluetooth mesh is the same verified identity as on the internet layer. This is the primary technical defence against agent provocateurs.

### 6.4 Homeserver (Internet Layer Only)

On Layer 1, messages route through a Matrix homeserver. This is a small piece of software that the organising group runs on a computer they control — it is not run by NEXUS. The app is fully functional using Bluetooth mesh (Layer 2) and SMS (Layer 3) with no homeserver at all. CSO partners may independently choose to offer homeserver hosting as a service to vetted organisations they work with — this is a decision for those partners, not a NEXUS dependency.

---

## 7. Connectivity Layer Specification

### 7.1 Layer 1 — Internet (Matrix Protocol)

| Parameter | Value |
|-----------|-------|
| Protocol | Matrix (self-hosted homeserver — Synapse or Conduit) |
| Transport | Direct HTTPS, or optionally routed through Tor for IP protection |
| Encryption | Matrix Olm/Megolm (E2EE, forward-secret) |
| Features | Full: chat, PTT audio, map, press statement, emergency broadcast |
| Activation | Default when internet available |
| Deactivation | 3 consecutive failed pings → auto-switch to Layer 2 |
| User indicator | Green "INET" badge in persistent status bar |

### 7.2 Layer 2 — Bluetooth Mesh (Briar Protocol)

| Parameter | Value |
|-----------|-------|
| Protocol | Briar (open source, independently audited 2017) |
| Transport | Bluetooth Low Energy advertising + WiFi Direct |
| Encryption | Bramble Transport Protocol (forward-secret, per-session keys) |
| Range per hop | ~80–120m depending on environment and obstructions |
| Max relay hops | 4 (configurable by Action Leader) |
| Features | Text chat, PTT audio, location pins, press statement, emergency broadcast |
| Features excluded | Map tile sync, images (bandwidth too limited) |
| Activation | Automatic on Layer 1 loss; can also run alongside Layer 1 |
| User indicator | Blue "BT" badge + node count in persistent status bar |
| Relay behaviour | Every NEXUS device automatically relays messages it hasn't seen, extending mesh range |

**Mesh relay node mode:** A device placed on charge at a fixed position (doorway, rooftop, between sectors) can be set to relay-only mode, maximising mesh coverage without requiring a human to hold it.

### 7.3 Layer 3 — SMS Fallback

| Parameter | Value |
|-----------|-------|
| Transport | Standard SMS via cellular voice/SMS network |
| Encryption | Signal Protocol compressed and base64-encoded into 160-character SMS segments |
| Features | Text messages only — no media, no location, no PTT |
| Activation | Manual toggle, or automatic when Layers 1 and 2 both unavailable |
| Key requirement | Pre-exchanged keys required; automatically satisfied if contacts were previously verified on higher layers |
| User indicator | Amber "SMS" badge in persistent status bar |
| Metadata warning | User shown a persistent warning: SMS sender, recipient, and timestamp are visible to the carrier and potentially to authorities. Use pseudonyms. |

---

## 8. Feature Specifications

### 8.1 Channels & Messaging

**Channel structure per operation:**

| Channel | Who has access | Purpose |
|---------|---------------|---------|
| `#semua` (all) | All coordinators | General updates, movement orders |
| `#sektor-utara` | North sector team | Sector-specific coordination |
| `#sektor-selatan` | South sector team | Sector-specific coordination |
| `#logistik` | Logistics team | Water, medical, supplies |
| `#media` | Media coordinator + leaders | Press coordination |
| `#pengamat-hukum` | Legal observers | Arrest alerts, legal response |

Channel membership is enforced cryptographically via signed invitations. Joining requires a valid invite from an existing channel member — there is no open join.

**Message types and layer availability:**

| Type | Internet | BT Mesh | SMS |
|------|:--------:|:-------:|:---:|
| Text chat | ✓ | ✓ | ✓ |
| Location pin | ✓ | ✓ | — |
| PTT audio clip | ✓ | ✓ | — |
| Photo attachment | ✓ | — | — |
| Status update (structured) | ✓ | ✓ | ✓ |
| Press statement (read) | ✓ | ✓ | ✓ (text only) |
| Emergency broadcast | ✓ | ✓ | ✓ |

### 8.2 Push-to-Talk (PTT) Audio

- Hold the PTT button to record; release to send
- Maximum clip length: 30 seconds
- Audio compressed via Opus codec at 8kbps (voice-optimised, low bandwidth)
- Works over Bluetooth mesh via chunked packet relay
- Visual waveform confirms recording and transmission
- Received clips play automatically with haptic notification
- Not available over SMS (bandwidth insufficient)

### 8.3 Movement Map

- Offline-capable using OpenStreetMap tiles pre-downloaded for the operation area before the event
- Coordinators drop pins with preset labels: Rally Point / Pos Air / Police Line / Exit Route / Blocked / Medical
- Action Leader draws the planned march route, visible to all coordinators
- Optional: each coordinator's location shared as a dot on the map (opt-in per session, not stored beyond the operation)
- Available on Layer 1 and Layer 2 only; tile data is too large for SMS

### 8.4 Emergency Protocols

**SOS Broadcast:**
- Large, prominent button requiring a 2-second hold to prevent accidental activation
- Simultaneously broadcasts across all available layers
- Payload: pre-configured template (pseudonym, role, sector, location, emergency type — configured during onboarding)
- All recipients receive audio alert + strong vibration regardless of notification settings
- Only verified contacts trigger the audio alert; unverified senders produce a visual-only notification

**Arrest Alert:**
- Any coordinator can trigger, tagged with GPS location
- Auto-notifies the `#pengamat-hukum` channel immediately
- Legal observers respond with: "Pengacara dikirim — estimasi X menit"
- Generates a timestamped, locally-signed incident log entry

**Panic Wipe:**
- Trigger: configurable gesture (default: 5 rapid taps on the app icon, or a dedicated hidden button)
- Wipes: all messages, all channel keys, all contacts, all local map data, all documents, all operation history
- Result: app appears freshly installed with no evidence of prior use
- Target: full wipe in under 3 seconds
- Fallback: if OS delays file deletion, cryptographic key destruction renders all data permanently undecipherable within 1 second
- Does NOT wipe: the user's own key pair (recoverable via a physical backup code given during onboarding — stored off-device by the user)
- Must be tested and confirmed functional on the 10 most common Indonesian mid-range Android devices before launch

**Decoy Mode:**
- App displays a plausible cover interface (configurable: basic notes app appearance, or weather widget) when a specific PIN is entered
- Real interface accessible via a different PIN
- From the outside, the installed app is indistinguishable from the cover app

### 8.5 Press Statement (Simplified Model)

The press statement feature in v1.0 has one purpose: **every coordinator carries the same authoritative statement and can recite it accurately if approached by a journalist or bystander.**

**Write access:** Action Leader and Co-Leader only. Cryptographically enforced — the app rejects edits from any other key.

**Flow:**
1. Action Leader writes the statement before or during the operation
2. Statement is pushed to all channels as a pinned, read-only document
3. Every coordinator receives a "Baca & Konfirmasi" (Read & Confirm) prompt — one tap to confirm they've read it
4. Statement is cached on every device immediately — accessible offline, even with no connectivity
5. When internet is available, the statement can also be pushed via SMS to pre-registered journalist phone numbers at the tap of a button
6. If the statement is updated, all coordinators receive a new "Baca & Konfirmasi" prompt and the confirmation counter resets

**What this is NOT:** A collaborative editing tool. There is no comment, no track changes, no approval workflow. Leaders write; everyone else reads and confirms.

### 8.6 Coordinator Status Board

The Action Leader sees a real-time grid of all coordinators showing:
- Name (pseudonym) and role
- Current connectivity layer (INET / BT / SMS / Unreachable)
- Last seen timestamp
- Press statement read confirmation (✓ / pending)
- Current reported crowd count for their sector (if submitted)

---

## 9. Security & Privacy Requirements

### 9.1 Encryption at Each Layer

| Layer | Encryption | Key Exchange | Forward Secrecy |
|-------|-----------|--------------|:---------------:|
| Internet | Matrix Olm/Megolm | X3DH | ✓ |
| Bluetooth Mesh | Briar BTP | In-person QR (Diffie-Hellman) | ✓ |
| SMS | Signal Protocol (compressed) | Pre-exchanged via higher layers | ✓ |
| Local storage | AES-256-GCM | Android Keystore | N/A |

### 9.2 Threat Model

| Threat | Mitigation |
|--------|-----------|
| Internet shutdown | Layer 2 (BT mesh) and Layer 3 (SMS) auto-activate |
| Network traffic analysis | Tor routing available on Layer 1; BT mesh is local and contains no internet traffic |
| Device seizure | Panic wipe; decoy mode; AES-256 local encryption |
| Infiltrator joins Bluetooth mesh | All content E2E encrypted — relay nodes cannot read messages |
| Infiltrator impersonates a coordinator | Safety Number verification; unverified contacts clearly flagged in UI |
| False emergency broadcast | Emergency audio alert only triggers for verified contacts |
| App store removal | No Play Store dependency; APK distributed via community trust networks |
| ITE Law prosecution of developer | Pseudonymous development; code published under open-source licence from outside Indonesia |
| Press statement tampering | Only Action Leader and Co-Leader keys can sign write operations; all others cryptographically rejected |

### 9.3 Explicit Limitations — Communicated Honestly to Users

The in-app onboarding and coordinator training material must clearly state:

- **IMSI catchers:** Cell tower interception can expose SMS metadata. SMS layer warns users and recommends pseudonyms.
- **OS-level compromise:** State-level spyware installed at the OS level bypasses app-layer encryption. The app cannot protect against this.
- **Physical observation:** Nothing prevents someone from reading your screen.
- **Legal compulsion:** A court order requiring device unlock is outside scope. Panic wipe is the only available mitigation.
- **Bluetooth jamming:** Layer 2 can be disrupted by active RF jamming. Layer 3 (SMS) remains available.

### 9.4 Data Minimisation — Hard Requirements

- No phone number collected or required
- No email address collected or required
- No analytics sent to any external server
- No crash reports sent externally without explicit per-incident user consent
- Location data is opt-in per session; never persisted beyond the active operation; never transmitted to any server
- Zero data collected that is not strictly required to deliver core function

---

## 10. UX & Accessibility Requirements

### 10.1 Stress-Optimised Design Principles

Primary UX constraint: **the app must be fully operable under high stress, in bright sunlight or darkness, in a crowd, with one hand, by a non-technical user who has not used it in 3 months.**

- No more than 2 taps to any critical function
- Minimum 48×48dp touch targets on all interactive elements
- High contrast UI — minimum WCAG AA; tested under direct sunlight
- Audio + haptic confirmation on every sent message
- Persistent status bar always showing current active layer and reachable node count
- Message delivery states per message: Terkirim / Diterima / Dibaca
- Every screen loads from local cache first — no blank or loading states, even offline

### 10.2 Language

- **Bahasa Indonesia is the primary language.** Not English.
- Every UI element, error message, alert, and tutorial in Bahasa Indonesia by default
- English available as secondary language for international observers and legal support
- Text size respects system-level font size setting (Android accessibility)

### 10.3 Battery & Performance

- Target device: Snapdragon 665 or equivalent (Rp 2–3 juta price bracket)
- Battery drain target: < 8% per hour of active Bluetooth mesh operation with screen off
- Low Power Mode: auto-activates at 20% battery; reduces BT mesh broadcast frequency
- App warns at < 15% battery during an active operation

### 10.4 In-App Onboarding & Training

**Onboarding flow (target: < 5 minutes):**
1. Install APK via sideload — companion web page provides Bahasa Indonesia instructions, no Google account needed
2. Key pair generated automatically in background
3. User sets a display pseudonym — app suggests random Indonesian city/island names as defaults
4. User scans Action Leader's event QR code → joined to all channels automatically
5. Complete Safety Number verification in person with at least one existing coordinator
6. 60-second interactive tutorial: send a message, drop a pin, PTT, read press statement, trigger panic wipe

**In-app training module (accessible any time):**
- Sandboxed "Simulator Mode" with fake coordinators and simulated mesh activity
- Covers: what each connectivity layer means, delivery confirmation, panic wipe, arrest alert response
- Completable in 10 minutes
- All content in Bahasa Indonesia; optional narrated audio for lower-literacy users

---

## 11. Technical Stack

### 11.1 Mobile App (Android)

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Framework | React Native | Broad Android ecosystem; enables future iOS port without full rewrite |
| Mesh layer | Briar Core (Java/Kotlin via JNI bridge) | Independently audited; battle-tested; open source |
| Matrix client | matrix-js-sdk | Standard, maintained Matrix client library |
| Local database | SQLite + SQLCipher | Encrypted local storage; well-established on Android |
| CRDT (press statement sync) | Automerge | Ensures all devices converge on same statement version after reconnect |
| Crypto primitives | libsodium (via react-native-sodium) | Audited; no custom crypto |
| Maps | react-native-maps + OpenStreetMap (offline tiles) | No Google Maps dependency |
| Audio (PTT) | Opus codec via react-native-audio | Low-bitrate, voice-optimised |
| Tor (optional) | Orbot integration | Network-level Tor routing on Layer 1 |

### 11.2 Infrastructure (Self-Hosted by Organising Groups — Not by NEXUS)

| Component | Technology | Who runs it |
|-----------|-----------|-------------|
| Matrix homeserver | Conduit (recommended) or Synapse | The organising group, on infrastructure they control |
| Tor hidden service | Standard Tor HS | Optional; configured by the organising group |

NEXUS does not operate any servers. The app is fully functional on Layers 2 and 3 without any homeserver.

### 11.3 Distribution

| Channel | Details |
|---------|---------|
| Primary | Direct APK link — shared only within CSO partner trust networks |
| Secondary | F-Droid repository — no Google account required |
| Excluded | Google Play Store — intentional |
| Excluded | Apple App Store — iOS deferred to v2 |
| Source code | AGPLv3, published pseudonymously from outside Indonesian jurisdiction |

---

## 12. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| ITE Law prosecution of developer | Low | Critical | Pseudonymous identity; no public association; code published from outside jurisdiction |
| App identified and blocked by authorities | Medium | High | Sideload-only; no Play Store; APK link shared privately within trust networks |
| Security flaw discovered post-deployment | Medium | Critical | Honest pre-launch communication on audit status; immediate patch cycle |
| Infiltrator joins Bluetooth mesh | Medium | High | All content E2E encrypted; Safety Number verification |
| Panic wipe fails on specific Android device | Low-Medium | Critical | Tested on 10 most common Indonesian devices; key destruction as fallback |
| App too complex under stress | High | High | Stress-tested UX; 60-second tutorial; simulator; CSO train-the-trainer model |
| Battery dies mid-operation | High | Medium | Low power mode; battery warnings; pre-operation checklist |
| Bluetooth mesh jammed | Low | Medium | SMS Layer 3 remains available |
| No CSO partner found | Low-Medium | Medium | App functional without formal partnership; initial distribution possible through developer's existing trusted network |
| Press statement outdated when pushed via SMS | Low | Medium | SMS push always uses current version; timestamp shown; coordinators confirm reading |

---

## 13. Go-to-Market Strategy

### 13.1 Phase 1 — Silent Build (Now → App Complete)

- Development fully private and pseudonymous
- No public announcements; no GitHub activity under real name
- Developer self-tests across multiple Android devices
- Deliverable: a working, internally tested APK

### 13.2 Phase 2 — Trusted Outreach & Security Review (App Complete → Reviewed)

- Developer makes private contact with trusted individuals at one or more Indonesian civil society organisations working in digital rights and/or activist support
- Presents the app in a private meeting; demonstrates functionality; explains the security model and the developer identity agreement (see separate document)
- CSO partner refers a trusted cybersecurity professional to conduct an informal security review
- Reviewer red-teams the app: impersonation, traffic interception, data recovery after wipe
- Developer addresses findings; app updated
- Developer identity agreement signed before any pilot use begins
- No public communication during this phase

### 13.3 Phase 3 — Controlled Pilot (Review Complete → First Real Use)

- CSO partner selects one trusted organising group for a live pilot in a real but lower-stakes context
- Coordinator training delivered in person by the CSO partner — not by the developer
- Developer receives structured feedback; iterates
- Developer remains invisible throughout; the CSO owns the user relationship entirely

### 13.4 Phase 4 — CSO-Led Expansion (Post-Pilot)

- CSO partner trains additional organisations using the train-the-trainer model
- Each new group receives: the APK link, in-app training module, and an in-person session with their CSO trainer
- The app spreads through trust networks, not marketing
- Developer's role: maintenance, security patches, feature iteration from real feedback

### 13.5 What the Developer Does NOT Do

- Never publicly claim authorship
- Never speak to media about the app
- Never submit to any app store
- Never market outside the direct CSO relationship
- Never collect data about who is using the app or how many people have installed it

---

## 14. Resolved Decisions Log

| # | Decision | Resolution | Rationale |
|---|----------|-----------|-----------|
| D1 | Legal entity vs. pseudonymous | **Pseudonymous development, no legal entity** | Developer and family safety; ITE Law risk |
| D2 | Platform | **Android only for v1.0** | ~72% Indonesian market share; iOS mesh architecture requires separate approach |
| D3 | Training | **In-app module + CSO train-the-trainer** | Keeps developer invisible; scales through existing trust networks |
| D4 | LoRa | **Removed from v1.0; extension point reserved for v2** | Hardware cost barrier; setup complexity breaks onboarding target |
| D5 | Press statement model | **Leaders write, everyone reads and confirms** | Simpler; authoritative single source of truth sufficient for the use case |
| D6 | Homeserver | **Not a NEXUS responsibility; app functional without it** | Eliminates central point of seizure |
| D7 | Security audit | **Informal CSO-referred review before first use; formal audit a v2 goal** | Formal audit not feasible at this stage |
| D8 | Blockchain timestamping | **Removed from v1.0** | Complexity without proven need |
| D9 | CSO naming in PRD | **No specific CSO names in this document** | Partnerships not yet established; premature association is unfair to those organisations |
| D10 | Developer identity | **Pseudonymous; disclosed only to CSO partners under signed agreement** | Family safety; legal protection; see separate Developer Identity Agreement |

---

## 15. Appendix: Prior Art & References

### Existing Tools — What NEXUS Learns From Each

| App | Strengths | Weaknesses | NEXUS Approach |
|-----|-----------|-----------|----------------|
| **Briar** | Independently audited; Tor integration; no central server; Android-native | UX intimidating for non-technical users; no coordination features | Use as mesh protocol backbone; do not replicate the UX |
| **Bridgefy** | Simple UX; widely known | 2020 audit found severe vulnerabilities; commercial; closed source | UX simplicity is achievable; closed source is a dealbreaker |
| **Signal** | Best-in-class encryption; strong track record | Requires phone number; no offline mesh; centralised | Encryption model is the reference; phone number identity is what we avoid |
| **Matrix / Element** | Federated; E2EE; self-hostable; open source | Complex UX; no offline mesh; heavyweight | Internet-layer protocol; abstract all complexity from users |
| **Meshtastic** | Long range; open source; low hardware cost | Requires physical hardware; text only; no identity verification | Reserved for v2 LoRa extension |

### Legal & Regulatory References

- UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik (ITE Law), as amended 2016 and 2024
- UU No. 36 Tahun 1999 tentang Telekomunikasi
- Peraturan Pemerintah No. 71 Tahun 2019 (Electronic Systems and Transactions)

### Technical References

- Briar Project Security Audit — Cure53, 2017
- Matrix Specification — spec.matrix.org
- Automerge CRDT Library — automerge.org
- Lamport, L. (1978). "Time, clocks, and the ordering of events in a distributed system." *Communications of the ACM.*

### Context & Reporting

- Human Rights Watch — "Indonesia: Internet Shutdown in Papua" (2019)
- Amnesty International — Reports on digital repression during Indonesia's 2025 protest response
- Access Now — Digital Security Helpline resources for civil society

---

*This document describes a lawful communication tool for civic coordination. Nothing in this document constitutes legal advice. Individuals and organisations using NEXUS are solely responsible for compliance with applicable laws in their jurisdiction.*

*The existence of this document should be treated as sensitive. It is intended for the developer and vetted CSO partners only. Do not share, post, or store in any location accessible to unauthorised parties.*

*NEXUS PRD v1.2 — February 2026 — All decisions resolved — Ready for development*
