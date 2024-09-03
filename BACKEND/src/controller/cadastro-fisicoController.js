const connection = require('../config/db');

async function storeCliente(request, response) {

    const params = [
        request.body.nome,
        request.body.telefone,
        request.body.nome_usuario,
        request.body.cpf,
        request.body.endereco,
        request.body.tipo_cliente,
        request.body.email,
        request.body.senha,
        request.body.foto_perfil || 'default.png' 
    ];

    const query = "INSERT INTO cadastro_cliente(nome, telefone, nome_usuario, cpf, endereco, tipo_cliente, email, senha, foto_perfil) VALUES(?,?,?,?,?,?,?,?,'default.png')";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Ops! Não deu...",
                query: err.sql,
                sqlMessage: err.sqlMessage
            });
        }

        response.status(201).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    });
}

async function getCliente(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT * FROM cadastro_cliente WHERE id = ?";
    connection.query(query, [clienteId], (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Ops! Não deu...",
                query: err.sql,
                sqlMessage: err.sqlMessage
            });
        }

        if (results.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Cliente não encontrado."
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results[0]
        });
    });
}

module.exports = {
    storeCliente,
    getCliente,
};