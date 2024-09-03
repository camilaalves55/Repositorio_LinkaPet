const connection = require('../config/db');

async function login(request, response) {
    const email = request.body.email;
    const senha = request.body.senha;
    const tipoUsuario = request.body.tipoUsuario;
    let query = null;

    if (tipoUsuario === "cliente") {
        query = "SELECT id, email, senha, tipo_cliente FROM cadastro_cliente WHERE email = ?";
    } else {
        query = "SELECT id, email, senha, tipo_cliente FROM cadastro_empresa WHERE email = ?";
    }

    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return response.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }

        if (results.length > 0) {
            const user = results[0];
            if (senha === user.senha) {
                response.status(200).json({
                    success: true,
                    message: 'Login bem-sucedido',
                    data: {
                        id: user.id, 
                        tipo_cliente: user.tipo_cliente,
                        email: user.email
                    }
                });
            } else {
                response.status(400).json({
                    success: false,
                    message: 'Senha incorreta'
                });
            }
        } else {
            response.status(400).json({
                success: false,
                message: 'Email não encontrado'
            });
        }
    }); 
}

module.exports = {
    login
};