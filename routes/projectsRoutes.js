/**
 * routes/projectsRoutes.js
 * Memetakan URL /projects ke fungsi Controller.
 */

const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// GET /projects -> jalankan getProjectsPage
router.get('/', projectsController.getProjectsPage);

module.exports = router;
