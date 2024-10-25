const connection = require('../config/db');

// funcao para buscar e exibir as consultas agendadas pelo cliente logado







// async function getAgendamentos(request, response) {
//     const clienteId = request.body.cliente_id;
//     console.log("ID do cliente recebido:", clienteId);

//     if (!clienteId) {
//         return response.status(400).json({
//             success: false,
//             message: "ID do cliente não fornecido."
//         });
//     }

//     const query = "SELECT * FROM agendamentos WHERE cliente_id = ?";
//     connection.query(query, [clienteId], (err, results) => {
//         if (err) {
//             return response.status(400).json({
//                 success: false,
//                 message: "Ops! Não deu...",
//                 query: err.sql,
//                 sqlMessage: err.sqlMessage
//             });
//         }

//         if (results.length === 0) {
//             return response.status(404).json({
//                 success: false,
//                 message: "Agendamentos não encontrados."
//             });
//         }

//         response.status(200).json({
//             success: true,
//             message: "Sucesso!",
//             data: results // Retorna todos os resultados
//         });
//     });
// }





async function getAgendamentos(request, response) {
    const clienteId = request.body.cliente_id;
    console.log("ID do cliente recebido:", clienteId);

    if (!clienteId) {
        return response.status(400).json({
            success: false,
            message: "ID do cliente não fornecido."
        });
    }

    const query = "SELECT * FROM agendamentos WHERE cliente_id = ?";
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
                message: "Agendamentos não encontrados."
            });
        }

        const agendamentosPendentes = results.filter(agendamento => agendamento.status === 'PENDENTE');
        const agendamentosConfirmados = results.filter(agendamento => agendamento.status === 'CONFIRMADO');
        const agendamentosConcluidos = results.filter(agendamento => agendamento.status === 'CONCLUIDO');
        const agendamentosCancelados = results.filter(agendamento => agendamento.status === 'CANCELADO');

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: {
                pendentes: agendamentosPendentes,
                confirmados: agendamentosConfirmados,
                cancelados: agendamentosCancelados,
                concluidos: agendamentosConcluidos
            }
        });
    });
}

// funcao para buscar e exibir as consultas agendadas com a empresa

async function agendamentosEmpresa(request, response) {
    const empresaId = request.body.empresa_id;
    console.log("ID da empresa recebido:", empresaId);

    if (!empresaId) {
        return response.status(400).json({
            success: false,
            message: "ID da empresa não fornecido."
        });
    }

    const query = "SELECT * FROM agendamentos WHERE empresa_id = ?";
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
                message: "Agendamentos não encontrados."
            });
        }

        const agendamentosPendentes = results.filter(agendamento => agendamento.status === 'PENDENTE');
        const agendamentosConfirmados = results.filter(agendamento => agendamento.status === 'CONFIRMADO');
        const agendamentosConcluidos = results.filter(agendamento => agendamento.status === 'CONCLUIDO');
        const agendamentosCancelados = results.filter(agendamento => agendamento.status === 'CANCELADO');

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: {
                pendentes: agendamentosPendentes,
                confirmados: agendamentosConfirmados,
                cancelados: agendamentosCancelados,
                concluidos: agendamentosConcluidos
            }
        });
    });
}

// Função para a empresa atualizar o status da consulta

async function updateStatus(req, res) {
    try {
        const { agendamento_id, status } = req.body; 

        if (!agendamento_id || !status) {
            return res.status(400).json({
                success: false,
                message: "ID do agendamento ou status não fornecidos."
            });
        }

        const query = "UPDATE agendamentos SET status = ? WHERE id = ?";
        connection.query(query, [status, agendamento_id], (err, results) => { // Passando status e id corretamente
            if (err) {
                console.error('Erro ao atualizar o status do agendamento:', err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o status do agendamento.",
                    error: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Status atualizado com sucesso!",
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
    getAgendamentos,
    agendamentosEmpresa,
    updateStatus
};