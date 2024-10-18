document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const petshopId = urlParams.get("id");

    if (petshopId) {
        fetch(`http://localhost:3005/api/get/empresas/detalhes/${petshopId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("nome_empresa").textContent = data.data.nome_empresa;
                    document.getElementById("endereco").textContent = data.data.endereco;
                    document.getElementById("telefone").textContent = data.data.telefone;
                    document.getElementById("horario_funcionamento").textContent = data.data.horario_funcionamento;
                    document.getElementById("sobre_empresa").textContent = data.data.sobre_empresa;
                    document.getElementById("tipos_servico").textContent = data.data.tipos_servico;

                    const logoEmpresa = data.data.logo ? data.data.logo : 'default.png'; 
                    const imagemPerfil = document.getElementById('imagem');
        
                    imagemPerfil.src = `http://localhost:3005/upload/${logoEmpresa}?t=${new Date().getTime()}`;
                    imagemPerfil.onerror = function () {
                        this.src = '../../imagens/default.png'; 
                    };
                } else {
                    document.getElementById("detalhes").innerHTML = `Não há detalhes disponíveis para este Pet Shop.`;
                }
            })
            .catch(error => {
                console.error("Erro ao buscar os detalhes da empresa:", error);
                document.getElementById("detalhes").innerHTML = "Erro ao carregar os detalhes da empresa.";
            });
    } else {
        document.getElementById("detalhes").innerHTML = "ID da empresa não encontrado.";
    }
});
