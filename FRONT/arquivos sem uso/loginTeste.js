const connection = require('../config/db');
 
async function login(request, response) {
    const email = Array(request.body.email);
 
    const query = "SELECT email, senha FROM cadastro_cliente WHERE email = ?";
 
    connection.query(query, email, (err, results) => {
        if(results.length > 0) {
            const senha = request.body.senha;
            const senhaQuery = results[0].senha;
 
            if (senha === senhaQuery) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results
                    })
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Senha incorreta"
                    })
            }
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso!",
                    data: err
                })
        }
    })
}
 
module.exports = {
    login
};