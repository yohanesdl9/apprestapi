var express = require('express');
var auth = require('./auth');
var router = express.Router();

// Mendaftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);

// Mendaftarkan menu login
router.post('/api/v1/login', auth.login);

module.exports = router;