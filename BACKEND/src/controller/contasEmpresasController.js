const connection = require('../config/db');

// funcao para buscar as informações de conta da empresa selecionada

async function getEmpresaById(request, response) {
    const params =
    Array(request.params.id);

    const query = "SELECT * FROM perfil_empresa WHERE id = ?"

    connection.query(query, params, (err, results) => {

        if(results.length > 0) {
            response.status(200).json({
                success:true,
                data: results[0],
                message: "Sucesso!"
       
            })
        }   else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            })
        }

    })
}


// funcao para buscar todas as empresas registradas

async function getPerfil(request, response) {

    const query = "SELECT * FROM perfil_empresa";

    connection.query(query, (err, results) => {
        console.log(err, results)
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            })
        }
    })
}

module.exports = {
    getEmpresaById,
    getPerfil
}