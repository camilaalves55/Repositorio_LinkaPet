// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const clienteId = localStorage.getItem('id_cliente');
//         console.log("ID do cliente recuperado:", clienteId);
        
        // if (!clienteId) {
        //     console.error("O ID do cliente não foi encontrado no localStorage.");
        //     Swal.fire({
        //         title: 'Erro!',
        //         text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
        //         icon: 'error',
        //         confirmButtonText: 'OK'
        //     });
        //     return;
        // }

        // const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ cliente_id: clienteId })
        // });

        // console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

        // if (!clienteResponse.ok) {
        //     throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
        // }

        // const clienteResult = await clienteResponse.json();
        // console.log("Resultado da busca pelas informações do cliente:", clienteResult);
        

        // const clienteAgendamentoResponse = await fetch('http://localhost:3005/api/agendamentos', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ cliente_id: clienteId })
        // });

        // console.log("Resposta do servidor ao buscar os agendamentos do cliente:", clienteAgendamentoResponse);

        // if (!clienteAgendamentoResponse.ok) {
        //     throw new Error('Erro ao buscar os agendamentos do cliente: ' + clienteAgendamentoResponse.statusText);
        // }

        // const agendamentoResult = await clienteAgendamentoResponse.json();
        // console.log("Resultado da busca pelos agendamentos do cliente:", agendamentoResult);

//         if (clienteResult.success) {
//             document.getElementById('nome').textContent = clienteResult.data.nome;
//             document.getElementById('nome_usuario').textContent = clienteResult.data.nome_usuario;
//             document.getElementById('email_usuario').textContent = clienteResult.data.email;

//             const fotoPerfil = clienteResult.data.foto_perfil 
//                 ? `http://localhost:3005/upload/${clienteResult.data.foto_perfil}`
//                 : '../../imagens/default.png';
//             document.getElementById('foto_perfil').src = fotoPerfil;
//         } else {
//             console.log("Erro ao buscar o nome do cliente:", clienteResult.message);
//         }

//         if (agendamentoResult.success) {
//             document.getElementById('horario').textContent = agendamentoResult.data.horario;
        
        
//             const dataAgendada = new Date(agendamentoResult.data.data_agendada);
//             const dia = String(dataAgendada.getDate()).padStart(2, '0');
//             const mes = String(dataAgendada.getMonth() + 1).padStart(2, '0'); 
//             const ano = dataAgendada.getFullYear();
//             const dataFormatada = `${dia}/${mes}/${ano}`;
            
//             document.getElementById('dia').textContent = dataFormatada;
//         } else {
//             console.log("Erro ao buscar o agendamento do cliente:", agendamentoResult.message);
//         }
        

//     } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//     }
// });

document.addEventListener('DOMContentLoaded', async () => {
    const clienteId = localStorage.getItem('id_cliente');
    console.log('Cliente ID:', clienteId);

    if (!clienteId) {
        alert('ID do cliente não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        const agendamentoResponse = await fetch('http://localhost:3005/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        if (!agendamentoResponse.ok) {
            throw new Error('Erro ao buscar os agendamentos: ' + agendamentoResponse.statusText);
        }

        const agendamentoResult = await agendamentoResponse.json();
        console.log("Agendamentos do cliente:", agendamentoResult);

        const agendamentosDiv = document.getElementById('agendamentos');
        agendamentosDiv.innerHTML = ''; 

        // Verifique se o resultado é bem-sucedido e se há dados
        if (agendamentoResult.success && Array.isArray(agendamentoResult.data)) {
            agendamentoResult.data.forEach(agendamento => {
                const agendamentoDiv = document.createElement('div');
                agendamentoDiv.className = 'agendamento_item';

                // Informações do agendamento
                const agendamentoInfoDiv = document.createElement('div');
                agendamentoInfoDiv.className = 'agendamento_info';

                // Exibir informações relevantes do agendamento
                const nomeServico = document.createElement('p');
                nomeServico.innerHTML = `<span class="titulo">Serviço:</span> ${agendamento.nome_servico}`;

                const nomeEmpresa = document.createElement('p');
                nomeEmpresa.innerHTML = `<span class="titulo">Empresa:</span> ${agendamento.nome_empresa}`;

                const petNome = document.createElement('p');
                petNome.innerHTML = `<span class="titulo">Pet:</span> ${agendamento.nome_pet}`;

                const dataAgendada = document.createElement('p');
                dataAgendada.innerHTML = `<span class="titulo">Data:</span> ${agendamento.data_agendada}`;

                const horario = document.createElement('p');
                horario.innerHTML = `<span class="titulo">Horário:</span> ${agendamento.horario}`;

                const status = document.createElement('p');
                status.innerHTML = `<span class="titulo">Status:</span> ${agendamento.status || 'Pendente'}`;

                // Append all details to the agendamentoInfoDiv
                agendamentoInfoDiv.appendChild(nomeServico);
                agendamentoInfoDiv.appendChild(nomeEmpresa);
                agendamentoInfoDiv.appendChild(petNome);
                agendamentoInfoDiv.appendChild(dataAgendada);
                agendamentoInfoDiv.appendChild(horario);
                agendamentoInfoDiv.appendChild(status);

                agendamentoDiv.appendChild(agendamentoInfoDiv);
                agendamentosDiv.appendChild(agendamentoDiv);
            });
        } else {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.className = 'mensagem_erro';
            mensagemDiv.textContent = 'Nenhum agendamento encontrado para este cliente.';
            agendamentosDiv.appendChild(mensagemDiv);
        }
    } catch (error) {
        console.error("Erro ao buscar os agendamentos:", error);
        alert('Ocorreu um erro ao buscar seus agendamentos. Por favor, tente novamente mais tarde.');
    }
});
