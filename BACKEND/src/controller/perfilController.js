const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// funcao para buscar e exibir todas as informações de perfil do cliente logado

async function getCliente(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT * FROM cadastro_cliente WHERE id = ?";
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
                message: "Cliente não encontrado."
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results[0]
        });
    });
}


// funcao para buscar e exibir os dados da empresa logada na tela de inicio e no perfil

async function getEmpresa(request, response) {
    const empresaId = request.body.empresa_id;
    console.log("ID da empresa recebido:", empresaId);

    if (!empresaId) {
        return response.status(400).json({
            success: false,
            message: "ID da empresa não fornecido."
        });
    }

    const query = "SELECT * FROM perfil_empresa WHERE id = ?";
    connection.query(query, [empresaId], (err, results) => {
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
                message: "Empresa não encontrada."
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results[0]
        });
    });
}

// funcao para cadastrar os pets do cliente

async function storePet(req, res) {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = req.file;
    const imagemNome = Date.now() + path.extname(imagem.originalname); 

    const targetPath = path.join(uploadPath, imagemNome);
    fs.renameSync(imagem.path, targetPath);

    const clienteId = req.body.cliente_id;

    if (!clienteId) {
        return res.status(400).json({
            success: false,
            message: "ID do cliente ausente."
        });
    }

    const params = [
        req.body.nome_pet,
        req.body.raca,
        req.body.idade,
        imagemNome,
        req.body.descricao,
        req.body.especie,
        req.body.data_nascimento,
        clienteId
    ];

    const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";


    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "Ops! Não deu...",
                query: err.sql,
                sqlMessage: err.sqlMessage
            });
        }

        res.status(201).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    });
}

// funcao para buscar os pets cadastrados pelo cliente

async function getPets(req, res) {
    const clienteId = req.query.cliente_id;

    if (!clienteId) {
        return res.status(400).json({
            success: false,
            message: 'Parâmetro cliente_id ausente'
        });
    }

    const query = "SELECT * FROM pets_cadastrados WHERE cliente_id = ? ORDER BY id ASC";

    connection.query(query, [clienteId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao buscar os pets.",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Pets encontrados com sucesso.",
            data: results
        });
    });
}



// funcao buscar alguns dados do cliente logado e exibir na tela de inicio

async function getClienteNome(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT nome, nome_usuario, email, foto_perfil FROM cadastro_cliente WHERE id = ?";
    connection.query(query, [clienteId], (err, results) => {
        console.log("Resultado da consulta do nome de usuario do cliente:", results);

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
                message: "Cliente não encontrado."
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
    getCliente,
    getEmpresa,
    storePet,
    getPets,
    getClienteNome
};