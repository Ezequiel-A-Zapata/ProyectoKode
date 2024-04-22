


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log (carrito);

const productos = [
    {
        titulo: "REMERA BLANCA",
        precio: 3000,
        img: "../img/ropa KODE/remeras/REMERA0.jpg",
        posicion: "principal",
    },
    {
        titulo: "REMERA AZUL",
        precio: 3200,
        img:"../img/ropa KODE/remeras/REMERA1.jpg",
        posicion:"secundaria",
    }, 
    {
        titulo:"REMERA BEIGE",
        precio: 3300,
        img: "../img/ropa KODE/remeras/REMERA2.jpg",
        posicion:"secundaria",
    },
    {
        titulo: "REMERA CELESTE",
        precio: 3400,
        img:"../img/ropa KODE/remeras/REMERA4.jpg",
        posicion:"secundaria",
    }
]


const contenedorDesplegado = document.querySelector ("#contenedordesplegado");
const btnCarrito =  document.querySelector ("#botoncarrito");
const display = document.querySelector (".display");
const carritoDesplegado = document.querySelector (".carritodesplegado");
const backFlecha = document.querySelector ("#back-flecha");
const carritoVacio = document.querySelector (".carrito-vacio");
const carritoProductos =document.querySelector(".carrito-productos");
const carritoTotal = document.querySelector ("#carrito-total");
const numerito = document.querySelector (".numerito");

actualizarCarrito();
btnCarrito.addEventListener ("click",() => {
    display.classList.toggle("display");
})

document.addEventListener("click", (event) => {
    if (event.target === backFlecha) {
        display.classList.toggle ("display");
        
    }
})



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
        section.classList.add("item1");

        const divRemeraCarrito = document.createElement ("div");
        divRemeraCarrito.classList.add("remera-carrito");

        const contImgCarrito = document.createElement ("div");
        contImgCarrito.classList.add("cont-img-carrito");
        contImgCarrito.innerHTML = `
        <img class="img-carrito" src="${producto.img}" alt="remeracarrito1">
        <p class="nombre-producto">${producto.titulo}</p>
        <div class="precio-producto">$${producto.precio}</div>`;
        
        
        const infoProductos = document.createElement ("div");
        infoProductos.classList.add ("info-producto");
        infoProductos.innerHTML =`<p>CANTIDAD: ${producto.cantidad}</p>`;
        
        
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

        const precio = document.createElement("p");
        precio.classList.add ("subtotal-producto");
        precio.innerText=`$${producto.precio * producto.cantidad}`;

        infoProductos.append(btnRestar);
        infoProductos.append(btnSumar);
        infoProductos.append (precio);
        contImgCarrito.append(infoProductos);


        const btnBorrar = document.createElement ("button");
        btnBorrar.classList.add ("borrar");
        btnBorrar.innerText = "x";
        btnBorrar.addEventListener("click", () => { 
            borrarDelCarrito (producto); 
        });
        contImgCarrito.append (btnBorrar);
        divRemeraCarrito.append(contImgCarrito);
        section.append (divRemeraCarrito);
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




