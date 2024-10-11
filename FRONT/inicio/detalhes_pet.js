document.addEventListener('DOMContentLoaded', async () => {
    const clienteId = localStorage.getItem('id_cliente');
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('empresa_id');
    console.log(`Valor de empresa_id: ${empresaId}`);
    const petId = urlParams.get('id');

    if (!clienteId || !empresaId || !petId) {
        console.error('ID do cliente, da empresa ou do pet não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

      

        
        console.log(`URL chamada: http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`);
        const result = await response.json();
        console.log(result);
        

        if (result.success) {
            const servicosDiv = document.getElementById('servicos');
            servicosDiv.innerHTML = ''; 

            result.data.forEach(servico => {
                const servicoDiv = document.createElement('div');
                servicoDiv.className = 'servico-item';

                const servico1Div = document.createElement('div');
                servico1Div.className = 'servico-info';

                const servico2Div = document.createElement('div');
                servico2Div.className = 'servico-botao';

                const nomeServico = document.createElement('h3');
                nomeServico.textContent = `${servico.servico}`;

                const precoServico = document.createElement('p');
                precoServico.textContent = `Preço: R$ ${servico.preco}`;

                const button = document.createElement('button');
                button.textContent = 'Continuar';
                button.addEventListener('click', () => {
                    window.location.href = `agendamento.html?empresa_id=${empresaId}&pet_id=${petId}&servico_id=${servico.servico_id}`;
                });

                servico1Div.appendChild(nomeServico);
                servico1Div.appendChild(precoServico);
                servico2Div.appendChild(button);

                servicoDiv.appendChild(servico1Div);
                servicoDiv.appendChild(servico2Div);

                servicosDiv.appendChild(servicoDiv);
            });
        } else {
            console.log("Erro ao buscar serviços:", result.message);
        }
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
    }
});