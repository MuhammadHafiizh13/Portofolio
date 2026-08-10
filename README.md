# 🌐 Website Portofolio Pribadi

Website portofolio pribadi yang dibangun dengan **Node.js**, **Express.js**, **EJS** (Embedded JavaScript Templating), dan **Vanilla JavaScript** — menggunakan arsitektur **MVC** (Model-View-Controller) dan **Tailwind CSS** via CDN.

![Stack](https://img.shields.io/badge/Node.js-Express.js-EJS-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 📑 Daftar Isi

- [Fitur](#-fitur)
- [Persyaratan](#-persyaratan)
- [Langkah Inisialisasi Proyek](#-langkah-inisialisasi-proyek)
- [Struktur Folder](#-struktur-folder)
- [Cara Menjalankan](#-cara-menjalankan)
- [Penjelasan Arsitektur MVC](#-penjelasan-arsitektur-mvc)
- [Alur Form Kontak](#-alur-form-kontak)
- [Kustomisasi](#-kustomisasi)
- [Upgrade ke Nodemailer](#-upgrade-ke-nodemailer)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Fitur

| Halaman | Fitur |
|---|---|
| **Beranda (`/`)** | Hero section, efek ketikan (typing effect), ringkasan keahlian, 3 proyek unggulan, banner CTA |
| **Tentang (`/about`)** | Biodata, latar belakang, hard skills (progress bar animasi), soft skills, timeline pendidikan & pengalaman |
| **Proyek (`/projects`)** | Grid kartu proyek (judul, deskripsi, tech stack, link GitHub) — data dari `data/projects.json` |
| **Kontak (`/contact`)** | Form pesan dengan validasi di sisi klien **dan** server, honeypot anti-bot, alert sukses/error |
| **Global** | Mode terang/gelap (tersimpan di `localStorage`), responsive (mobile-friendly), animasi reveal saat scroll, progress bar scroll, tombol kembali ke atas |

---

## 📋 Persyaratan

- [Node.js](https://nodejs.org) versi **18 ke atas** (fitur `node --watch` sudah tersedia di v18.11+)
- Koneksi internet (untuk memuat Tailwind CSS & Google Fonts dari CDN)

---

## 🚀 Langkah Inisialisasi Proyek

Jika Anda membuat proyek dari nol (bukan memakai folder ini), ikuti langkah berikut:

```bash
# 1. Buat folder proyek & masuk ke dalamnya
mkdir portofolio
cd portofolio

# 2. Inisialisasi package.json
npm init -y

# 3. Install dependencies (Express untuk server, EJS untuk templating,
#    express-ejs-layouts untuk layout bersama)
npm install express ejs express-ejs-layouts

# 4. (Opsional) Install nodemon untuk auto-restart server saat kode berubah.
#    Catatan: proyek ini sudah memakai `node --watch` bawaan Node.js,
#    jadi nodemon tidak wajib.
npm install -D nodemon
```

Lalu tambahkan script berikut pada `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node --watch server.js"
}
```

---

## 📁 Struktur Folder

```
portofolio/
├── server.js                  # Entry point: konfigurasi Express, middleware, mount routes
├── package.json               # Daftar dependency & script
├── .gitignore                 # File/folder yang diabaikan Git
├── README.md                  # Dokumentasi ini
│
├── data/
│   └── projects.json          # Data proyek (edit di sini untuk menambah proyek)
│
├── models/                    # (M)VC — Model: data & akses data
│   ├── profileModel.js        # Data profil pribadi (nama, bio, skills, sosmed)
│   └── projectModel.js        # Membaca data proyek dari data/projects.json
│
├── controllers/               # M(V)C — Controller: logika tiap halaman
│   ├── homeController.js      # GET  /
│   ├── aboutController.js     # GET  /about
│   ├── projectsController.js  # GET  /projects
│   └── contactController.js   # GET  /contact  &  POST /contact
│
├── routes/                    # M(V)C — Routes: pemetaan URL ke Controller
│   ├── homeRoutes.js
│   ├── aboutRoutes.js
│   ├── projectsRoutes.js
│   └── contactRoutes.js
│
├── views/                     # MV(C) — View: template EJS
│   ├── layout.ejs             # Kerangka utama (head, header, body, footer)
│   ├── index.ejs              # Halaman Beranda
│   ├── about.ejs              # Halaman Tentang Saya
│   ├── projects.ejs           # Halaman Portofolio
│   ├── contact.ejs            # Halaman Kontak
│   ├── 404.ejs                # Halaman tidak ditemukan
│   ├── 500.ejs                # Halaman error server
│   └── partials/              # Potongan template yang dipakai ulang
│       ├── header.ejs         # Navbar + progress bar
│       ├── footer.ejs         # Footer
│       └── projectCard.ejs    # Kartu proyek (dipakai di Beranda & Proyek)
│
└── public/                    # Aset statis
    ├── css/
    │   └── style.css          # CSS kustom (efek reveal, gradient, animasi)
    ├── js/
    │   ├── theme.js           # Mode terang/gelap (dimuat di <head> anti-FOUC)
    │   ├── main.js            # Menu mobile, scroll, typing effect, dsb.
    │   └── contact.js         # Validasi form kontak (khusus halaman /contact)
    └── img/
        ├── ganteng.jpeg       # Foto profil pribadi
        └── projects/          # Thumbnail proyek (SVG placeholder)
```

---

## ▶️ Cara Menjalankan

```bash
npm install        # sekali saja, untuk mengunduh dependencies
npm run dev        # mode development (auto-restart saat kode berubah)
npm start          # mode production
```

Buka browser lalu akses: **http://localhost:3000**

---

## 🧠 Penjelasan Arsitektur MVC

Arsitektur MVC memisahkan tiga tanggung jawab utama:

```
  Browser                    Server (Node.js/Express)
  ───────                    ─────────────────────────
   GET /about  ───────────►  Routes (routes/aboutRoutes.js)
                                 │  router.get('/', aboutController.getAboutPage)
                                 ▼
                            Controller (controllers/aboutController.js)
                                 │  mengambil data → meneruskan ke view
                                 ▼
                            Model (models/profileModel.js)
                                 │  membaca data profil
                                 ▼
                            View (views/about.ejs)
                                 │  merender HTML (EJS + Tailwind)
                                 ▼
   HTML lengkap  ◄──────────  dikirim ke browser
```

**Kenapa dipisah?** Tiap bagian punya satu tugas. Jika ingin mengganti data, ubah di **Model** (tidak menyentuh tampilan). Jika ingin mengubah tampilan, edit **View** (tidak menyentuh logika). Jika ingin menambah halaman, cukup buat 1 file di `routes/`, 1 fungsi di `controllers/`, dan 1 template di `views/`.

---

## 🔁 Alur Form Kontak

```
1. User mengisi form di /contact lalu klik "Kirim Pesan"
2. JavaScript (public/js/contact.js) memvalidasi cepat di browser
3. Form dikirim via POST /contact
4. Controller (contactController.js) memvalidasi LAGI di server (ini yang utama!)
5. Valid   → redirect /contact?status=success   → alert hijau
   Invalid → redirect /contact?status=error&message=... → alert merah
6. Halaman Kontak membaca query string & menampilkan notifikasi
```

Pola **"redirect setelah POST" (PRG)** dipakai agar data tidak terkirim ulang ketika halaman di-refresh.

---

## 🎨 Kustomisasi

| Ingin mengubah | Edit file |
|---|---|
| Nama, bio, skills, sosmed | `models/profileModel.js` |
| Daftar proyek | `data/projects.json` |
| Menu navigasi | `views/partials/header.ejs` |
| Warna utama (indigo/violet) | Cari class `indigo` & `violet` di `views/` |
| Teks hero / CTA | `views/index.ejs` |
| Foto profil | Ganti `public/img/ganteng.jpeg` dengan foto Anda (jpg/png) |
| Thumbnail proyek | Ganti file di `public/img/projects/` |

---

## 📧 Upgrade ke Nodemailer (kirim email sungguhan)

Form saat ini **mensimulasikan** pengiriman (pesan tampil di console server). Untuk mengirim email sungguhan:

```bash
npm install nodemailer
```

1. Buat file `.env` di root proyek:
   ```
   EMAIL_USER=emailanda@gmail.com
   EMAIL_PASS=password-aplikasi-gmail-anda
   ```
   > Untuk Gmail, gunakan **App Password** (bukan password biasa). Aktifkan 2-Step Verification di akun Google, lalu buat App Password di halaman keamanan.

2. Di `controllers/contactController.js`, hapus komentar pada blok Nodemailer (sudah disediakan lengkap di dalam file).

---

## 🛠 Troubleshooting

| Masalah | Solusi |
|---|---|
| `EADDRINUSE: port 3000 already in use` | Port 3000 sedang dipakai. Ubah `const PORT = process.env.PORT || 3000;` di `server.js`, atau matikan proses lain. |
| Halaman tampil tanpa styling | Pastikan internet aktif (Tailwind & Google Fonts dimuat dari CDN). |
| Data proyek tidak muncul | Periksa validitas JSON di `data/projects.json` (mis. lewat [jsonlint](https://jsonlint.com)). |
| Console error `favicon.ico` | Ini normal — favicon dibuat via data URI di `layout.ejs`. |

---

Dibuat dengan ❤ menggunakan **Node.js**, **Express.js**, **EJS**, dan **Tailwind CSS**.
