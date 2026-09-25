// Productos disponibles
let productosIniciales = [

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


// Guardar los productos la primera vez
if (localStorage.getItem("productos") == null) {

    localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
    );
}


// Array del pedido actual
let pedido = [];


// Constante para IVA
const IVA = 0.16;


// Consultar productos
function consultarProductos() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    // map()
    let lista = productos.map(function(producto) {

        // destructuring
        let { id, nombre, precio, tipo } = producto;

        return `
            <div class="producto">

                <p>${nombre}</p>
                <p>Precio: $${precio}</p>
                <p>Tipo: ${tipo}</p>

                <button onclick="agregarProducto(${id})">
                    Agregar
                </button>

            </div>
        `;

    });

    document.getElementById("productos").innerHTML =
        lista.join("");
}


// Agregar producto al pedido
function agregarProducto(id) {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    // find()
    let producto = productos.find(function(producto) {

        return producto.id == id;

    });

    pedido.push(producto);

    console.log("Producto agregado");

    mostrarPedido();
}


// Mostrar pedido
function mostrarPedido() {

    let texto = "";

    // forEach()
    pedido.forEach(function(producto) {

        texto += `
            <p>
                ${producto.nombre} - $${producto.precio}
            </p>
        `;

    });


    // reduce()
    let subtotal = pedido.reduce(function(total, producto) {

        return total + producto.precio;

    }, 0);


    let iva = subtotal * IVA;

    let total = subtotal + iva;


    document.getElementById("pedido").innerHTML = texto;

    document.getElementById("subtotal").innerHTML =
        `Subtotal: $${subtotal}`;

    document.getElementById("iva").innerHTML =
        `IVA: $${iva}`;

    document.getElementById("total").innerHTML =
        `Total: $${total}`;
}


// Crear pedido
function crearPedido() {

    if (pedido.length == 0) {

        alert("Agrega un producto");

        return;
    }


    let subtotal = pedido.reduce(function(total, producto) {

        return total + producto.precio;

    }, 0);


    let iva = subtotal * IVA;

    let total = subtotal + iva;


    let nuevoPedido = {

        id: Date.now(),

        productos: pedido,

        subtotal: subtotal,

        iva: iva,

        total: total,

        estado: "Pedido recibido"

    };


    AgregarPedido(nuevoPedido);


    pedido = [];

    mostrarPedido();

    listarPedidos();


    alert("Pedido creado");
}


// Función AgregarPedido
function AgregarPedido(nuevoPedido) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    pedidos.push(nuevoPedido);

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    console.log("Pedido agregado");
}


// Listar pedidos
function listarPedidos() {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    let texto = "";


    pedidos.forEach(function(pedido) {

        texto += `
            <div class="pedido">

                <p>Pedido ${pedido.id}</p>

                <p>Total: $${pedido.total}</p>

                <p>Estado: ${pedido.estado}</p>
        `;


        // Notificación de pedido listo
        if (pedido.estado == "Pedido listo") {

            texto += `
                <p>
                    Tu pedido está listo
                </p>
            `;

        }


        // Notificación de pedido cancelado
        if (pedido.estado == "Cancelado") {

            texto += `
                <p>
                    Tu pedido fue cancelado
                </p>
            `;

        }


        texto += `
            </div>
        `;

    });


    document.getElementById("pedidos").innerHTML = texto;
}


// Productos baratos
function productosBaratos() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    // filter()
    let resultado = productos.filter(function(producto) {

        return producto.precio < 50;

    });


    mostrarResultado(resultado);
}


// Productos caros
function productosCaros() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let resultado = productos.filter(function(producto) {

        return producto.precio > 50;

    });


    mostrarResultado(resultado);
}


// Buscar bebidas
function buscarBebidas() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let resultado = productos.filter(function(producto) {

        return producto.tipo == "Bebida";

    });


    mostrarResultado(resultado);
}


// Buscar postres
function buscarPostres() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let resultado = productos.filter(function(producto) {

        return producto.tipo == "Postre";

    });


    mostrarResultado(resultado);
}


// Mostrar promociones
function mostrarPromociones() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let resultado = productos.filter(function(producto) {

        return producto.precio >= 70;

    });


    let texto = "";


    resultado.forEach(function(producto) {

        texto += `
            <div class="producto">

                <p>${producto.nombre}</p>

                <p>Precio: $${producto.precio}</p>

                <p>Producto en promoción</p>

                <button onclick="agregarProducto(${producto.id})">
                    Agregar
                </button>

            </div>
        `;

    });


    document.getElementById("productos").innerHTML = texto;
}


// Mostrar resultado de filtros
function mostrarResultado(resultado) {

    let texto = "";


    resultado.forEach(function(producto) {

        texto += `
            <div class="producto">

                <p>
                    ${producto.nombre}
                    - $${producto.precio}
                </p>

                <button onclick="agregarProducto(${producto.id})">
                    Agregar
                </button>

            </div>
        `;

    });


    document.getElementById("productos").innerHTML = texto;
}


// Buscar producto
function buscarProducto() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let nombre =
        prompt("Escribe el nombre del producto");


    let producto = productos.find(function(producto) {

        return producto.nombre.toLowerCase()
        == nombre.toLowerCase();

    });


    if (producto) {

        alert(
            `Producto: ${producto.nombre}
Precio: $${producto.precio}
Tipo: ${producto.tipo}`
        );

    } else {

        alert("Producto no encontrado");

    }
}


// Mostrar información al iniciar
consultarProductos();

mostrarPedido();

listarPedidos();