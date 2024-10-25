// document.addEventListener('DOMContentLoaded', async () => {
//     let mainImage;

//     try {
//         const empresaId = localStorage.getItem('id_empresa');

//         if (!empresaId) {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         const empresaResponse = await fetch(`http://localhost:3005/api/store/get/empresa`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ empresa_id: empresaId })
//         });

//         if (!empresaResponse.ok) {
//             throw new Error('Erro ao buscar informações da empresa.');
//         }

//         const empresaData = await empresaResponse.json();
//         console.log("Dados da empresa:", empresaData.data);

//         if (empresaData.success) {
//             document.getElementById('nome_empresa').innerText = empresaData.data.nome_empresa;
//             document.getElementById('sobre_empresa').innerText = empresaData.data.sobre_empresa;
//             document.getElementById('horario_funcionamento').innerText = empresaData.data.horario_funcionamento;
//             document.getElementById('telefone').innerText = empresaData.data.telefone;
//             document.getElementById('tipos_servico').innerText = empresaData.data.tipos_servico;
//             document.getElementById('endereco').innerText = empresaData.data.endereco;

//             mainImage = document.querySelector('.info_perfil img');
//             const logoEmpresa = empresaData.data.logo ? empresaData.data.logo : 'default.png';
//             if (mainImage) {
//                 mainImage.src = `http://localhost:3005/upload/${logoEmpresa}?t=${new Date().getTime()}`;
//                 mainImage.style.cursor = 'pointer'; 
//                 console.log("Imagem de perfil atualizada:", mainImage.src);
//             } else {
//                 console.error("Imagem principal não encontrada.");
//             }
//         } else {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: empresaData.message,
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }

//         const editField = async (field, textId) => {
//             const { value: newValue } = await Swal.fire({
//                 title: `Editar ${field.charAt(0).toUpperCase() + field.slice(1)}`,
//                 input: 'text',
//                 inputPlaceholder: `Digite o novo ${field}:`,
//                 inputValue: document.getElementById(textId).innerText,
//                 showCancelButton: true,
//                 confirmButtonText: 'Salvar'
//             });

//             if (newValue) {
//                 const success = await updateProfileData(field, newValue, empresaId);
//                 if (success) {
//                     document.getElementById(textId).innerText = newValue;
//                 }
//             }
//         };

//         const editButtons = [
//             { buttonId: 'edit-sobre_empresa', field: 'sobre_empresa', textId: 'sobre_empresa' },
//             { buttonId: 'edit-tipos_servico', field: 'tipos_servico', textId: 'tipos_servico' },
//             { buttonId: 'edit-nome_empresa', field: 'nome_empresa', textId: 'nome_empresa' },
//             { buttonId: 'edit-endereco', field: 'endereco', textId: 'endereco' },
//             { buttonId: 'edit-telefone', field: 'telefone', textId: 'telefone' },
//             { buttonId: 'edit-horario_funcionamento', field: 'horario_funcionamento', textId: 'horario_funcionamento' },
//         ];

//         editButtons.forEach(({ buttonId, field, textId }) => {
//             const button = document.getElementById(buttonId);
//             if (button) {
//                 button.addEventListener('click', () => {
//                     console.log(`Botão de edição clicado: ${buttonId}`);
//                     editField(field, textId);
//                 });
//             } else {
//                 console.warn(`Botão com ID '${buttonId}' não encontrado.`);
//             }
//         });

//         const updateProfileData = async (field, newValue, empresaId) => {
//             try {
//                 const response = await fetch('http://localhost:3005/api/update/perfil/empresa', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         field,
//                         value: newValue,
//                         empresa_id: empresaId
//                     })
//                 });

//                 const result = await response.json();
//                 if (!result.success) {
//                     console.error('Erro ao atualizar perfil:', result.message);
//                     Swal.fire({
//                         title: 'Erro!',
//                         text: result.message,
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                     return false;
//                 }
//                 return true;
//             } catch (error) {
//                 console.error('Erro ao enviar atualização:', error);
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: 'Erro ao enviar atualização.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 return false;
//             }
//         };

//         const abrirModalFoto = () => {
//             const logoAtual = mainImage.src;
//             const previewImg = document.getElementById('previewImg');
//             if (previewImg) {
//                 previewImg.src = logoAtual;
//             }
//             const modal = document.getElementById('modal');
//             if (modal) {
//                 modal.style.display = 'block';
//                 console.log("Modal aberto.");
//             } else {
//                 console.error("Modal não encontrado.");
//             }
//         };

//         if (mainImage) {
//             mainImage.addEventListener('click', abrirModalFoto);
//             console.log("Evento de clique adicionado à imagem principal.");
//         } else {
//             console.error("Imagem principal não encontrada para adicionar o evento de clique.");
//         }

//         const fecharModal = () => {
//             const modal = document.getElementById('modal');
//             if (modal) {
//                 modal.style.display = 'none';
//                 console.log("Modal fechado pelo 'x'.");
//             }
//         };

//         const closeButton = document.getElementById('close');
//         if (closeButton) {
//             closeButton.addEventListener('click', fecharModal);
//         } else {
//             console.warn("Elemento de fechar o modal ('close') não encontrado.");
//         }

//         window.addEventListener('click', (event) => {
//             const modal = document.getElementById('modal');
//             if (modal && event.target === modal) {
//                 modal.style.display = 'none';
//                 console.log("Modal fechado ao clicar fora do conteúdo.");
//             }
//         });

//         const carregarNovaFoto = (event) => {
//             const file = event.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                     const previewImg = document.getElementById('previewImg');
//                     if (previewImg) {
//                         previewImg.src = reader.result;
//                         console.log("Nova imagem pré-visualizada.");
//                     }
//                     const okBtn = document.getElementById('okBtn');
//                     if (okBtn) {
//                         okBtn.style.display = 'inline-block';
//                         console.log("Botão OK exibido.");
//                     }
//                 };
//                 reader.readAsDataURL(file);
//             }
//         };

//         const trocarFotoBtn = document.getElementById('trocarFotoBtn');
//         if (trocarFotoBtn) {
//             trocarFotoBtn.addEventListener('click', () => {
//                 const fileInput = document.getElementById('fileInput');
//                 if (fileInput) {
//                     fileInput.click();
//                     console.log("Selecionador de arquivos aberto.");
//                 } else {
//                     console.error("Elemento 'fileInput' não encontrado.");
//                 }
//             });
//         } else {
//             console.warn("Botão 'trocarFotoBtn' não encontrado.");
//         }

//         const fileInput = document.getElementById('fileInput');
//         if (fileInput) {
//             fileInput.addEventListener('change', carregarNovaFoto);
//         } else {
//             console.warn("Elemento 'fileInput' não encontrado.");
//         }

//         const enviarNovaLogoPerfil = async () => {
//             const formData = new FormData();
//             const file = document.getElementById('fileInput').files[0];

//             if (!file) {
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: 'Nenhuma imagem selecionada.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 return;
//             }

//             formData.append('logo_perfil', file);
//             formData.append('empresa_id', empresaId); 

//             try {
//                 const response = await fetch('http://localhost:3005/api/store/update/logo', {
//                     method: 'POST',
//                     body: formData
//                 });

//                 if (!response.ok) {
//                     const errorMessage = await response.text();
//                     throw new Error(errorMessage);
//                 }

//                 const result = await response.json();
//                 if (result.success) {
//                     const mainImage = document.querySelector('.info_perfil img');
//                     if (mainImage) {
//                         mainImage.src = `http://localhost:3005/upload/${result.data.logo_perfil}?t=${new Date().getTime()}`;
//                         console.log("Logo de perfil atualizada com sucesso!");

//                         const modal = document.getElementById('modal');
//                         if (modal) {
//                             modal.style.display = 'none';
//                         }
//                     }
//                 } else {
//                     throw new Error(result.message);
//                 }
//             } catch (error) {
//                 console.error('Erro ao atualizar a logo:', error);
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: 'Erro ao atualizar a logo.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         };

//         const okBtn = document.getElementById('okBtn');
//         if (okBtn) {
//             okBtn.addEventListener('click', enviarNovaLogoPerfil);
//         } else {
//             console.warn("Botão 'okBtn' não encontrado.");
//         }
//     } catch (error) {
//         console.error('Erro geral:', error);
//         Swal.fire({
//             title: 'Erro!',
//             text: 'Um erro inesperado ocorreu. Por favor, tente novamente.',
//             icon: 'error',
//             confirmButtonText: 'OK'
//         });
//     }
// });





document.addEventListener('DOMContentLoaded', async () => {
    const botao = document.getElementById('botao');
    const perfilInfo = document.getElementById('perfil');

    const verificarDadosCliente = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/store/perfil');
            const data = await response.json();
            if (!data || !data.success || !data.profileData) {
                botao.style.display = 'block';
                perfilInfo.style.display = 'none';
            } else {
                document.getElementById('nome_empresa').textContent = data.profileData.nome_empresa || 'nome_empresa';
                document.getElementById('sobre_empresa').textContent = data.profileData.sobre_empresa || 'sobre_empresa';
                document.getElementById('telefone').textContent = data.profileData.telefone || 'telefone';
                document.getElementById('endereco').textContent = data.profileData.endereco || 'endereco';
                document.getElementById('horario_funcionamento').textContent = data.profileData.horario_funcionamento || 'horario_funcionamento';
                document.getElementById('tipos_servico').textContent = data.profileData.tipos_servico || 'tipos_servico';
                perfilInfo.style.display = 'block';
                botao.style.display = 'none';
            }
        } catch (error) {
            console.error('Erro ao verificar dados do cliente:', error);
        }
    };

    await verificarDadosCliente();

    if (botao) {
        botao.onclick = function () {
            document.getElementById('formContainer').style.display = 'block';
        };
    }

    const form = document.getElementById('serviceForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch('http://localhost:3005/api/store/adicionar', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Empresa adicionada com sucesso!',
                    icon: 'success'
                });
                form.reset();
                document.getElementById('formContainer').style.display = 'none';
                await verificarDadosCliente();
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: result.message || 'Erro ao adicionar empresa.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Erro ao adicionar empresa:', error);
        }
    };

    const fotoPerfilBtn = document.getElementById('foto_perfil');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const previewImg = document.getElementById('previewImg');
    const fileInput = document.getElementById('fileInput');
    const okBtn = document.getElementById('okBtn');

    fotoPerfilBtn.onclick = () => {
        modal.style.display = 'block';
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                okBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    };

    okBtn.onclick = async () => {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('foto_perfil', file);
        try {
            const response = await fetch('http://localhost:3005/api/store/trocar_foto', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Foto de perfil alterada com sucesso!',
                    icon: 'success'
                });
                modal.style.display = 'none';
                await verificarDadosCliente();
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: result.message || 'Erro ao trocar foto.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Erro ao trocar foto:', error);
        }
    };
});