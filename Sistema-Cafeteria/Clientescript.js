// Productos disponibles
let productos = [
    { id: 1, nombre: "Cafe", precio: 30, tipo: "Café" },
    { id: 2, nombre: "Chilaquiles", precio: 75, tipo: "Comida" },
    { id: 3, nombre: "Pastel de Chocolate", precio: 65, tipo: "Pastel" },
    { id: 4, nombre: "Coca Cola", precio: 25, tipo: "Bebida" },
    { id: 5, nombre: "Capuchino", precio: 45, tipo: "Café" },
    { id: 6, nombre: "Tamales", precio: 35, tipo: "Comida" },
    { id: 7, nombre: "Cheesecake", precio: 80, tipo: "Pastel" },
    { id: 8, nombre: "Americano", precio: 25, tipo: "Café" },
    { id: 9, nombre: "Sandwich", precio: 50, tipo: "Comida" },
    { id: 10, nombre: "Tarta de Fresa", precio: 70, tipo: "Pastel" },
    { id: 11, nombre: "Agua Natural", precio: 15, tipo: "Bebida" },
    { id: 12, nombre: "Latte", precio: 50, tipo: "Café" },
    { id: 13, nombre: "Huevos con Jamon", precio: 65, tipo: "Comida" },
    { id: 14, nombre: "Pastel de Tres Leches", precio: 75, tipo: "Pastel" },
    { id: 15, nombre: "Te de Manzanilla", precio: 30, tipo: "Bebida" },
    { id: 16, nombre: "Mocha", precio: 55, tipo: "Café" },
    { id: 17, nombre: "Quesadillas", precio: 45, tipo: "Comida" },
    { id: 18, nombre: "Pastel de Vainilla", precio: 55, tipo: "Pastel" },
    { id: 19, nombre: "Jugo de Naranja", precio: 40, tipo: "Bebida" },
    { id: 20, nombre: "Espresso", precio: 20, tipo: "Café" },
    { id: 21, nombre: "Molletes", precio: 60, tipo: "Comida" },
    { id: 22, nombre: "Red Velvet", precio: 95, tipo: "Pastel" },
    { id: 23, nombre: "Limonada", precio: 30, tipo: "Bebida" },
    { id: 24, nombre: "Cafe Irlandes", precio: 85, tipo: "Café" },
    { id: 25, nombre: "Enchiladas", precio: 80, tipo: "Comida" },
    { id: 26, nombre: "Pastel de Zanahoria", precio: 65, tipo: "Pastel" },
    { id: 27, nombre: "Fanta", precio: 25, tipo: "Bebida" },
    { id: 28, nombre: "Chocolate Caliente", precio: 45, tipo: "Bebida" },
    { id: 29, nombre: "Torta de Chilaquiles", precio: 70, tipo: "Comida" },
    { id: 30, nombre: "Pastel de Cafe", precio: 90, tipo: "Pastel" }
];
// Pedido actual
let pedido = [];

// Mostrar productos
function mostrarProductos() {

    let lista = productos.map(function(producto, i) {

        return `
            <p>
                ${producto.nombre} - $${producto.precio}

                <button onclick="agregarProducto(${i})">
                    Agregar
                </button>
            </p>
        `;
    });

    document.getElementById("productos").innerHTML =
        lista.join("");
}


// Agregar producto
function agregarProducto(i) {

    pedido.push(productos[i]);

    mostrarPedido();
}


// Mostrar pedido
function mostrarPedido() {

    let texto = "";
    let total = 0;

    pedido.forEach(function(producto) {

        texto += `
            <p>
                ${producto.nombre} - $${producto.precio}
            </p>
        `;

        total = total + producto.precio;
    });

    document.getElementById("pedido").innerHTML = texto;

    document.getElementById("total").innerHTML =
        `Total: $${total}`;
}


// Crear pedido
function crearPedido() {

    if (pedido.length == 0) {
        alert("Agrega un producto");
        return;
    }

    let total = 0;

    pedido.forEach(function(producto) {
        total = total + producto.precio;
    });

    let nuevoPedido = {
        id: Date.now(),
        productos: pedido,
        total: total,
        estado: "Esperando pago"
    };

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push(nuevoPedido);

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    console.log("Pedido creado");

    alert("Pedido enviado a caja");

    pedido = [];

    mostrarPedido();
    listarPedidos();
}


// Listar pedidos
function listarPedidos() {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    let texto = "";

    pedidos.forEach(function(pedido) {

        texto += `
            <p>
                Pedido ${pedido.id}
                - $${pedido.total}
                - ${pedido.estado}
            </p>
        `;
    });

    document.getElementById("pedidos").innerHTML = texto;
}


// Mostrar información al iniciar
mostrarProductos();
listarPedidos();