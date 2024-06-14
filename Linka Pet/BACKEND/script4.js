let botaoHorarios = document.querySelectorAll('.horarios button');

botaoHorarios.forEach(function(key){
    key.addEventListener('click', function(){
        removeStyles();
        this.setAttribute('class', 'buttonClicked');
    });
})

function removeStyles(){
    for(let i = 0;i < botaoHorarios.length;i++){
        document.querySelectorAll('.horarios button')[i].removeAttribute('class');
    }
}

let botaoAgendar = document.getElementById('agendar');

botaoAgendar.onclick = function(event) {
    alert('O seu pedido de agendamento foi enviado! Aguarde confirmação.');
}

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#dataNascimento", {
        // Opções de personalização
        dateFormat: "Y-m-d",
        disableMobile: true,
        // Você pode adicionar mais opções conforme necessário
    });
});




// let butaoAgendamento = document.getElementById("agendar");

// buttonAgendamento.onclick = async function(e) {
//     e.preventDefault();
//     let hora      = document.getElementsByClassName("hora").value;
//     let dia = document.getElementsByClassName("dia").value;
//     let data        = {hora,dia}

//     const response = await fetch('http://localhost:3000/api/store/notificacao_ofertas', {
//         method: "POST",
//         headers: {"Content-type": "application/json;charset=UTF-8"},
//         body: JSON.stringify(data)
//     });

//     let content = await response.json();

//     if(content.success) {
//         alert("Sucesso")
//     } else {
//         alert('Não');
//     }
// }


//'http://localhost:3000/api/store/notificacao_ofertas'