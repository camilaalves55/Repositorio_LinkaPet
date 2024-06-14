let Button = document.querySelectorAll('.button-group button');

Button.forEach(function(key){
    key.addEventListener('click', function(){
        removeStyles();
        this.setAttribute('class', 'buttonClicked');
    });
})

function removeStyles(){
    for(let i = 0;i < Button.length;i++){
        document.querySelectorAll('.button-group button')[i].removeAttribute('class');
    }
}