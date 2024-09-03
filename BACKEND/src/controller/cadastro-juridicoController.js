const connection = require('../config/db');

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
    storeEmpresa
}