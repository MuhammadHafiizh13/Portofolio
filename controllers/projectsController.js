/**
 * controllers/projectsController.js
 * Menangani halaman Portofolio/Proyek (GET /projects).
 */

const projectModel = require('../models/projectModel');

/** GET /projects — menampilkan daftar seluruh proyek */
exports.getProjectsPage = (req, res) => {
  res.render('projects', {
    title: 'Portofolio',
    projects: projectModel.getProjects() // semua proyek dari data/projects.json
  });
};
