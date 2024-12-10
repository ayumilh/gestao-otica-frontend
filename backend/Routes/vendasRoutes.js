const express = require('express');
const vendasController = require('../Controllers/vendasControllers');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bem-vindo à rota de vendas!');
});

router.post('/cadastrar', vendasController.cadastrarVenda);
router.get('/get', vendasController.listarVendas);
router.get('/filter', vendasController.filtersData);

module.exports = router;