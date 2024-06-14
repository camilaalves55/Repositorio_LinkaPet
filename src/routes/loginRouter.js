const { Router } = require('express');
const router = Router();

const { storeLogin } = require('../controller/loginController');

router.post('/store/cadastro_cliente', storeLogin);
router.get('/store/login', storeLogin);

module.exports = router;