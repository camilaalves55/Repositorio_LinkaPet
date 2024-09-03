const { Router } = require('express');
const router = Router();

const { storeServico, getServicos, getServicoById, createAgendamento } = require('../controller/servicoController');

router.post('/servicos', storeServico);
router.get('/get/servicos', getServicos);
router.get('/get/servicos/:servico_id', getServicoById);  
router.post('/agendamento', createAgendamento);

module.exports = router;
