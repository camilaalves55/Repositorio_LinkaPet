const { Router } = require('express');

const router = Router();

const {  getAgendamentos, agendamentosEmpresa, updateStatus } = require('../controller/consultasController');

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

// funcao para buscar e exibir as consultas agendadas com a empresa

/**
 * @swagger
 *  /agendamento/empresa:
 *  post:
 *    summary: Buscar e exibir as consultas agendadas com a empresa
 *    responses:
 *      200:
 *        description: Buscar as Consultas com a Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/agendamento/empresa',agendamentosEmpresa);

// Função para a empresa atualizar o status da consulta

/**
 * @swagger
 * /agendamento/atualizar:
 *  post:
 *    summary: Atualizar o status da consulta
 *    responses:
 *      200:
 *        description: Função para a Empresa Atualizar o Status da Consulta
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/agendamento/atualizar', updateStatus);

module.exports = router;