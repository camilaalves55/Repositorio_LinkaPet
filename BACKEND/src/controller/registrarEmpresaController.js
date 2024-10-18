const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// funcao para registrar a empresa como um estabelecimento de servicos

async function storePerfil(request, response) {

    const logo = request.file; 
    if (!logo) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const logoNome = Date.now() + path.extname(logo.originalname); 

    fs.renameSync(logo.path, path.join(uploadPath, logoNome)); 

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
}

// funcao para cadastrar servicos

async function storeServico(request, response) {
    const empresaId = request.body.empresa_id;
    const servicoId = request.body.servico_id;

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


module.exports = {
    storePerfil,
    storeServico
};