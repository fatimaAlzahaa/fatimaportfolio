// routes/contact.routes.js
const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/contact.controller');

router.post('/contact', contactController.submitContactForm);

module.exports = router;
