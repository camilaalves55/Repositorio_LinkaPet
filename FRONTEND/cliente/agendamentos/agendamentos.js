document.addEventListener('DOMContentLoaded', async () => {
    const cliente_id = localStorage.getItem('id_cliente');
    console.log('ID do cliente:', cliente_id);

    if (!cliente_id) {
        alert('ID do cliente não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cliente_id: cliente_id }),
        });

        console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
        }

        const clienteResult = await clienteResponse.json();
        console.log("Resultado da busca pelas informações do cliente:", clienteResult);

        if (clienteResult.success) {
            console.log('Sucesso ao obter cliente:', clienteResult.data);

            document.getElementById('nome').textContent = clienteResult.data.nome || 'Nome não disponível';
            document.getElementById('email_usuario').textContent = clienteResult.data.email || 'E-mail não disponível';

            const fotoPerfil = clienteResult.data.foto_perfil
                ? `http://localhost:3005/upload/${clienteResult.data.foto_perfil}`
                : '../../imagens/default.png';
            document.getElementById('foto_perfil').src = fotoPerfil;
        } else {
            console.error("Erro ao buscar o nome do cliente:", clienteResult.message);
        }

        const resposta_agendamento = await fetch('http://localhost:3005/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cliente_id: cliente_id }),
        });

        if (!resposta_agendamento.ok) {
            throw new Error('Erro ao buscar os agendamentos: ' + resposta_agendamento.statusText);
        }

        const resultado_agendamento = await resposta_agendamento.json();

        if (resultado_agendamento.success && resultado_agendamento.data) {
            const agendamentosPendentes = document.getElementById('agendamentos_pendentes');
            const agendamentosConfirmados = document.getElementById('agendamentos_confirmados');
            const agendamentosCancelados = document.getElementById('agendamentos_cancelados');
            const agendamentosConcluidos = document.getElementById('agendamentos_concluidos');

            if (resultado_agendamento.data.pendentes.length > 0) {
                resultado_agendamento.data.pendentes.forEach(agendamento => {
                    agendamentosPendentes.appendChild(criarCardAgendamento(agendamento));
                });
            }

            if (resultado_agendamento.data.confirmados.length > 0) {
                resultado_agendamento.data.confirmados.forEach(agendamento => {
                    agendamentosConfirmados.appendChild(criarCardAgendamento(agendamento));
                });
            }

            if (resultado_agendamento.data.concluidos.length > 0) {
                resultado_agendamento.data.concluidos.forEach(agendamento => {
                    agendamentosConcluidos.appendChild(criarCardAgendamento(agendamento));
                });
            }

            if (resultado_agendamento.data.cancelados.length > 0) {
                resultado_agendamento.data.cancelados.forEach(agendamento => {
                    agendamentosCancelados.appendChild(criarCardAgendamento(agendamento));
                });
            }

            if (
                resultado_agendamento.data.pendentes.length === 0 &&
                resultado_agendamento.data.confirmados.length === 0 &&
                resultado_agendamento.data.concluidos.length === 0 &&
                resultado_agendamento.data.cancelados.length === 0
            ) {
                console.log("Nenhum agendamento encontrado.");
            }
        } else {
            console.log("Nenhum agendamento encontrado:", resultado_agendamento.message);
        }
    } catch (error) {
        console.error("Erro ao buscar os agendamentos:", error);
    }
});

function criarCardAgendamento(agendamento) {
    const div_agendamento = document.createElement('div');
    div_agendamento.className = 'item_agendamento';

    const div_info_agendamento = document.createElement('div');
    div_info_agendamento.className = 'info_agendamento';

    const nome_servico = document.createElement('p');
    nome_servico.innerHTML = `<span class="titulo">Serviço:</span> ${agendamento.nome_servico}`;

    const nome_empresa = document.createElement('p');
    nome_empresa.innerHTML = `<span class="titulo">Empresa:</span> ${agendamento.nome_empresa}`;

    const nome_pet = document.createElement('p');
    nome_pet.innerHTML = `<span class="titulo">Pet:</span> ${agendamento.nome_pet}`;

    const data_agendada = new Date(agendamento.data_agendada);
    const dia = String(data_agendada.getDate()).padStart(2, '0');
    const mes = String(data_agendada.getMonth() + 1).padStart(2, '0');
    const ano = data_agendada.getFullYear();
    const data_formatada = `${dia}/${mes}/${ano}`;

    const elemento_data_agendada = document.createElement('p');
    elemento_data_agendada.innerHTML = `<span class="titulo">Data:</span> ${data_formatada}`;

    const horario = document.createElement('p');
    horario.innerHTML = `<span class="titulo">Horário:</span> ${agendamento.horario}`;

    const status = document.createElement('p');
    status.innerHTML = `<span class="titulo">Status:</span> ${agendamento.status || 'Pendente'}`;

    div_info_agendamento.appendChild(nome_servico);
    div_info_agendamento.appendChild(nome_empresa);
    div_info_agendamento.appendChild(nome_pet);
    div_info_agendamento.appendChild(elemento_data_agendada);
    div_info_agendamento.appendChild(horario);
    div_info_agendamento.appendChild(status);

    div_agendamento.appendChild(div_info_agendamento);

    return div_agendamento;
}
