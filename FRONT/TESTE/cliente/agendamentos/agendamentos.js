document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clienteId = localStorage.getItem('id_cliente');
        console.log("ID do cliente recuperado:", clienteId);
        
        if (!clienteId) {
            console.error("O ID do cliente não foi encontrado no localStorage.");
            Swal.fire({
                title: 'Erro!',
                text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
        }

        const clienteResult = await clienteResponse.json();
        console.log("Resultado da busca pelas informações do cliente:", clienteResult);

        const clienteAgendamentoResponse = await fetch('http://localhost:3005/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        console.log("Resposta do servidor ao buscar os agendamentos do cliente:", clienteAgendamentoResponse);

        if (!clienteAgendamentoResponse.ok) {
            throw new Error('Erro ao buscar os agendamentos do cliente: ' + clienteAgendamentoResponse.statusText);
        }

        const agendamentoResult = await clienteAgendamentoResponse.json();
        console.log("Resultado da busca pelos agendamentos do cliente:", agendamentoResult);

        if (clienteResult.success) {
            document.getElementById('nome').textContent = clienteResult.data.nome;
            document.getElementById('nome_usuario').textContent = clienteResult.data.nome_usuario;
            document.getElementById('email_usuario').textContent = clienteResult.data.email;

            const fotoPerfil = clienteResult.data.foto_perfil 
                ? `http://localhost:3005/upload/${clienteResult.data.foto_perfil}`
                : '../../imagens/default.png';
            document.getElementById('foto_perfil').src = fotoPerfil;
        } else {
            console.log("Erro ao buscar o nome do cliente:", clienteResult.message);
        }

        if (agendamentoResult.success) {
            document.getElementById('horario').textContent = agendamentoResult.data.horario;
        
        
            const dataAgendada = new Date(agendamentoResult.data.data_agendada);
            const dia = String(dataAgendada.getDate()).padStart(2, '0');
            const mes = String(dataAgendada.getMonth() + 1).padStart(2, '0'); 
            const ano = dataAgendada.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            
            document.getElementById('dia').textContent = dataFormatada;
        } else {
            console.log("Erro ao buscar o agendamento do cliente:", agendamentoResult.message);
        }
        

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});
