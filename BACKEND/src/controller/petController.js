const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storePet(request, response) {
    if (!request.files || !request.files.imagem) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        const clienteId = request.body.cliente_id;

        if (!clienteId) {
            return response.status(400).json({
                success: false,
                message: "ID do cliente ausente."
            });
        }

        const params = [
            request.body.nome_pet,
            request.body.raca,
            request.body.idade,
            imagemNome,
            request.body.descricao,
            request.body.especie,
            request.body.data_nascimento,
            clienteId
        ];

        const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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
    });
}
async function getPets(request, response) {
    const clienteId = request.query.cliente_id;

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: 'Parâmetro cliente_id ausente'
        });
    }

    const query = "SELECT * FROM pets_cadastrados WHERE cliente_id = ? ORDER BY id ASC";

    connection.query(query, [clienteId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar os pets.",
                error: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Pets encontrados com sucesso.",
            data: results
        });
    });
}

async function getPetById(request, response) {
    const petId = request.params.id;

    if (!petId) {
        return response.status(400).json({
            success: false,
            message: 'Parâmetro ID ausente'
        });
    }

    const query = "SELECT * FROM pets_cadastrados WHERE id = ?";

    connection.query(query, [petId], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar detalhes do pet.",
                error: err
            });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                data: results[0]
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Pet não encontrado"
            });
        }
    });
}


module.exports = {
    storePet,
    getPets,
    getPetById
}
