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

                const p_sexo = document.createElement('p');
                p_sexo.innerHTML = `<span class="titulo">Sexo:</span> ${pet.sexo}`; 

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

                card.addEventListener('click', () => {
                    const nomePetEncoded = encodeURIComponent(pet.nome_pet);
                    const nomeEmpresaEncoded = encodeURIComponent(nomeEmpresa);
                    const racaEncoded = encodeURIComponent(pet.raca);
                    const sexoEncoded = encodeURIComponent(pet.sexo);
                    const descricaoEncoded = encodeURIComponent(pet.descricao);
                    window.location.href = `servicos.html?pet_id=${pet.id}&empresa_id=${empresaId}&nome_pet=${nomePetEncoded}&nome_empresa=${nomeEmpresaEncoded}&raca=${racaEncoded}&sexo=${sexoEncoded}&descricao=${descricaoEncoded}`;
                });
                                    
                infoDiv.appendChild(h2);
                infoDiv.appendChild(p_raca);
                infoDiv.appendChild(p_sexo);
                infoDiv.appendChild(p_descricao);
                infoDiv.appendChild(p_especie);
                infoDiv.appendChild(p_data);

                fotoDiv.appendChild(img);

                card.appendChild(fotoDiv);
                card.appendChild(infoDiv);
                petsLista.appendChild(card);
            });
        } else {
            petsLista.innerHTML = '<div class="mensagem_erro">Nenhum pet encontrado.</div>'; 
        }
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
    }
});  
