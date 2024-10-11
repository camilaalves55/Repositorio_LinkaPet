// // Função para carregar informações do cliente
// // async function carregarInformacoesCliente() {
// //     const clienteId = localStorage.getItem('id_cliente');
// //     console.log('ID do cliente:', clienteId);

// //     if (!clienteId) {
// //         Swal.fire({
// //             title: 'Erro!',
// //             text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
// //             icon: 'error',
// //             confirmButtonText: 'OK'
// //         });
// //         return;
// //     }

// //     try {
// //         const clienteResponse = await fetch('http://localhost:3005/api/store/get/cliente', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ cliente_id: clienteId })
// //         });

// //         if (!clienteResponse.ok) {
// //             throw new Error('Erro ao buscar informações do cliente.');
// //         }

// //         const clienteData = await clienteResponse.json();

// //         if (clienteData.success) {
// //             preencherInformacoesCliente(clienteData.data);
// //         } else {
// //             Swal.fire({
// //                 title: 'Erro!',
// //                 text: clienteData.message,
// //                 icon: 'error',
// //                 confirmButtonText: 'OK'
// //             });
// //         }
// //     } catch (error) {
// //         Swal.fire({
// //             title: 'Erro!',
// //             text: 'Erro ao carregar informações.',
// //             icon: 'error',
// //             confirmButtonText: 'OK'
// //         });
// //     }
// // }

// async function carregarInformacoesCliente() {
//     const clienteId = localStorage.getItem('id_cliente');
//     console.log('ID do cliente:', clienteId);

//     if (!clienteId) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//         });
//         return;
//     }

//     try {
//         const clienteResponse = await fetch('http://localhost:3005/api/store/get/cliente', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ cliente_id: clienteId }) // Verifique se a estrutura de dados está correta
//         });

//         if (!clienteResponse.ok) {
//             throw new Error('Erro ao buscar informações do cliente.');
//         }

//         const clienteData = await clienteResponse.json();

//         if (clienteData.success) {
//             preencherInformacoesCliente(clienteData.data);
//         } else {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: clienteData.message,
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'Erro ao carregar informações.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//         });
//     }
// }


// // Função para preencher as informações do cliente
// function preencherInformacoesCliente(clienteData) {
//     document.getElementById('nome').innerHTML = `
//         <div class="info_div">
//             <div class="texto_div">
//                 <span class="titulos">Nome:</span> 
//                 <span id="nome-text">${clienteData.nome}</span>
//             </div>
//             <button id="edit-nome" class="edit-btn">Editar</button>
//         </div>`;

//     document.getElementById('nome_usuario').innerHTML = `
//         <div class="info_div">
//             <div class="texto_div">
//                 <span class="titulos">Nome de Usuário:</span> 
//                 <span id="nome_usuario-text">${clienteData.nome_usuario}</span>
//             </div>
//             <button id="edit-nome_usuario" class="edit-btn">Editar</button>
//         </div>`;

//     document.getElementById('email').innerHTML = `
//         <div class="info_div">
//             <div class="texto_div">
//                 <span class="titulos">Email:</span> 
//                 <span id="email-text">${clienteData.email}</span>
//             </div>
//             <button id="edit-email" class="edit-btn">Editar</button>
//         </div>`;

//     document.getElementById('telefone').innerHTML = `
//         <div class="info_div">
//             <div class="texto_div">
//                 <span class="titulos">Telefone:</span> 
//                 <span id="telefone-text">${clienteData.telefone}</span>
//             </div>
//             <button id="edit-telefone" class="edit-btn">Editar</button>
//         </div>`;

//     document.getElementById('endereco').innerHTML = `
//         <div class="info_div">
//             <div class="texto_div">
//                 <span class="titulos">Endereço:</span> 
//                 <span id="endereco-text">${clienteData.endereco}</span>
//             </div>
//             <button id="edit-endereco" class="edit-btn">Editar</button>
//         </div>`;

//     atualizarFotoPerfil(clienteData.foto_perfil);
// }

// // Função para atualizar a foto de perfil
// function atualizarFotoPerfil(fotoPerfil) {
//     const fotoPerfilSrc = fotoPerfil ? `http://localhost:3005/upload/${fotoPerfil}?t=${new Date().getTime()}` : 'default.png';
//     document.getElementById('foto_perfil').src = fotoPerfilSrc;

//     document.getElementById('foto_perfil').addEventListener('click', () => {
//         document.getElementById('previewImg').src = document.getElementById('foto_perfil').src;
//         document.getElementById('modal').style.display = 'block';
//     });

//     document.getElementById('close').addEventListener('click', () => {
//         document.getElementById('modal').style.display = 'none';
//     });

//     document.getElementById('trocarFotoBtn').addEventListener('click', () => {
//         document.getElementById('fileInput').click();
//     });

//     document.getElementById('fileInput').addEventListener('change', (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 document.getElementById('previewImg').src = reader.result;
//                 document.getElementById('okBtn').style.display = 'block';
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     document.getElementById('okBtn').addEventListener('click', enviarNovaFotoPerfil);
// }

// // Função para enviar nova foto de perfil
// async function enviarNovaFotoPerfil() {
//     const formData = new FormData();
//     const file = document.getElementById('fileInput').files[0];
//     const clienteId = localStorage.getItem('id_cliente');
//     formData.append('cliente_id', clienteId);
//     formData.append('foto_perfil', file);

//     try {
//         const response = await fetch('http://localhost:3005/api/store/update/foto', {
//             method: 'POST',
//             body: formData
//         });

//         const result = await response.json();

//         if (result.success) {
//             document.getElementById('foto_perfil').src = `http://localhost:3005/upload/${result.data.foto_perfil}?t=${new Date().getTime()}`;
//             Swal.fire({
//                 title: 'Sucesso!',
//                 text: 'Foto de perfil atualizada.',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             });
//             document.getElementById('modal').style.display = 'none';
//         } else {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: result.message,
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'Erro ao enviar a foto.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//         });
//     }
// }

// // Função para editar campo específico do cliente
// async function editField(field, textId) {
//     const { value: newValue } = await Swal.fire({
//         title: `Editar ${field.charAt(0).toUpperCase() + field.slice(1)}`,
//         input: 'text',
//         inputPlaceholder: `Digite o novo ${field}:`,
//         inputValue: document.getElementById(textId).textContent,
//         showCancelButton: true,
//         confirmButtonText: 'Salvar'
//     });

//     if (newValue) {
//         await updateProfileData(field, newValue);
//         document.getElementById(textId).textContent = newValue;
//     }
// }

// // Função para atualizar dados do cliente
// async function updateProfileData(field, newValue) {
//     const clienteId = localStorage.getItem('id_cliente');

//     try {
//         const response = await fetch('http://localhost:3005/api/update/perfil', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ field, value: newValue, cliente_id: clienteId })
//         });

//         const result = await response.json();
//         if (!result.success) {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: result.message,
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     } catch (error) {
//         Swal.fire({
//             title: 'Erro!',
//             text: 'Erro ao enviar atualização.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//         });
//     }
// }



// Função para carregar informações do cliente
async function carregarInformacoesCliente() {
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

    try {
        const clienteResponse = await fetch('http://localhost:3005/api/store/get/cliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cliente_id: clienteId }) 
        });

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar informações do cliente.');
        }

        const clienteData = await clienteResponse.json();

        if (clienteData.success) {
            preencherInformacoesCliente(clienteData.data);
        } else {
            Swal.fire({
                title: 'Erro!',
                text: clienteData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar informações.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

function preencherInformacoesCliente(clienteData) {
    document.getElementById('nome').innerHTML = `
        <div class="info_div">
            <div class="texto_div">
                <span class="titulos">Nome:</span> 
                <span id="nome-text">${clienteData.nome}</span>
            </div>
            <button id="edit-nome" class="edit-btn">Editar</button>
        </div>`;

    document.getElementById('nome_usuario').innerHTML = `
        <div class="info_div">
            <div class="texto_div">
                <span class="titulos">Nome de Usuário:</span> 
                <span id="nome_usuario-text">${clienteData.nome_usuario}</span>
            </div>
            <button id="edit-nome_usuario" class="edit-btn">Editar</button>
        </div>`;

    document.getElementById('email').innerHTML = `
        <div class="info_div">
            <div class="texto_div">
                <span class="titulos">Email:</span> 
                <span id="email-text">${clienteData.email}</span>
            </div>
            <button id="edit-email" class="edit-btn">Editar</button>
        </div>`;

    document.getElementById('telefone').innerHTML = `
        <div class="info_div">
            <div class="texto_div">
                <span class="titulos">Telefone:</span> 
                <span id="telefone-text">${clienteData.telefone}</span>
            </div>
            <button id="edit-telefone" class="edit-btn">Editar</button>
        </div>`;

    document.getElementById('endereco').innerHTML = `
        <div class="info_div">
            <div class="texto_div">
                <span class="titulos">Endereço:</span> 
                <span id="endereco-text">${clienteData.endereco}</span>
            </div>
            <button id="edit-endereco" class="edit-btn">Editar</button>
        </div>`;

    atualizarFotoPerfil(clienteData.foto_perfil);

    document.getElementById('edit-nome').addEventListener('click', () => editField('nome', 'nome-text'));
    document.getElementById('edit-nome_usuario').addEventListener('click', () => editField('nome_usuario', 'nome_usuario-text'));
    document.getElementById('edit-email').addEventListener('click', () => editField('email', 'email-text'));
    document.getElementById('edit-telefone').addEventListener('click', () => editField('telefone', 'telefone-text'));
    document.getElementById('edit-endereco').addEventListener('click', () => editField('endereco', 'endereco-text'));
}

<<<<<<< HEAD
=======


>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)


function atualizarFotoPerfil(fotoPerfil) {
    const fotoPerfilSrc = fotoPerfil ? `http://localhost:3005/upload/${fotoPerfil}?t=${new Date().getTime()}` : 'default.png';
    document.getElementById('foto_perfil').src = fotoPerfilSrc;

    document.getElementById('foto_perfil').addEventListener('click', () => {
        document.getElementById('previewImg').src = document.getElementById('foto_perfil').src;
        document.getElementById('modal').style.display = 'block';
    });

    document.getElementById('close').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'none';
    });

    document.getElementById('trocarFotoBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

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

    document.getElementById('okBtn').addEventListener('click', enviarNovaFotoPerfil);
}

async function enviarNovaFotoPerfil() {
    const formData = new FormData();
    const file = document.getElementById('fileInput').files[0];
    const clienteId = localStorage.getItem('id_cliente');
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
}

async function editField(field, textId) {
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
}

async function updateProfileData(field, newValue) {
    const clienteId = localStorage.getItem('id_cliente');

    try {
        const response = await fetch('http://localhost:3005/api/update/perfil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ field, value: newValue, cliente_id: clienteId })
        });

        const result = await response.json();
        if (!result.success) {
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
            text: 'Erro ao enviar atualização.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function carregarInformacoesPets(clienteId) {
    try {
        const petsResponse = await fetch(`http://localhost:3005/api/store/get/pets?cliente_id=${clienteId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const petsResult = await petsResponse.json();

        if (petsResult.success) {
            const petsLista = document.querySelector('.pets_lista');
            petsLista.innerHTML = '';

            petsResult.data.forEach(pet => {
                const card = document.createElement('div');
                card.className = 'bloco_card_pet';
                card.innerHTML = `
                    <div class="pet_nome">${pet.nome}</div>
                    <div class="pet_info">Espécie: ${pet.especie}</div>
                    <div class="pet_info">Raça: ${pet.raca}</div>
                    <div class="pet_info">Idade: ${pet.idade}</div>
                `;
                petsLista.appendChild(card);
            });
        } else {
            console.error(petsResult.message);
        }
    } catch (error) {
        console.error('Erro ao carregar informações dos pets:', error);
    }
}

carregarInformacoesCliente();

async function carregarInformacoesPets(clienteId) {
    try {
        const petsResponse = await fetch(`http://localhost:3005/api/store/get/pets?cliente_id=${clienteId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
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
        }
    } catch (error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Erro ao carregar informações dos pets.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await carregarInformacoesCliente();
    const clienteId = localStorage.getItem('id_cliente');
    if (clienteId) {
        await carregarInformacoesPets(clienteId);
    }
});

let botaoAdicionar = document.getElementById('adicionar_pet');
let div_cards = document.querySelector('.div_cards');
let pets_cadastrados = document.querySelector('.pets_cadastrados');


botaoAdicionar.onclick = async function () {
    const formData = new FormData();


    const { value: nome_criar } = await Swal.fire({
        title: 'Nome Pet:',
        input: 'text',
        inputPlaceholder: "Digite aqui"
    });


    if (nome_criar) {
        formData.append('nome_pet', nome_criar);
       
        const { value: raca_criar } = await Swal.fire({
            title: 'Raça:',
            input: 'text',
            inputPlaceholder: "Digite aqui"
        });


        if (raca_criar) {
            formData.append('raca', raca_criar);


            const { value: idade_criar } = await Swal.fire({
                title: 'Idade:',
                input: 'text',
                inputPlaceholder: "Digite aqui"
            });


            if (idade_criar) {
                formData.append('idade', idade_criar);


                const { value: descricao_criar } = await Swal.fire({
                    title: 'Descrição e Avisos Sobre o Pet:',
                    input: 'text',
                    inputPlaceholder: "Digite aqui"
                });


                if (descricao_criar) {
                    formData.append('descricao', descricao_criar);


                    const { value: file } = await Swal.fire({
                        title: 'Uma foto do Pet:',
                        input: 'file',
                        inputPlaceholder: "Insira aqui"
                    });


                    if (file) {
                        formData.append('imagem', file);


                        const reader = new FileReader();
                        reader.onload = async function (event) {
                            const img = document.createElement('img');
                            img.src = event.target.result; // Usando o resultado do leitor como src


                            const { value: animal_criar } = await Swal.fire({
                                title: "Selecione seu animal",
                                input: "select",
                                inputOptions: {
                                    Animais: {
                                        Cachorro: "Cachorro(a)",
                                        Gato: "Gato(a)",
                                        Outro: "Outro"
                                    }
                                },
                                inputPlaceholder: "Selecione o animal",
                                showCancelButton: true
                            });


                            if (animal_criar) {
                                formData.append('especie', animal_criar);


                                const { value: data_criar } = await Swal.fire({
                                    title: 'Data de Nascimento',
                                    input: 'date'
                                });


                                if (data_criar) {
                                    formData.append('data_nascimento', data_criar);


                                    const clienteId = localStorage.getItem('id_cliente');
                                    console.log("ID do cliente recuperado:", clienteId); // Verifique se o ID está correto


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


                                    // Adicionar o ID do cliente ao FormData
                                    formData.append('cliente_id', clienteId);


                                    // Enviar os dados do formulário
                                    const response = await fetch('http://localhost:3005/api/pets_cadastrados', {
                                        method: "POST",
                                        body: formData
                                    });


                                    const result = await response.json();


                                    if (result.success) {
                                        console.log(result.data);
                                        Swal.fire({
                                            title: 'Sucesso!',
                                            text: result.message,
                                            icon: 'success'
                                        });


                                        // const bloco_card = document.createElement('div');
                                        // bloco_card.classList.add('bloco_card');


                                        // const h2 = document.createElement('h2');
                                        // h2.textContent = nome_criar;


                                        // const p_raca = document.createElement('p');
                                        // p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca_criar}`;


                                        // const p_idade = document.createElement('p');
                                        // p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade_criar}`;


                                        // const p_descricao = document.createElement('p');
                                        // p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao_criar}`;


                                        // const p_especie = document.createElement('p');
                                        // p_especie.innerHTML = `<span class="titulo">Animal:</span> ${animal_criar}`;


                                        // const p_data = document.createElement('p');
                                        // p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${data_criar.split('-').reverse().join('/')}`;


                                        // bloco_card.appendChild(h2);
                                        // bloco_card.appendChild(p_raca);
                                        // bloco_card.appendChild(p_idade);
                                        // bloco_card.appendChild(img); // Adiciona a imagem aqui
                                        // bloco_card.appendChild(p_descricao);
                                        // bloco_card.appendChild(p_especie);
                                        // bloco_card.appendChild(p_data);


                                        // div_cards.appendChild(bloco_card);


                                        // const bloco_card_rodape = document.createElement('div');
                                        // bloco_card_rodape.classList.add('bloco_card_rodape');
                                        // pets_cadastrados.appendChild(bloco_card_rodape);


                                        // const botaoRemover = document.createElement('button');
                                        // botaoRemover.textContent = '-';
                                        // botaoRemover.id = 'retirar_pet';
                                        // botaoRemover.onclick = function () {
                                        //     div_cards.removeChild(bloco_card);
                                        //     pets_cadastrados.removeChild(bloco_card_rodape);
                                        // };


                                        // bloco_card_rodape.appendChild(botaoRemover);


                                    } else {
                                        Swal.fire({
                                            title: "Erro",
                                            text: result.message,
                                            icon: "error"
                                        });
                                    }
                                }
                            }
                        };
                        reader.readAsDataURL(file); // Ler o arquivo como URL de dados
                    }
                }
            }
        }
    }
}















// let botaoAdicionar = document.getElementById('adicionar_pet');
// let div_cards = document.querySelector('.div_cards');

// botaoAdicionar.onclick = async function () {
//     const formData = new FormData();

//     const { value: nome_criar } = await Swal.fire({
//         title: 'Nome do Pet:',
//         input: 'text',
//         inputPlaceholder: "Digite aqui"
//     });

//     if (nome_criar) {
//         formData.append('nome_pet', nome_criar);

//         const { value: raca_criar } = await Swal.fire({
//             title: 'Raça:',
//             input: 'text',
//             inputPlaceholder: "Digite aqui"
//         });

//         if (raca_criar) {
//             formData.append('raca', raca_criar);

//             const { value: idade_criar } = await Swal.fire({
//                 title: 'Idade:',
//                 input: 'text',
//                 inputPlaceholder: "Digite aqui"
//             });

//             if (idade_criar) {
//                 formData.append('idade', idade_criar);

//                 const { value: descricao_criar } = await Swal.fire({
//                     title: 'Descrição e Avisos Sobre o Pet:',
//                     input: 'text',
//                     inputPlaceholder: "Digite aqui"
//                 });

//                 if (descricao_criar) {
//                     formData.append('descricao', descricao_criar);

//                     const { value: file } = await Swal.fire({
//                         title: 'Uma foto do Pet:',
//                         input: 'file',
//                         inputPlaceholder: "Insira aqui"
//                     });

//                     if (file) {
//                         formData.append('imagem', file);

//                         const { value: animal_criar } = await Swal.fire({
//                             title: "Selecione seu animal",
//                             input: "select",
//                             inputOptions: {
//                                 Animais: {
//                                     Cachorro: "Cachorro(a)",
//                                     Gato: "Gato(a)",
//                                     Outro: "Outro"
//                                 }
//                             },
//                             inputPlaceholder: "Selecione o animal",
//                             showCancelButton: true
//                         });

//                         if (animal_criar) {
//                             formData.append('especie', animal_criar);

//                             const { value: data_criar } = await Swal.fire({
//                                 title: 'Data de Nascimento',
//                                 input: 'date'
//                             });

//                             if (data_criar) {
//                                 formData.append('data_nascimento', data_criar);

//                                 const clienteId = localStorage.getItem('id_cliente');
//                                 if (!clienteId) {
//                                     Swal.fire({
//                                         title: 'Erro!',
//                                         text: 'ID do cliente não encontrado. Faça login novamente.',
//                                         icon: 'error',
//                                         confirmButtonText: 'OK'
//                                     });
//                                     return;
//                                 }

//                                 formData.append('cliente_id', clienteId);
//                                 console.log('form:', formData);

//                                 // Enviando os dados para o backend
//                                 const response = await fetch('http://localhost:3005/api/pets_cadastrados', {
//                                     method: "POST",
//                                     body: formData
//                                 });

//                                 const result = await response.json();
//                                 console.log('result:', result);

//                                 if (result.success) {
//                                     Swal.fire({
//                                         title: 'Sucesso!',
//                                         text: result.message,
//                                         icon: 'success'
//                                     });

//                                     const petsLista = document.querySelector('.pets_lista');
//                                     const card = document.createElement('div');
//                                     card.className = 'bloco-card';

//                                     const infoDiv = document.createElement('div');
//                                     infoDiv.className = 'info';

//                                     const info2Div = document.createElement('div');
//                                     info2Div.className = 'info2';

//                                     const h2 = document.createElement('h2');
//                                     h2.textContent = nome_criar;

//                                     const p_raca = document.createElement('p');
//                                     p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca_criar}`;

//                                     const p_idade = document.createElement('p');
//                                     p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade_criar}`;

//                                     const img = document.createElement('img');
//                                     img.src = `http://localhost:3005/upload/${file.name}`; // Corrigido para pegar a imagem do upload
//                                     img.classList.add('imagens');

//                                     const p_descricao = document.createElement('p');
//                                     p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao_criar}`;

//                                     const p_especie = document.createElement('p');
//                                     p_especie.innerHTML = `<span class="titulo">Animal:</span> ${animal_criar}`;

//                                     const p_data = document.createElement('p');
//                                     p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${data_criar}`;

//                                     card.appendChild(infoDiv);
//                                     card.appendChild(info2Div);

//                                     infoDiv.appendChild(h2);
//                                     infoDiv.appendChild(p_raca);
//                                     infoDiv.appendChild(p_idade);
//                                     info2Div.appendChild(img);
//                                     info2Div.appendChild(p_descricao);
//                                     info2Div.appendChild(p_especie);
//                                     info2Div.appendChild(p_data);

//                                     petsLista.appendChild(card);
//                                 } else {
//                                     Swal.fire({
//                                         title: "Erro",
//                                         text: result.message,
//                                         icon: "error"
//                                     });
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// };








// let botaoAdicionar = document.getElementById('adicionar_pet');
// let div_cards = document.querySelector('.div_cards');
// let pets_cadastrados = document.querySelector('.pets_cadastrados');

// botaoAdicionar.onclick = async function () {
//     const formData = new FormData();

//     const { value: nome_criar } = await Swal.fire({
//         title: 'Nome do Pet:',
//         input: 'text',
//         inputPlaceholder: "Digite aqui"
//     });

//     if (nome_criar) {
//         formData.append('nome_pet', nome_criar);
        
//         const { value: raca_criar } = await Swal.fire({
//             title: 'Raça:',
//             input: 'text',
//             inputPlaceholder: "Digite aqui"
//         });

//         if (raca_criar) {
//             formData.append('raca', raca_criar);

//             const { value: idade_criar } = await Swal.fire({
//                 title: 'Idade:',
//                 input: 'text',
//                 inputPlaceholder: "Digite aqui"
//             });
          

//             if (idade_criar) {
//                 formData.append('idade', idade_criar);

//                 const { value: descricao_criar } = await Swal.fire({
//                     title: 'Descrição e Avisos Sobre o Pet:',
//                     input: 'text',
//                     inputPlaceholder: "Digite aqui"
//                 });

//                 if (descricao_criar) {
//                     formData.append('descricao', descricao_criar);

//                     const { value: file } = await Swal.fire({
//                         title: 'Uma foto do Pet:',
//                         input: 'file',
//                         inputPlaceholder: "Insira aqui"
//                     });

//                     if (file) {
//                         formData.append('imagem', file);

//                         const reader = new FileReader();
//                         reader.onload = async function (event) {
//                             const img = document.createElement('img');
//                             img.src = event.target.result; 

//                             const { value: animal_criar } = await Swal.fire({
//                                 title: "Selecione seu animal",
//                                 input: "select",
//                                 inputOptions: {
//                                     Animais: {
//                                         Cachorro: "Cachorro(a)",
//                                         Gato: "Gato(a)",
//                                         Outro: "Outro"
//                                     }
//                                 },
//                                 inputPlaceholder: "Selecione o animal",
//                                 showCancelButton: true
//                             });

//                             if (animal_criar) {
//                                 formData.append('especie', animal_criar);

//                                 const { value: data_criar } = await Swal.fire({
//                                     title: 'Data de Nascimento',
//                                     input: 'date'
//                                 });

//                                 if (data_criar) {
//                                     formData.append('data_nascimento', data_criar);

//                                     const clienteId = localStorage.getItem('id_cliente');
//                                     console.log("ID do cliente recuperado:", clienteId);

//                                     if (!clienteId) {
//                                         console.error("O ID do cliente não foi encontrado no localStorage.");
//                                         Swal.fire({
//                                             title: 'Erro!',
//                                             text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
//                                             icon: 'error',
//                                             confirmButtonText: 'OK'
//                                         });
//                                         return;
//                                     }

//                                     formData.append('cliente_id', clienteId);

//                                     const response = await fetch('http://localhost:3005/api/pets_cadastrados', {
//                                         method: "POST",
//                                         body: formData
//                                     });

//                                     const result = await response.json();

//                                     if (result.success) {
//                                         console.log(result.data);
//                                         Swal.fire({
//                                             title: 'Sucesso!',
//                                             text: result.message,
//                                             icon: 'success'
//                                         });

//                                         const petsLista = document.querySelector('.pets_lista');
//                                         const card = document.createElement('div');
//                                         card.className = 'bloco-card';

//                                         const infoDiv = document.createElement('div');
//                                         infoDiv.className = 'info';

//                                         const info2Div = document.createElement('div');
//                                         info2Div.className = 'info2';

//                                         const h2 = document.createElement('h2');
//                                         h2.textContent = nome_criar;

//                                         const p_raca = document.createElement('p');
//                                         p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca_criar}`;

//                                         const p_idade = document.createElement('p');
//                                         p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade_criar}`;

//                                         const img = document.createElement('img');
//                                         img.src = URL.createObjectURL(file);
//                                         img.classList.add('imagens');

//                                         const p_descricao = document.createElement('p');
//                                         p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao_criar}`;

//                                         const p_especie = document.createElement('p');
//                                         p_especie.innerHTML = `<span class="titulo">Animal:</span> ${animal_criar}`;

//                                         const p_data = document.createElement('p');
//                                         p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${data_criar}`;

//                                         card.appendChild(infoDiv);
//                                         card.appendChild(info2Div);

//                                         infoDiv.appendChild(h2);
//                                         infoDiv.appendChild(p_raca);
//                                         infoDiv.appendChild(p_idade);
//                                         info2Div.appendChild(img);
//                                         info2Div.appendChild(p_descricao);
//                                         info2Div.appendChild(p_especie);
//                                         info2Div.appendChild(p_data);

//                                         petsLista.appendChild(card);
//                                     } else {
//                                         Swal.fire({
//                                             title: "Erro",
//                                             text: result.message,
//                                             icon: "error"
//                                         });
//                                     }
//                                 }
//                             }
//                         };
//                         reader.readAsDataURL(file);
//                     }
//                 }
//             }
//         }
//     }
// };