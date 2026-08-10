/**
 * controllers/aboutController.js
 * Menangani halaman Tentang Saya (GET /about).
 */

const profileModel = require('../models/profileModel');

/** GET /about — menampilkan biodata, latar belakang, dan keahlian */
exports.getAboutPage = (req, res) => {
  res.render('about', {
    title: 'Tentang Saya',
    profile: profileModel.getProfile()
  });
};
