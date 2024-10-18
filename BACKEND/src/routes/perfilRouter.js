const { Router } = require('express');

const upload = require('../config/multer');

const router = Router();

const {  getCliente, getEmpresa, storePet, getPets, getClienteNome } = require('../controller/perfilController');

// funcao para buscar e exibir todas as informações de perfil do cliente logado

/**
 * @swagger
 * /store/get/cliente:
 *  post:
 *    summary: Busca e exibir todas as informações de perfil do cliente logado
 *    responses:
 *      200:
 *        description: Retorna o Perfil do Cliente 
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/get/cliente', getCliente);

// funcao para buscar e exibir os dados da empresa logada na tela de inicio e no perfil

/**
 * @swagger
 * /store/get/empresa:
 *  post:
 *    summary: Busca e exibir todas as informações de perfil da empresa logada
 *    responses:
 *      200:
 *        description: Retorna o Perfil da Empresa 
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/get/empresa', getEmpresa);

// funcao para cadastrar os pets do cliente

/**
 * @swagger
 * /pets_cadastrados:
 *  post:
 *    summary: Cadastra os pets do cliente
 *    responses:
 *      200:
 *        description: Registra os Pets do Cliente 
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/pets_cadastrados', upload.single('imagem'), storePet);

// funcao para buscar os pets cadastrados pelo cliente

/**
 * @swagger
 * /pets_cadastrados:
 *  get:
 *    summary: Busca os pets cadastrados pelo cliente
 *    responses:
 *      200:
 *        description: Retorna os Pets do Cliente 
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.get('/store/get/pets', getPets);

// funcao buscar alguns dados do cliente logado e exibir na tela de inicio

/**
 * @swagger
 * /store/get/nome:
 *  post:
 *    summary: Busca alguns dados do cliente logado e exibe na tela de inicio
 *    responses:
 *      200:
 *        description: Retorna Dados do Cliente na Tela Inicial
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/get/nome', getClienteNome);

module.exports = router;