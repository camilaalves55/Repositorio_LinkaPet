// const { Router } = require('express');
// const upload = require('../config/multer');
// const router = Router();

// const { storePerfil, getPerfil, getClienteNome, getEmpresaById, getEmpresa, updateFotoPerfil } = require('../controller/perfilController');

// const { updateProfile } = require('../controller/perfilController');

// // Rota para atualizar informações do perfil
// router.post('/update/perfil', updateProfile);


// router.post('/store/perfil', storePerfil);
// router.get('/store/get/perfil', getPerfil);
// router.get('/get/empresas/detalhes/:id', getEmpresaById);
// router.post('/store/get/nome', getClienteNome);
// router.get('/get/empresa/perfil', getEmpresa);
// //router.post('/update/perfil', updatePerfil);

// router.post('/store/update/foto', upload.single('foto_perfil'), updateFotoPerfil);

// module.exports = router;







const { Router } = require('express');
const upload = require('../config/multer'); // Importa a configuração do multer
const router = Router();

const { storePerfil, getPerfil, getClienteNome, getEmpresaById, getEmpresa, updateFotoPerfil, updateProfile } = require('../controller/perfilController');

// Rota para atualizar informações do perfil
router.post('/update/perfil', updateProfile);


// Rota para armazenar o perfil
// router.post('/store/perfil', storePerfil);
router.post('/store/perfil', upload.single('logo'), storePerfil);

// Rota para obter o perfil
router.get('/store/get/perfil', getPerfil);

// Rota para obter detalhes da empresa por ID
router.get('/get/empresas/detalhes/:id', getEmpresaById);

// Rota para obter o nome do cliente
router.post('/store/get/nome', getClienteNome);

// Rota para obter informações da empresa
router.get('/get/empresa/perfil', getEmpresa);

// Rota para atualizar a foto do perfil
router.post('/store/update/foto', upload.single('foto_perfil'), updateFotoPerfil);

module.exports = router;
