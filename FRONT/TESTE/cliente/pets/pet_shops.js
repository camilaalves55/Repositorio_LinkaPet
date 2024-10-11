<<<<<<< HEAD
=======
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const clienteId = localStorage.getItem('id_cliente');
//         console.log("ID do cliente recuperado:", clienteId); 
        
//         if (!clienteId) {
//             console.error("O ID do cliente não foi encontrado no localStorage.");
//             Swal.fire({
//                 title: 'Erro!',
//                 text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
//                 icon: 'error',
//                 confirmButtonText: 'OK'
//             });
//             return;
//         }

//         // Remove a parte de busca do nome do cliente
//         /*
//         const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ cliente_id: clienteId })
//         });

//         console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

//         if (!clienteResponse.ok) {
//             throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
//         }

//         const clienteResult = await clienteResponse.json();
//         console.log("Resultado da busca pelo nome do cliente:", clienteResult);

//         if (clienteResult.success) {
//             document.getElementById('usuario').textContent = clienteResult.data.nome_usuario;
//         } else {
//             console.log("Erro ao buscar o nome do cliente:", clienteResult.message);
//         }
//         */

//         const empresaResponse = await fetch('http://localhost:3005/api/store/get/perfil');
//         console.log("Resposta do servidor ao buscar empresas:", empresaResponse);

//         if (!empresaResponse.ok) {
//             throw new Error('Erro ao buscar empresas: ' + empresaResponse.statusText);
//         }

//         const empresaResult = await empresaResponse.json();
//         console.log("Resultado da busca pelas empresas:", empresaResult);

//         if (empresaResult.success) {
//             const perfilLista = document.querySelector('.perfis_lista');
//             empresaResult.data.forEach(perfil => {
//                 const card = document.createElement('div');
//                 card.className = 'divisoria';

//                 const infoDiv = document.createElement('div');
//                 infoDiv.className = 'imagem'; 

//                 const info2Div = document.createElement('div');
//                 info2Div.className = 'elementos-divisoria'; 

//                 const h3 = document.createElement('h3');
//                 h3.textContent = perfil.nome_empresa; 

//                 const p_funcionamento = document.createElement('p');
//                 p_funcionamento.innerHTML = `<span class="funcionamento">Horario Funcionamento</span> ${perfil.horario_funcionamento}`; 

//                 const button = document.createElement('button');
//                 button.innerHTML = 'Agendar Serviço'; 
//                 button.className = 'agendar'; 
//                 button.onclick = function() {
//                     window.location.href = '../servicos/servicos.html'; 
//                 };
//                 button.style.cursor = "pointer"
//                 button.addEventListener('click', function() {
//                     window.location.href = `../servicos/servicos.html?id_empresa=${perfil.id}`
//                 });

//                 const img = document.createElement('img');
//                 img.src = `http://localhost:3005/upload/${perfil.logo}`;
//                 img.style.cursor = "pointer"
//                 img.addEventListener('click', function() {
//                     window.location.href = `./detalhes_empresa.html?id=${perfil.id}`
//                 });
//                 img.classList.add('logo'); 

//                 infoDiv.appendChild(img);
//                 info2Div.appendChild(h3);
//                 info2Div.appendChild(p_funcionamento);
//                 info2Div.appendChild(button);

//                 card.appendChild(infoDiv);
//                 card.appendChild(info2Div);

//                 perfilLista.appendChild(card);
//             });
//         } else {
//             console.log("Erro ao buscar empresas:", empresaResult.message);
//         }
//     } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//     }
// });









>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clienteId = localStorage.getItem('id_cliente');
        console.log("ID do cliente recuperado:", clienteId); 
        
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

<<<<<<< HEAD
        // Remove a parte de busca do nome do cliente
        /*
        const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
        }

        const clienteResult = await clienteResponse.json();
        console.log("Resultado da busca pelo nome do cliente:", clienteResult);

        if (clienteResult.success) {
            document.getElementById('usuario').textContent = clienteResult.data.nome_usuario;
        } else {
            console.log("Erro ao buscar o nome do cliente:", clienteResult.message);
        }
        */

=======
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
        const empresaResponse = await fetch('http://localhost:3005/api/store/get/perfil');
        console.log("Resposta do servidor ao buscar empresas:", empresaResponse);

        if (!empresaResponse.ok) {
            throw new Error('Erro ao buscar empresas: ' + empresaResponse.statusText);
        }

        const empresaResult = await empresaResponse.json();
        console.log("Resultado da busca pelas empresas:", empresaResult);

<<<<<<< HEAD
        if (empresaResult.success) {
            const perfilLista = document.querySelector('.perfis_lista');
=======
        const perfilLista = document.querySelector('.perfis_lista');

        if (empresaResult.success && empresaResult.data.length > 0) {
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
            empresaResult.data.forEach(perfil => {
                const card = document.createElement('div');
                card.className = 'divisoria';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'imagem'; 

                const info2Div = document.createElement('div');
<<<<<<< HEAD
                info2Div.className = 'elementos-divisoria'; 
=======
                info2Div.className = 'elementos_divisoria'; 
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)

                const h3 = document.createElement('h3');
                h3.textContent = perfil.nome_empresa; 

                const p_funcionamento = document.createElement('p');
<<<<<<< HEAD
                p_funcionamento.innerHTML = `<span class="funcionamento">Horario Funcionamento</span> ${perfil.horario_funcionamento}`; 
=======
                p_funcionamento.innerHTML = `<span class="titulo">Horario Funcionamento:</span> ${perfil.horario_funcionamento}`;
                
                const p_endereco = document.createElement('p');
                p_endereco.innerHTML = `<span class="titulo">Endereço:</span> ${perfil.endereco}`;
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)

                const button = document.createElement('button');
                button.innerHTML = 'Agendar Serviço'; 
                button.className = 'agendar'; 
                button.onclick = function() {
<<<<<<< HEAD
                    window.location.href = '../servicos/servicos.html'; 
                };
                button.style.cursor = "pointer"
                button.addEventListener('click', function() {
                    window.location.href = `../servicos/servicos.html?id_empresa=${perfil.id}`
=======
                    window.location.href = '../servicos/escolha_pet.html'; 
                };
                button.style.cursor = "pointer";
                button.addEventListener('click', function() {
                    window.location.href = `../servicos/escolha_pet.html?id_empresa=${perfil.id}`;
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
                });

                const img = document.createElement('img');
                img.src = `http://localhost:3005/upload/${perfil.logo}`;
<<<<<<< HEAD
                img.style.cursor = "pointer"
                img.addEventListener('click', function() {
                    window.location.href = `./detalhes_empresa.html?id=${perfil.id}`
=======
                img.style.cursor = "pointer";
                img.addEventListener('click', function() {
                    window.location.href = `./detalhes_empresa.html?id=${perfil.id}`;
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
                });
                img.classList.add('logo'); 

                infoDiv.appendChild(img);
                info2Div.appendChild(h3);
                info2Div.appendChild(p_funcionamento);
<<<<<<< HEAD
=======
                info2Div.appendChild(p_endereco);
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
                info2Div.appendChild(button);

                card.appendChild(infoDiv);
                card.appendChild(info2Div);

                perfilLista.appendChild(card);
            });
        } else {
<<<<<<< HEAD
            console.log("Erro ao buscar empresas:", empresaResult.message);
        }
    } catch (error) {
=======
            // Exibe uma mensagem caso não haja empresas
            const mensagemErro = document.createElement('div');
            mensagemErro.textContent = "Nenhuma empresa foi encontrada no momento.";
            mensagemErro.classList.add('mensagem_erro'); // Adiciona uma classe

 
            perfilLista.appendChild(mensagemErro);
        }
    } catch (error) {
        // Em caso de erro, exibe uma mensagem de erro
        const perfilLista = document.querySelector('.perfis_lista');
        const mensagemErro = document.createElement('div');
        mensagemErro.textContent = "Erro ao buscar os dados das empresas no momento. Tente novamente mais tarde.";
        mensagemErro.classList.add('mensagem_erro'); // Adiciona uma classe

   
        perfilLista.appendChild(mensagemErro);
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
        console.error("Erro ao buscar dados:", error);
    }
});



<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const perfilLista = document.querySelector('.perfis_lista');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mousedown - para iniciar o arraste
    perfilLista.addEventListener('mousedown', (e) => {
        isDown = true;
        perfilLista.classList.add('active');
        startX = e.pageX - perfilLista.offsetLeft;
        scrollLeft = perfilLista.scrollLeft;
    });

    // Mouseleave - para parar o arraste se o mouse sair da área
    perfilLista.addEventListener('mouseleave', () => {
        isDown = false;
        perfilLista.classList.remove('active');
    });

    // Mouseup - para finalizar o arraste
    perfilLista.addEventListener('mouseup', () => {
        isDown = false;
        perfilLista.classList.remove('active');
    });

    // Mousemove - para mover horizontalmente
    perfilLista.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - perfilLista.offsetLeft;
        const walk = (x - startX) * 3; // Multiplica o movimento para ajustar a velocidade
        perfilLista.scrollLeft = scrollLeft - walk;
    });

    // Suporte a dispositivos móveis (touch)
    perfilLista.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - perfilLista.offsetLeft;
        scrollLeft = perfilLista.scrollLeft;
    });

    perfilLista.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - perfilLista.offsetLeft;
        const walk = (x - startX) * 3; // Ajuste para a velocidade do arraste
        perfilLista.scrollLeft = scrollLeft - walk;
    });
});


=======
















// document.addEventListener('DOMContentLoaded', () => {
//     const perfilLista = document.querySelector('.perfis_lista');
//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     // Mousedown - para iniciar o arraste
//     perfilLista.addEventListener('mousedown', (e) => {
//         isDown = true;
//         perfilLista.classList.add('active');
//         startX = e.pageX - perfilLista.offsetLeft;
//         scrollLeft = perfilLista.scrollLeft;
//     });

//     // Mouseleave - para parar o arraste se o mouse sair da área
//     perfilLista.addEventListener('mouseleave', () => {
//         isDown = false;
//         perfilLista.classList.remove('active');
//     });

//     // Mouseup - para finalizar o arraste
//     perfilLista.addEventListener('mouseup', () => {
//         isDown = false;
//         perfilLista.classList.remove('active');
//     });

//     // Mousemove - para mover horizontalmente
//     perfilLista.addEventListener('mousemove', (e) => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - perfilLista.offsetLeft;
//         const walk = (x - startX) * 3; // Multiplica o movimento para ajustar a velocidade
//         perfilLista.scrollLeft = scrollLeft - walk;
//     });

//     // Suporte a dispositivos móveis (touch)
//     perfilLista.addEventListener('touchstart', (e) => {
//         startX = e.touches[0].pageX - perfilLista.offsetLeft;
//         scrollLeft = perfilLista.scrollLeft;
//     });

//     perfilLista.addEventListener('touchmove', (e) => {
//         const x = e.touches[0].pageX - perfilLista.offsetLeft;
//         const walk = (x - startX) * 3; // Ajuste para a velocidade do arraste
//         perfilLista.scrollLeft = scrollLeft - walk;
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const perfilLista = document.querySelector('.perfis_lista');
//     const cardWidth = document.querySelector('.divisoria').offsetWidth + parseInt(getComputedStyle(perfilLista).gap);
    
//     let scrollAmount = 0; // Armazena a quantidade de scroll feita

//     perfilLista.addEventListener('wheel', (e) => {
//         e.preventDefault();
//         const maxScrollLeft = perfilLista.scrollWidth - perfilLista.clientWidth;
        
//         if (e.deltaY > 0) {
//             // Rolar para frente (somente se não estiver no final)
//             if (scrollAmount < maxScrollLeft) {
//                 scrollAmount += cardWidth;
//                 perfilLista.scrollLeft = scrollAmount;
//             }
//         } else {
//             // Rolar para trás (somente se não estiver no início)
//             if (scrollAmount > 0) {
//                 scrollAmount -= cardWidth;
//                 perfilLista.scrollLeft = scrollAmount;
//             }
//         }
//     });

//     // Suporte para dispositivos móveis (touch)
//     let startX;
//     let scrollLeft;
//     perfilLista.addEventListener('touchstart', (e) => {
//         startX = e.touches[0].pageX - perfilLista.offsetLeft;
//         scrollLeft = perfilLista.scrollLeft;
//     });

//     perfilLista.addEventListener('touchmove', (e) => {
//         const x = e.touches[0].pageX - perfilLista.offsetLeft;
//         const walk = (x - startX) * 1.5;  // Ajusta a velocidade do arraste
//         perfilLista.scrollLeft = scrollLeft - walk;
//     });
// });
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
