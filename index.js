const botaoMenu = document.querySelector('.cabecalho__menu__botao')
const menuHamburguer = document.querySelector('.menu__hamburguer')

botaoMenu.addEventListener('click', () =>{
	menuHamburguer.classList.toggle('menu__hamburguer__exibido')
	botaoMenu.classList.toggle('cabecalho__menu__botao__on')
})

// Trecho que controla o Accordion em informacoes.html

var acc = document.getElementsByClassName("principal__conteudo__container__accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("principal__conteudo__container__accordion-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

