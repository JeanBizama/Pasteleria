document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productDetail');

    // Intentamos primero desde localStorage (productoSeleccionado)
    let raw = localStorage.getItem('productoSeleccionado');
    let prod = null;

    if (raw) {
        try {
            prod = JSON.parse(raw);
        } catch (e) {
            prod = null;
        }
    }

    // Si no hay en localStorage, intentamos leer parámetros de URL (fallback)
    if (!prod) {
        const params = new URLSearchParams(window.location.search);
        const nombre = params.get('nombre') || params.get('name');
        const precio = params.get('precio') || params.get('price');
        const imagen = params.get('imagen') || params.get('image');
        if (nombre) {
            prod = {
                nombre: nombre,
                precio: precio ? Number(precio) : 0,
                imagen: imagen || ''
            };
        }
    }

    // Si aún no hay producto, mostramos mensaje y salimos
    if (!prod) {
        container.innerHTML = '<p>Producto no encontrado. Vuelve a <a href="productos.html">Productos</a>.</p>';
        return;
    }

    // Normalizar campos
    const nombre = prod.nombre || prod.name || 'Producto';
    const precio = prod.precio !== undefined ? Number(prod.precio) : Number(prod.price || 0);
    const imagen = prod.imagen || prod.image || '';
    const descripcion = prod.descripcion || prod.description || prod.desc || 'Descripción corta del producto.';

    // Render HTML
    container.innerHTML = `
        <div style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">
            <div style="flex:1; min-width:260px; max-width:380px;">
                <img src="${imagen}" alt="${escapeHtml(nombre)}" style="width:100%; border-radius:12px; object-fit:cover;">
            </div>
            <div style="flex:1; min-width:260px;">
                <h2 style="margin-top:0;">${escapeHtml(nombre)}</h2>
                <p id="productDescription">${escapeHtml(descripcion)}</p>
                <p><strong>Precio:</strong> $${precio.toLocaleString()}</p>
                <div style="display:flex; gap:10px; align-items:center; margin-top:10px;">
                    <input id="qtyInput" type="number" min="1" value="1" style="width:80px; padding:6px; border-radius:6px; border:1px solid #ccc;">
                    <button id="addToCartBtn" class="products-button">Añadir al carrito</button>
                    <a href="productos.html" style="margin-left:8px; text-decoration:none;">← Volver</a>
                </div>
            </div>
        </div>
    `;

    // Handlers
    const addBtn = document.getElementById('addToCartBtn');
    const qtyInput = document.getElementById('qtyInput');

    addBtn.addEventListener('click', () => {
        const qty = Math.max(1, Number(qtyInput.value) || 1);

        // Si addToCart acepta imagen, lo usamos; tu cart.js actual acepta (name, price, image)
        for (let i = 0; i < qty; i++) {
            // si addToCart no está definido por alguna razón, prevenimos error
            if (typeof addToCart === 'function') {
                addToCart(nombre, precio, imagen);
            } else {
                console.error('addToCart no está definido. Asegúrate de cargar cart.js antes de product.js');
                alert('Error: función de carrito no disponible.');
                break;
            }
        }

        // Opcional: ir al carrito después de añadir (comenta/descomenta)
        // window.location.href = 'carrito.html';
    });

    // pequeña función de escape para evitar inyección al renderizar nombres/descr
    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
