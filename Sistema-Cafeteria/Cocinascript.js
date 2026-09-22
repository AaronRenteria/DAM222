let productos = [


    { id: 1, nombre: "Cafe", precio: 30, tipo: "Bebida" },
    { id: 2, nombre: "Chilaquiles", precio: 75, tipo: "Comida" },
    { id: 3, nombre: "Pastel de Chocolate", precio: 65, tipo: "Postre" },
    { id: 4, nombre: "Coca Cola", precio: 25, tipo: "Bebida" },
    { id: 5, nombre: "Capuchino", precio: 45, tipo: "Bebida" },
    { id: 6, nombre: "Tamales", precio: 35, tipo: "Comida" },
    { id: 7, nombre: "Cheesecake", precio: 80, tipo: "Postre" },
    { id: 8, nombre: "Americano", precio: 25, tipo: "Bebida" },
    { id: 9, nombre: "Sandwich", precio: 50, tipo: "Comida" },
    { id: 10, nombre: "Tarta de Fresa", precio: 70, tipo: "Postre" },
    { id: 11, nombre: "Agua Natural", precio: 15, tipo: "Bebida" },
    { id: 12, nombre: "Latte", precio: 50, tipo: "Bebida" },
    { id: 13, nombre: "Huevos con Jamon", precio: 65, tipo: "Comida" },
    { id: 14, nombre: "Pastel de Tres Leches", precio: 75, tipo: "Postre" },
    { id: 15, nombre: "Te de Manzanilla", precio: 30, tipo: "Bebida" },
    { id: 16, nombre: "Mocha", precio: 55, tipo: "Bebida" },
    { id: 17, nombre: "Quesadillas", precio: 45, tipo: "Comida" },
    { id: 18, nombre: "Pastel de Vainilla", precio: 55, tipo: "Postre" },
    { id: 19, nombre: "Jugo de Naranja", precio: 40, tipo: "Bebida" },
    { id: 20, nombre: "Espresso", precio: 20, tipo: "Bebida" },
    { id: 21, nombre: "Molletes", precio: 60, tipo: "Comida" },
    { id: 22, nombre: "Red Velvet", precio: 95, tipo: "Postre" },
    { id: 23, nombre: "Limonada", precio: 30, tipo: "Bebida" },
    { id: 24, nombre: "Cafe Irlandes", precio: 85, tipo: "Bebida" },
    { id: 25, nombre: "Enchiladas", precio: 80, tipo: "Comida" },
    { id: 26, nombre: "Pastel de Zanahoria", precio: 65, tipo: "Postre" },
    { id: 27, nombre: "Fanta", precio: 25, tipo: "Bebida" },
    { id: 28, nombre: "Chocolate Caliente", precio: 45, tipo: "Bebida" },
    { id: 29, nombre: "Torta de Chilaquiles", precio: 70, tipo: "Comida" },
    { id: 30, nombre: "Pastel de Cafe", precio: 90, tipo: "Postre" }


];

// Función para mostrar los productos en la página
function mostrarProductos() {
    let texto = "";

    productos.forEach(function(producto) {
        texto += `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}

                <button onclick="editarProducto(${producto.id})">
                    Editar
                </button>

                <button onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </div>
        `;
    });

    document.getElementById("productos").innerHTML = texto;
}

// Función para agregar un nuevo producto
function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
     let tipo = document.getElementById("tipo").value;
    let precio = Number(document.getElementById("precio").value);

    let producto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        tipo: tipo
    };

    productos.push(producto);

    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("precio").value = "";

    mostrarProductos();
}


function editarProducto(id) {
    let producto = productos.find(function(producto) {
        return producto.id == id;
    });

    let nuevoNombre = prompt("Nuevo nombre", producto.nombre);
    let nuevoPrecio = prompt("Nuevo precio", producto.precio);
    let nuevoTipo = prompt("Nuevo tipo", producto.tipo);

    producto.nombre = nuevoNombre;
    producto.precio = Number(nuevoPrecio);
    producto.tipo = nuevoTipo;

    mostrarProductos();
}

function eliminarProducto(id) {
    productos = productos.filter(function(producto) {
        return producto.id != id;
    });

    mostrarProductos();
}

function mostrarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let texto = "";

    pedidos.forEach(function(pedido) {
        if (pedido.estado == "En cocina" || pedido.estado == "Listo") {
            texto += `
                <div class="pedido">
                    <p>Pedido ${pedido.id}</p>
                    <p>Total: $${pedido.total}</p>
                    <p>Estado: ${pedido.estado}</p>

                    <button onclick="pedidoListo(${pedido.id})">
                        Pedido listo
                    </button>
                </div>
            `;
        }
    });

    document.getElementById("pedidos").innerHTML = texto;
}

//
function pedidoListo(id) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let pedido = pedidos.find(function(pedido) {
        return pedido.id == id;
    });

    pedido.estado = "Listo";

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Pedido listo");

    mostrarPedidos();
}

//parte del menu desplegable

const boton = document.getElementById("btn-menu");
const menu = document.getElementById("menu-contenido");

boton.addEventListener("click", () => {
  menu.classList.toggle("oculto");
});

function productosCaros() {

    let resultado = productos.filter(function(producto) {
        return producto.precio > 50;
    });

    mostrarResultado(resultado);
}

function productosBaratos() {

    let resultado = productos.filter(function(producto) {
        return producto.precio < 50;
    });

    mostrarResultado(resultado);
}

function buscarPostres() {

    let resultado = productos.filter(function(producto) {
        return producto.tipo == "Postre";
    });

    mostrarResultado(resultado);
}

function buscarCafes() {

    let resultado = productos.filter(function(producto) {
        return producto.tipo == "Bebida";
    });

    mostrarResultado(resultado);
}


function mostrarResultado(resultado) {

    let texto = "";

    resultado.forEach(function(producto) {

        texto += `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}
            </div>
        `;

    });

    document.getElementById("productos").innerHTML = texto;
}


//Se utilizo la funcion find
function buscarProducto() {

    let nombre = prompt("Escribe el nombre del producto");

    let producto = productos.find(function(producto) {

        return producto.nombre.toLowerCase() == nombre.toLowerCase();

    });

    if (producto) {

        alert(
            "Producto: " + producto.nombre +
            "\nPrecio: $" + producto.precio +
            "\nTipo: " + producto.tipo
        );

    } else {

        alert("Producto no encontrado");

    }
}

mostrarProductos();
mostrarPedidos();