document.addEventListener('DOMContentLoaded', async () => {
    const clienteId = localStorage.getItem('id_cliente');
    const urlParams = new URLSearchParams(window.location.search);

    const empresaId = urlParams.get('empresa_id');
    const petId = urlParams.get('id');

    if (!clienteId || !empresaId || !petId) {
        console.error('ID do cliente, da empresa ou do pet não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        const servicosResponse = await fetch(`http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const servicosResult = await servicosResponse.json();

        const servicosDiv = document.getElementById('servicos');
        servicosDiv.innerHTML = '';

        if (servicosResult.success && servicosResult.data.length > 0) {
            servicosResult.data.forEach(servico => {
                const servicoDiv = document.createElement('div');
                servicoDiv.className = 'servico_item';

                const servico1Div = document.createElement('div');
                servico1Div.className = 'servico_info';

                const servico2Div = document.createElement('div');
                servico2Div.className = 'servico_botao';

                const nomeServico = document.createElement('h3');
                nomeServico.textContent = `${servico.servico}`;

                const precoServico = document.createElement('p');
                precoServico.innerHTML = `<span class="titulo">Preço:</span> ${servico.preco}`;

                const button = document.createElement('button');
                button.textContent = 'Continuar';
                button.addEventListener('click', () => {
                    window.location.href = `agendar.html?empresa_id=${empresaId}&pet_id=${petId}&servico_id=${servico.servico_id}`;
                });

                servico1Div.appendChild(nomeServico);
                servico1Div.appendChild(precoServico);
                servico2Div.appendChild(button);

                servicoDiv.appendChild(servico1Div);
                servicoDiv.appendChild(servico2Div);

                servicosDiv.appendChild(servicoDiv);
            });
        } else {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.className = 'mensagem_erro';
            mensagemDiv.textContent = 'Nenhum serviço encontrado para esta empresa.';
            servicosDiv.appendChild(mensagemDiv);
        }
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);
    }
});
