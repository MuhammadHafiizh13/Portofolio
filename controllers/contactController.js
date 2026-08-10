/**
 * controllers/contactController.js
 * Menangani halaman Kontak (GET /contact) dan pemrosesan form (POST /contact).
 *
 * Alur form kontak:
 *   1. User mengisi form lalu menekan tombol Kirim (POST).
 *   2. Controller memvalidasi data (nama, email, pesan + honeypot anti-bot).
 *   3. Jika valid  -> redirect ke /contact?status=success  (pesan sukses)
 *      Jika invalid-> redirect ke /contact?status=error&message=...
 *   4. Halaman Kontak membaca query string tersebut & menampilkan alert.
 *
 * Pola "redirect setelah POST" (PRG) dipakai agar data tidak terkirim ulang
 * ketika user merefresh halaman.
 */

/** GET /contact — menampilkan form kontak (dengan alert bila ada) */
exports.getContactPage = (req, res) => {
  let alert = null;

  if (req.query.status === 'success') {
    alert = {
      type: 'success',
      message: 'Pesan Anda berhasil terkirim! Terima kasih, saya akan segera menghubungi Anda.'
    };
  } else if (req.query.status === 'error') {
    alert = {
      type: 'error',
      message: req.query.message || 'Gagal mengirim pesan. Silakan coba lagi.'
    };
  }

  res.render('contact', { title: 'Kontak', alert });
};

/** POST /contact — memproses pesan dari form kontak */
exports.handleContactForm = (req, res) => {
  // Data dari form tersedia di req.body (berkat express.urlencoded())
  const { name, email, subject, message, website } = req.body;

  /* ---------- Validasi sederhana di sisi server ---------- */
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('Nama minimal 3 karakter.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Format email tidak valid.');
  }
  if (!message || message.trim().length < 10) {
    errors.push('Pesan minimal 10 karakter.');
  }

  // Honeypot: field tersembunyi "website". Bot biasanya mengisinya,
  // manusia tidak akan pernah melihat/mengisinya.
  if (website && website.trim().length > 0) {
    errors.push('Terjadi kesalahan validasi.');
  }

  // Jika ada error -> redirect kembali dengan pesan error pertama
  if (errors.length > 0) {
    return res.redirect('/contact?status=error&message=' + encodeURIComponent(errors[0]));
  }

  /* ---------- Pesan valid: proses di sini ---------- */

  // (1) SIMULASI: cukup tampilkan di console server sebagai bukti
  //     bahwa form bekerja. Buka terminal yang menjalankan server.
  console.log('📩 Pesan baru dari form kontak:');
  console.log({
    nama: name.trim(),
    email,
    subjek: subject || '-',
    pesan: message.trim()
  });

  // (2) NODEMAILER (opsional, untuk kirim email sungguhan):
  //     Jalankan:  npm install nodemailer
  //     Lalu buat file .env berisi EMAIL_USER dan EMAIL_PASS,
  //     dan aktifkan kode di bawah ini:
  //
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // });
  // await transporter.sendMail({
  //   from: `"Website Portofolio" <${process.env.EMAIL_USER}>`,
  //   to: 'halo@budiprasetyo.dev',
  //   subject: `Pesan baru dari ${name.trim()}${subject ? ' — ' + subject : ''}`,
  //   text: `Nama: ${name}\nEmail: ${email}\n\n${message.trim()}`
  // });

  // Redirect menuju halaman sukses
  return res.redirect('/contact?status=success');
};
