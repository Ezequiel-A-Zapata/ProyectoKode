
fetch("../JS/productos.json")
.then(response=>response.json())
.then(data=> agregarProductos(data))

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log (carrito);

const contenedorDesplegado = document.querySelector ("#contenedordesplegado");
const btnCarrito =  document.querySelector ("#botoncarrito");
const display = document.querySelector (".d-none");
const carritoDesplegado = document.querySelector (".carritodesplegado");
const backFlecha = document.querySelector ("#back-flecha");
const carritoVacio = document.querySelector (".carrito-vacio");
const carritoProductos =document.querySelector(".carrito-productos");
const carritoTotal = document.querySelector ("#carrito-total");
const numerito = document.querySelector (".numerito");
const borrarTodo = document.querySelector ("#borrar-todo");

actualizarCarrito();

btnCarrito.addEventListener ("click",() => {
    display.classList.toggle("d-none");
})

document.addEventListener("click", (event) => {
    if (event.target === backFlecha) {
        display.classList.toggle ("d-none");
        
    }
});
document.addEventListener("click", (event) => {
    if (event.target === borrarTodo) {
        carrito =[];
        actualizarCarrito();
    }
})


function agregarProductos (productos) {
productos.forEach ((producto) => {
    const remeras = document.querySelector (".remeras");
    const btnAgregar =document.createElement("button");
    btnAgregar.classList.add("carrito-prendas");
    btnAgregar.innerHTML = `
    <img src="../img/carrito.png" alt="carrito">
    `;
    btnAgregar.addEventListener ("click", () => {
        agregarAlCarrito (producto);
    });
    if (producto.posicion === "principal") {
        const remeraPrincipal = document.createElement ("div");
        remeraPrincipal.classList.add ("remera-item", "r-principal");
        remeraPrincipal.innerHTML = `
            <img src="${producto.img}" class="remera-0"  alt="remera-blanca">
        `;
        const divREMERA0 = document.createElement ("div");
        divREMERA0.classList.add ("REMERA0");
        divREMERA0.innerHTML = `
            <div> 
                <p class="texto-prendas">${producto.titulo}</p>
                <p class="precio-prendas">$${producto.precio}</p>
            </div>
        `;
        divREMERA0.append(btnAgregar);
        remeraPrincipal.append (divREMERA0);
        remeras.append (remeraPrincipal);
    } else if (producto.posicion === "secundaria") {
        const remeraSecundaria = document.createElement ("div");
        remeraSecundaria.classList.add ("remera-item", "r-secundario");
        remeraSecundaria.innerHTML = `
            <img src="${producto.img}" class="remera-1" alt="remera-azul">
        `;
        const divREMERA1 = document.createElement("div");
        divREMERA1.classList.add ("REMERA1");
        divREMERA1.innerHTML= `
        <div>
            <p class="texto-prendas">${producto.titulo}</p>
            <p class="precio-prendas">$${producto.precio}</p>
        </div>
        `;
        divREMERA1.append(btnAgregar);
        remeraSecundaria.append(divREMERA1);
        remeras.append(remeraSecundaria);
    }
});
}


function actualizarCarrito () {
    
    if (carrito.length === 0) {
        carritoVacio.classList.remove ("d-none");
        carritoProductos.classList.add ("d-none");
    } else {
        carritoVacio.classList.add ("d-none");
        carritoProductos.classList.remove("d-none");
        
        carritoProductos.innerHTML="";
        
        carrito.forEach (producto => {
        
        const section = document.createElement ("section");
        section.classList.add("item2");
        section.innerHTML = `<img src="${producto.img}" class="remeracarrito2" alt="remera-blanca">`;
        
        const infoProductos = document.createElement ("div");
        infoProductos.classList.add ("info-productos");
        infoProductos.innerHTML = `
        <p class="nombre-producto">${producto.titulo}</p>
        <p class="precio-producto">$${producto.precio}</p>`;

        const divBottom = document.createElement ("div");
        divBottom.classList.add ("bottom");
        divBottom.innerHTML = `<p class="cantidad-producto">CANTIDAD: ${producto.cantidad}</p>`;

        const btnRestar = document.createElement("button");
        btnRestar.classList.add ("btn-restar");
        btnRestar.innerText = "-";
        btnRestar.addEventListener("click", () =>{
            restarDelCarrito(producto);
        });

        const btnSumar = document.createElement("button");
        btnSumar.classList.add ("btn-sumar");
        btnSumar.innerText= "+";
        btnSumar.addEventListener("click", () =>{
            sumarDelCarrito (producto);
        });

        const subTotal = document.createElement ("p");
        subTotal.classList.add ("subtotal");;
        subTotal.innerText = `$${producto.precio * producto.cantidad}`;

        divBottom.append (btnRestar);
        divBottom.append (btnSumar);
        divBottom.append (subTotal);
        infoProductos.append (divBottom);

        const btnBorrar = document.createElement ("button");
        btnBorrar.classList.add ("borrar");
        btnBorrar.innerText = "x";
        btnBorrar.addEventListener("click", () => { 
            borrarDelCarrito (producto); 
        });
        section.append (infoProductos);
        section.append (btnBorrar);
        carritoProductos.append(section);
        }); 
    }
    carritoTotal.innerText = `$${actualizarTotal ()}`;
    numerito.innerText = calcularNumerito ();
    if (calcularNumerito() === 0) {
        numerito.classList.add ("d-none");
    } else {
        numerito.classList.remove ("d-none");
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
}

const agregarAlCarrito = (producto) => {
    
    const itemEncontrado = carrito.find (item => item.titulo === producto.titulo);
    if(itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        
        carrito.push({...producto, cantidad:1});
    }
    
    actualizarCarrito ();
}
const borrarDelCarrito = (producto) => {
    
    const prodIndex = carrito.findIndex (item => item.titulo === producto.titulo);
    carrito.splice (prodIndex, 1);
    actualizarCarrito();
}
const restarDelCarrito = (producto) => {
    
    if(producto.cantidad !== 1){
    producto.cantidad--;
}
    actualizarCarrito ();
}
const sumarDelCarrito = (producto) => {
    producto.cantidad++;
    actualizarCarrito();
}
function calcularNumerito () {
    const numeritoTotal = carrito.reduce ((acc, prod) => acc + prod.cantidad, 0);
    return numeritoTotal;
}


function actualizarTotal()  {
    const total = carrito.reduce((acc,prod) => acc + (prod.precio * prod.cantidad), 0);
    return total; 
}

