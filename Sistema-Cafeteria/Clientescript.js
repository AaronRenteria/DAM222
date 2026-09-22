let pedido = [];

let productos = [
    { nombre: "Cafe", precio: 30 },
    { nombre: "Capuchino", precio: 45 },
    { nombre: "Sandwich", precio: 50 }
];

function mostrarProductos() {

    // Usamos map() para recorrer productos
    let productosHTML = productos.map(function(producto, i) {
        return `
            <div class="producto">
                ${producto.nombre} - $${producto.precio}
                <button onclick="agregarProducto(${i})">Agregar</button>
            </div>
        `;
    });

    document.getElementById("productos").innerHTML = productosHTML.join("");
}

function agregarProducto(i) {
    pedido.push(productos[i]);
    mostrarPedido();
}

function mostrarPedido() {
    let texto = "";
    let total = 0;

    // Usamos forEach() para recorrer el pedido
    pedido.forEach(function(producto) {
        texto += `
            <p>${producto.nombre} - $${producto.precio}</p>
        `;

        total += producto.precio;
    });

    document.getElementById("pedido").innerHTML = texto;
    document.getElementById("total").innerText = `Total: $${total}`;
}

function crearPedido() {

    if (pedido.length == 0) {
        alert("Agrega productos");
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let total = 0;

    // Otro ejemplo de forEach()
    pedido.forEach(function(producto) {
        total += producto.precio;
    });

    let nuevoPedido = {
        id: Date.now(),
        productos: pedido,
        total: total,
        estado: "Esperando pago"
    };

    pedidos.push(nuevoPedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    console.log(`Pedido creado por $${total}`);

    alert("Pedido enviado a caja");

    pedido = [];

    mostrarPedido();
    listarPedidos();
}

function listarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let texto = "";

    // Usamos forEach()
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

mostrarProductos();
listarPedidos();