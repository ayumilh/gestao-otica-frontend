const express = require('express');
const router = express.Router();

const { cadastrarVenda, listarVendas, filtersData } = require('../controllers/vendasControllers');
const authenticateToken = require('../middleware/authMiddleware');

// routes
router.post('/cadastrar-venda', authenticateToken, cadastrarVenda);
router.get('/get', listarVendas);
router.get('/filter', filtersData);

module.exports = router;