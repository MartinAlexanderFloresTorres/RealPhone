const menu_iconos = document.querySelector(".menu-iconos");
const header_nav_div_ul = document.querySelector(".header nav div ul");
const nav_item = document.querySelectorAll(".header nav div ul li a");
const filter = document.querySelector(".filter");

menu_iconos.addEventListener("click", function () {
    menu_iconos.classList.toggle("active");
    header_nav_div_ul.classList.toggle("active");
    filter.classList.toggle('active');
});
nav_item.forEach((item) => {
    item.addEventListener("click", function () {
        menu_iconos.classList.remove("active");
        header_nav_div_ul.classList.remove("active");
        filter.classList.remove('active');
    });
});
filter.addEventListener("click", function () {
    menu_iconos.classList.remove("active");
    header_nav_div_ul.classList.remove("active");
    filter.classList.remove('active');
});
//--------------------rotar-------------------
const circulo = document.querySelector(".circulo");
const arriba = document.querySelector(".arriba");
const abajo = document.querySelector(".abajo");

var rotacion = circulo.style.transform;
var guardado;

var clicks = 0;
var aumento = 0;
arriba.addEventListener("click", function () {
    guardado = rotacion + "rotate(90deg)";
    circulo.style.transform = guardado;
    rotacion = guardado;
    aumento = clicks++;
    if (aumento >= 20) {
        circulo.style.transform = "";
        alert("Es Necesario Recargar La Pagina");
    }
});

var i = 0;
var e = 0;
abajo.addEventListener("click", function () {
    guardado = rotacion + "rotate(-90deg)";
    circulo.style.transform = guardado;
    rotacion = guardado;
    e = i++;
    if (e >= 20) {
        circulo.style.transform = "";
        alert("Es Necesario Recargar La Pagina");
    }
});

const header_nav = document.querySelector(".header nav");
const navegacion = document.querySelector('#navegacion');
//------------------scroll------------------------
document.addEventListener("scroll", function () {
    const valor_scroll = window.scrollY;

    if (valor_scroll > 100) {
        header_nav.style.boxShadow = "0 0 5px 1px rgba(0,0,0,0.3)";
        navegacion.style.bottom = "2%";
        navegacion.style.opacity = "1";
    } else {
        header_nav.style.boxShadow = "none";
        navegacion.style.bottom = "-50%";
        navegacion.style.opacity = "0";
    }
});
