const express = require('express');
const clientesController = require('../Controllers/clientesControllers');
const router = express.Router();

router.post('/cadastrar', clientesController.cadastrarCliente);
router.get('/get', clientesController.listarClientes);
router.get('/filter', clientesController.filtersData);

module.exports = router;