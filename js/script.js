// Variables globales
const tarjetasProduct = document.getElementById("tarjetasProduct");
const verCarrito = document.getElementById("verCarrito");
const ventanaModal = document.getElementById("ventanaModal");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// Función para abrir la ventana modal al hacer clic en el botón
verCarrito.addEventListener("click", function() {
    ventanaModal.style.display = "block";
    pintarCarrito(); // Llama a la función para pintar el carrito al abrir la ventana modal
});


// Función para cerrar la ventana modal al hacer clic en la "x"
ventanaModal.querySelector(".close").addEventListener("click", function() {
    ventanaModal.style.display = "none";
});


// Función para cerrar la ventana modal si se hace clic fuera de ella
window.addEventListener("click", function(event) {
    if (event.target === ventanaModal) {
        ventanaModal.style.display = "none";
    }
});


// Función para pintar el carrito en la tabla "items-select"
function pintarCarrito() {
    const tablaItemsSelect = ventanaModal.querySelector(".items-select tbody");
    tablaItemsSelect.innerHTML = ""; // Limpiar la tabla antes de pintar el carrito

    carrito.forEach((producto) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td class="fila_imagen"><img src="${producto.foto}" alt="Producto" class="product-img"></td>
            <td>${producto.nombre}</td> 
            <td><span class="restar"> -  </span> ${producto.cantidad}  <span class="sumar">  + </span></td> 
            <td> $${(producto.cantidad * producto.precio).toFixed(2)}</td>
            <td><span class="eliminarproduct"> X </span></td>
        `;

        // Agregar la fila a la tabla
        tablaItemsSelect.appendChild(fila);

        // Evento para restar cantidad de productos
        fila.querySelector(".restar").addEventListener("click", () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
                saveLocal();
                pintarCarrito();
            }
        });

        // Evento para sumar cantidad de productos
        fila.querySelector(".sumar").addEventListener("click", () => {
            producto.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        // Evento para eliminar producto
        fila.querySelector(".eliminarproduct").addEventListener("click", () => {
            eliminarProducto(producto.id);
            saveLocal();
            pintarCarrito();

            Swal.fire({                               // <= Al eliminar un X producto le agrego un sweetalert 
                position: 'top-end',
                icon: 'success',
                title: 'Producto eliminado',
                showConfirmButton: false,
                timer: 1500
                })
            });
    });

    // Calcula el precio total sin IVA
    const precioTotalSinIVA = carrito.reduce((acumulador, prod) => acumulador + prod.precio * prod.cantidad, 0);

    // Calcula el precio total con IVA (21%)
    const precioTotalConIVA = precioTotalSinIVA * 1.21;

    // Agrega una nueva fila para mostrar el precio total con IVA en la tabla
    let totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td>Precio total + IVA:</td>
        <td>$${precioTotalConIVA.toFixed(2)}</td>
        <td><a href="../index.html"><button class="fincompra"> Finalizar Compra </button></a>
        </td>
    `;

    // Agrega la fila de total a la tabla
    tablaItemsSelect.appendChild(totalRow); 

    const fincompra = totalRow.querySelector(".fincompra")    // <= CAPTURA ID (al estilo css)
        fincompra.addEventListener("click", ()  => {
            
            tablaItemsSelect.innerHTML = "";                                              // <=  SIRVE PARA LIMPIAR EL CARRITO   //
            cantidadCarrito.innerHTML = "";
            const Toast = Swal.mixin({              // <= Sweetalert de compra finalizada
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                background: '#00699a',
                color: '#ffe9ef',
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
            
                Toast.fire({
                icon:'success',
                title:'GENIAL! Ya enviamos su email de confirmación'
            });
        localStorage.removeItem("carrito");
    })

}


// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter((producto) => producto.id !== id);
    carritoSuma();
}


// Función para actualizar la cantidad total de productos en el carrito
function carritoSuma() {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad, 0);
    cantidadCarrito.innerText = carritoLength;
}


// Función para guardar el carrito en el almacenamiento local
function saveLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Código para crear tarjetas de productos
productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.foto}" class="cardimg" alt="...">
        <h6 class="card-title">ID: ${product.id}</h6>
        <h5 class="card-text">${product.nombre}</h5>
        <p class="card-text">$${product.precio.toFixed(2)}</p>
    `;

    tarjetasProduct.appendChild(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al carrito";
    comprar.className = "comprar";
    content.appendChild(comprar);

    comprar.addEventListener("click", () => {
        const productoExistente = carrito.find((prod) => prod.id === product.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                id: product.id,
                foto: product.foto,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: 1,
            });

            Swal.fire({
                title: product.nombre,
                text: 'Se agregó al carrito correctamente',
                background: "#d0d3da",
                imageUrl: product.foto,
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: product.nombre,
            });

            carritoSuma();
            saveLocal();
        }

        pintarCarrito();
    });
});

// Llama a la función para mostrar la cantidad total de productos en el carrito
carritoSuma();

// Llama a la función para pintar el carrito al cargar la página
pintarCarrito();
