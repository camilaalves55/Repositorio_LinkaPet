const { Router } = require('express');

const router = Router();

const { storeCliente, getCliente } = require('../controller/cadastro-fisicoController');
const { storeEmpresa } = require('../controller/cadastro-juridicoController');
const { login } = require('../controller/loginController');

router.post('/store/cadastro_cliente', storeCliente);
router.post('/store/cadastro_empresa', storeEmpresa);
router.post('/store/get/cliente', getCliente);
router.post('/login', login);

module.exports = router;