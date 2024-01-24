let listaNumSorteados = [];
let numLimite = 10;
let numSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial(){
    exibirTextoNaTela('.title', 'Acerte o Número Secreto!'); 
    let numMax = `Escolha um número entre 1 e ${numLimite}!`;
    exibirTextoNaTela('.texto__paragrafo', numMax);   
}

exibirMsgInicial();


function verificarChute() {
    let chute = document.querySelector('.container__input').value;
    if(chute == numSecreto){
        exibirTextoNaTela('.title', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('.texto__paragrafo', msgTentativas);
        document.querySelector('#reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numSecreto){
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é menor.');
        }else{
            exibirTextoNaTela('.texto__paragrafo', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumAleatorio() {
    let numEscolhido = parseInt(Math.random() * numLimite + 1);
    let qtdElEscolhido = listaNumSorteados.length;

    if(qtdElEscolhido == numLimite){
        listaNumSorteados = [];
    }

    if(listaNumSorteados.includes(numEscolhido)){
        return gerarNumAleatorio();
    }else{
        listaNumSorteados.push(numEscolhido);
        console.log(listaNumSorteados);
        return numEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('.container__input');
    chute.value = '';
}

function reiniciarJogo(){
    numSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}




