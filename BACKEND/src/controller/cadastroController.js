const connection = require('../config/db');

// funcao para cadastrar uma conta de cliente

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


// funcao para cadastrar uma conta de empresa 

async function storeEmpresa(request, response) {

    const params = Array(
        request.body.nome_empresa,
        request.body.nome_usuario,
        request.body.cnpj,
        request.body.tipo_cliente,
        request.body.email,
        request.body.senha
    );
        console.log(params);
    const query = "INSERT INTO cadastro_empresa( nome_empresa, nome_usuario, cnpj, tipo_cliente, email, senha) VALUES(?,?,?,?,?,?)";

    connection.query(query, params, (err, results) =>{
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results,
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops! Não deu...",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                })
        }
    })

}


module.exports = {
    storeCliente,
    storeEmpresa
}