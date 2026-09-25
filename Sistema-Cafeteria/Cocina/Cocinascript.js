// Mostrar pedidos en cocina
function mostrarPedidos() {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    let texto = "";


    pedidos.forEach(function(pedido) {

        if (
            pedido.estado == "Pedido recibido" ||
            pedido.estado == "Preparando" ||
            pedido.estado == "Empacando"
        ) {

            let productosPedido = "";


            pedido.productos.forEach(function(producto) {

                productosPedido += `
                    <p>${producto.nombre}</p>
                `;

            });


            texto += `
                <div class="pedido">

                    <p>Pedido ${pedido.id}</p>

                    <p>Productos:</p>

                    ${productosPedido}

                    <p>Estado: ${pedido.estado}</p>

                    <button onclick="prepararPedido(${pedido.id})">
                        Preparar
                    </button>

                    <button onclick="empacarPedido(${pedido.id})">
                        Empacar
                    </button>

                    <button onclick="pedidoListo(${pedido.id})">
                        Pedido listo
                    </button>

                    <button onclick="simularPrepararCafe(${pedido.id})">
                        Preparar café
                    </button>

                    <button onclick="errorCocina(${pedido.id})">
                        Error en cocina
                    </button>

                    <button onclick="faltaIngrediente(${pedido.id})">
                        Falta ingrediente
                    </button>

                    <button onclick="cancelarPedido(${pedido.id})">
                        Cancelar pedido
                    </button>

                </div>
            `;

        }

    });


    document.getElementById("pedidos").innerHTML = texto;
}


// Estado: Preparando
function prepararPedido(id) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let pedido = pedidos.find(function(pedido) {

        return pedido.id == id;

    });


    pedido.estado = "Preparando";


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    console.log("Pedido preparando");


    mostrarPedidos();
}


// Estado: Empacando
function empacarPedido(id) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let pedido = pedidos.find(function(pedido) {

        return pedido.id == id;

    });


    pedido.estado = "Empacando";


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    console.log("Pedido empacando");


    mostrarPedidos();
}


// Pedido listo
function pedidoListo(id) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let pedido = pedidos.find(function(pedido) {

        return pedido.id == id;

    });


    pedido.estado = "Pedido listo";


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    console.log("Pedido listo");


    alert("Pedido listo");


    mostrarPedidos();
}


// Simular preparar café
// setTimeout simula asincronía
function simularPrepararCafe(id) {

    let promesaCafe = new Promise(function(resolve) {

        console.log("Preparando café...");

        setTimeout(function() {

            resolve("Café preparado para el pedido " + id);

        }, 2000);

    });


    promesaCafe.then(function(mensaje) {

        console.log("Café preparado");

        alert(mensaje);

    });
}

// Simular error en cocina
function errorCocina(id) {

    console.log(
        "Error en cocina en el pedido " + id
    );

    alert("Error en cocina");
}


// Simular falta de ingrediente
function faltaIngrediente(id) {

    console.log(
        "Falta ingrediente en el pedido " + id
    );

    alert("Falta ingrediente");
}


// Cancelar pedido
function cancelarPedido(id) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let pedido = pedidos.find(function(pedido) {

        return pedido.id == id;

    });


    pedido.estado = "Cancelado";


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    console.log("Pedido cancelado");


    alert("Pedido cancelado");


    mostrarPedidos();
}


// Mostrar al iniciar
mostrarPedidos();