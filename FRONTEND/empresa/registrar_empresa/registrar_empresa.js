document.addEventListener('DOMContentLoaded', function () {
    const botao = document.getElementById('botao');
    if (botao) {
        botao.onclick = function () {
            document.getElementById('formContainer').style.display = 'block';
        };
    }

    const formContainer = document.getElementById('formContainer');
    if (formContainer) {
        document.getElementById('salvarButton').onclick = async function () {
            const formData = new FormData();
            const logoInput = document.getElementById('logo');

            if (logoInput.files.length > 0) {
                formData.append('logo', logoInput.files[0]);
            } else {
                alert('Por favor, selecione uma logo.');
                return;
            }

            formData.append('nome_empresa', document.getElementById('nome_empresa').value);
            formData.append('sobre_empresa', document.getElementById('sobre_empresa').value);
            formData.append('telefone', document.getElementById('telefone').value);
            formData.append('endereco', document.getElementById('endereco').value);
            formData.append('tipos_servico', document.getElementById('tipos_servico').value);
            formData.append('horario_funcionamento', document.getElementById('horario_funcionamento').value);
            const empresaId = localStorage.getItem('id_empresa');
            console.log("ID da empresa recuperado:", empresaId);
            
            if (!empresaId) {
                console.error("O ID da empresa não foi encontrado no localStorage.");
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
                const response = await fetch('http://localhost:3005/api/store/perfil', {
                    method: "POST",
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Os dados foram enviados com sucesso.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '../inicio/tela_principal.html';
                        }
                    });
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
                    text: error.message || 'Ocorreu um erro ao enviar os dados.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };
    }
});
