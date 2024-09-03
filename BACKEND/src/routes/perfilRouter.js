const { Router } = require('express');
const router = Router();

const { storePerfil, getPerfil, getClienteNome, getEmpresaById, getEmpresa } = require('../controller/perfilController');

router.post('/store/perfil', storePerfil);
router.get('/store/get/perfil', getPerfil);
router.get('/get/empresas/detalhes/:id', getEmpresaById);
router.post('/store/get/nome', getClienteNome);
router.get('/get/empresa/perfil', getEmpresa);

module.exports = router;