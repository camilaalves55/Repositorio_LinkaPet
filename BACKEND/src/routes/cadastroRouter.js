const { Router } = require('express');

const router = Router();

const {  storeCliente, storeEmpresa } = require('../controller/cadastroController');

// funcao para cadastrar uma conta de cliente

/**
 * @swagger
 * /store/cadastro_cliente:
 *  post:
 *    summary: Cadastrar uma conta de cliente
 *    responses:
 *      200:
 *        description: Cadastrar um Cliente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/cadastro_cliente', storeCliente);

// funcao para cadastrar uma conta de empresa

/**
 * @swagger
 * /store/cadastro_empresa:
 *  post:
 *    summary: Cadastrar uma conta de empresa
 *    responses:
 *      200:
 *        description: Cadastrar uma Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/cadastro_empresa', storeEmpresa);

module.exports = router;