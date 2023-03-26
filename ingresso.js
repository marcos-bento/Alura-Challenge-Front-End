const dadosDoCliente = document.querySelectorAll('.form__input');
const botaoAvancarIngresso = document.querySelector('.botao__ingresso');
const formNome =  document.querySelector('.form__input__nome');
const formEmail = document.querySelector('.form__input__email');
const formCPF = document.querySelector('.form__input__cpf');
const formData = document.querySelector('.form__input__data');
const txtErroNome =  document.querySelector('.principal__formulario__erro__nome');
const txtErroEmail = document.querySelector('.principal__formulario__erro__email');
const txtErroCPF = document.querySelector('.principal__formulario__erro__cpf');
const txtErroData = document.querySelector('.principal__formulario__erro__data');

botaoAvancarIngresso.addEventListener('click', () =>{
    enviarIngresso(dadosDoCliente);
});     

// função que permite receber apenas números no campo CPF
formCPF.addEventListener('keydown', function(event) {
    // verifica se o usuário pressionou backspace e deleta o último número digitado
    if (event.keyCode === 8) {
        this.value = this.value.substring(0, this.value.length - 1);
    } 
    // verifica se o usuário pressionou TAB e coloca o focus no próximo elemento da página
    if (event.keyCode === 9) {
        event.preventDefault();
        formData.focus(); 
    }

    if (this.value.length>10){
        event.preventDefault();
    } else{
        if (event.keyCode < 48 || event.keyCode > 57 && event.keyCode < 96 || event.keyCode > 105) {
            // Cancela a entrada se não for um número
            event.preventDefault();
        } 
    }
});

// Loop que verifica quando o usuário sai do campo e valida o conteúdo digitado
for (let index = 0; index < dadosDoCliente.length; index++) {
    dadosDoCliente[index].addEventListener('focusout', (event) => {
        switch (index) {
            case 0:
                validaNome(event.target.value)
                break;
            case 1:
                validaEmail(event.target.value)
                break;
            case 2:
                validaCPF(event.target.value)
                break;
            case 3:
                validaData(event.target.value)
                break;
        
            default:
                break;
        }
    });
}

function enviarIngresso (dadosDoCliente){
    if (validaNome(dadosDoCliente[0].value) && validaEmail(dadosDoCliente[1].value) && validaCPF(dadosDoCliente[2].value) && validaData(dadosDoCliente[3].value) ){
        console.log("processando...");
        const dados = dadosDoCliente;
        localStorage.setItem("nome", dados[0].value);
        

        window.location.href = "compraIngresso.html";

    } else {
        console.log('Por favor preencha todos os campos!');
    }
}

function validaNome (nome){
    // valida se o conteúdo do nome é maior do que 5 caracteres
    if (nome.length < 5){
        console.log("Nome inválido");
        formNome.classList.remove('form__input-correct');
        formNome.classList.add('form__input-error');
        txtErroNome.classList.add('principal__formulario__texto__erro-ativo');
        return false
    } else {
        formNome.classList.remove('form__input-error');
        txtErroNome.classList.remove('principal__formulario__texto__erro-ativo');
        formNome.classList.add('form__input-correct');
        return true
    }
}

function validaEmail (email){
    // valida se o conteúdo do e-mail contém um caractere @
    if (email.indexOf('@') === -1){
        console.log("E-mail inválido");
        formEmail.classList.remove('form__input-correct');
        formEmail.classList.add('form__input-error');
        txtErroEmail.classList.add('principal__formulario__texto__erro-ativo');
        return false
    } else {
        formEmail.classList.remove('form__input-error');
        txtErroEmail.classList.remove('principal__formulario__texto__erro-ativo');
        formEmail.classList.add('form__input-correct');
        return true
    }
}

function validaCPF (cpf){
    // valida se o conteúdo do CPF é válido
    if (cpf.length === 11 && calculaCPF(cpf, 10) == cpf[9] && calculaCPF(cpf, 11) == cpf[10]){
        formCPF.classList.remove('form__input-error');
        txtErroCPF.classList.remove('principal__formulario__texto__erro-ativo');
        formCPF.classList.add('form__input-correct');
        return true
    }else{
        formCPF.classList.remove('form__input-correct');
        formCPF.classList.add('form__input-error');
        txtErroCPF.classList.add('principal__formulario__texto__erro-ativo');
        return false
    }

    function calculaCPF (cpf, auxiliar){
        let soma = 0;
        for (let index = 0; index < auxiliar-1; index++) {
            soma = soma + (cpf[index] * (auxiliar-index));
        }
        soma = 11 - (soma % 11);  
        if (soma > 10){
            return 0;
        }         
        return soma;
    }
}

function validaData (data){
    // valida se a data é válida        
    if (data.length === 10 && data.match(/^\d{4}-\d{2}-\d{2}$/) && validaIdadeMinima(data)){
        formData.classList.remove('form__input-error');
        txtErroData.classList.remove('principal__formulario__texto__erro-ativo');
        formData.classList.add('form__input-correct');
        return true
    }else{
        formData.classList.remove('form__input-correct');
        formData.classList.add('form__input-error');
        txtErroData.classList.add('principal__formulario__texto__erro-ativo');
        return false
    }

    function validaIdadeMinima (data){
        // Carrega a data de hoje
        const hoje = new Date();
        const anoHoje = hoje.getFullYear();
        const mesHoje = hoje.getMonth() + 1;  
        const diaHoje = hoje.getDate();
        
        const anoInformado = parseInt(data.slice(0,4));
        const mesInformado = parseInt(data.slice(5,7));
        const diaInformado = parseInt(data.slice(8,10));

        // Valida se a pessoa possui mais do que 13 anos
        if ( (anoHoje - 13) > anoInformado){
            return true;
        } else if ((anoHoje - 13) === anoInformado){ // Se nasceu a exatos 13 anos atrás
            if (mesHoje > mesInformado){
                return true;
            } else if (mesHoje === mesInformado) { // Se nasceu nesse mês há 13 anos atrás
                if (diaHoje > diaInformado){
                    return true;
                } else if (diaHoje === diaInformado) { // Hoje é seu aniversário de 13 anos!
                    alert('Parabéns pelo seu aniversário!')
                    return true;
                } else {
                    return false;
                }   
            }
        } else {
            return false;
        }
    }
}
