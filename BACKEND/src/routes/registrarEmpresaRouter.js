const { Router } = require('express');

const upload = require('../config/multer');

const router = Router();

const {  storePerfil, storeServico } = require('../controller/registrarEmpresaController');

/**
 * @swagger
 * /store/perfil:
 *  post:
 *    summary: Registra a empresa como um estabelecimento de servicos
 *    responses:
 *      200:
 *        description: Registra a Empresa como Um Estabelecimento Funcional
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */


router.post('/store/perfil', upload.single('logo'), storePerfil);

// funcao para cadastrar servicos

/**
 * @swagger
 * /servicos:
 *  post:
 *    summary: Registra os servicos da empresa
 *    responses:
 *      200:
 *        description: Registra os Servicos da Empresa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/servicos', storeServico);

module.exports = router;