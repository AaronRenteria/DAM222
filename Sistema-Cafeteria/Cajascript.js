let pedidos = [];
let totalAcumulado = 0;

function cargarPedidos() {
    pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
}

function mostrarPedidos() {
    cargarPedidos();

    let texto = "";
    totalAcumulado = 0;

    pedidos.forEach(function(pedido) {
        let boton = "";

        if (pedido.estado == "Esperando pago") {
            boton = `<button onclick="cobrarPedido(${pedido.id})">Cobrar</button>`;
        }

        if (pedido.estado != "Esperando pago") {
            totalAcumulado += pedido.total;
        }

        texto += `
            <div class="pedido">
                <p>Pedido ${pedido.id}</p>
                <p>Total: $${pedido.total}</p>
                <p>Estado: ${pedido.estado}</p>
                ${boton}
            </div>
        `;
    });

    document.getElementById("pedidos").innerHTML = texto;
    document.getElementById("total").innerText = `Total: $${totalAcumulado}`;
}

function cobrarPedido(id) {
    cargarPedidos();

    let pedido = pedidos.find(function(pedido) {
        return pedido.id == id;
    });

    pedido.estado = "En cocina";

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Pedido enviado a cocina");

    mostrarPedidos();
}

mostrarPedidos();