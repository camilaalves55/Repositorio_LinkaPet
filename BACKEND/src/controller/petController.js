<<<<<<< HEAD
// const connection = require('../config/db');
// const path = require('path');
// const fs = require('fs');

// const uploadPath = path.join(__dirname, '..', 'uploads');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath);
// }

// async function storePet(request, response) {
=======
// // const connection = require('../config/db');
// // const path = require('path');
// // const fs = require('fs');

// // const uploadPath = path.join(__dirname, '..', 'uploads');

// // if (!fs.existsSync(uploadPath)) {
// //     fs.mkdirSync(uploadPath);
// // }

// // async function storePet(request, response) {
// //     if (!request.files || !request.files.imagem) {
// //         return response.status(400).json({
// //             success: false,
// //             message: "Você não enviou o arquivo de foto."
// //         });
// //     }

// //     const imagem = request.files.imagem;
// //     const imagemNome = Date.now() + path.extname(imagem.name);

// //     imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
// //         if (erro) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "Erro ao mover o arquivo"
// //             });
// //         }

// //         const clienteId = request.body.cliente_id;

// //         if (!clienteId) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "ID do cliente ausente."
// //             });
// //         }

// //         const params = [
// //             request.body.nome_pet,
// //             request.body.raca,
// //             request.body.idade,
// //             imagemNome,
// //             request.body.descricao,
// //             request.body.especie,
// //             request.body.data_nascimento,
// //             clienteId
// //         ];

// //         const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// //         connection.query(query, params, (err, results) => {
// //             if (err) {
// //                 return response.status(400).json({
// //                     success: false,
// //                     message: "Ops! Não deu...",
// //                     query: err.sql,
// //                     sqlMessage: err.sqlMessage
// //                 });
// //             }

// //             response.status(201).json({
// //                 success: true,
// //                 message: "Sucesso!",
// //                 data: results
// //             });
// //         });
// //     });
// // }





// const connection = require('../config/db');
// const express = require('express');
// const router = express.Router();
// const upload = require('../config/multer'); // Ajuste o caminho conforme necessário

// // Rota para cadastrar pet
// router.post('/pets_cadastrados', upload.single('imagem'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({
//             success: false,
//             message: "Você não enviou o arquivo de foto."
//         });
//     }

    
// async function storePet(req, res) {
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
//     if (!request.files || !request.files.imagem) {
//         return response.status(400).json({
//             success: false,
//             message: "Você não enviou o arquivo de foto."
//         });
//     }

//     const imagem = request.files.imagem;
//     const imagemNome = Date.now() + path.extname(imagem.name);

//     imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
//         if (erro) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Erro ao mover o arquivo"
//             });
//         }

//         const clienteId = request.body.cliente_id;

//         if (!clienteId) {
//             return response.status(400).json({
//                 success: false,
//                 message: "ID do cliente ausente."
//             });
//         }

//         const params = [
//             request.body.nome_pet,
//             request.body.raca,
//             request.body.idade,
//             imagemNome,
//             request.body.descricao,
//             request.body.especie,
//             request.body.data_nascimento,
//             clienteId
//         ];

//         const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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
//     });
<<<<<<< HEAD
=======

// }
// });


























// // const connection = require('../config/db');
// // const path = require('path');
// // const fs = require('fs');

// // const uploadPath = path.join(__dirname, '..', 'uploads');

// // if (!fs.existsSync(uploadPath)) {
// //     fs.mkdirSync(uploadPath);
// // }

// //async function storePet(request, response) {
// //     if (!request.files || !request.files.imagem) {
// //         return response.status(400).json({
// //             success: false,
// //             message: "Você não enviou o arquivo de foto."
// //         });
// //     }

// //     const imagem = request.files.imagem;
// //     const imagemNome = Date.now() + path.extname(imagem.name);

// //     imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
// //         if (erro) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "Erro ao mover o arquivo"
// //             });
// //         }

// //         const clienteId = request.body.cliente_id;

// //         if (!clienteId) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "ID do cliente ausente."
// //             });
// //         }

// //         const params = [
// //             request.body.nome_pet,
// //             request.body.raca,
// //             request.body.idade,
// //             imagemNome,
// //             request.body.descricao,
// //             request.body.especie,
// //             request.body.data_nascimento,
// //             clienteId
// //         ];

// //         const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// //         connection.query(query, params, (err, results) => {
// //             if (err) {
// //                 return response.status(400).json({
// //                     success: false,
// //                     message: "Ops! Não deu...",
// //                     query: err.sql,
// //                     sqlMessage: err.sqlMessage
// //                 });
// //             }

// //             response.status(201).json({
// //                 success: true,
// //                 message: "Sucesso!",
// //                 data: results
// //             });
// //         });
// //     });
// // }

// // exports.storePet = async (req, res) => {
// //     try {
// //         const { nome_pet, raca, idade, descricao, especie, data_nascimento, cliente_id } = req.body;

// //         if (!req.files || !req.files.imagem) {
// //             return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada.' });
// //         }

// //         const imagem = req.files.imagem;
// //         const uploadPath = path.join(__dirname, '../uploads', `pet_${cliente_id}_${Date.now()}_${imagem.name}`);

// //         imagem.mv(uploadPath, async (err) => {
// //             if (err) {
// //                 return res.status(500).json({ success: false, message: 'Erro ao mover a imagem.' });
// //             }

// //             const sql = "INSERT INTO pets_cadastrados (nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
// //             const params = [nome_pet, raca, idade, path.basename(uploadPath), descricao, especie, data_nascimento, cliente_id];

// //             await mysql.execute(sql, params);

// //             return res.status(200).json({ success: true, message: 'Pet cadastrado com sucesso!', data: { imagem: path.basename(uploadPath) } });
// //         });
// //     } catch (error) {
// //         return res.status(500).json({ success: false, message: error.message });
// //     }
// // };

// // const connection = require('../config/db');
// // const path = require('path');
// // const fs = require('fs');
// // // const connection = require('../config/db'); // Certifique-se de que o caminho está correto

// // const uploadPath = path.join(__dirname, '..', 'uploads');

// // if (!fs.existsSync(uploadPath)) {
// //     fs.mkdirSync(uploadPath);
// // }

// // async function storePet(request, response) {
// //     if (!request.files || !request.files.imagem) {
// //         return response.status(400).json({
// //             success: false,
// //             message: "Você não enviou o arquivo de foto."
// //         });
// //     }

// //     const imagem = request.files.imagem;
// //     const imagemNome = Date.now() + path.extname(imagem.name);

// //     imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
// //         if (erro) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "Erro ao mover o arquivo"
// //             });
// //         }

// //         const clienteId = request.body.cliente_id;

// //         if (!clienteId) {
// //             return response.status(400).json({
// //                 success: false,
// //                 message: "ID do cliente ausente."
// //             });
// //         }

// //         const params = [
// //             request.body.nome_pet,
// //             request.body.raca,
// //             request.body.idade,
// //             imagemNome,
// //             request.body.descricao,
// //             request.body.especie,
// //             request.body.data_nascimento,
// //             clienteId
// //         ];

// //         const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// //         connection.query(query, params, (err, results) => {
// //             if (err) {
// //                 return response.status(400).json({
// //                     success: false,
// //                     message: "Ops! Não deu...",
// //                     query: err.sql,
// //                     sqlMessage: err.sqlMessage
// //                 });
// //             }

// //             response.status(201).json({
// //                 success: true,
// //                 message: "Sucesso!",
// //                 data: results
// //             });
// //         });
// //     });
// // }









// async function getPets(request, response) {
//     const clienteId = request.query.cliente_id;

//     if (!clienteId) {
//         return response.status(400).json({
//             success: false,
//             message: 'Parâmetro cliente_id ausente'
//         });
//     }

//     const query = "SELECT * FROM pets_cadastrados WHERE cliente_id = ? ORDER BY id ASC";

//     connection.query(query, [clienteId], (err, results) => {
//         if (err) {
//             return response.status(500).json({
//                 success: false,
//                 message: "Erro ao buscar os pets.",
//                 error: err
//             });
//         }

//         response.status(200).json({
//             success: true,
//             message: "Pets encontrados com sucesso.",
//             data: results
//         });
//     });
// }

// async function getPetById(request, response) {
//     const petId = request.params.id;

//     if (!petId) {
//         return response.status(400).json({
//             success: false,
//             message: 'Parâmetro ID ausente'
//         });
//     }

//     const query = "SELECT * FROM pets_cadastrados WHERE id = ?";

//     connection.query(query, [petId], (err, results) => {
//         if (err) {
//             return response.status(500).json({
//                 success: false,
//                 message: "Erro ao buscar detalhes do pet.",
//                 error: err
//             });
//         }

//         if (results.length > 0) {
//             response.status(200).json({
//                 success: true,
//                 data: results[0]
//             });
//         } else {
//             response.status(404).json({
//                 success: false,
//                 message: "Pet não encontrado"
//             });
//         }
//     });
// }


// module.exports = {
//     storePet,
//     getPets,
//     getPetById
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
// }





<<<<<<< HEAD
=======













>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

// Caminho para o diretório de uploads
const uploadPath = path.join(__dirname, '..', 'uploads');

// Verifica se o diretório de uploads existe, se não, cria um novo
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storePet(req, res) {
    // Verifica se a imagem foi enviada
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const imagem = req.file; // O multer já faz o parsing do arquivo
    const imagemNome = Date.now() + path.extname(imagem.originalname); // Usa originalname do multer

    // Move o arquivo para o diretório de uploads
    const targetPath = path.join(uploadPath, imagemNome);
    fs.renameSync(imagem.path, targetPath); // Mover arquivo usando renameSync

    const clienteId = req.body.cliente_id;

    // Verifica se o ID do cliente está presente
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

<<<<<<< HEAD
=======
    // Executa a query no banco de dados
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
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

<<<<<<< HEAD


async function getPets(request, response) {
    const clienteId = request.query.cliente_id;
=======
module.exports = { storePet };









// const connection = require('../config/db');


// const path = require('path');
// const fs = require('fs');


// const uploadPath = path.join(__dirname, '..', 'uploads');


// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath);
// }


// async function storePet(request, response) {
//     if (!request.files || !request.files.imagem) {
//         return response.status(400).json({
//             success: false,
//             message: "Você não enviou o arquivo de foto."
//         });
//     }


//     const imagem = request.files.imagem;
//     const imagemNome = Date.now() + path.extname(imagem.name);


//     imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
//         if (erro) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Erro ao mover o arquivo"
//             });
//         }


//         const clienteId = request.body.cliente_id;


//         if (!clienteId) {
//             return response.status(400).json({
//                 success: false,
//                 message: "ID do cliente ausente."
//             });
//         }


//         const params = [
//             request.body.nome_pet,
//             request.body.raca,
//             request.body.idade,
//             imagemNome,
//             request.body.descricao,
//             request.body.especie,
//             request.body.data_nascimento,
//             clienteId
//         ];


//         const query = "INSERT INTO pets_cadastrados(nome_pet, raca, idade, imagem, descricao, especie, data_nascimento, cliente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";


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
//     });
// }








async function getPets(req, res) {
    const clienteId = req.query.cliente_id;
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)

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

// Exportando as funções
module.exports = {
    storePet,
    getPets,
    getPetById
};
