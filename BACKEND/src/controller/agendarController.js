const connection = require('../config/db'); 

// funcao para buscar todos os servicos cadastrados pela empresa

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
    
        console.log("Resultado da consulta:", results); 
        response.status(200).json({
            success: true,
            message: "Serviços encontrados com sucesso.",
            data: results
        });
    });
    
}


// funcao para buscar os detalhes do pet pelo id

async function getPetById(req, res) {
    const petId = req.params.id;

    if (!petId) {
        return res.status(400).json({
            success: false,
            message: 'Parâmetro ID ausente'
        });
    }

    const query = "SELECT * FROM pets_cadastrados WHERE id = ?";

    connection.query(query, [petId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao buscar detalhes do pet.",
                error: err
            });
        }

        if (results.length > 0) {
            res.status(200).json({
                success: true,
                data: results[0]
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Pet não encontrado"
            });
        }
    });
}

// funcao para buscar informacoes do servico pelo id dele

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

// funcao para agendar consultas

async function createAgendamento(request, response) {
    const { 
        cliente_id, 
        nome_cliente, 
        empresa_id, 
        nome_empresa, 
        pet_id, 
        nome_pet, 
        raca,          // Adicionado
        sexo,          // Adicionado
        descricao,     // Adicionado
        servico_id, 
        nome_servico, 
        data_agendada, 
        horario 
    } = request.body;

    if (!cliente_id || !nome_cliente || !empresa_id || !nome_empresa || !pet_id || !nome_pet || !raca || !sexo || !descricao || !servico_id || !nome_servico || !data_agendada || !horario) {
        return response.status(400).json({
            success: false,
            message: 'Todos os campos são obrigatórios.'
        });
    }

    const query = `INSERT INTO agendamentos (cliente_id, nome_cliente, empresa_id, nome_empresa, pet_id, nome_pet, raca, sexo, descricao, servico_id, nome_servico, data_agendada, horario) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(query, [cliente_id, nome_cliente, empresa_id, nome_empresa, pet_id, nome_pet, raca, sexo, descricao, servico_id, nome_servico, data_agendada, horario], (err, results) => {
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
    getServicos,
    getPetById,
    getServicoById,
    createAgendamento 
}