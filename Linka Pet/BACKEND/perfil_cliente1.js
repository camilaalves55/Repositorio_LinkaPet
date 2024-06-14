let botaoAdicionar = document.getElementById('adicionar_pet');
let div_cards = document.querySelector('.div_cards');
let pets_cadastrados = document.querySelector('.pets_cadastrados');

let nome = '';
let raca = '';
let idade = '';
let descricao = '';
let animal = '';
let data_nascimento = '';

botaoAdicionar.onclick = async function () {

    const { value: nome_criar } = await Swal.fire({
        title: 'Nome Pet:',
        input: 'text',
        inputPlaceholder: "Digite aqui"
    });

    if (nome_criar) {
        const { value: raca_criar } = await Swal.fire({
            title: 'Raça:',
            input: 'text',
            inputPlaceholder: "Digite aqui"
        });

        if (raca_criar) {
            const { value: idade_criar } = await Swal.fire({
                title: 'Idade:',
                input: 'text',
                inputPlaceholder: "Digite aqui"
            });

            if (idade_criar) {
                const { value: descricao_criar } = await Swal.fire({
                    title: 'Descrição e Avisos Sobre o Pet:',
                    input: 'text',
                    inputPlaceholder: "Digite aqui"
                });

                if (descricao_criar) {
                    const { value: animal_criar } = await Swal.fire({
                        title: "Selecione seu animal",
                        input: "select",
                        inputOptions: {
                            Animais: {
                                Cachorro: "Cachorro(a)",
                                Gato: "Gato(a)",
                                Outro: "Outro"
                            }
                        },
                        inputPlaceholder: "Selecione o animal",
                        showCancelButton: true
                    });

                    if (animal_criar) {
                        const { value: data_criar } = await Swal.fire({
                            title: 'Data de Nascimento',
                            input: 'date'
                        });

                        if (data_criar) {
                            nome = nome_criar;
                            raca = raca_criar;
                            idade = idade_criar;
                            descricao = descricao_criar;
                            animal = animal_criar;
                            data_nascimento = data_criar;

                            const bloco_card = document.createElement('div');
                            bloco_card.classList.add('bloco_card');

                            const h2 = document.createElement('h2');
                            h2.textContent = nome; 

                            const p_raca = document.createElement('p');
                            p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca}`; 

                            const p_idade = document.createElement('p');
                            p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade}`; 

                            const p_descricao = document.createElement('p');
                            p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao}`;

                            const p_animal = document.createElement('p');
                            p_animal.innerHTML = `<span class="titulo">Animal:</span> ${animal}`;

                            const p_data = document.createElement('p');
                            p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${data_nascimento.split('-').reverse().join('/')}`;

                            bloco_card.appendChild(h2);
                            bloco_card.appendChild(p_raca);
                            bloco_card.appendChild(p_idade);
                            bloco_card.appendChild(p_descricao);
                            bloco_card.appendChild(p_animal);
                            bloco_card.appendChild(p_data);

                            div_cards.appendChild(bloco_card);

                            const bloco_card_rodape = document.createElement('div');
                            bloco_card_rodape.classList.add('bloco_card_rodape');
                            // let pets_cadastrados = document.createElement('div');
                            pets_cadastrados.appendChild(bloco_card_rodape);

                            const botaoRemover = document.createElement('button');
                            botaoRemover.textContent = '-';
                            botaoRemover.id = 'retirar_pet';
                            botaoRemover.onclick = function () {
                                div_cards.removeChild(bloco_card);
                                pets_cadastrados.removeChild(bloco_card_rodape);
                            };

                            bloco_card_rodape.appendChild(botaoRemover);
                        }
                    }
                }
            }
        }
    }
}








// let botaoAdicionar = document.getElementById('adicionar_pet');
// let div_cards = document.querySelector('.div_cards');

// let nome = '';
// let raca = '';
// let idade = '';
// let descricao = '';
// let animal = '';
// let data_nascimento = '';

// botaoAdicionar.onclick = async function () {

//     const { value: nome_criar } = await Swal.fire({
//         title: 'Nome Pet:',
//         input: 'text',
//         inputPlaceholder: "Digite aqui"
//     });

//     if (nome_criar) {
//         const { value: raca_criar } = await Swal.fire({
//             title: 'Raça:',
//             input: 'text',
//             inputPlaceholder: "Digite aqui"
//         });

//         if (raca_criar) {
//             const { value: idade_criar } = await Swal.fire({
//                 title: 'Idade:',
//                 input: 'text',
//                 inputPlaceholder: "Digite aqui"
//             });

//             if (idade_criar) {
//                 const { value: descricao_criar } = await Swal.fire({
//                     title: 'Descrição e Avisos Sobre o Pet:',
//                     input: 'text',
//                     inputPlaceholder: "Digite aqui"
//                 });

//                 if (descricao_criar) {
//                     const { value: animal_criar } = await Swal.fire({
//                         title: "Selecione seu animal",
//                         input: "select",
//                         inputOptions: {
//                             Animais: {
//                                 Cachorro: "Cachorro(a)",
//                                 Gato: "Gato(a)",
//                                 Outro: "Outro"
//                             }
//                         },
//                         inputPlaceholder: "Selecione o animal",
//                         showCancelButton: true
//                     });

//                     if (animal_criar) {
//                         const { value: data_criar } = await Swal.fire({
//                             title: 'Data de Nascimento',
//                             input: 'date'
//                         });

//                         if (data_criar) {
//                             nome = nome_criar;
//                             raca = raca_criar;
//                             idade = idade_criar;
//                             descricao = descricao_criar;
//                             animal = animal_criar;
//                             data_nascimento = data_criar;

//                             const bloco_card = document.createElement('div');
//                             bloco_card.classList.add('bloco_card');

//                             const h2 = document.createElement('h2');
//                             h2.textContent = nome; 

//                             const p_raca = document.createElement('p');
//                             p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca}`; 

//                             const p_idade = document.createElement('p');
//                             p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade}`; 

//                             const p_descricao = document.createElement('p');
//                             p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao}`;

//                             const p_animal = document.createElement('p');
//                             p_animal.innerHTML = `<span class="titulo">Animal:</span> ${animal}`;

//                             const p_data = document.createElement('p');
//                             p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${data_nascimento.split('-').reverse().join('/')}`;

//                             const botaoRemover = document.createElement('button');
//                             botaoRemover.textContent = '-';
//                             botaoRemover.id = 'retirar_pet';
//                             botaoRemover.onclick = function () {
//                                 div_cards.removeChild(bloco_card);
//                             };

//                             const bloco_card_rodape = document.createElement('div');
//                             bloco_card_rodape.classList.add('bloco_card_rodape');
//                             bloco_card_rodape.appendChild(botaoRemover);

//                             bloco_card.appendChild(h2);
//                             bloco_card.appendChild(p_raca);
//                             bloco_card.appendChild(p_idade);
//                             bloco_card.appendChild(p_descricao);
//                             bloco_card.appendChild(p_animal);
//                             bloco_card.appendChild(bloco_card_rodape);
//                             bloco_card.appendChild(p_data);

//                             div_cards.appendChild(bloco_card);
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }









// let botao = document.getElementById('adicionar_pet');
// let div_cards = document.querySelector('.div_cards');

// let nome = '';
// let raca = '';
// let idade = '';
// let descricao = '';
// let animal = '';
// let data_nascimento = '';

// botao.onclick = async function () {

//     const { value: nome_criar } = await Swal.fire({
//         title: 'Nome Pet:',
//         input: 'text',
//         inputPlaceholder: "Digite aqui"
//     });

//     if (nome_criar) {
//         const { value: raca_criar } = await Swal.fire({
//             title: 'Raça:',
//             input: 'text',
//             inputPlaceholder: "Digite aqui"
//         });

//         if (raca_criar) {
//             const { value: idade_criar } = await Swal.fire({
//                 title: 'Idade:',
//                 input: 'text',
//                 inputPlaceholder: "Digite aqui"
//             });

//             if (idade_criar) {
//                 const { value: descricao_criar } = await Swal.fire({
//                     title: 'Descrição e Avisos Sobre o Pet:',
//                     input: 'text',
//                     inputPlaceholder: "Digite aqui"
//                 });

//                 if (descricao_criar) {
//                     const { value: animal_criar } = await Swal.fire({
//                         title: "Selecione seu animal",
//                         input: "select",
//                         inputOptions: {
//                             Animais: {
//                                 Cachorro: "Cachorro(a)",
//                                 Gato: "Gato(a)",
//                                 Outro: "Outro"
//                             }
//                         },
//                         inputPlaceholder: "Selecione o animal",
//                         showCancelButton: true
//                     });

//                     if (animal_criar) {
//                         const { value: data_criar } = await Swal.fire({
//                             title: 'Data de Nascimento',
//                             input: 'date'
//                         });

//                         if (data_criar) {
//                             nome = nome_criar;
//                             raca = raca_criar;
//                             idade = idade_criar;
//                             descricao = descricao_criar;
//                             animal = animal_criar;
//                             data_nascimento = data_criar;

//                             const bloco_card = document.createElement('div');
//                             bloco_card.classList.add('bloco_card');

//                             const h2 = document.createElement('h2');
//                             h2.textContent = nome; 

//                             const p_raca = document.createElement('p');
//                             p_raca.innerHTML = `<span class="titulo">Raça:</span> ${raca}`; 

//                             const p_idade = document.createElement('p');
//                             p_idade.innerHTML = `<span class="titulo">Idade:</span> ${idade}`; 

//                             const p_descricao = document.createElement('p');
//                             p_descricao.innerHTML = `<span class="titulo">Descrição:</span> ${descricao}`;

//                             const p_animal = document.createElement('p');
//                             p_animal.innerHTML = `<span class="titulo">Animal:</span> ${animal}`;

//                             const bloco_card_rodape = document.createElement('div');
//                             bloco_card_rodape.classList.add('bloco_card_rodape');

//                             let dia = data_nascimento.slice(8, 10);
//                             let mes = data_nascimento.slice(5, 7);
//                             let ano = data_nascimento.slice(0, 4);

//                             const p_data = document.createElement('p');
//                             p_data.innerHTML = `<span class="titulo">Nascimento:</span> ${dia}/${mes}/${ano}`;

//                             bloco_card.appendChild(h2);
//                             bloco_card.appendChild(p_raca);
//                             bloco_card.appendChild(p_idade);
//                             bloco_card.appendChild(p_descricao);
//                             bloco_card.appendChild(p_animal);
//                             bloco_card.appendChild(p_data);

//                             div_cards.appendChild(bloco_card);
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
