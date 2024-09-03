const connection = require('../config/db');

async function cadastrarPost(request, response) {

    let params = Array(
        request.body.title,
        request.body.description,
        request.file.filename,
        id_usuario = 1
    )

    console.log(params);

    const query = "INSERT INTO posts(title, description, imagem, id_usuario) VALUES(?,?,?,?);";

    connection.query(query, params, (err, results) =>{
        console.log(err, results)
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })

}

module.exports = {
    cadastrarPost
}