/**
 * ============================================================
 *  public/js/contact.js — Validasi form kontak (sisi klien)
 * ------------------------------------------------------------
 *  Hanya dimuat pada halaman /contact (lihat layout.ejs).
 *
 *  Catatan: validasi di sisi klien ini hanya untuk kenyamanan
 *  pengguna (umpan balik cepat). Validasi PERTAMA kali yang
 *  benar-benar aman adalah validasi di sisi server, yang sudah
 *  ada di controllers/contactController.js.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const showError = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', !show);
  };

  const markInvalid = (input, invalid) => {
    input.classList.toggle('border-[#ef4444]', invalid);
    input.classList.toggle('border-slate-300', !invalid);
    input.classList.toggle('dark:border-zinc-800', !invalid);
  };

  // Hapus tanda error setiap kali pengguna mengetik
  ['name', 'email', 'message'].forEach((field) => {
    const input = form.elements[field];
    if (input) {
      input.addEventListener('input', () => {
        showError(field + '-error', false);
        markInvalid(input, false);
      });
    }
  });

  form.addEventListener('submit', (event) => {
    let valid = true;

    // 1. Validasi nama (min. 3 karakter)
    const name = form.elements['name'].value.trim();
    if (name.length < 3) {
      showError('name-error', true);
      markInvalid(form.elements['name'], true);
      valid = false;
    }

    // 2. Validasi email (format sederhana)
    const email = form.elements['email'].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('email-error', true);
      markInvalid(form.elements['email'], true);
      valid = false;
    }

    // 3. Validasi pesan (min. 10 karakter)
    const message = form.elements['message'].value.trim();
    if (message.length < 10) {
      showError('message-error', true);
      markInvalid(form.elements['message'], true);
      valid = false;
    }

    // 4. Honeypot anti-bot (jangan pernah terisi oleh manusia)
    const website = form.elements['website'].value.trim();
    if (website.length > 0) {
      valid = false; // bot terdeteksi — diam-diam hentikan
    }

    // Jika ada yang tidak valid, batalkan pengiriman form
    if (!valid) {
      event.preventDefault();
      return;
    }

    // Form valid: tampilkan status "Mengirim..." lalu biarkan
    // form dikirim normal (POST /contact) oleh browser.
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
  });
});
