const { Router } = require('express');

const router = Router();

const {   getEmpresaById, getPerfil } = require('../controller/contasEmpresasController');

// funcao para buscar as informações de conta da empresa selecionada

/**
 * @swagger
 * /get/empresas/detalhes/:id:
 *  get:
 *    summary: Buscar e exibir as informações de conta da empresa selecionada
 *    responses:
 *      200:
 *        description: Buscar as Contas das Empresas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/get/empresas/detalhes/:id', getEmpresaById);

// funcao para buscar todas as empresas registradas

/**
 * @swagger
 * /store/get/perfil:
 *  get:
 *    summary: Buscar todas as empresas registradas
 *    responses:
 *      200:
 *        description: Buscar Empresas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/store/get/perfil', getPerfil);

module.exports = router;