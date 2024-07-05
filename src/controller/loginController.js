const connection = require('../config/db');

async function storeLogin(request, response) {
    const params = Array(
        request.body.nome,
        request.body.telefone,
        // request.body.data_nascimento,
        request.body.nome_usuario,
        request.body.endereco,
        request.body.email,
        request.body.senha,
        request.body.tipo_cliente,
    );

    const query = "INSERT INTO cadastro_cliente(nome, telefone, nome_usuario, endereco, email, senha, tipo_cliente) VALUE(?,?,?,?,?,?,?)";

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
    storeLogin
}




// async function storeEmpresa(request, response) {

//     const parametro = Array(
//         request.body.nome,
//         request.body.telefone,
//         // request.body.data_nascimento,
//         request.body.nome_empresa,
//         request.body.endereco,
//         request.body.email,
//         request.body.senha,
//         request.body.tipo_cliente,
//     );

//     const consulta = "INSERT INTO cadastro_empresa(nome, telefone, nome_empresa, endereco, email, senha, tipo_cliente) VALUE(?,?,?,?,?,?,?)";

//     connection.consulta(consulta, parametro, (err, results) =>{
//         console.log(err, results)
//         if (results) {
//             response
//                 .status(201)
//                 .json({
//                     success: true,
//                     message: "Sucesso!",
//                     data: results
//                 });
//         } else {
//             response
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "Ops! Não deu...",
//                     query: err.sql,
//                     sqlMessage: err.sqlMessage
//                 })
//         }
//     })

// }

// module.exports = {
//     storeEmpresa
// }