const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}


// funcao para atualizar a foto de perfil do cliente

async function updateFotoPerfil(req, res) {
    try {
        const clienteId = req.body.cliente_id;
        const fotoPerfil = req.file ? req.file.filename : null;

        if (!clienteId || !fotoPerfil) {
            return res.status(400).json({
                success: false,
                message: "ID do cliente ou foto não fornecidos."
            });
        }

        const query = "UPDATE cadastro_cliente SET foto_perfil = ? WHERE id = ?";
        connection.query(query, [fotoPerfil, clienteId], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar foto de perfil:', err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar foto de perfil.",
                    error: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Foto de perfil atualizada com sucesso!",
                data: { foto_perfil: fotoPerfil }
            });
        });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor.",
            error: error.message
        });
    }
}

// funcao para atualizar os dados de perfil do cliente

async function updateProfile(req, res) {
    try {
        const { cliente_id, field, value } = req.body;

        if (!cliente_id || !field || !value) {
            return res.status(400).json({
                success: false,
                message: "ID do cliente, campo ou valor não fornecidos."
            });
        }

        const allowedFields = ['nome', 'nome_usuario', 'email', 'telefone', 'endereco'];
        if (!allowedFields.includes(field)) {
            return res.status(400).json({
                success: false,
                message: "Campo inválido para atualização."
            });
        }

        const query = `UPDATE cadastro_cliente SET ${field} = ? WHERE id = ?`;
        connection.query(query, [value, cliente_id], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar perfil:', err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar perfil.",
                    error: err.message
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Cliente não encontrado."
                });
            }

            res.status(200).json({
                success: true,
                message: "Perfil atualizado com sucesso!"
            });
        });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor.",
            error: error.message
        });
    }
}

// funcao para atualizar os dados de perfil da empresa

async function updateEmpresa(req, res) {
    try {
        const { empresa_id, field, value } = req.body;

        if (!empresa_id || !field || !value) {
            return res.status(400).json({
                success: false,
                message: "ID da empresa, campo ou valor não fornecidos."
            });
        }

        const allowedFields = ['sobre_empresa', 'tipos_servico', 'nome_empresa', 'endereco', 'telefone', 'horario_funcionamento'];
        if (!allowedFields.includes(field)) {
            return res.status(400).json({
                success: false,
                message: "Campo inválido para atualização."
            });
        }

        const query = `UPDATE perfil_empresa SET ${field} = ? WHERE id = ?`;
        connection.query(query, [value, empresa_id], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar perfil:', err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar perfil.",
                    error: err.message
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Empresa não encontrada."
                });
            }

            res.status(200).json({
                success: true,
                message: "Perfil atualizado com sucesso!"
            });
        });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor.",
            error: error.message
        });
    }
}

// funcao para atualizar a logo do perfil da empresa

async function updateLogoPerfil(req, res) {
    try {
        const empresaId = req.body.empresa_id;  
        const logoPerfil = req.file ? req.file.filename : null;

        if (!empresaId || !logoPerfil) {
            return res.status(400).json({
                success: false,
                message: "ID da empresa ou logo não fornecidos."
            });
        }

        const query = "UPDATE perfil_empresa SET logo = ? WHERE id = ?"; 
        connection.query(query, [logoPerfil, empresaId], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar logo de perfil:', err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar logo de perfil.",
                    error: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Logo de perfil atualizado com sucesso!",
                data: { logo_perfil: logoPerfil }
            });
        });
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor.",
            error: error.message
        });
    }
}


module.exports = {
    updateFotoPerfil,
    updateProfile,
    updateEmpresa,
    updateLogoPerfil
}