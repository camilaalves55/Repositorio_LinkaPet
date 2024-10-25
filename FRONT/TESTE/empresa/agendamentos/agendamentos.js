document.addEventListener('DOMContentLoaded', async () => {
    const empresa_id = localStorage.getItem('id_empresa');
    console.log('ID da empresa:', empresa_id);

    if (!empresa_id) {
        alert('ID da empresa não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        const resposta_agendamento = await fetch('http://localhost:3005/api/agendamento/empresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ empresa_id: empresa_id }),
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

            resultado_agendamento.data.pendentes.forEach(agendamento => {
                agendamentosPendentes.appendChild(criarCardAgendamento(agendamento));
            });

            resultado_agendamento.data.confirmados.forEach(agendamento => {
                agendamentosConfirmados.appendChild(criarCardAgendamento(agendamento));
            });

            resultado_agendamento.data.concluidos.forEach(agendamento => {
                agendamentosConcluidos.appendChild(criarCardAgendamento(agendamento));
            });

            resultado_agendamento.data.cancelados.forEach(agendamento => {
                agendamentosCancelados.appendChild(criarCardAgendamento(agendamento));
            });

        } else {
            console.log("Nenhum agendamento encontrado:", resultado_agendamento.message);
        }
    } catch (error) {
        console.error("Erro ao buscar os agendamentos:", error);
        alert('Ocorreu um erro ao buscar seus agendamentos. Por favor, tente novamente mais tarde.');
    }
});

function criarCardAgendamento(agendamento) {
    const div_agendamento = document.createElement('div');
    div_agendamento.className = 'item_agendamento';
    div_agendamento.id = `agendamento-${agendamento.id}`; 

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

    const div_status = document.createElement('div');
    div_status.className = 'status_container';
    const status = document.createElement('p');
    status.className = 'status'; 
    status.innerHTML = `<span class="titulo">Status:</span> ${agendamento.status}`;

    const button = document.createElement('button');
    button.className = 'editar';
    button.style.cursor = "pointer";
    button.innerHTML = `<i class="fas fa-pencil-alt"></i>`;

    button.addEventListener('click', () => EditarStatus(agendamento));

    div_status.appendChild(status);
    div_status.appendChild(button);

    div_info_agendamento.appendChild(nome_servico);
    div_info_agendamento.appendChild(nome_empresa);
    div_info_agendamento.appendChild(nome_pet);
    div_info_agendamento.appendChild(elemento_data_agendada);
    div_info_agendamento.appendChild(horario);
    div_info_agendamento.appendChild(div_status);

    div_agendamento.appendChild(div_info_agendamento);

    return div_agendamento;
}


function EditarStatus(agendamento) {
    Swal.fire({
        title: 'Editar Status',
        input: 'select',
        inputOptions: {
            'PENDENTE': 'PENDENTE',
            'CONFIRMADO': 'CONFIRMADO',
            'CANCELADO': 'CANCELADO',
            'CONCLUIDO': 'CONCLUIDO'
        },
        inputPlaceholder: 'Selecione um status',
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed && result.value) {
            const novoStatus = result.value;

            try {
                const resposta = await fetch('http://localhost:3005/api/agendamento/atualizar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ agendamento_id: agendamento.id, status: novoStatus }),
                });

                if (!resposta.ok) {
                    throw new Error('Erro ao atualizar o status: ' + resposta.statusText);
                }

                const resultado = await resposta.json();
                
                if (resultado.success) {
                    Swal.fire('Status atualizado!', '', 'success');
                    document.querySelector(`#agendamento-${agendamento.id} .status`).textContent = novoStatus;
                } else {
                    Swal.fire('Erro!', resultado.message, 'error');
                }
            } catch (error) {
                console.error("Erro ao atualizar o status:", error);
                Swal.fire('Erro!', 'Não foi possível atualizar o status. Tente novamente.', 'error');
            }
        }
    });
}

