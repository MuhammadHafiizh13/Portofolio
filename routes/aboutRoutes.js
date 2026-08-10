/**
 * routes/aboutRoutes.js
 * Memetakan URL /about ke fungsi Controller.
 */

const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// GET /about -> jalankan getAboutPage
router.get('/', aboutController.getAboutPage);

module.exports = router;
