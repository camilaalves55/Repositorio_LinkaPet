APP.JS 



const express = require('express');
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require('cors');
const multer = require('multer');

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

const perfilRouter = require('./routes/perfilRouter');
const loginRouter = require('./routes/loginRouter');
const petsRouter = require('./routes/petsRouter');
const servicoRouter = require('./routes/servicoRouter');

const app = express();
app.set("port", process.env.PORT || 3005);

app.use(express.json());
app.use(cors());

// Middleware para servir arquivos estáticos
app.use('/upload', express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/api', loginRouter);
app.use('/api', petsRouter);
app.use('/api', perfilRouter);
app.use('/api', servicoRouter);

module.exports = app;



CONTROLLER.JS 

const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
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


ROUTER.JS 



const { Router } = require('express');
const upload = require('../config/multer'); // Importa a configuração do multer
const router = Router();

const { storePerfil, getPerfil, getClienteNome, getEmpresaById, getEmpresa, updateFotoPerfil, updateProfile } = require('../controller/perfilController');

// Rota para atualizar informações do perfil
router.post('/update/perfil', updateProfile);


// Rota para armazenar o perfil
router.post('/store/perfil', storePerfil);

// Rota para obter o perfil
router.get('/store/get/perfil', getPerfil);

// Rota para obter detalhes da empresa por ID
router.get('/get/empresas/detalhes/:id', getEmpresaById);

// Rota para obter o nome do cliente
router.post('/store/get/nome', getClienteNome);

// Rota para obter informações da empresa
router.get('/get/empresa/perfil', getEmpresa);

// Rota para atualizar a foto do perfil
router.post('/store/update/foto', upload.single('foto_perfil'), updateFotoPerfil);

module.exports = router;




SCRIPT.JS 

document.addEventListener('DOMContentLoaded', function () {
    const botao = document.getElementById('botao');
    if (botao) {
        botao.onclick = function () {
            document.getElementById('formContainer').style.display = 'block';
        };
    }

  const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData();
        const logoInput = document.getElementById('logo');

        // Verifique se o arquivo foi selecionado
        if (logoInput.files.length === 0) {
            Swal.fire({
                title: 'Erro!',
                text: 'Você não enviou o arquivo de foto.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return; // Adicione isso para evitar o envio se não houver arquivo
        }

        formData.append('logo', logoInput.files[0]); // Adiciona o arquivo
        formData.append('nome_empresa', document.getElementById('nome_empresa').value);
        formData.append('sobre_empresa', document.getElementById('sobre_empresa').value);
        formData.append('telefone', document.getElementById('telefone').value);
        formData.append('endereco', document.getElementById('endereco').value);
        formData.append('tipos_servico', document.getElementById('tipos_servico').value);
        formData.append('horario_funcionamento', document.getElementById('horario_funcionamento').value);
        
        const empresaId = localStorage.getItem('id_empresa');
        console.log("ID da empresa recuperado:", empresaId);
        
        if (!empresaId) {
            console.error("O ID da empresa não foi encontrado no localStorage.");
            Swal.fire({
                title: 'Erro!',
                text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        formData.append('empresa_id', empresaId);

        try {
            const response = await fetch('http://localhost:3005/api/store/perfil', {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Os dados foram enviados com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../perfil/perfil_empresa.html';
                    }
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: error.message || 'Ocorreu um erro ao enviar os dados.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

});
 

HTML 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="servico_empresa.css">
    <link rel="icon" id="logo_pagina" type="image/x-icon" href="../icones/logo_site.png">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <title>Linka Pet</title>
</head>
<body>
    <section class="tela">
        <header>
            <img id="imagem_site" src="../imagens/logo_LinkaPet.png" alt="Logo Linka Pet">
        </header>
        <main>
            <div class="container">
                <h1 class="my-4">Cadastro de Pet Shop</h1>
                <button id="botao" class="btn btn-primary mb-3">Adicionar Empresa</button>
                <div id="formContainer" style="display: none;">
                    <form id="serviceForm">
                        <div class="form-group">
                            <label for="logo">Logo da Empresa</label>
                            <input id="logo" type="file" class="form-control" required>
                            <div id="fileName" class="file-name">Nenhum arquivo selecionado</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_empresa">Nome da Empresa</label>
                            <input type="text" class="form-control" id="nome_empresa" placeholder="Nome da Empresa" required>
                        </div>
                        <div class="form-group">
                            <label for="sobre_empresa">Sobre a Empresa</label>
                            <input type="text" class="form-control" id="sobre_empresa" placeholder="Sobre a Empresa" required>
                        </div>
                        <div class="form-group">
                            <label for="telefone">Telefone da Empresa</label>
                            <input type="text" class="form-control" id="telefone" placeholder="Telefone da Empresa" required>
                        </div>
                        <div class="form-group">
                            <label for="endereco">Endereço da Empresa</label>
                            <input type="text" class="form-control" id="endereco" placeholder="Endereço da Empresa" required>
                        </div>
                        <div class="form-group">
                            <label for="horario_funcionamento">Horário de Funcionamento</label>
                            <input type="text" class="form-control" id="horario_funcionamento" placeholder="Horário de Funcionamento" required>
                        </div>
                        <div class="form-group">
                            <label for="tipos_servico">Tipos de Serviço Realizados</label>
                            <input type="text" class="form-control" id="tipos_servico" placeholder="Tipos de Serviço" name="tipos_servico[]" required>
                        </div>
                        <div class="form-group">
                            <label for="servico">Serviço</label>
                            <input type="text" class="form-control" id="servico" placeholder="Nome do Serviço" required>
                        </div>
                        <div class="form-group">
                            <label for="preco">Preço</label>
                            <input type="text" class="form-control" id="preco" placeholder="Preço do Serviço" required>
                        </div>
                        <div class="form-group">
                            <label for="horarios_disponiveis">Horários Disponíveis</label>
                            <input type="text" class="form-control" id="horarios_disponiveis" placeholder="Horários Disponíveis" required>
                        </div>

                        <button type="submit" class="btn btn-success">Salvar</button>
                    </form>
                </div>
            </div>
        </main>
        <div class="footer">
            <div class="botoes-paginas">
                <a href="../inicio/inicio1E.html">
                    <img class="barra_de_icones" src="../icones/inicio_cinza.png" alt="">
                </a>
                <a href="../suporte/suporte_empresa.html">
                    <img class="barra_de_icones" src="../icones/suporte_cinza.png" alt="">
                </a>
                <a href="../perfil/perfil_empresa.html">
                    <img class="barra_de_icones" src="../icones/perfil_azul.png" alt="">
                </a>
            </div>
        </div> 
    </section>
    <script src="servico_empresa.js" defer></script>
</body>
</html>


com base nos arquivos de controller, app, e html    modifique o js e talvez o controller para funcionar somente com com as coisas disponiveis nos outros arquivos SEM MEXER no arquivo APP