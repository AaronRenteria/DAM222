let pedidoActual = [];
let total = 0;


function agregarProducto(nombre, precio) {

    let producto = {
        nombre: nombre,
        precio: precio
    };

    pedidoActual.push(producto);

    total = total + precio;

    mostrarPedidoActual();
}


function mostrarPedidoActual() {

    let lista = document.getElementById("pedidoActual");

    lista.innerHTML = "";

    for (let i = 0; i < pedidoActual.length; i++) {

        lista.innerHTML +=
            "<li>" +
            pedidoActual[i].nombre +
            " - $" +
            pedidoActual[i].precio +
            "</li>";
    }

    document.getElementById("total").innerHTML = total;
}


function crearPedido() {

    if (pedidoActual.length == 0) {
        alert("Agrega un producto");
        return;
    }

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let nuevoPedido = {
        id: pedidos.length + 1,
        productos: pedidoActual,
        total: total,
        estado: "Pendiente"
    };

    pedidos.push(nuevoPedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Pedido creado");

    pedidoActual = [];
    total = 0;

    mostrarPedidoActual();
    listarPedidos();
}

function vaciarPedido() {

    pedidoActual = [];
    total = 0;

    mostrarPedidoActual();
}


function listarPedidos() {

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    let lista = document.getElementById("listaPedidos");

    lista.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++) {

        let productos = "";

        for (let j = 0; j < pedidos[i].productos.length; j++) {

            productos += pedidos[i].productos[j].nombre + "<br>";
        }

        lista.innerHTML +=
            "<div class='pedido'>" +
            "<h3>Pedido #" + pedidos[i].id + "</h3>" +
            "<p>" + productos + "</p>" +
            "<p>Total: $" + pedidos[i].total + "</p>" +
            "<p>Estado: " + pedidos[i].estado + "</p>" +
            "</div>";
    }
}


listarPedidos();