let pedidos = [];

// Cargar los pedidos guardados
function cargarPedidos() {

    let datos = localStorage.getItem("pedidos");

    if (datos) {
        pedidos = JSON.parse(datos);
    }
}


// Mostrar los pedidos en Caja
function mostrarPedidos() {

    cargarPedidos();

    let texto = "";

    // Recorremos todos los pedidos
    pedidos.forEach(function(pedido) {

        // Destructuring
        const { id, estado } = pedido;

        texto += `
            <div class="pedido">

                <p>Pedido ${id}</p>

                <p>Total: $${pedido.total}</p>

                <p>Estado: ${estado}</p>
        `;

        // Si todavía no está pagado, aparece el botón
        if (estado == "Esperando pago") {

            texto += `
                <button onclick="cobrarPedido(${id})">
                    Cobrar
                </button>
            `;
        }

        texto += `</div>`;
    });


    // Sumar los pedidos cobrados
    let subtotal = pedidos.reduce(function(suma, pedido) {

        if (pedido.estado != "Esperando pago") {
            return suma + pedido.total;
        }

        return suma;

    }, 0);


    // Calcular IVA
    let iva = subtotal * 0.16;

    // Calcular total
    let total = subtotal + iva;


    // Mostrar datos
    document.getElementById("pedidos").innerHTML = texto;

    document.getElementById("subtotal").innerText =
        "Subtotal: $" + subtotal.toFixed(2);

    document.getElementById("iva").innerText =
        "IVA: $" + iva.toFixed(2);

    document.getElementById("total").innerText =
        "Total: $" + total.toFixed(2);
}


// Cobrar un pedido
function cobrarPedido(id) {

    cargarPedidos();

    pedidos.forEach(function(pedido) {

        if (pedido.id == id) {
            pedido.estado = "En cocina";
        }

    });


    // Guardar el cambio
    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    alert("Pedido enviado a cocina");

    mostrarPedidos();
}


// Mostrar pedidos al entrar a Caja
mostrarPedidos();