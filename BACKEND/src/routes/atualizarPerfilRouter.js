const { Router } = require('express');

const upload = require('../config/multer');

const router = Router();

const { updateFotoPerfil, updateProfile, updateEmpresa, updateLogoPerfil } = require('../controller/atualizarPerfilController');

// funcao para atualizar a foto de perfil do cliente

/**
 * @swagger
 * /store/update/foto:
 *  post:
 *    summary: Atualiza a foto de perfil do cliente
 *    responses:
 *      200:
 *        description: Atualizacao da Foto de Perfil do Cliente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/update/foto', upload.single('foto_perfil'), updateFotoPerfil);

// funcao para atualizar os dados de perfil do cliente

/**
 * @swagger
 * /update/perfil:
 *  post:
 *    summary: Atualiza as informacoes do perfil do cliente
 *    responses:
 *      200:
 *        description: Atualizacao das Informacoes de Perfil do Cliente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/update/perfil', updateProfile);

// funcao para atualizar os dados de perfil da empresa

/**
 * @swagger
 * /update/perfil/empresa:
 *  post:
 *    summary: Atualiza as informacoes do perfil da empresa
 *    responses:
 *      200:
 *        description: Atualizacao das Informacoes de Perfil da Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/update/perfil/empresa', updateEmpresa);  

// funcao para atualizar a logo do perfil da empresa

/**
 * @swagger
 * /store/update/logo:
 *  post:
 *    summary: Atualiza a logo do perfil da empresa
 *    responses:
 *      200:
 *        description: Atualizacao da Logo do Perfil da Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/store/update/logo', upload.single('logo_perfil'), updateLogoPerfil);

module.exports = router;