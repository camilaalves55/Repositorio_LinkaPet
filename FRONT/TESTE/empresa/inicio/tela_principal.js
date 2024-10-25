let currentIndex = 0;
const slides = document.querySelectorAll('.carrossel-item');
const totalSlides = slides.length;

function moveSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carrossel-inner').style.transform = `translateX(${offset}%)`;
}

function autoSlide() {
    moveSlide(1);
}

const slideInterval = setInterval(autoSlide, 7000); // 7000ms = 7s

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(-1);
});

document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(1);
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const empresaId = urlParams.get('empresa_id') || localStorage.getItem('id_empresa');

        if (!empresaId) {
            console.error("ID da empresa não encontrado no localStorage ou nos parâmetros da URL.");
            Swal.fire({
                title: 'Erro!',
                text: 'ID da empresa não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const empresaResponse = await fetch('http://localhost:3005/api/store/get/empresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ empresa_id: empresaId })
        });

        if (!empresaResponse.ok) {
            throw new Error('Erro ao buscar o nome da empresa: ' + empresaResponse.statusText);
        }

        const empresaResult = await empresaResponse.json();

        if (empresaResult.success) {
            document.getElementById('nome_empresa').textContent = empresaResult.data.nome_empresa;

            const logoPerfil = empresaResult.data.logo 
                ? `http://localhost:3005/upload/${empresaResult.data.logo}`
                : '../../imagens/default.png';
            document.getElementById('logo_perfil').src = logoPerfil;
        } else {
            console.log("Erro ao buscar o nome da empresa:", empresaResult.message);
        }

        const servicosResponse = await fetch(`http://localhost:3005/api/get/servicos?empresa_id=${empresaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const servicosResult = await servicosResponse.json();

        const servicosDiv = document.getElementById('servico_registrado');
        servicosDiv.innerHTML = '';  

        if (servicosResult.success && servicosResult.data.length > 0) {
            servicosResult.data.forEach(servico => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card_servico';

                const servicoDiv = document.createElement('div');
                servicoDiv.className = 'servico_item';

                const servico1Div = document.createElement('div');
                servico1Div.className = 'servico_info';

                const nomeServico = document.createElement('h3');
                nomeServico.textContent = `${servico.servico}`;

                const precoServico = document.createElement('p');
                precoServico.innerHTML = `<span class="titulo">Preço:</span> ${servico.preco}`;

                // const descricaoServico = document.createElement('p');
                // descricaoServico.innerHTML = `<span class="titulo">Descrição:</span> ${servico.descricao || 'Sem descrição disponível'}`;

                servico1Div.appendChild(nomeServico);
                servico1Div.appendChild(precoServico);
                // servicoDiv.appendChild(descricaoServico);

                cardDiv.appendChild(servico1Div);
                cardDiv.appendChild(servicoDiv);

                servicosDiv.appendChild(cardDiv);
            });
        } else {
            const mensagemErro = document.createElement('div');
            mensagemErro.textContent = "Nenhum serviço registrado foi encontrado.";
            mensagemErro.classList.add('mensagem_erro'); 

            servicosDiv.appendChild(mensagemErro);
        }
    } catch (error) {
        const servicosDiv = document.getElementById('servico_registrado');
        const mensagemErro = document.createElement('div');
        mensagemErro.textContent = "Erro ao buscar os serviços no momento. Tente novamente mais tarde.";
        mensagemErro.classList.add('mensagem_erro'); 

        servicosDiv.appendChild(mensagemErro);
        console.error("Erro ao buscar dados:", error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const botao = document.getElementById('botao');
    const containerFormulario = document.getElementById('container_formulario');
    const servicoRegistrado = document.getElementById('servico_registrado');
    const cabecalhoServico = document.querySelector('.cabecalho_servico'); 

    if (botao) {
        botao.onclick = function () {
            containerFormulario.style.display = 'block';
            servicoRegistrado.style.display = 'none';
            cabecalhoServico.style.display = 'flex';
        };
    }

    const formularioServico = document.getElementById('formulario_servico');
    if (formularioServico) {
        formularioServico.addEventListener('submit', async function (event) {
            event.preventDefault();

            const servicoElement = document.getElementById('nome_servico_1');
            const precoElement = document.getElementById('preco_servico_1');
            const horariosDisponiveisElement = document.getElementById('horarios_disponiveis_1');

            const selectedOption = servicoElement.options[servicoElement.selectedIndex];
            const servicoId = selectedOption ? selectedOption.id : '';

            if (servicoElement.value === "" || precoElement.value.trim() === "" || horariosDisponiveisElement.value.trim() === "") {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Por favor, preencha todos os campos obrigatórios.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            if (!servicoId) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Selecione um serviço válido.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

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

            const data = {
                servico_id: servicoId,
                servico: servicoElement.value,
                preco: precoElement.value,
                horarios_disponiveis: horariosDisponiveisElement.value,
                empresa_id: empresaId
            };

            try {
                const response = await fetch('http://localhost:3005/api/servicos', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'O serviço foi adicionado com sucesso.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            containerFormulario.style.display = 'none';
                            servicoRegistrado.style.display = 'block';
                            formularioServico.reset(); 
                        }
                    });
                } else {
                    throw new Error(result.message || 'Ocorreu um erro desconhecido.');
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
