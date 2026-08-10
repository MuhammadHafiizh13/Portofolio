/**
 * routes/contactRoutes.js
 * Memetakan URL /contact ke fungsi Controller.
 * Terdiri dari GET (tampilkan form) dan POST (proses form).
 */

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /contact  -> tampilkan halaman form
router.get('/', contactController.getContactPage);

// POST /contact -> proses data yang dikirim form
router.post('/', contactController.handleContactForm);

module.exports = router;
