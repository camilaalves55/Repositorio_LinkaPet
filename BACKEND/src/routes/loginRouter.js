const { Router } = require('express');

const router = Router();

const { login } = require('../controller/loginController');

// funcao para verficar o usuario e logar a empresa ou o cliente

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Verfica o usuario e loga como empresa ou cliente
 *    responses:
 *      200:
 *        description: Logar Usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */

router.post('/login', login);

module.exports = router;