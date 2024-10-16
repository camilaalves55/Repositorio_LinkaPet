// document.addEventListener('DOMContentLoaded', function () {
//     const botao = document.getElementById('botao');
//     if (botao) {
//         botao.onclick = function () {
//             document.getElementById('formContainer').style.display = 'block';
//         };
//     }

//     const serviceForm = document.getElementById('serviceForm');
//     if (serviceForm) {
//         serviceForm.addEventListener('submit', async function (event) {
//             event.preventDefault();

//             const formData = new FormData();
//             formData.append('logo', document.getElementById('logo').files[0]);
//             formData.append('nome_empresa', document.getElementById('nome_empresa').value);
//             formData.append('sobre_empresa', document.getElementById('sobre_empresa').value);
//             formData.append('telefone', document.getElementById('telefone').value);
//             formData.append('endereco', document.getElementById('endereco').value);
//             formData.append('tipos_servico', document.getElementById('tipos_servico').value);
//             formData.append('horario_funcionamento', document.getElementById('horario_funcionamento').value);
//             const empresaId = localStorage.getItem('id_empresa');
//             console.log("ID da empresa recuperado:", empresaId);
            
//             if (!empresaId) {
//                 console.error("O ID da empresa não foi encontrado no localStorage.");
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//                 return;
//             }

//             formData.append('empresa_id', empresaId);

//             try {
//                 const response = await fetch('http://localhost:3005/api/store/perfil', {
//                     method: "POST",
//                     body: formData
//                 });

//                 const result = await response.json();

//                 if (result.success) {
//                     Swal.fire({
//                         title: 'Sucesso!',
//                         text: 'Os dados foram enviados com sucesso.',
//                         icon: 'success',
//                         confirmButtonText: 'OK'
//                     }).then((result) => {
//                         if (result.isConfirmed) {
//                             window.location.href = '../perfil/perfil_empresa.html';
//                         }
//                     });
//                 } else {
//                     Swal.fire({
//                         title: 'Erro!',
//                         text: result.message,
//                         icon: 'error',
//                         confirmButtonText: 'OK'
//                     });
//                 }
//             } catch (error) {
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: error.message || 'Ocorreu um erro ao enviar os dados.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         });
//     }
// });













// document.addEventListener('DOMContentLoaded', function () {
//     const botao = document.getElementById('botao');
//     if (botao) {
//         botao.onclick = function () {
//             document.getElementById('formContainer').style.display = 'block';
//         };
//     }

//   const serviceForm = document.getElementById('serviceForm');
// if (serviceForm) {
//     serviceForm.addEventListener('submit', async function (event) {
//         event.preventDefault();

//         const formData = new FormData();
//         const logoInput = document.getElementById('logo');

//         // Verifique se o arquivo foi selecionado
//         if (logoInput.files.length === 0) {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: 'Você não enviou o arquivo de foto.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return; // Adicione isso para evitar o envio se não houver arquivo
//         }

//         formData.append('logo', logoInput.files[0]); // Adiciona o arquivo
//         formData.append('nome_empresa', document.getElementById('nome_empresa').value);
//         formData.append('sobre_empresa', document.getElementById('sobre_empresa').value);
//         formData.append('telefone', document.getElementById('telefone').value);
//         formData.append('endereco', document.getElementById('endereco').value);
//         formData.append('tipos_servico', document.getElementById('tipos_servico').value);
//         formData.append('horario_funcionamento', document.getElementById('horario_funcionamento').value);
        
//         const empresaId = localStorage.getItem('id_empresa');
//         console.log("ID da empresa recuperado:", empresaId);
        
//         if (!empresaId) {
//             console.error("O ID da empresa não foi encontrado no localStorage.");
//             Swal.fire({
//                 title: 'Erro!',
//                 text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         formData.append('empresa_id', empresaId);

//         try {
//             const response = await fetch('http://localhost:3005/api/store/perfil', {
//                 method: "POST",
//                 body: formData
//             });

//             const result = await response.json();

//             if (result.success) {
//                 Swal.fire({
//                     title: 'Sucesso!',
//                     text: 'Os dados foram enviados com sucesso.',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         window.location.href = '../perfil/perfil_empresa.html';
//                     }
//                 });
//             } else {
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: result.message,
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: 'Erro!',
//                 text: error.message || 'Ocorreu um erro ao enviar os dados.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//         }
//     });
// }

// });









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

            const formData = new FormData();
            const logoInput = document.getElementById('logo');

            // Apenas se o logo estiver selecionado
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
                            window.location.href = '../perfil/perfil_empresa.html';
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
        });
    }
});


















// document.addEventListener('DOMContentLoaded', function () {
//     const botao = document.getElementById('botao');
//     if (botao) {
//         botao.onclick = function () {
//             document.getElementById('formContainer').style.display = 'block';
//         };
//     }

//     const serviceForm = document.getElementById('serviceForm');
//     if (serviceForm) {
//         serviceForm.addEventListener('submit', async function (event) {
//             event.preventDefault();

//             const formData = new FormData();
//             const logoFile = document.getElementById('logo').files[0];
            
//             // Verifica se uma imagem foi selecionada
//             if (logoFile) {
//                 const reader = new FileReader();
                
//                 // Define o que acontece quando a imagem for carregada
//                 reader.onload = async function (event) {
//                     // Aqui você pode definir a pré-visualização da imagem, se necessário
//                     const imgPreview = document.createElement('img');
//                     imgPreview.src = event.target.result;
//                     imgPreview.style.maxWidth = '100px'; // Tamanho da pré-visualização
//                     document.getElementById('previewContainer').innerHTML = ''; // Limpa qualquer prévia anterior
//                     document.getElementById('previewContainer').appendChild(imgPreview); // Adiciona a nova pré-visualização

//                     // Após a pré-visualização, adiciona os dados ao FormData
//                     formData.append('logo', logoFile);
//                     formData.append('nome_empresa', document.getElementById('nome_empresa').value);
//                     formData.append('sobre_empresa', document.getElementById('sobre_empresa').value);
//                     formData.append('telefone', document.getElementById('telefone').value);
//                     formData.append('endereco', document.getElementById('endereco').value);
//                     formData.append('tipos_servico', document.getElementById('tipos_servico').value);
//                     formData.append('horario_funcionamento', document.getElementById('horario_funcionamento').value);
                    
//                     const empresaId = localStorage.getItem('id_empresa');
//                     console.log("ID da empresa recuperado:", empresaId);
                    
//                     if (!empresaId) {
//                         console.error("O ID da empresa não foi encontrado no localStorage.");
//                         Swal.fire({
//                             title: 'Erro!',
//                             text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
//                             icon: 'error',
//                             confirmButtonText: 'OK'
//                         });
//                         return;
//                     }

//                     formData.append('empresa_id', empresaId);

//                     try {
//                         const response = await fetch('http://localhost:3005/api/store/perfil', {
//                             method: "POST",
//                             body: formData
//                         });

//                         const result = await response.json();

//                         if (result.success) {
//                             Swal.fire({
//                                 title: 'Sucesso!',
//                                 text: 'Os dados foram enviados com sucesso.',
//                                 icon: 'success',
//                                 confirmButtonText: 'OK'
//                             }).then((result) => {
//                                 if (result.isConfirmed) {
//                                     window.location.href = '../perfil/perfil_empresa.html';
//                                 }
//                             });
//                         } else {
//                             Swal.fire({
//                                 title: 'Erro!',
//                                 text: result.message,
//                                 icon: 'error',
//                                 confirmButtonText: 'OK'
//                             });
//                         }
//                     } catch (error) {
//                         Swal.fire({
//                             title: 'Erro!',
//                             text: error.message || 'Ocorreu um erro ao enviar os dados.',
//                             icon: 'error',
//                             confirmButtonText: 'OK'
//                         });
//                     }
//                 };

//                 reader.readAsDataURL(logoFile); // Lê o arquivo como uma URL de dados
//             } else {
//                 Swal.fire({
//                     title: 'Erro!',
//                     text: 'Por favor, selecione uma imagem para o logotipo.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         });
//     }
// });
