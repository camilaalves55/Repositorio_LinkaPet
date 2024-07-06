const { Router } = require('express');
const router = Router();

const { storeLogin } = require('../controller/loginController');

const { storeEmpresa } = require('../controller/cadastroController');

const { storeUsuario } = require('../controller/usuarioController');

router.post('/store/cadastro_cliente', storeLogin);
router.post('/store/cadastro_empresa', storeEmpresa);
router.get('/store/cadastro_cliente', storeUsuario);

module.exports = router;