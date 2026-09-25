// Productos iniciales
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


// Guardar productos si todavía no existen
if (localStorage.getItem("productos") == null) {

    localStorage.setItem(
        "productos",
        JSON.stringify(productosIniciales)
    );
}


// Listar productos
function listarProductos() {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    let texto = "";


    productos.forEach(function(producto) {

        texto += `
            <div class="producto">

                <p>
                    ${producto.nombre}
                    - $${producto.precio}
                    - ${producto.tipo}
                </p>

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


// Agregar producto
function agregarProducto() {

    let nombre =
        document.getElementById("nombre").value;

    let precio =
        Number(document.getElementById("precio").value);

    let tipo =
        document.getElementById("tipo").value;


    let producto = {

        id: Date.now(),

        nombre: nombre,

        precio: precio,

        tipo: tipo

    };


    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    productos.push(producto);


    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    document.getElementById("nombre").value = "";

    document.getElementById("precio").value = "";


    console.log("Producto agregado");


    listarProductos();
}


// Editar producto
function editarProducto(id) {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    let producto = productos.find(function(producto) {

        return producto.id == id;

    });


    let nuevoNombre =
        prompt("Nuevo nombre", producto.nombre);

    let nuevoPrecio =
        prompt("Nuevo precio", producto.precio);

    let nuevoTipo =
        prompt("Nuevo tipo", producto.tipo);


    producto.nombre = nuevoNombre;

    producto.precio = Number(nuevoPrecio);

    producto.tipo = nuevoTipo;


    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    console.log("Producto editado");


    listarProductos();
}


// Eliminar producto
function eliminarProducto(id) {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    productos = productos.filter(function(producto) {

        return producto.id != id;

    });


    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    console.log("Producto eliminado");


    listarProductos();
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

                <p>Subtotal: $${pedido.subtotal}</p>

                <p>IVA: $${pedido.iva}</p>

                <p>Total: $${pedido.total}</p>

                <p>Estado: ${pedido.estado}</p>
        `;


        // Solo se puede entregar si cocina ya lo terminó
        if (pedido.estado == "Pedido listo") {

            texto += `
                <button onclick="entregarPedido(${pedido.id})">
                    Entregar pedido
                </button>
            `;

        }


        if (
            pedido.estado != "Pedido entregado" &&
            pedido.estado != "Cancelado"
        ) {

            texto += `
                <button onclick="cancelarPedido(${pedido.id})">
                    Cancelar pedido
                </button>
            `;

        }


        texto += `
            </div>
        `;

    });


    document.getElementById("pedidos").innerHTML = texto;


    totalAcumulado();
}


// Pedido entregado
function entregarPedido(id) {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let pedido = pedidos.find(function(pedido) {

        return pedido.id == id;

    });


    pedido.estado = "Pedido entregado";


    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );


    console.log("Pedido entregado");


    alert("Pedido entregado");


    listarPedidos();
}


// Pedido cancelado
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


    listarPedidos();
}


// Total acumulado
function totalAcumulado() {

    let pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];


    let entregados = pedidos.filter(function(pedido) {

        return pedido.estado == "Pedido entregado";

    });


    let total = entregados.reduce(function(acumulado, pedido) {

        return acumulado + pedido.total;

    }, 0);


    document.getElementById("totalAcumulado").innerHTML =
        `Total: $${total}`;
}


// Mostrar al iniciar
listarProductos();

listarPedidos();