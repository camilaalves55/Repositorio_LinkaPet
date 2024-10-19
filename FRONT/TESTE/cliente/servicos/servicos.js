// document.addEventListener('DOMContentLoaded', async () => {
//     const clienteId = localStorage.getItem('id_cliente');
//     const urlParams = new URLSearchParams(window.location.search);

//     const empresaId = urlParams.get('empresa_id');
//     const petId = urlParams.get('id');

//     if (!clienteId || !empresaId || !petId) {
//         console.error('ID do cliente, da empresa ou do pet não encontrado. Por favor, faça login novamente.');
//         return;
//     }

//     try {
//         const servicosResponse = await fetch(`http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const servicosResult = await servicosResponse.json();

//         const servicosDiv = document.getElementById('servicos');
//         servicosDiv.innerHTML = '';

//         if (servicosResult.success && servicosResult.data.length > 0) {
//             servicosResult.data.forEach(servico => {
//                 const servicoDiv = document.createElement('div');
//                 servicoDiv.className = 'servico_item';

//                 const servico1Div = document.createElement('div');
//                 servico1Div.className = 'servico_info';

//                 const servico2Div = document.createElement('div');
//                 servico2Div.className = 'servico_botao';

//                 const nomeServico = document.createElement('h3');
//                 nomeServico.textContent = `${servico.servico}`;

//                 const precoServico = document.createElement('p');
//                 precoServico.innerHTML = `<span class="titulo">Preço:</span> ${servico.preco}`;

//                 const button = document.createElement('button');
//                 button.textContent = 'Continuar';
//                 button.addEventListener('click', () => {
//                     window.location.href = `agendar.html?empresa_id=${empresaId}&pet_id=${petId}&servico_id=${servico.servico_id}`;
//                 });

//                 servico1Div.appendChild(nomeServico);
//                 servico1Div.appendChild(precoServico);
//                 servico2Div.appendChild(button);

//                 servicoDiv.appendChild(servico1Div);
//                 servicoDiv.appendChild(servico2Div);

//                 servicosDiv.appendChild(servicoDiv);
//             });
//         } else {
//             const mensagemDiv = document.createElement('div');
//             mensagemDiv.className = 'mensagem_erro';
//             mensagemDiv.textContent = 'Nenhum serviço encontrado para esta empresa.';
//             servicosDiv.appendChild(mensagemDiv);
//         }
//     } catch (error) {
//         console.error("Erro ao buscar serviços:", error);
//     }
// });








document.addEventListener('DOMContentLoaded', async () => {
    // Recupera o ID do cliente do localStorage
    const clienteId = localStorage.getItem('id_cliente');
    
    // Verifica e recupera parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('empresa_id');
    const petId = urlParams.get('pet_id');
    const nomeEmpresa = urlParams.get('nome_empresa'); // Captura o nome da empresa
    const nomePet = urlParams.get('nome_pet'); // Captura o nome do pet

    // Verifica se os valores necessários estão presentes
    if (!clienteId) {
        console.error('ID do cliente não encontrado. Por favor, faça login novamente.');
        alert('Erro: ID do cliente não encontrado. Faça login novamente.');
        return;
    }

    if (!empresaId || !petId) {
        console.error('ID da empresa ou do pet não encontrado. Verifique a URL.');
        alert('Erro: ID da empresa ou do pet não encontrado. Verifique a URL.');
        return;
    }

    try {
        // Faz a requisição para buscar os serviços da empresa
        const servicosResponse = await fetch(`http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const servicosResult = await servicosResponse.json();
        const servicosDiv = document.getElementById('servicos');
        servicosDiv.innerHTML = ''; // Limpa o conteúdo anterior

        // Verifica se a resposta é bem-sucedida e contém serviços
        if (servicosResult.success && servicosResult.data.length > 0) {
            servicosResult.data.forEach(servico => {
                // Cria os elementos para exibir os serviços
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

                // Evento de clique para redirecionar ao agendamento (Código 4)
                button.addEventListener('click', () => {
                    const nomeServicoEncoded = encodeURIComponent(servico.servico); // Codifica o nome do serviço
                    const nomeEmpresaEncoded = encodeURIComponent(nomeEmpresa); // Codifica o nome da empresa
                    const nomePetEncoded = encodeURIComponent(nomePet); // Codifica o nome do pet

                    // Redireciona para o Código 4 com os parâmetros necessários
                    window.location.href = `agendar.html?empresa_id=${empresaId}&nome_empresa=${nomeEmpresaEncoded}&pet_id=${petId}&nome_pet=${nomePetEncoded}&servico_id=${servico.servico_id}&nome_servico=${nomeServicoEncoded}`;
                });

                // Monta os elementos
                servico1Div.appendChild(nomeServico);
                servico1Div.appendChild(precoServico);
                servico2Div.appendChild(button);

                servicoDiv.appendChild(servico1Div);
                servicoDiv.appendChild(servico2Div);

                servicosDiv.appendChild(servicoDiv);
            });
        } else {
            // Caso nenhum serviço seja encontrado
            const mensagemDiv = document.createElement('div');
            mensagemDiv.className = 'mensagem_erro';
            mensagemDiv.textContent = 'Nenhum serviço encontrado para esta empresa.';
            servicosDiv.appendChild(mensagemDiv);
        }
    } catch (error) {
        console.error("Erro ao buscar serviços:", error);

        // Exibe mensagem de erro ao usuário
        const servicosDiv = document.getElementById('servicos');
        const mensagemErro = document.createElement('div');
        mensagemErro.className = 'mensagem_erro';
        mensagemErro.textContent = "Erro ao buscar serviços. Tente novamente mais tarde.";
        servicosDiv.appendChild(mensagemErro);
    }
});
