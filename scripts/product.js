document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productDetail');

    // Intentamos primero desde localStorage (productoSeleccionado)
    let raw = localStorage.getItem('productoSeleccionado');
    let prod = null;

    if (raw) {
        try {
            prod = JSON.parse(raw);
        } catch (e) {
            console.error('Error al parsear producto desde localStorage:', e);
            prod = null;
        }
    }

    // Si no hay en localStorage, mostramos error (el flujo principal usa localStorage)
    if (!prod) {
        container.innerHTML = '<p>Producto no encontrado. Vuelve a <a href="productos.html">Productos</a>.</p>';
        return;
    }

    // Normalizar campos usando 'name' en lugar de 'nombre'
    const nombre = prod.name || prod.id || 'Producto'; // Usamos 'name' como principal
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
                <p><strong>Precio:</strong> $${precio.toLocaleString('es-CL')}</p>
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

        if (typeof addToCart === 'function') {
            for (let i = 0; i < qty; i++) {
                addToCart(nombre, precio, imagen);
            }
            // Opcional: ir al carrito después de añadir (descomentar si lo deseas)
            // window.location.href = 'carrito.html';
        } else {
            console.error('addToCart no está definido. Asegúrate de cargar cart.js antes de product.js');
            alert('Error: función de carrito no disponible.');
        }
    });

    // Función de escape para evitar inyección
    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});