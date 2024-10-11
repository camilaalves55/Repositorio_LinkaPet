const connection = require('../config/db');


async function getAgendamentos(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT * FROM agendamentos WHERE id = ?";
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
                message: "Agendamentos não encontrados."
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
    getAgendamentos
};