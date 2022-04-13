const menu_iconos = document.querySelector(".menu-iconos");
const header_nav_div_ul = document.querySelector(".header nav div ul");
const nav_item = document.querySelectorAll(".header nav div ul li a");
const filter = document.querySelector(".filter");

const carritoIcono = document.querySelector(".carritoIcono");
const carritoClose = document.querySelector(".carritoClose");
const carrito = document.querySelector(".carrito");

carritoIcono.addEventListener("click", () => {
    carrito.classList.toggle("active");
    document.querySelector("body").style.overflow = "hidden";
});
carritoClose.addEventListener("click", () => {
    carrito.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
});
menu_iconos.addEventListener("click", function () {
    menu_iconos.classList.toggle("active");
    header_nav_div_ul.classList.toggle("active");
    filter.classList.toggle("active");
    document.querySelector("body").style.overflow = "hidden";
});
nav_item.forEach((item) => {
    item.addEventListener("click", function () {
        menu_iconos.classList.remove("active");
        header_nav_div_ul.classList.remove("active");
        filter.classList.remove("active");
        carrito.classList.remove("active");
        document.querySelector("body").style.overflow = "auto";
    });
});
filter.addEventListener("click", function () {
    menu_iconos.classList.remove("active");
    header_nav_div_ul.classList.remove("active");
    filter.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
});
//--------------------rotar-------------------
const circulo = document.querySelector(".circulo");
const arriba = document.querySelector(".arriba");
const abajo = document.querySelector(".abajo");

let rotacion = circulo.style.transform;
let guardado;

let clicks = 0;
let aumento = 0;
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

let i = 0;
let e = 0;
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
const navegacion = document.querySelector("#navegacion");
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

//===== validar formulario =====
const formulario = document.querySelector("#contacto-formulario");
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const apellidos = document.querySelector("#apellidos");
const mensaje = document.querySelector("#mensaje");
const spinerFormulario = document.querySelector("#spinerFormulario");

const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

document.addEventListener("DOMContentLoaded", iniciarFormulario);

// funciones
function iniciarFormulario() {
    formulario.addEventListener("submit", enviarFormulario);
}
function texto(texto, clase) {
    const p = document.createElement("P");
    p.textContent = texto;
    p.classList.add(clase);
    const parrafo = document.querySelectorAll(`.${clase}`);
    if (parrafo.length === 0) {
        formulario.insertBefore(p, formulario.children[4]);
    }
}
function enviarFormulario(e) {
    e.preventDefault();
    if (
        nombre.value !== "" &&
        apellidos.value !== "" &&
        email.value !== "" &&
        mensaje.value !== ""
    ) {
        if (er.test(email.value)) {
            spinerFormulario.style.display = "block";
            const error = document.querySelector("#contacto .error");
            if (error) {
                error.remove();
            }
            setTimeout(() => {
                formulario.reset();
                spinerFormulario.style.display = "none";
                texto("Datos enviados correctamente", "correcto");
                const correcto = document.querySelector("#contacto .correcto");
                setTimeout(() => {
                    correcto.remove();
                }, 2500);
            }, 3500);
        } else {
            texto("Email no valido", "error");
            const error = document.querySelector("#contacto .error");
            setTimeout(() => {
                error.remove();
            }, 2500);
        }
    } else {
        texto("Rellene los campos", "error");
        const error = document.querySelector("#contacto .error");
        setTimeout(() => {
            error.remove();
        }, 2500);
    }
}

// validaFormularioSuscripcion
const mensajeFooter = document.querySelector("#footer #mensajeFooter");
const emailSuscripcion = document.querySelector(
    "#footer #formularioSuscripcion #email"
);
const formularioSuscripcion = document.querySelector(
    "#footer #formularioSuscripcion"
);
const spinerSuscripcion = document.querySelector("#footer #spinerSuscripcion");

formularioSuscripcion.addEventListener("submit", validaFormularioSuscripcion);

function validaFormularioSuscripcion(e) {
    e.preventDefault();
    if (er.test(emailSuscripcion.value)) {
        spinerSuscripcion.style.display = "block";
        mensajeFooter.style.display = "none";
        setTimeout(() => {
            formularioSuscripcion.reset();
            spinerSuscripcion.style.display = "none";
            mensajeFooter.style.display = "block";
            mensajeFooter.classList.remove("err");
            mensajeFooter.classList.add("corr");
            mensajeFooter.textContent = "Datos enviados correctamente";
            setTimeout(() => {
                mensajeFooter.style.display = "none";
            }, 2500);
        }, 3500);
    } else {
        mensajeFooter.style.display = "block";
        mensajeFooter.classList.remove("corr");
        mensajeFooter.classList.add("err");
        mensajeFooter.textContent = "Email no valido";
        setTimeout(() => {
            mensajeFooter.style.display = "none";
        }, 2500);
    }
}
