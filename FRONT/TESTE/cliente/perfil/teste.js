document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clienteId = localStorage.getItem('id_cliente');
        console.log('ID do cliente:', clienteId);

        if (!clienteId) {
            Swal.fire({
                title: 'Erro!',
                text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const clienteResponse = await fetch('http://localhost:3005/api/store/get/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar informações do cliente.');
        }

        const clienteData = await clienteResponse.json();

        if (clienteData.success) {
            document.getElementById('nome').innerHTML = 
                `<div class="info_div">
                    <div class="texto_div">
                        <span class="titulos">Nome:</span> 
                        <span id="nome-text">${clienteData.data.nome}</span>
                    </div>
                    <button id="edit-nome" class="edit-btn">Editar</button>
                </div>`;
                
            document.getElementById('nome_usuario').innerHTML = 
                `<div class="info_div">
                    <div class="texto_div">
                        <span class="titulos">Nome de Usuário:</span> 
                        <span id="nome_usuario-text">${clienteData.data.nome_usuario}</span>
                    </div>
                    <button id="edit-nome_usuario" class="edit-btn">Editar</button>
                </div>`;
                
            document.getElementById('email').innerHTML = 
                `<div class="info_div">
                    <div class="texto_div">
                        <span class="titulos">Email:</span> 
                        <span id="email-text">${clienteData.data.email}</span>
                    </div>
                    <button id="edit-email" class="edit-btn">Editar</button>
                </div>`;
                
            document.getElementById('telefone').innerHTML = 
                `<div class="info_div">
                    <div class="texto_div">
                        <span class="titulos">Telefone:</span> 
                        <span id="telefone-text">${clienteData.data.telefone}</span>
                    </div>
                    <button id="edit-telefone" class="edit-btn">Editar</button>
                </div>`;
                
            document.getElementById('endereco').innerHTML = 
                `<div class="info_div">
                    <div class="texto_div">
                        <span class="titulos">Endereço:</span> 
                        <span id="endereco-text">${clienteData.data.endereco}</span>
                    </div>
                    <button id="edit-endereco" class="edit-btn">Editar</button>
                </div>`;

            // Lógica para definir a foto de perfil
            const fotoPerfil = clienteData.data.foto_perfil ? clienteData.data.foto_perfil : 'default.png';
            document.getElementById('foto_perfil').src = `http://localhost:3005/upload/${fotoPerfil}?t=${new Date().getTime()}`;

            // Event listener para abrir a modal ao clicar na foto
            document.getElementById('foto_perfil').addEventListener('click', () => {
                document.getElementById('previewImg').src = document.getElementById('foto_perfil').src;
                document.getElementById('modal').style.display = 'block';
            });

            // Event listener para fechar a modal
            document.getElementById('close').addEventListener('click', () => {
                document.getElementById('modal').style.display = 'none';
            });

            // Event listener para trocar a foto
            document.getElementById('trocarFotoBtn').addEventListener('click', () => {
                document.getElementById('fileInput').click();
            });

            // Lógica para ler o arquivo selecionado
            document.getElementById('fileInput').addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        document.getElementById('previewImg').src = reader.result;
                        document.getElementById('okBtn').style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Lógica para enviar a nova foto ao servidor
            document.getElementById('okBtn').addEventListener('click', async () => {
                const formData = new FormData();
                const file = document.getElementById('fileInput').files[0];
                formData.append('cliente_id', clienteId);
                formData.append('foto_perfil', file);

                try {
                    const response = await fetch('http://localhost:3005/api/store/update/foto', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        document.getElementById('foto_perfil').src = `http://localhost:3005/upload/${result.data.foto_perfil}?t=${new Date().getTime()}`;
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Foto de perfil atualizada.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        document.getElementById('modal').style.display = 'none';
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: result.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao enviar a foto.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });

            const editField = async (field, textId) => {
                const { value: newValue } = await Swal.fire({
                    title: `Editar ${field.charAt(0).toUpperCase() + field.slice(1)}`,
                    input: 'text',
                    inputPlaceholder: `Digite o novo ${field}:`,
                    inputValue: document.getElementById(textId).textContent,
                    showCancelButton: true,
                    confirmButtonText: 'Salvar'
                });

                if (newValue) {
                    await updateProfileData(field, newValue);
                    document.getElementById(textId).textContent = newValue;
                }
            };

            document.getElementById('edit-nome').addEventListener('click', () => editField('nome', 'nome-text'));
            document.getElementById('edit-nome_usuario').addEventListener('click', () => editField('nome_usuario', 'nome_usuario-text'));
            document.getElementById('edit-email').addEventListener('click', () => editField('email', 'email-text'));
            document.getElementById('edit-telefone').addEventListener('click', () => editField('telefone', 'telefone-text'));
            document.getElementById('edit-endereco').addEventListener('click', () => editField('endereco', 'endereco-text'));

            async function updateProfileData(field, newValue) {
                try {
                    const response = await fetch('http://localhost:3005/api/update/perfil', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            field,
                            value: newValue,
                            cliente_id: clienteId
                        })
                    });

                    const result = await response.json();
                    if (!result.success) {
                        console.error('Erro ao atualizar perfil:', result.message);
                        Swal.fire({
                            title: 'Erro!',
                            text: result.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('Erro ao enviar atualização:', error);
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao enviar atualização.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }

            const petsResponse = await fetch(`http://localhost:3005/api/store/get/pets?cliente_id=${clienteId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const petsResult = await petsResponse.json();

            if (petsResult.success) {
                const petsLista = document.querySelector('.pets_lista');
                petsLista.innerHTML = '';

                petsResult.data.forEach(pet => {
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

                    const p_sexo = document.createElement('p');
                    p_sexo.innerHTML = `<span class="titulo">Sexo:</span> ${pet.sexo}`;

                    const p_observacoes = document.createElement('p');
                    p_observacoes.innerHTML = `<span class="titulo">Observações:</span> ${pet.observacoes}`;

                    const img = document.createElement('img');
                    img.src = `http://localhost:3005/upload/${pet.foto_pet}`;
                    img.alt = `Foto de ${pet.nome_pet}`;
                    img.className = 'foto_pet';

                    const button = document.createElement('button');
                    button.textContent = 'Remover Pet';
                    button.className = 'remover-pet-btn';
                    button.addEventListener('click', async () => {
                        const confirmRemove = await Swal.fire({
                            title: 'Tem certeza?',
                            text: `Você está prestes a remover o pet ${pet.nome_pet}. Isso não pode ser desfeito.`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Remover',
                            cancelButtonText: 'Cancelar'
                        });

                        if (confirmRemove.isConfirmed) {
                            await fetch(`http://localhost:3005/api/store/delete/pet`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: pet.id_pet })
                            });
                            card.remove();
                            Swal.fire({
                                title: 'Sucesso!',
                                text: `Pet ${pet.nome_pet} removido com sucesso!`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }
                    });

                    fotoDiv.appendChild(img);
                    infoDiv.appendChild(h2);
                    infoDiv.appendChild(p_raca);
                    infoDiv.appendChild(p_idade);
                    infoDiv.appendChild(p_sexo);
                    infoDiv.appendChild(p_observacoes);
                    info2Div.appendChild(fotoDiv);
                    info2Div.appendChild(button);
                    card.appendChild(infoDiv);
                    card.appendChild(info2Div);
                    petsLista.appendChild(card);
                });
            } else {
                console.error('Erro ao buscar pets:', petsResult.message);
            }
        } else {
            Swal.fire({
                title: 'Erro!',
                text: clienteData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
        Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar as informações do cliente.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

document.getElementById('cadastrarPetBtn').addEventListener('click', async () => {
    const { value: nomePet } = await Swal.fire({
        title: 'Cadastrar Novo Pet',
        input: 'text',
        inputPlaceholder: 'Digite o nome do pet',
        showCancelButton: true,
        confirmButtonText: 'Cadastrar'
    });

    if (nomePet) {
        const { value: raca } = await Swal.fire({
            title: 'Raça do Pet',
            input: 'text',
            inputPlaceholder: 'Digite a raça do pet',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'
        });

        const { value: idade } = await Swal.fire({
            title: 'Idade do Pet',
            input: 'text',
            inputPlaceholder: 'Digite a idade do pet',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'
        });

        const { value: sexo } = await Swal.fire({
            title: 'Sexo do Pet',
            input: 'text',
            inputPlaceholder: 'Digite o sexo do pet',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'
        });

        const { value: observacoes } = await Swal.fire({
            title: 'Observações do Pet',
            input: 'textarea',
            inputPlaceholder: 'Digite observações sobre o pet',
            showCancelButton: true,
            confirmButtonText: 'Cadastrar'
        });

        const { files } = document.getElementById('fileInputCadastro');
        const file = files[0];

        if (file) {
            const formData = new FormData();
            formData.append('cliente_id', localStorage.getItem('id_cliente'));
            formData.append('nome_pet', nomePet);
            formData.append('raca', raca);
            formData.append('idade', idade);
            formData.append('sexo', sexo);
            formData.append('observacoes', observacoes);
            formData.append('foto_pet', file);

            try {
                const response = await fetch('http://localhost:3005/api/store/add/pet', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Pet cadastrado com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // Adicionar o novo pet ao DOM
                    const petsLista = document.querySelector('.pets_lista');
                    const card = document.createElement('div');
                    card.className = 'bloco_card';

                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'info';

                    const info2Div = document.createElement('div');
                    info2Div.className = 'info2';

                    const fotoDiv = document.createElement('div');
                    fotoDiv.className = 'foto_div';

                    const h2 = document.createElement('h2');
                    h2.textContent = nomePet;

                    const p_raca = document.createElement('p');
                    p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca}`;

                    const p_idade = document.createElement('p');
                    p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade}`;

                    const p_sexo = document.createElement('p');
                    p_sexo.innerHTML = `<span class="titulo">Sexo:</span> ${sexo}`;

                    const p_observacoes = document.createElement('p');
                    p_observacoes.innerHTML = `<span class="titulo">Observações:</span> ${observacoes}`;

                    const img = document.createElement('img');
                    img.src = `http://localhost:3005/upload/${result.data.foto_pet}`;
                    img.alt = `Foto de ${nomePet}`;
                    img.className = 'foto_pet';

                    const button = document.createElement('button');
                    button.textContent = 'Remover Pet';
                    button.className = 'remover-pet-btn';
                    button.addEventListener('click', async () => {
                        const confirmRemove = await Swal.fire({
                            title: 'Tem certeza?',
                            text: `Você está prestes a remover o pet ${nomePet}. Isso não pode ser desfeito.`,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Remover',
                            cancelButtonText: 'Cancelar'
                        });

                        if (confirmRemove.isConfirmed) {
                            await fetch(`http://localhost:3005/api/store/delete/pet`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ id: result.data.id_pet })
                            });
                            card.remove();
                            Swal.fire({
                                title: 'Sucesso!',
                                text: `Pet ${nomePet} removido com sucesso!`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }
                    });

                    fotoDiv.appendChild(img);
                    infoDiv.appendChild(h2);
                    infoDiv.appendChild(p_raca);
                    infoDiv.appendChild(p_idade);
                    infoDiv.appendChild(p_sexo);
                    infoDiv.appendChild(p_observacoes);
                    info2Div.appendChild(fotoDiv);
                    info2Div.appendChild(button);
                    card.appendChild(infoDiv);
                    card.appendChild(info2Div);
                    petsLista.appendChild(card);
                } else {
                    Swal.fire({
                        title: 'Erro!',
                        text: result.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao cadastrar o pet.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Por favor, selecione uma foto para o pet.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
});
