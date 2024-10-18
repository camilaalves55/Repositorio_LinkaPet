const { Router } = require('express');

const router = Router();

const { getServicos, getPetById, getServicoById, createAgendamento } = require('../controller/agendarController');

// funcao para buscar todos os servicos cadastrados pela empresa

/**
 * @swagger
 * /get/servicos:
 *  get:
 *    summary: Busca todos os servicos cadastrados pela empresa
 *    responses:
 *      200:
 *        description: Lista de Servicos da Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/get/servicos', getServicos);

// funcao para buscar os detalhes do pet pelo id

/**
 * @swagger
 * /api/store/get/pet/:id:
 *  get:
 *    summary:  Busca os detalhes do pet selecionado pelo id
 *    responses:
 *      200:
 *        description: Detalhes do Pet
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/api/store/get/pet/:id', getPetById);

// funcao para buscar informacoes do servico pelo id dele

/**
 * @swagger
 * /get/servicos/:servico_id:
 *  get:
 *    summary: Busca informacoes do servico pelo id dele
 *    responses:
 *      200:
 *        description: Detalhes do Servico
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/get/servicos/:servico_id', getServicoById);  

// funcao para agendar consultas

/**
 * @swagger
 * /agendamento:
 *  post:
 *    summary: Realizar agendamentos
 *    responses:
 *      200:
 *        description: Agendar Consultas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/agendamento', createAgendamento);

module.exports = router;