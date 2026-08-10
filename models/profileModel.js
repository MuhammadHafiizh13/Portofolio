/**
 * ============================================================
 *  models/profileModel.js
 * ------------------------------------------------------------
 *  "M" dalam arsitektur MVC — tempat data & logika akses data.
 *
 *  Di proyek sederhana ini data profil disimpan sebagai objek
 *  JavaScript (bukan database) agar mudah diedit oleh Anda.
 *
 *  💡 CARA EDIT: cukup ganti isi objek `profile` di bawah ini
 *     dengan data diri Anda sendiri. Semua halaman otomatis
 *     mengikuti perubahan tersebut.
 * ============================================================
 */

const profile = {
  name: 'Budi Prasetyo',
  shortName: 'Budi',
  role: 'Full-Stack Web Developer',
  location: 'Jakarta, Indonesia',
  email: 'halo@budiprasetyo.dev',
  phone: '+62 812-3456-7890',
  available: true, // status "Tersedia untuk proyek baru"

  // Kalimat-kalimat untuk efek ketikan (typing effect) di halaman Beranda
  typedRoles: ['Full-Stack Web Developer', 'Backend Developer', 'UI/UX Enthusiast'],

  // Tagline singkat yang ditampilkan di Hero section & footer
  tagline:
    'Saya membangun aplikasi web modern yang cepat, aman, dan mudah digunakan — dari database hingga antarmuka pengguna.',

  // Paragraf latar belakang untuk halaman Tentang Saya
  bio: [
    'Halo! Saya Budi Prasetyo, seorang Full-Stack Web Developer yang berdomisili di Jakarta. Selama 3 tahun terakhir saya membangun berbagai aplikasi web — mulai dari website company profile, sistem kasir (POS), hingga REST API untuk aplikasi mobile.',
    'Saya percaya bahwa kode yang baik adalah kode yang bersih, terstruktur, dan mudah dipelihara. Karena itu saya selalu menerapkan arsitektur MVC, menulis kode yang modular, dan memastikan setiap proyek memiliki dokumentasi yang jelas.',
    'Di luar pekerjaan, saya aktif berbagi ilmu melalui blog dan komunitas developer lokal. Saya juga suka mengeksplorasi teknologi baru agar tetap up-to-date dengan perkembangan industri.'
  ],

  // Link media sosial
  socials: {
    github: { label: 'GitHub', url: 'https://github.com/budiprasetyo' },
    linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/in/budiprasetyo' },
    instagram: { label: 'Instagram', url: 'https://instagram.com/budiprasetyo.dev' }
  },

  // Hard skills dengan persentase (untuk progress bar di halaman Tentang)
  hardSkills: [
    { name: 'JavaScript (ES6+)', level: 90 },
    { name: 'Node.js & Express.js', level: 88 },
    { name: 'HTML5 & CSS3', level: 95 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'MySQL / PostgreSQL', level: 80 },
    { name: 'MongoDB & Mongoose', level: 75 },
    { name: 'Git & GitHub', level: 85 },
    { name: 'REST API', level: 82 }
  ],

  // Soft skills dengan deskripsi singkat
  softSkills: [
    { name: 'Komunikasi', desc: 'Mampu menjelaskan ide teknis ke audiens non-teknis dengan bahasa yang sederhana.' },
    { name: 'Problem Solving', desc: 'Senang menganalisis masalah dan mencari solusi yang efektif serta efisien.' },
    { name: 'Kerja Sama Tim', desc: 'Terbiasa bekerja dalam tim memakai Git, code review, dan pendekatan agile.' },
    { name: 'Manajemen Waktu', desc: 'Terbiasa menyusun prioritas agar setiap deadline proyek dapat terpenuhi.' }
  ],

  // Riwayat pendidikan & pengalaman (timeline di halaman Tentang)
  timeline: [
    { period: '2024 — Sekarang', title: 'Full-Stack Developer — PT Teknologi Nusantara', desc: 'Mengembangkan sistem internal perusahaan memakai Node.js, Express, dan MySQL.' },
    { period: '2022 — 2024', title: 'Junior Web Developer — Studio Kreatif Media', desc: 'Membangun website company profile dan toko online untuk berbagai klien UMKM.' },
    { period: '2018 — 2022', title: 'S1 Teknik Informatika — Universitas Indonesia', desc: 'Lulus dengan predikat cum laude. Aktif di UKM Robotik dan kepanitiaan IT.' }
  ]
};

module.exports = {
  /** Mengembalikan seluruh data profil */
  getProfile: () => profile
};
