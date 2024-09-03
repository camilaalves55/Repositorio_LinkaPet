const { Router } = require('express');
const router = Router();

const { storePet, getPets, getPetById } = require('../controller/petController');

router.post('/pets_cadastrados', storePet);
router.get('/store/get/pets', getPets);
router.get('/api/store/get/pet/:id', getPetById);

module.exports = router;