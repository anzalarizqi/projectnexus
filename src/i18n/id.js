// Bahasa Indonesia — string utama aplikasi NEXUS
// PENTING: Semua string user-facing HARUS ada di sini. Jangan hardcode string di komponen.

const id = {
  // === Onboarding ===
  onboarding: {
    pin: {
      title: 'Masukkan PIN',
      placeholder: 'PIN',
      wrongPin: 'PIN salah. Coba lagi.',
    },
    tou: {
      title: 'SYARAT PENGGUNAAN NEXUS',
      body: `NEXUS adalah alat komunikasi yang dirancang untuk koordinasi sipil yang sah dan damai, termasuk demonstrasi, aksi sosial, dan pengorganisasian komunitas sesuai hukum Indonesia.

PENGGUNAAN YANG DILARANG:

Anda TIDAK diperbolehkan menggunakan NEXUS untuk:

1. Merencanakan, mengkoordinasikan, atau memfasilitasi kegiatan kriminal apa pun, termasuk:
   - Kekerasan terhadap orang atau properti
   - Penipuan, pencurian, atau kejahatan ekonomi
   - Terorisme atau ekstremisme kekerasan
   - Perdagangan narkoba atau senjata ilegal
   - Kejahatan terorganisir

2. Menyebarkan konten ilegal menurut hukum Indonesia

3. Melanggar privasi atau hak orang lain

PENOLAKAN TANGGUNG JAWAB:
Pengembang NEXUS tidak bertanggung jawab atas bagaimana Anda menggunakan aplikasi ini. Anda bertanggung jawab penuh atas kepatuhan terhadap semua hukum yang berlaku.

Dengan mengetuk "Saya Menerima", Anda mengonfirmasi bahwa:
✓ Anda telah membaca dan memahami syarat ini
✓ Anda akan menggunakan NEXUS hanya untuk tujuan yang sah`,
      accept: 'SAYA MENERIMA',
      reject: 'TIDAK SETUJU - KELUAR',
    },
    pseudonym: {
      title: 'Pilih Nama Samaran',
      subtitle: 'Nama ini yang akan dilihat koordinator lain. Jangan gunakan nama asli.',
      placeholder: 'Nama samaran',
      suggest: 'Nama lain',
      confirm: 'Gunakan Nama Ini',
    },
    qr: {
      title: 'Scan Kode QR',
      subtitle: 'Minta Pemimpin Aksi untuk menampilkan kode QR bergabung.',
      scanning: 'Memindai...',
      success: 'Berhasil bergabung!',
      error: 'Kode tidak valid. Coba lagi.',
    },
  },

  // === Status Bar ===
  statusBar: {
    inet: 'INET',
    bt: 'BT',
    sms: 'SMS',
    unreachable: 'TIDAK TERJANGKAU',
    nodes: 'node',
  },

  // === Channels ===
  channels: {
    title: 'Saluran',
    semua: '#semua',
    noMessages: 'Belum ada pesan.',
  },

  // === Chat ===
  chat: {
    inputPlaceholder: 'Tulis pesan...',
    send: 'Kirim',
    status: {
      sent: 'Terkirim',
      delivered: 'Diterima',
      read: 'Dibaca',
    },
  },

  // === SMS Warning (v1.3 mandatory) ===
  smsWarning: {
    title: '⚠️ PERINGATAN: LAYER SMS AKTIF',
    body: `Meskipun isi pesan Anda terenkripsi, METADATA SMS terlihat oleh provider seluler dan dapat diakses aparat:

• SIAPA mengirim pesan (nomor telepon Anda)
• Kepada SIAPA Anda mengirim (nomor penerima)
• KAPAN pesan dikirim (timestamp)
• LOKASI kasar Anda (via menara seluler)

Gunakan nama samaran, bukan nama asli.
Hindari menyebut lokasi atau identitas spesifik.

Apakah Anda ingin melanjutkan menggunakan SMS?`,
    confirm: 'SAYA MENGERTI RISIKONYA',
    cancel: 'TIDAK, MATIKAN SMS',
    activeBanner: '⚠️ SMS AKTIF — Metadata terlihat provider',
  },

  // === Battery (v1.3 mandatory) ===
  battery: {
    lowWarning: 'Baterai rendah — aktifkan mode hemat?',
    criticalWarning: 'PERINGATAN: Baterai kritis — cari sumber daya',
    saverActive: 'Mode Hemat Baterai Aktif — Mesh Lebih Lambat',
    enableSaver: 'Aktifkan Mode Hemat',
    disableSaver: 'Matikan Mode Hemat',
  },

  // === Emergency ===
  emergency: {
    sos: {
      button: 'SOS',
      holdInstruction: 'Tahan 2 detik untuk kirim darurat',
      sending: 'Mengirim darurat...',
      sent: 'Sinyal darurat terkirim',
    },
    arrest: {
      button: 'Laporkan Penangkapan',
      sent: 'Pengamat hukum diberitahu',
      lawyerSent: 'Pengacara dikirim — estimasi',
      minutes: 'menit',
    },
    panicWipe: {
      wiping: 'Menghapus data...',
      done: 'Data terhapus',
    },
  },

  // === Map ===
  map: {
    title: 'Peta',
    shareLocation: 'Bagikan Lokasi Sekarang',
    downloadMap: 'Unduh Peta Operasi',
    pinLabels: {
      rally: 'Titik Kumpul',
      water: 'Pos Air',
      policeLine: 'Garis Polisi',
      exit: 'Jalur Keluar',
      blocked: 'Terblokir',
      medical: 'Medis',
    },
  },

  // === Press Statement ===
  pressStatement: {
    title: 'Pernyataan Resmi',
    readConfirm: 'Baca & Konfirmasi',
    confirmed: 'Dikonfirmasi',
    pending: 'Menunggu',
    pushToPress: 'Kirim ke Jurnalis via SMS',
  },

  // === Update System (v1.3 mandatory) ===
  update: {
    critical: {
      title: 'Pembaruan Keamanan Kritis',
      body: 'Pembaruan keamanan penting tersedia. Harap segera perbarui untuk melindungi keamanan Anda.',
      action: 'Perbarui Sekarang',
    },
    normal: {
      banner: 'Versi baru tersedia',
      action: 'Perbarui',
    },
    checking: 'Memeriksa pembaruan...',
    upToDate: 'Aplikasi sudah terbaru',
    downloading: 'Mengunduh pembaruan...',
    installing: 'Memasang pembaruan...',
    checkManually: 'Periksa Pembaruan',
  },

  // === Settings ===
  settings: {
    title: 'Pengaturan',
    training: 'Modul Pelatihan',
    simulator: 'Mode Simulator',
    checkUpdate: 'Periksa Pembaruan',
    downloadMap: 'Unduh Peta Operasi',
    safetyNumber: 'Verifikasi Nomor Keamanan',
    batterySaver: 'Mode Hemat Baterai',
    about: 'Tentang NEXUS',
  },

  // === General ===
  general: {
    ok: 'OK',
    cancel: 'Batal',
    confirm: 'Konfirmasi',
    loading: 'Memuat...',
    error: 'Terjadi kesalahan. Coba lagi.',
    offline: 'Tidak ada koneksi',
  },
};

export default id;
