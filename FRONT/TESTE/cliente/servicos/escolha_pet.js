// document.addEventListener('DOMContentLoaded', async () => {
//     const clienteId = localStorage.getItem('id_cliente');
//     const urlParams = new URLSearchParams(window.location.search);
//     const empresaId = urlParams.get('id_empresa'); 

//     if (!clienteId || !empresaId) {
//         console.error('ID do cliente ou da empresa não encontrado. Por favor, faça login novamente.');
//         return;
//     }

//     try {
//         console.log(`Buscando pets do cliente ID: ${clienteId} para a empresa ID: ${empresaId}`);

//         const response = await fetch(`http://localhost:3005/api/store/get/pets?cliente_id=${clienteId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const result = await response.json();
//         console.log("Resposta da API:", result);

//         const petsLista = document.querySelector('.pets_lista');
//         petsLista.innerHTML = ''; 

//         if (result.success && result.data.length > 0) {
//             result.data.forEach(pet => {
//                 console.log(`Adicionando pet: ${pet.nome_pet}`);

//                 const card = document.createElement('div');
//                 card.className = 'bloco_card';

//                 const infoDiv = document.createElement('div');
//                 infoDiv.className = 'info'; 

//                 const info2Div = document.createElement('div');
//                 info2Div.className = 'info2'; 

//                 const fotoDiv = document.createElement('div');
//                 fotoDiv.className = 'foto_div';

//                 const h2 = document.createElement('h2');
//                 h2.textContent = pet.nome_pet; 

//                 const p_raca = document.createElement('p');
//                 p_raca.innerHTML = `<span class="titulo">Raça:</span> ${pet.raca}`; 

//                 const p_idade = document.createElement('p');
//                 p_idade.innerHTML = `<span class="titulo">Idade:</span> ${pet.idade}`; 

//                 const img = document.createElement('img');
//                 img.src = `http://localhost:3005/upload/${pet.imagem}`;
//                 img.classList.add('imagens'); 

//                 const p_descricao = document.createElement('p');
//                 p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${pet.descricao}`; 

//                 const p_especie = document.createElement('p');
//                 p_especie.innerHTML = `<span class="titulo">Animal:</span> ${pet.especie}`; 

//                 const dataNascimento = new Date(pet.data_nascimento);
//                 const formattedDate = `${String(dataNascimento.getDate()).padStart(2, '0')}/${String(dataNascimento.getMonth() + 1).padStart(2, '0')}/${dataNascimento.getFullYear()}`;

//                 const p_data = document.createElement('p');
//                 p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${formattedDate}`;

//                 card.addEventListener('click', () => {
//                     console.log(`Clicado no pet ID: ${pet.id}, redirecionando para serviços...`);
//                     window.location.href = `servicos.html?id=${pet.id}&empresa_id=${empresaId}`;
//                 });

//                 infoDiv.appendChild(h2);
//                 infoDiv.appendChild(p_raca);
//                 infoDiv.appendChild(p_idade);
//                 infoDiv.appendChild(p_descricao);

//                 info2Div.appendChild(fotoDiv);
//                 fotoDiv.appendChild(img);
//                 info2Div.appendChild(p_especie);
//                 info2Div.appendChild(p_data);

//                 card.appendChild(infoDiv);
//                 card.appendChild(info2Div);
//                 petsLista.appendChild(card);
//             });
//         } else {
//             console.warn('Nenhum pet encontrado para o cliente.');

//             const mensagemErro = document.createElement('div');
//             mensagemErro.textContent = "Nenhum pet foi encontrado cadastrado em seu perfil.";
//             mensagemErro.classList.add('mensagem_erro');
//             petsLista.appendChild(mensagemErro);
//         }
//     } catch (error) {
//         console.error("Erro ao buscar pets:", error);

//         const petsLista = document.querySelector('.pets_lista');
//         const mensagemErro = document.createElement('div');
//         mensagemErro.textContent = "Erro ao buscar os pets. Tente novamente mais tarde."; 
//         mensagemErro.classList.add('mensagem_erro');
//         petsLista.appendChild(mensagemErro);
//     }
// });








document.addEventListener('DOMContentLoaded', async () => {
    const clienteId = localStorage.getItem('id_cliente');
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('id_empresa'); 
    const nomeEmpresa = urlParams.get('nome_empresa');

    if (!clienteId || !empresaId) {
        console.error('ID do cliente ou da empresa não encontrado. Por favor, faça login novamente.');
        return;
    }

    try {
        console.log(`Buscando pets do cliente ID: ${clienteId} para a empresa ID: ${empresaId}`);

        const response = await fetch(`http://localhost:3005/api/store/get/pets?cliente_id=${clienteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        console.log("Resposta da API:", result);

        const petsLista = document.querySelector('.pets_lista');
        petsLista.innerHTML = ''; 

        if (result.success && result.data.length > 0) {
            result.data.forEach(pet => {
                console.log(`Adicionando pet: ${pet.nome_pet}`);

                const card = document.createElement('div');
                card.className = 'bloco_card';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info'; 

                const info2Div = document.createElement('div');
                info2Div.className = 'info2'; 

                const fotoDiv = document.createElement('div');
                fotoDiv.className = 'foto_div';

                const h2 = document.createElement('h2');
                h2.textContent = pet.nome_pet; 

                const p_raca = document.createElement('p');
                p_raca.innerHTML = `<span class="titulo">Raça:</span> ${pet.raca}`; 

                const p_idade = document.createElement('p');
                p_idade.innerHTML = `<span class="titulo">Idade:</span> ${pet.idade}`; 

                const img = document.createElement('img');
                img.src = `http://localhost:3005/upload/${pet.imagem}`;
                img.classList.add('imagens'); 

                const p_descricao = document.createElement('p');
                p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${pet.descricao}`; 

                const p_especie = document.createElement('p');
                p_especie.innerHTML = `<span class="titulo">Animal:</span> ${pet.especie}`; 

                const dataNascimento = new Date(pet.data_nascimento);
                const formattedDate = `${String(dataNascimento.getDate()).padStart(2, '0')}/${String(dataNascimento.getMonth() + 1).padStart(2, '0')}/${dataNascimento.getFullYear()}`;

                const p_data = document.createElement('p');
                p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${formattedDate}`;

               
                // Quando o pet for selecionado, redirecionar para o terceiro código com o nome do pet e o nome da empresa
                card.addEventListener('click', () => {
                    const nomePetEncoded = encodeURIComponent(pet.nome_pet); // Codifica o nome do pet para a URL
                    const nomeEmpresaEncoded = encodeURIComponent(nomeEmpresa); // Certifique-se de passar o nome da empresa adiante
                    window.location.href = `servicos.html?pet_id=${pet.id}&empresa_id=${empresaId}&nome_pet=${nomePetEncoded}&nome_empresa=${nomeEmpresaEncoded}`;
                });
                

                infoDiv.appendChild(h2);
                infoDiv.appendChild(p_raca);
                infoDiv.appendChild(p_idade);
                infoDiv.appendChild(p_descricao);

                info2Div.appendChild(fotoDiv);
                fotoDiv.appendChild(img);
                info2Div.appendChild(p_especie);
                info2Div.appendChild(p_data);

                card.appendChild(infoDiv);
                card.appendChild(info2Div);
                petsLista.appendChild(card);
            });
        } else {
            console.warn('Nenhum pet encontrado para o cliente.');

            const mensagemErro = document.createElement('div');
            mensagemErro.textContent = "Nenhum pet foi encontrado cadastrado em seu perfil.";
            mensagemErro.classList.add('mensagem_erro');
            petsLista.appendChild(mensagemErro);
        }
    } catch (error) {
        console.error("Erro ao buscar pets:", error);

        const petsLista = document.querySelector('.pets_lista');
        const mensagemErro = document.createElement('div');
        mensagemErro.textContent = "Erro ao buscar os pets. Tente novamente mais tarde."; 
        mensagemErro.classList.add('mensagem_erro');
        petsLista.appendChild(mensagemErro);
    }
});

