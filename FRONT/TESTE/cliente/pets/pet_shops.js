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

        const empresaResponse = await fetch('http://localhost:3005/api/store/get/perfil');
        console.log("Resposta do servidor ao buscar empresas:", empresaResponse);

        if (!empresaResponse.ok) {
            throw new Error('Erro ao buscar empresas: ' + empresaResponse.statusText);
        }

        const empresaResult = await empresaResponse.json();
        console.log("Resultado da busca pelas empresas:", empresaResult);

        if (empresaResult.success) {
            const perfilLista = document.querySelector('.perfis_lista');
            empresaResult.data.forEach(perfil => {
                const card = document.createElement('div');
                card.className = 'divisoria';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'imagem'; 

                const info2Div = document.createElement('div');
                info2Div.className = 'elementos-divisoria'; 

                const h3 = document.createElement('h3');
                h3.textContent = perfil.nome_empresa; 

                const p_funcionamento = document.createElement('p');
                p_funcionamento.innerHTML = `<span class="funcionamento">Horario Funcionamento</span> ${perfil.horario_funcionamento}`; 

                const button = document.createElement('button');
                button.innerHTML = 'Agendar Serviço'; 
                button.className = 'agendar'; 
                button.onclick = function() {
                    window.location.href = '../servicos/servicos.html'; 
                };
                button.style.cursor = "pointer"
                button.addEventListener('click', function() {
                    window.location.href = `../servicos/servicos.html?id_empresa=${perfil.id}`
                });

                const img = document.createElement('img');
                img.src = `http://localhost:3005/upload/${perfil.logo}`;
                img.style.cursor = "pointer"
                img.addEventListener('click', function() {
                    window.location.href = `./detalhes_empresa.html?id=${perfil.id}`
                });
                img.classList.add('logo'); 

                infoDiv.appendChild(img);
                info2Div.appendChild(h3);
                info2Div.appendChild(p_funcionamento);
                info2Div.appendChild(button);

                card.appendChild(infoDiv);
                card.appendChild(info2Div);

                perfilLista.appendChild(card);
            });
        } else {
            console.log("Erro ao buscar empresas:", empresaResult.message);
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});



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


