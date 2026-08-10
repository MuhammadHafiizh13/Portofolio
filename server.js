/**
 * ============================================================
 *  server.js — Entry point aplikasi website portofolio
 * ------------------------------------------------------------
 *  Alur MVC pada aplikasi ini:
 *
 *    Request      ->   Routes        ->   Controllers      ->   Models        ->   Views (EJS)
 *    (Browser)        (routes/*.js)      (controllers/*.js)    (models/*.js)      (views/*.ejs)
 *    GET /about   ->   aboutRoutes   ->   getAboutPage()    ->   getProfile()  ->   about.ejs
 *
 *  - Routes      : memetakan URL (path) ke fungsi Controller tertentu.
 *  - Controllers : berisi logika halaman (mengambil data dari Model,
 *                  lalu meneruskannya ke View untuk dirender).
 *  - Models      : tempat data & akses data (di sini: file JSON + objek JS).
 *  - Views       : template EJS yang menampilkan HTML.
 * ============================================================
 */

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

// Model profil dipakai global agar tersedia di SEMUA view (mis. nama di <title>)
const profileModel = require('./models/profileModel');

// Routes — satu file route per "resource" halaman
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

/* ------------------------------------------------------------
 *  1. Konfigurasi View Engine (EJS)
 * ------------------------------------------------------------ */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express-ejs-layouts memungkinkan kita punya SATU kerangka layout
// (views/layout.ejs) yang dipakai bersama oleh semua halaman.
app.use(expressLayouts);
app.set('layout', 'layout');

/* ------------------------------------------------------------
 *  2. Middleware bawaan Express
 * ------------------------------------------------------------ */
// Parsing data dari form (POST /contact) -> tersedia di req.body
app.use(express.urlencoded({ extended: true }));
// Parsing JSON (untuk kebutuhan API jika diperlukan)
app.use(express.json());
// Melayani aset statis: CSS, JavaScript, gambar dari folder /public
app.use(express.static(path.join(__dirname, 'public')));

/* ------------------------------------------------------------
 *  3. Middleware custom — variabel global untuk semua view
 * ------------------------------------------------------------ */
app.use((req, res, next) => {
  res.locals.profile = profileModel.getProfile();          // data profil (nama, sosmed, dll)
  res.locals.currentYear = new Date().getFullYear();       // tahun berjalan untuk footer
  res.locals.activePage = req.path.replace(/\/+$/, '') || '/'; // path aktif utk menu nav
  res.locals.metaDescription =
    'Portofolio pribadi ' + res.locals.profile.name + ' — ' + res.locals.profile.role + '.';
  next();
});

/* ------------------------------------------------------------
 *  4. Daftar Routes
 * ------------------------------------------------------------ */
app.use('/', homeRoutes);           // GET /
app.use('/about', aboutRoutes);     // GET /about
app.use('/projects', projectsRoutes); // GET /projects
app.use('/contact', contactRoutes); // GET /contact dan POST /contact

/* ------------------------------------------------------------
 *  5. Halaman 404 — URL tidak ditemukan
 * ------------------------------------------------------------ */
app.use((req, res) => {
  res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
});

/* ------------------------------------------------------------
 *  6. Error handler — kesalahan server (500)
 * ------------------------------------------------------------ */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Terjadi Kesalahan' });
});

/* ------------------------------------------------------------
 *  7. Jalankan server
 * ------------------------------------------------------------ */
app.listen(PORT, () => {
  console.log('============================================');
  console.log('  🚀 Server portofolio berjalan di:');
  console.log(`     http://localhost:${PORT}`);
  console.log('============================================');
});
// ... kode server.js kamu di atas ...

// TAMBAHKAN BARIS INI DI PALING BAWAH:
module.exports = app;

// Pastikan app.listen tetap ada untuk lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
