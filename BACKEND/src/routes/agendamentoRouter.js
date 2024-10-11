const { Router } = require('express');

const router = Router();

const { getAgendamentos } = require('../controller/agendamentoController');


router.post('/agendamentos',getAgendamentos);

module.exports = router;