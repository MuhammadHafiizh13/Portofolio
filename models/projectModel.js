/**
 * ============================================================
 *  models/projectModel.js
 * ------------------------------------------------------------
 *  "M" dalam MVC — bertugas membaca data proyek dari file JSON.
 *
 *  Keuntungan menyimpan data di file JSON (data/projects.json):
 *  1. Data terpisah dari kode program (mudah dirawat).
 *  2. Anda cukup mengedit file JSON — tanpa menyentuh kode.
 *  3. Pola ini mirip seperti memakai database, hanya saja
 *     sumbernya file lokal.
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// Lokasi file JSON tempat data proyek disimpan
const PROJECTS_FILE = path.join(__dirname, '..', 'data', 'projects.json');

/** Membaca & mengembalikan seluruh data proyek dari file JSON */
function getProjects() {
  try {
    const rawData = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    console.error('❌ Gagal membaca data/projects.json:', err.message);
    return []; // kembalikan array kosong agar aplikasi tidak crash
  }
}

/** Mengambil proyek "Unggulan" (featured) untuk ditampilkan di Beranda */
function getFeaturedProjects(limit = 3) {
  return getProjects().filter((project) => project.featured).slice(0, limit);
}

module.exports = { getProjects, getFeaturedProjects };
