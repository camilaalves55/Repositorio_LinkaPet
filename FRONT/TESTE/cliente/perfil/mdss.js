document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clienteId = localStorage.getItem('id_cliente');
        
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
            document.getElementById('nome').innerHTML = `<span class="titulo">Nome:</span> ${clienteData.data.nome}`;
            document.getElementById('nome_usuario').innerHTML = `<span class="titulo">Nome de Usuário:</span> ${clienteData.data.nome_usuario}`;
            document.getElementById('email').innerHTML = `<span class="titulo">Email:</span> ${clienteData.data.email}`;
            document.getElementById('telefone').innerHTML = `<span class="titulo">Telefone:</span> ${clienteData.data.telefone}`;
            document.getElementById('endereco').innerHTML = `<span class="titulo">Endereço:</span> ${clienteData.data.endereco}`;
            
            const fotoPerfil = clienteData.data.foto_perfil ? clienteData.data.foto_perfil : 'default.png';
            document.getElementById('imagem_perfil').src = `http://localhost:3005/uploads/${fotoPerfil}?t=${new Date().getTime()}`;



            document.getElementById('foto_perfil').addEventListener('click', () => {
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

            document.getElementById('okBtn').addEventListener('click', async () => {
                const formData = new FormData();
                const file = document.getElementById('fileInput').files[0];

                formData.append('cliente_id', clienteId);
                formData.append('foto_perfil', file);

                const response = await fetch('http://localhost:3005/api/store/update/foto', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    document.getElementById('imagem_perfil').src = `http://localhost:3005/uploads/${fotoPerfil}?t=${new Date().getTime()}`;

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
            });
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
            text: 'Erro ao carregar perfil. Por favor, tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

























let botaoAdicionar = document.getElementById('adicionar_pet');


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
                            img.src = event.target.result; 

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

                                    formData.append('cliente_id', clienteId);

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
                        reader.readAsDataURL(file); 
                    }
                }
            }
        }
    }
}