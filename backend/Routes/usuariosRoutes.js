const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/usuariosControllers');

router.post('/login', createUser);

module.exports = router;