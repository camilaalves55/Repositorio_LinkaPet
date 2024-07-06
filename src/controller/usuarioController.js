const connection = require('../config/db');

async function storeUsuario(request, response) {
    const params = Array(
        request.body.email,
        request.body.senha,
        request.body.tipo_cliente,
    );

    const query = " SELECT cc.id, cc.email, cc.senha, tipo_cliente, ce.id, ce.email, ce.senha, tipo_cliente FROM cadastro_cliente AS cc INNER JOIN cadastro_empresa AS ce;  VALUES('','','','','','','','')" ;

    connection.query(query, params, (err, results) =>{
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
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
    storeUsuario
}



