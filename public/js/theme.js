/**
 * ============================================================
 *  public/js/theme.js — Mode terang/gelap
 * ------------------------------------------------------------
 *  Script ini dipanggil di bagian <head> layout.ejs sehingga
 *  class "dark" diterapkan SEBELUM halaman selesai dirender.
 *  Hal ini mencegah "kedipan" (flash) warna putih saat halaman
 *  dibuka oleh pengguna mode gelap.
 *
 *  Urutan prioritas tema:
 *    1. Tema tersimpan di localStorage (pilihan pengguna)
 *    2. Preferensi sistem (prefers-color-scheme)
 *    3. Default: terang
 * ============================================================
 */

(function () {
  // 1. Ambil tema tersimpan, jika ada
  const storedTheme = localStorage.getItem('theme');

  // 2. Deteksi preferensi sistem
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 3. Tentukan tema akhir
  const theme = storedTheme || (prefersDark ? 'dark' : 'light');

  // 4. Terapkan class "dark" pada elemen <html>
  document.documentElement.classList.toggle('dark', theme === 'dark');

  // 5. Simpan agar konsisten (kalau belum pernah tersimpan)
  localStorage.setItem('theme', theme);
})();
