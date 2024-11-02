document.addEventListener('DOMContentLoaded', async () => {
    try {

        const empresaResponse = await fetch('http://localhost:3005/api/store/get/perfil');
        console.log("Resposta do servidor ao buscar empresas:", empresaResponse);

        if (!empresaResponse.ok) {
            throw new Error('Erro ao buscar empresas: ' + empresaResponse.statusText);
        }

        const empresaResult = await empresaResponse.json();
        console.log("Resultado da busca pelas empresas:", empresaResult);

        const perfilLista = document.querySelector('.perfis_lista');

        if (empresaResult.success && empresaResult.data.length > 0) {
            empresaResult.data.forEach(perfil => {
                const card = document.createElement('div');
                card.className = 'divisoria';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'imagem'; 

                const info2Div = document.createElement('div');
                info2Div.className = 'elementos_divisoria'; 

                const h3 = document.createElement('h3');
                h3.textContent = perfil.nome_empresa; 

                const p_funcionamento = document.createElement('p');
                p_funcionamento.innerHTML = `<span class="titulo">Horario Funcionamento:</span> ${perfil.horario_funcionamento}`;
                
                const p_endereco = document.createElement('p');
                p_endereco.innerHTML = `<span class="titulo">Endereço:</span> ${perfil.endereco}`;

                const button = document.createElement('button');
                button.innerHTML = 'Agendar Serviço'; 
                button.className = 'agendar'; 
                button.style.cursor = "pointer";

                button.addEventListener('click', function() {
                    Swal.fire({
                        title: 'Ação não permitida',
                        text: 'Esta é uma conta empresarial. Não é possível realizar agendamentos, apenas visitar os perfis de empresas.',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                });

                const img = document.createElement('img');
                img.src = `http://localhost:3005/upload/${perfil.logo}`;
                img.style.cursor = "pointer";
                img.addEventListener('click', function() {
                    window.location.href = `./conta_empresa.html?id=${perfil.id}`;
                });
                img.classList.add('logo-empresa'); 

                infoDiv.appendChild(img);
                info2Div.appendChild(h3);
                info2Div.appendChild(p_funcionamento);
                info2Div.appendChild(p_endereco);
                info2Div.appendChild(button);

                card.appendChild(infoDiv);
                card.appendChild(info2Div);

                perfilLista.appendChild(card);
            });
        } else {
            const mensagemErro = document.createElement('div');
            mensagemErro.textContent = "Nenhuma empresa foi encontrada no momento.";
            mensagemErro.classList.add('mensagem_erro');

            perfilLista.appendChild(mensagemErro);
        }
    } catch (error) {
        const perfilLista = document.querySelector('.perfis_lista');
        const mensagemErro = document.createElement('div');
        mensagemErro.textContent = "Erro ao buscar os dados das empresas no momento. Tente novamente mais tarde.";
        mensagemErro.classList.add('mensagem_erro');

        perfilLista.appendChild(mensagemErro);
        console.error("Erro ao buscar dados:", error);
    }
});
