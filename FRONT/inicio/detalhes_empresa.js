document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search)

    const petshopId = urlParams.get("id")

    if(petshopId) {
        fetch(`http://localhost:3005/api/get/empresas/detalhes/${petshopId}`)
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                const detalhesMain = document.getElementById("detalhes")
                detalhesMain.innerHTML =
                `
                    <div id="logo-empresa">
                     <img id="imagem" src = "http://localhost:3005/upload/${data.data.logo}">
                    </div>
                    <h2>${data.data.nome_empresa}</h2>
                    <h3 class="titulo">Sobre a Empresa</h3>
                    <div id="linha"></div>
                    <p>${data.data.sobre_empresa}</p>
                    <h3 class="titulo">Endereço</h3>
                      <div id="linha"></div>
                    <p>${data.data.endereco}</p>
                    <h3 class="titulo">Tipos de Serviços Realizados</h3>
                      <div id="linha"></div>
                    <p>${data.data.tipos_servico}</p>
                    <h3 class="titulo">Horario de Funcionamento</h3>
                      <div id="linha"></div>
                    <p>${data.data.horario_funcionamento}</p>
                    <h3 class="titulo">Telefone</h3>
                      <div id="linha"></div>
                    <p>${data.data.telefone}</p>

                    
                `;
            } else {
                const detalhesMain = document.getElementById("detalhes")
                detalhesMain.innerHTML = `Não há Pet Shop`
            }
        })
    }
})

