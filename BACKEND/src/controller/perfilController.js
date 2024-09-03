const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}


async function storePerfil(request, response) {
    if (!request.files) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }
    
    const logo = request.files.logo;
    const logoNome = Date.now() + path.extname(logo.name);

    logo.mv(path.join(uploadPath, logoNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        const empresaId = request.body.empresa_id;

        const params = [
            logoNome,
            request.body.nome_empresa,
            request.body.sobre_empresa,
            request.body.telefone,
            request.body.endereco,
            request.body.tipos_servico,
            request.body.horario_funcionamento,
            empresaId 
        ];

        const query = "INSERT INTO perfil_empresa (logo, nome_empresa, sobre_empresa, telefone, endereco, tipos_servico, horario_funcionamento, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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

async function getClienteNome(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT nome_usuario FROM cadastro_cliente WHERE id = ?";
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

async function getEmpresa(request, response) {
    const empresaId = request.query.empresa_id;  
    console.log("ID da empresa recebido:", empresaId);

    if (!empresaId) {
        return response.status(400).json({
            success: false,
            message: "ID da empresa não fornecido."
        });
    }

    const query = "SELECT * FROM perfil_empresa WHERE empresa_id = ?";
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

module.exports = {
    storePerfil,
    getPerfil,
    getEmpresaById,
    getClienteNome,
    getEmpresa
}