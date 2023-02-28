const botaoMenu = document.querySelector('.cabecalho__menu__botao')
const menuHamburguer = document.querySelector('.menu__hamburguer')

botaoMenu.addEventListener('click', () =>{
	menuHamburguer.classList.toggle('menu__hamburguer__exibido')
	botaoMenu.classList.toggle('cabecalho__menu__botao__on')
})