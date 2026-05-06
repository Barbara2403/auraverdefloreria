const DB_RAMOS = {
    chicos: [
        { n: "Ramo Chico Lirios", d: "2 Lirios + Astromelia", p: 220 },
        { n: "Ramo Chico de Gerberas", d: "6 Gerberas", p: 240 },
        { n: "Ramo Chico de Rosas", d: "12 Rosas", p: 320 }
    ],
    medianos: [
        { n: "Ramo Mediano Girasoles", d: "4 Girasoles + 6 Rosas", p: 350 },
        { n: "Ramo Mediano Gerberas", d: "10 Gerberas", p: 360 },
        { n: "Ramo Mediano Lirios", d: "3 Lirios + 4 Gerberas", p: 370 },
        { n: "Ramo Mediano Rosas", d: "18 Rosas", p: 450 },
        { n: "Ramo Mediano Rosas y Gerberas", d: "12 Rosas + 6 Gerberas", p: 440 },
        { n: "Ramo Mediano Lirios y Rosas", d: "12 Rosas + 3 Lirios", p: 450 }
    ],
    grandes: [
        { n: "Ramo Grande Gerberas", d: "16 Gerberas", p: 680 },
        { n: "Ramo Grande Rosas", d: "24 Rosas", p: 700  },
        { n: "Ramo Grande Girasoles", d: "8 Girasoles + 12 Rosas", p: 770 },
        { n: "Ramo Grande Lirios y Gerberas", d: "5 Lirios + 10 Gerberas", p: 810 },
        { n: "Ramo Grande Hortensia", d: "Hortensia + 10 Gerberas + Astromelia", p: 820 },
        { n: "Ramo Grande Rosas y Gerberas", d: "18 Rosas + 10 Gerberas", p: 910 },
        { n: "Ramo Grande Lirios", d: "5 Lirios + 18 Rosas + 10 Gerberas", p: 1220 },
        { n: "Ramo Jimena", d: "10 Lirios + 24 Rosas + Perritos", p: 1825}
    ]
};

let carrito = [];

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

function filtrarRamos(categoria) {
    const contenedor = document.getElementById('grid-ramos');
    contenedor.innerHTML = "";
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.innerText.toLowerCase().includes(categoria)));

    DB_RAMOS[categoria].forEach(ramo => {
        contenedor.innerHTML += `
            <div class="card-ramo">
                <h3>${ramo.n}</h3>
                <p>${ramo.d}</p>
                <span class="precio">$${ramo.p}</span>
                <button onclick="agregarAlCarrito('${ramo.n}', ${ramo.p})" class="btn-gold">Añadir</button>
            </div>`;
    });
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarritoUI();
}

function agregarIndividual() {
    const f = document.getElementById('flor-select');
    const pFlor = parseFloat(f.value);
    const cant = parseInt(document.getElementById('cantidad-flor').value);
    const fo = document.getElementById('follaje-select');
    const pFollaje = parseFloat(fo.value);
    const subtotal = (pFlor * cant) + pFollaje;
    agregarAlCarrito(`Personalizado: ${cant}x ${f.options[f.selectedIndex].getAttribute('data-nombre')} + ${fo.options[fo.selectedIndex].getAttribute('data-nombre')}`, subtotal);
}

function borrarElemento(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

function vaciarCarrito() {
    if(carrito.length > 0 && confirm("¿Quieres limpiar tu selección?")) {
        carrito = [];
        actualizarCarritoUI();
    }
}

function actualizarCarritoUI() {
    const lista = document.getElementById('lista-carrito');
    const totalMsg = document.getElementById('lista-carrito-vacia');
    const totalSpan = document.getElementById('total-precio');
    lista.innerHTML = ""; let total = 0;

    if (carrito.length > 0) totalMsg.style.display = "none";
    else totalMsg.style.display = "block";

    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `<li><div><strong>${item.nombre}</strong><br><small>$${item.precio.toFixed(2)}</small></div><button onclick="borrarElemento(${index})" class="btn-borrar">×</button></li>`;
    });
    totalSpan.innerText = total.toFixed(2);
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if (!nombre) return alert("Por favor, ingresa tu nombre para el pedido.");
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    
    let total = document.getElementById('total-precio').innerText;
    let mensaje = `Hola Aura Verde. Mi nombre es: ${nombre}. Adjunto mi pedido premium: %0A`;
    carrito.forEach(i => mensaje += `- ${i.nombre} ($${i.precio.toFixed(2)}) %0A`);
    mensaje += `%0ATOTAL: $${total} %0A%0AEn un momento adjunto mi comprobante de transferencia a nombre de Bárbara Mendoza.`;
    
    window.open(`https://wa.me/529991916954?text=${mensaje}`, '_blank');
}

window.onload = () => filtrarRamos('chicos');