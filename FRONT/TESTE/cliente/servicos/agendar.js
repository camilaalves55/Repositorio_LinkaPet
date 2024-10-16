document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('empresa_id');
    const petId = urlParams.get('pet_id');
    const servicoId = urlParams.get('servico_id');
    
    console.log('empresa_id:', empresaId, 'pet_id:', petId, 'servico_id:', servicoId);

    if (!empresaId || !petId || !servicoId) {
        console.error('Informações insuficientes para o agendamento. Por favor, tente novamente.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3005/api/get/servicos/${servicoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            const servicoDiv = document.getElementById('nome_servico');
            servicoDiv.textContent = `${result.data.servico}`;

            const horariosDiv = document.getElementById('horarios');
            const horarios = result.data.horarios_disponiveis.split(' ');  

            horariosDiv.innerHTML = ''; 
            horarios.forEach(horario => {
                const button = document.createElement('button');
                button.className = 'agendamento hora'; 
                button.textContent = horario;
                horariosDiv.appendChild(button);
            });

            adicionarEventoAosBotoes();
        } else {
            console.log("Erro ao buscar detalhes do serviço:", result.message);
        }
    } catch (error) {
        console.error("Erro ao buscar detalhes do serviço:", error);
    }
});

function adicionarEventoAosBotoes() {
    let botaoHorarios = document.querySelectorAll('.hora');

    botaoHorarios.forEach(function(key){
        key.addEventListener('click', function(){
            removeStyles();
            this.classList.add('buttonClicked');
        });
    });
}

function removeStyles(){
    let botaoHorarios = document.querySelectorAll('.hora');
    botaoHorarios.forEach(button => {
        button.classList.remove('buttonClicked');
    });
}

document.getElementById('agendar').addEventListener('click', async function(event) {
    event.preventDefault();

    const horarioSelecionado = document.querySelector('.buttonClicked')?.textContent;
    const dataSelecionada = document.getElementById('dataNascimento').value;
    const servicoNome = document.getElementById('nome_servico').textContent;
    const empresaId = new URLSearchParams(window.location.search).get('empresa_id');
    const petId = new URLSearchParams(window.location.search).get('pet_id');
    const servicoId = new URLSearchParams(window.location.search).get('servico_id');
    const clienteId = localStorage.getItem('id_cliente');
    
    if (!horarioSelecionado || !dataSelecionada) {
        alert('Por favor, selecione um horário e uma data.');
        return;
    }

    const agendamentoData = {
        cliente_id: clienteId,
        empresa_id: empresaId,
        servico: servicoNome,
        servico_id: servicoId,
        pet_id: petId,
        horario: horarioSelecionado,
        data_agendada: dataSelecionada
    };

    try {
        console.log('infos:', agendamentoData);
        const response = await fetch('http://localhost:3005/api/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamentoData)
        });

        const result = await response.json();

        console.log("resposta:", result.message);

        if (result.success) {
            alert('O seu pedido de agendamento foi enviado! Aguarde confirmação.');
            window.location.href = '../inicio/tela_principal.html';
        } else {
            console.error('Erro ao agendar:', result.message);
            alert('Erro ao agendar. Por favor, tente novamente.');
            console.log("else:", result.message);

        }
    } catch (error) {
        console.error('Erro ao enviar agendamento:', error);
        alert('Erro ao enviar agendamento. Por favor, tente novamente.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#dataNascimento", {
        dateFormat: "Y-m-d",
        disableMobile: true,
    });
});