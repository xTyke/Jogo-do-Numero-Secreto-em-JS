listaDeNumerosSorteados = []
let numeroLimite = 10;
let NumSecreto = geradorNumSecreto();
let tentativas = 1

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.0} );
}
function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
        if (chute == NumSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
            exibirTextoNaTela('p', mensagemTentativas)
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute < NumSecreto) {
                exibirTextoNaTela('p', 'O numero secreto eh maior!');
            } else {
                exibirTextoNaTela('p', 'O numero secreto eh menor!');
            }
            tentativas++;
            limparCampo();
        }
}

function geradorNumSecreto () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return geradorNumSecreto()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value='';
}
function reiniciarJogo(){
    NumSecreto = geradorNumSecreto();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}