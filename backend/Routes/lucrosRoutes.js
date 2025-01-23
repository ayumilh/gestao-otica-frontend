const express = require('express');
const router = express.Router();
const { createLucro } = require('../controllers/lucrosController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, createLucro);

module.exports = router;