/**
 * controllers/homeController.js
 * Menangani halaman Beranda (GET /).
 * Tugasnya: mengambil data dari Model, lalu meneruskannya ke View.
 */

const profileModel = require('../models/profileModel');
const projectModel = require('../models/projectModel');

/** GET / — menampilkan halaman beranda */
exports.getHomePage = (req, res) => {
  res.render('index', {
    title: 'Beranda',
    profile: profileModel.getProfile(),
    featuredProjects: projectModel.getFeaturedProjects(3) // 3 proyek unggulan
  });
};
