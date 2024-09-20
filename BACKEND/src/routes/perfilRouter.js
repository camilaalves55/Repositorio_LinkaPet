const { Router } = require('express');
const upload = require('../config/multer');
const router = Router();

const { storePerfil, getPerfil, getClienteNome, getEmpresaById, getEmpresa, updateFotoPerfil } = require('../controller/perfilController');

const { updateProfile } = require('../controller/perfilController');

// Rota para atualizar informações do perfil
router.post('/update/perfil', updateProfile);


router.post('/store/perfil', storePerfil);
router.get('/store/get/perfil', getPerfil);
router.get('/get/empresas/detalhes/:id', getEmpresaById);
router.post('/store/get/nome', getClienteNome);
router.get('/get/empresa/perfil', getEmpresa);
//router.post('/update/perfil', updatePerfil);

router.post('/store/update/foto', upload.single('foto_perfil'), updateFotoPerfil);

module.exports = router;
