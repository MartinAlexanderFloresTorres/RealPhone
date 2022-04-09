//===== carrito de compras =====
const body = document.querySelector("body");
const carritoContenedor = document.querySelector(".carrito__Center");
const indiceContador = document.querySelector(".indiceContador");
const btnPagar = document.querySelector(".pagar");
const agregadoExitosamente = document.querySelector(".agregadoExitosamente");
let carritoCompras = [];

function cargarListeners() {
    body.addEventListener("click", AgregarCarrito);
    carritoContenedor.addEventListener("click", eliminarProducto);
    document.addEventListener("DOMContentLoaded", () => {
        const getCarrito = JSON.parse(
            localStorage.getItem("carrito__RP") || []
        );
        if (getCarrito.length != 0) {
            carritoCompras = getCarrito;
            imprimirHtml();
        }
        indice();
    });
}
cargarListeners();

//===== AgregarCarrito =====
function AgregarCarrito(e) {
    if (e.target.classList.contains("boton")) {
        e.preventDefault();
        const div = e.target.parentElement.parentElement;
        leerDatos(div);
        if (!agregadoExitosamente.classList.contains("active")) {
            agregadoExitosamente.classList.add("active");
            setTimeout(() => {
                agregadoExitosamente.classList.remove("active");
            }, 2500);
        }
    }
}
//===== eliminar productos =====
function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("eliminar")) {
        const dataId = parseInt(e.target.getAttribute("data-id"));
        carritoCompras = carritoCompras.filter((producto) => {
            return producto.id !== dataId;
        });
        imprimirHtml();
        if (carritoCompras.length === 0) {
            totalApagar();
        }
        carritoLocalStorage();
    }

    if (e.target.classList.contains("select__principal")) {
        const dataId = parseInt(e.target.getAttribute("data-id"));
        const select = e.target.parentElement;
        select.classList.toggle("active");
        const cantidad = e.target.querySelector(".cantidad--numero");

        select.children[1].addEventListener("click", (i) => {
            cantidad.textContent = i.target.textContent;
            select.classList.remove("active");

            const existe = carritoCompras.some((producto) => {
                return producto.id === dataId;
            });

            if (existe) {
                const copiacarrito = carritoCompras.filter((producto) => {
                    if (producto.id === dataId) {
                        producto.cantidad = i.target.textContent;
                        return producto;
                    } else {
                        return producto;
                    }
                });
                carritoCompras = [...copiacarrito];
            } else {
                carritoCompras = [...carritoCompras];
            }

            imprimirHtml();
        });
    }
}
//===== leerDatos =====
function leerDatos(div) {
    const objectoDatos = {
        imagen: div.querySelector("img").src,
        titulo: div.querySelector("h2").textContent,
        precioAntes: parseInt(div.querySelector(".precioA").textContent),
        precioAhora: parseInt(div.querySelector(".precioB").textContent),
        id: parseInt(div.querySelector(".boton").getAttribute("data-id")),
        cantidad: 1,
    };

    const existe = carritoCompras.some((producto) => {
        return producto.id === objectoDatos.id;
    });

    if (existe) {
        const copiacarrito = carritoCompras.filter((producto) => {
            if (producto.id === objectoDatos.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carritoCompras = [...copiacarrito];
    } else {
        carritoCompras = [...carritoCompras, objectoDatos];
    }

    imprimirHtml();
}
//===== imprimirHtml =====
function imprimirHtml() {
    eliminarHtmlPrevio();
    carritoCompras.forEach((producto) => {
        const { imagen, titulo, precioAntes, precioAhora, cantidad, id } =
            producto;

        const div = document.createElement("DIV");
        div.classList.add("carrito__item");
        div.innerHTML = `
                <div class="carrito__producto">
                <img src="${imagen}" alt="${titulo}">
                <div>
                    <h3>${titulo}</h3>
                    <p class="precioAntes">Antes: S/.${precioAntes}</p>
                    <p class="precioAhora">Ahora: S/.${precioAhora}</p>
                    <div class="cantidad">
                        <div>Cantidad:</div>
                        <div class="select">
                            <div class="select__principal" data-id="${id}"><span class="cantidad--numero">${cantidad}</span><i class='bx bx-chevron-down arrow'></i></div>
                            <div class="select__secundario">
                                <div class="option">1</div>
                                <div class="option">2</div>
                                <div class="option">3</div>
                                <div class="option">4</div>
                            </div>
                        </div>
                    </div>
                    <p class="carrito__entrega"> <i class='bx bx-car'></i> Llega el ${
                        id + 6
                    } de abril <a href="#" class="eliminar" data-id="${id}">Eliminar</a></p>
                </div>
            </div>

        `;
        carritoContenedor.appendChild(div);
    });
    indice();
    totalApagar();
    carritoLocalStorage();
}
//===== local Storage =====
function carritoLocalStorage() {
    localStorage.setItem("carrito__RP", JSON.stringify(carritoCompras));
}
//===== eliminarHtmlPrevio =====
function eliminarHtmlPrevio() {
    while (carritoContenedor.firstChild) {
        carritoContenedor.removeChild(carritoContenedor.firstChild);
    }
}
//===== total a pagar =====
function totalApagar() {
    let total = 0;
    const resultado = carritoCompras.reduce((total, producto) => {
        return total + producto.precioAhora * producto.cantidad;
    }, 0);
    document.querySelector(".total--numero").textContent = resultado;
}
//===== indice =====
function indice() {
    let i = 0;
    i = carritoCompras.length;
    indiceContador.textContent = i;
    if (i === 0) {
        btnPagar.style.display = "none";
    } else {
        btnPagar.style.display = "block";
    }
}
