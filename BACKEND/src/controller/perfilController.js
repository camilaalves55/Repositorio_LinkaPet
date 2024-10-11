// const connection = require('../config/db');
// const path = require('path');
// const fs = require('fs');

// const uploadPath = path.join(__dirname, '..', 'uploads');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }


// async function storePerfil(request, response) {
//     if (!request.files) {
//         return response.status(400).json({
//             success: false,
//             message: "Você não enviou o arquivo de foto."
//         });
//     }
    
//     const logo = request.files.logo;
//     const logoNome = Date.now() + path.extname(logo.name);

//     logo.mv(path.join(uploadPath, logoNome), (erro) => {
//         if (erro) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Erro ao mover o arquivo"
//             });
//         }

//         const empresaId = request.body.empresa_id;

//         const params = [
//             logoNome,
//             request.body.nome_empresa,
//             request.body.sobre_empresa,
//             request.body.telefone,
//             request.body.endereco,
//             request.body.tipos_servico,
//             request.body.horario_funcionamento,
//             empresaId 
//         ];

//         const query = "INSERT INTO perfil_empresa (logo, nome_empresa, sobre_empresa, telefone, endereco, tipos_servico, horario_funcionamento, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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



const connection = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

async function storePerfil(request, response) {
    // Use multer to handle file uploads
    const logo = request.file; // alterado para request.file
    if (!logo) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto."
        });
    }

    const logoNome = Date.now() + path.extname(logo.originalname); // alterado para logo.originalname

    // Mover o arquivo para o diretório de upload
    fs.renameSync(logo.path, path.join(uploadPath, logoNome)); // alterado para fs.renameSync

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

module.exports = { storePerfil };







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


// const updateFotoPerfil = async (req, res) => {
//     try {
//         const clienteId = req.body.cliente_id;
//         const fotoPerfil = req.file ? req.file.filename : null;

//         if (!clienteId || !fotoPerfil) {
//             return res.status(400).json({
//                 success: false,
//                 message: "ID do cliente ou foto não fornecidos."
//             });
//         }

//         const query = "UPDATE cadastro_cliente SET foto_perfil = ? WHERE id = ?";
//         connection.query(query, [fotoPerfil, clienteId], (err, results) => {
//             if (err) {
//                 console.error('Erro ao atualizar foto de perfil:', err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Erro ao atualizar foto de perfil.",
//                     error: err.message
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Foto de perfil atualizada com sucesso!",
//                 data: { foto_perfil: fotoPerfil }
//             });
//         });
//     } catch (error) {
//         console.error('Erro ao processar a solicitação:', error);
//         res.status(500).json({
//             success: false,
//             message: "Erro interno do servidor.",
//             error: error.message
//         });
//     }
// };




// async function updateFotoPerfil(req, res) {
//     try {
//         const clienteId = req.body.cliente_id;
//         const fotoPerfil = req.file ? req.file.filename : null;

//         if (!clienteId || !fotoPerfil) {
//             return res.status(400).json({
//                 success: false,
//                 message: "ID do cliente ou foto não fornecidos."
//             });
//         }

//         const query = "UPDATE cadastro_cliente SET foto_perfil = ? WHERE id = ?";
//         connection.query(query, [fotoPerfil, clienteId], (err, results) => {
//             if (err) {
//                 console.error('Erro ao atualizar foto de perfil:', err);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Erro ao atualizar foto de perfil.",
//                     error: err.message
//                 });
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Foto de perfil atualizada com sucesso!",
//                 data: { foto_perfil: fotoPerfil }
//             });
//         });
//     } catch (error) {
//         console.error('Erro ao processar a solicitação:', error);
//         res.status(500).json({
//             success: false,
//             message: "Erro interno do servidor.",
//             error: error.message
//         });
//     }
// }


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

<<<<<<< HEAD
=======

// exports.updateFotoPerfil = async (req, res) => {
//     try {
//         const cliente_id = req.body.cliente_id;

//         if (!req.files || !req.files.foto_perfil) {
//             return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada.' });
//         }

//         const foto_perfil = req.files.foto_perfil;
//         const uploadPath = path.join(__dirname, '../uploads', `perfil_${cliente_id}_${Date.now()}_${foto_perfil.name}`);

//         foto_perfil.mv(uploadPath, async (err) => {
//             if (err) {
//                 return res.status(500).json({ success: false, message: 'Erro ao mover a imagem.' });
//             }

//             // Aqui você pode atualizar a foto de perfil do cliente no banco de dados
//             const sql = "UPDATE clientes SET foto_perfil = ? WHERE cliente_id = ?";
//             await mysql.execute(sql, [path.basename(uploadPath), cliente_id]);

//             return res.status(200).json({ success: true, data: { foto_perfil: path.basename(uploadPath) } });
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };



>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
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


module.exports = {
    storePerfil,
    getPerfil,
    getEmpresaById,
    getClienteNome,
    getEmpresa,
    updateFotoPerfil,
    updateProfile
}