document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('empresa_id');
    const petId = urlParams.get('pet_id');
    const servicoId = urlParams.get('servico_id');
    const empresaNome = urlParams.get('nome_empresa'); 
    const petNome = urlParams.get('nome_pet'); 
    const nomeServico = urlParams.get('nome_servico'); 
    const raca = urlParams.get('raca');
    const sexo = urlParams.get('sexo');
    const descricao = urlParams.get('descricao');

    console.log('empresa_nome:', empresaNome, 'pet_nome:', petNome, 'servico_nome:', nomeServico);
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

async function getNomeCliente() {
    const clienteId = localStorage.getItem('id_cliente'); 
    if (!clienteId) {
        console.error('ID do cliente não disponível');
        return null;
    }

    try {
        const response = await fetch('http://localhost:3005/api/store/get/nome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId }) 
        });

        const result = await response.json();
        if (result.success) {
            return result.data.nome;
        } else {
            console.error('Erro ao buscar nome do cliente:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar nome do cliente:', error);
        return null;
    }
}

document.getElementById('agendar').addEventListener('click', async function(event) {
    event.preventDefault();
    const horarioSelecionado = document.querySelector('.buttonClicked')?.textContent;
    const dataSelecionada = document.getElementById('dataAgendamento').value;
    const servicoNome = document.getElementById('nome_servico').textContent;
    const empresaId = new URLSearchParams(window.location.search).get('empresa_id');
    const petId = new URLSearchParams(window.location.search).get('pet_id');
    const servicoId = new URLSearchParams(window.location.search).get('servico_id');
    const clienteId = localStorage.getItem('id_cliente');
    const empresaNome = new URLSearchParams(window.location.search).get('nome_empresa');
    const petNome = new URLSearchParams(window.location.search).get('nome_pet');
    const raca = new URLSearchParams(window.location.search).get('raca'); 
    const sexo = new URLSearchParams(window.location.search).get('sexo');
    const descricao = new URLSearchParams(window.location.search).get('descricao');

    if (!horarioSelecionado || !dataSelecionada || !clienteId) {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Por favor, selecione um horário, uma data e verifique seu login.'
        });
        return;
    }

    const nomeCliente = await getNomeCliente();

    if (!nomeCliente) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao buscar nome do cliente. Por favor, tente novamente.'
        });
        return;
    }

    const dataFormatada = converterData(dataSelecionada); 

    const agendamentoData = {
        cliente_id: clienteId,
        nome_cliente: nomeCliente,
        empresa_id: empresaId,
        nome_empresa: empresaNome,
        pet_id: petId,
        nome_pet: petNome,
        nome_servico: servicoNome,
        servico_id: servicoId,
        horario: horarioSelecionado,
        data_agendada: dataFormatada, 
        raca: raca, 
        sexo: sexo,
        descricao: descricao 
    };

    console.log('Agendamento Data:', agendamentoData);

    try {
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
            Swal.fire({
                icon: 'success',
                title: 'Agendamento enviado!',
                text: 'O seu pedido de agendamento foi enviado! Aguarde confirmação.'
            }).then(() => {
                window.location.href = '../agendamentos/agendamentos.html';
            });
        } else {
            console.error('Erro ao agendar:', result.message);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao agendar. Por favor, tente novamente.'
            });
        }
    } catch (error) {
        console.error('Erro ao enviar agendamento:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao enviar agendamento. Por favor, tente novamente.'
        });
    }
});

function converterData(data) {
    const partes = data.split('/'); 
    return `${partes[2]}-${partes[1]}-${partes[0]}`; 
}

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#dataAgendamento", {
        dateFormat: "d/m/Y",
        disableMobile: true,
    });
});
