document.addEventListener('DOMContentLoaded', async () => {
    try {
        const empresaId = localStorage.getItem('id_empresa');
        
        if (!empresaId) {
            Swal.fire({
                title: 'Erro!',
                text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const empresaResponse = await fetch(`http://localhost:3005/api/get/empresa/perfil?empresa_id=${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!empresaResponse.ok) {
            throw new Error('Erro ao buscar informações da empresa.');
        }

        const empresaData = await empresaResponse.json();

        if (empresaData.success) {
            document.getElementById('nome_empresa').innerHTML = `${empresaData.data.nome_empresa}`;
            document.getElementById('sobre_empresa').innerHTML = ` ${empresaData.data.sobre_empresa}`;
            document.getElementById('horario_funcionamento').innerHTML = `${empresaData.data.horario_funcionamento}`;
            document.getElementById('telefone').innerHTML = `${empresaData.data.telefone}`;
            document.getElementById('tipos_servico').innerHTML = `${empresaData.data.tipos_servico}`;
            document.getElementById('endereco').innerHTML = `${empresaData.data.endereco}`;
            
            const logoEmpresa = empresaData.data.logo ? empresaData.data.logo : 'default.png';
            document.getElementById('imagem').src = `http://localhost:3005/upload/${logoEmpresa}?t=${new Date().getTime()}`;
        } else {
            Swal.fire({
                title: 'Erro!',
                text: empresaData.message,
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

document.addEventListener('DOMContentLoaded', function () {
    const botao = document.getElementById('botao');
    if (botao) {
        botao.onclick = function () {
            document.getElementById('formContainer').style.display = 'block';
        };
    }

    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const servicoElement = document.getElementById('nome_servico_1');
            const precoElement = document.getElementById('preco_servico_1');
            const horariosDisponiveisElement = document.getElementById('horarios_disponiveis_1');

            const selectedOption = servicoElement.options[servicoElement.selectedIndex];
            const servicoId = selectedOption ? selectedOption.id : '';

            if (servicoElement && precoElement && horariosDisponiveisElement && servicoId) {
                const formData = new FormData();
                formData.append('servico', servicoElement.value);
                formData.append('preco', precoElement.value);
                formData.append('horarios_disponiveis', horariosDisponiveisElement.value);
                formData.append('servico_id', servicoId);

                const empresaId = localStorage.getItem('id_empresa');
                if (!empresaId) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }

                formData.append('empresa_id', empresaId);

                try {
                    const response1 = await fetch('http://localhost:3005/api/servicos', {
                        method: "POST",
                        body: formData
                    });

                    if (!response1.ok) {
                        const errorText = await response1.text();
                        throw new Error('Erro na resposta da solicitação: ' + errorText);
                    }

                    const result1 = await response1.json();

                    if (result1.success) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Os dados foram enviados com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                document.getElementById('formContainer').style.display = 'none';
                            }
                        });
                    } else {
                        throw new Error(result1.message);
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: error.message || 'Ocorreu um erro ao enviar os dados.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível encontrar alguns campos do formulário.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});
