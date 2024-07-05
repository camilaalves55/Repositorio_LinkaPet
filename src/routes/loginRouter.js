const { Router } = require('express');
const router = Router();

const { storeLogin } = require('../controller/loginController');

const { storeEmpresa } = require('../controller/cadastroController');

router.post('/store/cadastro_cliente', storeLogin);
router.post('/store/cadastro_empresa', storeEmpresa);
router.get('/store/login', storeLogin);

module.exports = router;