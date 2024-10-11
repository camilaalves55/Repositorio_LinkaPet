// const { Router } = require('express');
// const router = Router();

// const { storePet, getPets, getPetById } = require('../controller/petController');

// router.post('/pets_cadastrados', storePet);
// router.get('/store/get/pets', getPets);
// router.get('/api/store/get/pet/:id', getPetById);

// module.exports = router;









const { Router } = require('express');
const upload = require('../config/multer'); // Importa a configuração do multer
const router = Router();

const { storePet, getPets, getPetById } = require('../controller/petController');

// Rota para cadastrar um novo pet (incluindo upload de imagem)
router.post('/pets_cadastrados', upload.single('imagem'), storePet); // Adicione o multer aqui se for necessário
router.get('/store/get/pets', getPets);
router.get('/api/store/get/pet/:id', getPetById);

module.exports = router;
