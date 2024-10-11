// const connection = require('../config/db');

// async function storeServico(request, response) {

//         const empresaId = request.body.empresa_id;
//         const servicoId = request.body.servico_id;

//         const params = [
//             servicoId,
//             request.body.servico,
//             request.body.preco,
//             request.body.horarios_disponiveis,
//             empresaId
//         ];

//         const query = "INSERT INTO empresas_servicos (servico_id, servico, preco, horarios_disponiveis, empresa_id) VALUES (?, ?, ?, ?, ?)";

//         connection.query(query, params, (err, results) => {
//             if (err) {
//                 return response.status(400).json({
//                     success: false,
//                     message: "Ops! Não deu...",
//                     query: err.sql,
//                     sqlMessage: err.sqlMessage
//                 });
//             }

//             response.status(201).json({
//                 success: true,
//                 message: "Sucesso!",
//                 data: results
//             });
//         });
// };


const connection = require('../config/db'); 

async function storeServico(request, response) {
    const empresaId = request.body.empresa_id;
    const servicoId = request.body.servico_id;

    // Validação dos dados recebidos
    if (!request.body.servico || !request.body.preco || !request.body.horarios_disponiveis || !servicoId  || !empresaId ) {
        return response.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios."
        });
    }

    const params = [
        request.body.servico,
        request.body.preco,
        request.body.horarios_disponiveis,
        servicoId,
        empresaId
    ];

    const query = "INSERT INTO empresas_servicos ( servico, preco, horarios_disponiveis, servico_id, empresa_id) VALUES (?, ?, ?, ?, ?)";

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
};




async function getServicos(request, response) {
    const empresaId = request.query.empresa_id;

    if (!empresaId) {
        return response.status(400).json({
            success: false,
            message: 'Parâmetro empresa_id ausente'
        });
    }

    const query = "SELECT * FROM empresas_servicos WHERE empresa_id = ? ORDER BY id DESC";

    connection.query(query, [empresaId], (err, results) => {
        if (err) {
            console.log("Erro ao executar a query:", err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar os serviços.",
                error: err
            });
        }
    
        console.log("Resultado da consulta:", results); // Adicionar log aqui
        response.status(200).json({
            success: true,
            message: "Serviços encontrados com sucesso.",
            data: results
        });
    });
    
}


async function getServicoById(request, response) {
    const servicoId = request.params.servico_id;

    if (!servicoId) {
        return response.status(400).json({
            success: false,
            message: 'Parâmetro servico_id ausente'
        });
    }

    const query = "SELECT * FROM empresas_servicos WHERE servico_id = ?";

    connection.query(query, [servicoId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar o serviço.",
                error: err
            });
        }

        if (results.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Serviço não encontrado."
            });
        }

        response.status(200).json({
            success: true,
            message: "Serviço encontrado com sucesso.",
            data: results[0]
        });
    });
}



async function createAgendamento(request, response) {
    const { cliente_id, empresa_id, pet_id, servico_id, data_agendada, horario } = request.body;

if (!cliente_id || !empresa_id || !pet_id || !servico_id || !data_agendada || !horario) {
    return response.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios.'
    });
}

const query = "INSERT INTO agendamentos (cliente_id, empresa_id, pet_id, servico_id, data_agendada, horario) VALUES (?, ?, ?, ?, ?, ?)";
connection.query(query, [cliente_id, empresa_id, pet_id, servico_id, data_agendada, horario], (err, results) => {
    if (err) {
        console.error('Erro ao criar o agendamento:', err);
        return response.status(500).json({
            success: false,
            message: "Erro ao criar o agendamento.",
            error: err
        });
    }

    response.status(201).json({
        success: true,
        message: "Agendamento criado com sucesso.",
        data: results.insertId
    });
});

}

module.exports = {
    storeServico,
    getServicos,
    getServicoById,
    createAgendamento
}