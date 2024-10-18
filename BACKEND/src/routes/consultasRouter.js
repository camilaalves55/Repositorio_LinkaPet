const { Router } = require('express');

const router = Router();

const {  getAgendamentos } = require('../controller/consultasController');

// funcao para buscar e exibir as consultas agendadas pelo cliente logado

/**
 * @swagger
 * /agendamentos:
 *  post:
 *    summary: Buscar e exibir as consultas agendadas pelo cliente logado
 *    responses:
 *      200:
 *        description: Buscar as Consultas do Cliente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */


router.post('/agendamentos', getAgendamentos);

module.exports = router;