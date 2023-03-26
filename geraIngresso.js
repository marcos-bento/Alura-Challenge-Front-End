let nomeIngresso = document.querySelector('.ingresso__nome');

window.addEventListener('load', geraIngresso);

function geraIngresso() {
    nomeIngresso.innerHTML = localStorage.getItem("nome");
}