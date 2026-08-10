/**
 * routes/homeRoutes.js
 * Memetakan URL / ke fungsi Controller.
 */

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET /  -> jalankan getHomePage
router.get('/', homeController.getHomePage);

module.exports = router;
