# NEXUS — Field Coordination App

> **Bahasa Indonesia tersedia di bawah / Bahasa Indonesia below.**

---

## English

NEXUS is a free, open-source Android app for encrypted field coordination during lawful civic demonstrations. It is designed to work when internet access is restricted, throttled, or shut down entirely.

### How it works

NEXUS maintains communication across three layers, switching automatically with no action required from the user:

| Layer | Technology | Works when |
|-------|-----------|-----------|
| 1 — Internet | Matrix protocol (self-hosted server) | Normal internet available |
| 2 — Mesh | Bluetooth + WiFi Direct, phone-to-phone | Internet blocked or unavailable |
| 3 — SMS | Encrypted text messages | Both internet and mesh unavailable |

All messages are end-to-end encrypted. NEXUS does not operate any servers. No phone number, email address, or account is required.

### Features

- Encrypted group messaging across channels (sectors, logistics, legal observers, media)
- Offline maps with coordinator pins — Rally Point, Police Line, Exit Route, Medical, Water Station
- Emergency SOS broadcast to all reachable coordinators
- Arrest alert with automatic legal observer notification
- Press statement — leaders write once, every coordinator reads and confirms, cached fully offline
- Panic wipe — full data erasure in under 3 seconds
- Decoy mode — app appears as a notes app to casual inspection
- In-app training module (text, Bahasa Indonesia, works offline)

### Who it is for

Field coordinators, action leaders, legal observers, and media coordinators participating in lawful demonstrations. Designed for non-technical users operating under stress.

### Install

NEXUS is **not** on the Google Play Store — this is intentional. It is distributed through trusted civil society networks.

To install:
1. Enable "Install from unknown sources" in Android settings
2. Download the APK from your trusted civil society contact
3. Open the APK to install
4. No Google account required

### Build from source

Requirements: Node.js 18+, Android Studio, React Native 0.76+ CLI.

```bash
git clone <this-repo>
cd nexus
npm install
npx react-native run-android
```

Note: A real Android device is required. BLE and WiFi Direct do not work on emulators.

### Security

- All messages E2E encrypted (libsodium + Matrix Olm/Megolm)
- Identity is a cryptographic keypair — no central account
- In-person Safety Number verification defends against impersonation
- Panic wipe destroys encryption key in < 1 second, rendering all data permanently unreadable
- No analytics, no crash reporting, no data collection of any kind
- Update system verifies APK hash and developer signature before installing

**Known limitations (we communicate these honestly):**
- SMS metadata (sender, recipient, timestamp, approximate location) is visible to cellular providers. App warns users with a prominent blocking screen before any SMS is used.
- The app cannot protect against OS-level spyware.
- Decoy mode does not survive forensic analysis of the APK.

### Legal

NEXUS is designed and intended for **lawful** civic coordination only. See [LICENSE.txt](LICENSE.txt) for the full license (AGPLv3) and prohibited use addendum.

The developer does not condone or accept responsibility for any illegal use of this software.

### Privacy

NEXUS collects zero data about you. See [NEXUS_PRD_v1.3.md](NEXUS_PRD_v1.3.md) Section 9.4 for the full data minimisation specification.

### Contributing

Contributions welcome. Before contributing, read the architecture documentation in `docs/`. All user-facing strings must be in Bahasa Indonesia first (see `src/i18n/id.js`).

---

## Bahasa Indonesia

NEXUS adalah aplikasi Android gratis dan open-source untuk koordinasi lapangan terenkripsi saat demonstrasi sipil yang sah. Dirancang untuk tetap berfungsi ketika akses internet dibatasi, diperlambat, atau diblokir sepenuhnya.

### Cara kerja

NEXUS mempertahankan komunikasi melalui tiga lapisan, beralih otomatis tanpa tindakan apapun dari pengguna:

| Lapisan | Teknologi | Bekerja saat |
|---------|-----------|--------------|
| 1 — Internet | Protokol Matrix (server mandiri) | Internet normal tersedia |
| 2 — Mesh | Bluetooth + WiFi Direct, antar-ponsel | Internet diblokir atau tidak tersedia |
| 3 — SMS | Pesan teks terenkripsi | Internet dan mesh keduanya tidak tersedia |

Semua pesan dienkripsi ujung-ke-ujung. NEXUS tidak mengoperasikan server apapun. Tidak perlu nomor telepon, email, atau akun.

### Fitur

- Pesan grup terenkripsi di berbagai saluran (sektor, logistik, pengamat hukum, media)
- Peta offline dengan penanda koordinator — Titik Kumpul, Garis Polisi, Jalur Keluar, Medis, Pos Air
- Siaran darurat SOS ke semua koordinator yang terjangkau
- Peringatan penangkapan dengan notifikasi otomatis ke pengamat hukum
- Pernyataan pers — pemimpin menulis sekali, semua koordinator membaca dan mengkonfirmasi, tersimpan offline
- Hapus panik — penghapusan data lengkap dalam waktu kurang dari 3 detik
- Mode penyamaran — aplikasi terlihat seperti aplikasi catatan
- Modul pelatihan dalam aplikasi (teks, Bahasa Indonesia, berfungsi offline)

### Untuk siapa

Koordinator lapangan, pemimpin aksi, pengamat hukum, dan koordinator media yang berpartisipasi dalam demonstrasi yang sah. Dirancang untuk pengguna non-teknis yang bekerja di bawah tekanan.

### Instalasi

NEXUS **tidak** tersedia di Google Play Store — ini disengaja. Didistribusikan melalui jaringan masyarakat sipil yang terpercaya.

Untuk memasang:
1. Aktifkan "Pasang dari sumber tidak dikenal" di pengaturan Android
2. Unduh APK dari kontak masyarakat sipil Anda yang terpercaya
3. Buka APK untuk memasang
4. Tidak memerlukan akun Google

### Hukum

NEXUS dirancang dan dimaksudkan **hanya** untuk koordinasi sipil yang sah. Lihat [LICENSE.txt](LICENSE.txt) untuk lisensi lengkap (AGPLv3) dan addendum penggunaan yang dilarang.

Pengembang tidak mendukung atau bertanggung jawab atas penggunaan ilegal perangkat lunak ini.

### Privasi

NEXUS tidak mengumpulkan data apapun tentang Anda. Tidak ada analitik, tidak ada laporan kesalahan, tidak ada pengumpulan data dalam bentuk apapun.

---

*NEXUS — open source, no servers, no accounts, works offline.*

*AGPLv3 — see LICENSE.txt*
