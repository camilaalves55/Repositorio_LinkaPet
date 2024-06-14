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
        dateFormat: "Y-m-d",
        disableMobile: true,
    });
});