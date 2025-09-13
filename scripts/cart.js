// Obtiene el carrito desde localStorage. Si no existe, devuelve un array vacío.
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guarda el carrito en localStorage y actualiza el contador (badge) del carrito.
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Añade un producto al carrito. Si ya existe, incrementa la cantidad.
function addToCart(name, price) {
    let cart = getCart();
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity = (product.quantity || 0) + 1; // suma 1 si ya existe
    } else {
        cart.push({ name: name, price: Number(price), quantity: 1 }); // si no existe, lo agrega
    }
    saveCart(cart);
    alert(`${name} añadido al carrito`); // mensaje de confirmación
}

// Elimina un producto del carrito por su nombre
function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
}

// Cambia la cantidad de un producto
function updateQuantity(name, quantity) {
    let cart = getCart();
    const it = cart.find(i => i.name === name);
    if (!it) return; // si no existe, no hace nada
    it.quantity = Math.max(0, Number(quantity)); // no permite cantidades negativas
    cart = cart.filter(i => i.quantity > 0); // elimina productos con cantidad 0
    saveCart(cart);
}

// Vacía todo el carrito
function clearCart() {
    localStorage.removeItem('cart');
    updateCartBadge();
}

// Actualiza el contador de productos del carrito (badge)
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const cart = getCart();
    const totalItems = cart.reduce((s, it) => s + (it.quantity || 0), 0);
    badge.textContent = totalItems > 0 ? totalItems : ''; // muestra la cantidad o nada
}

// Dibuja los productos en carrito.html
function renderCart() {
    const list = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!list || !totalEl) return;

    const cart = getCart();
    list.innerHTML = '';

    if (cart.length === 0) { // si el carrito está vacío
        const li = document.createElement('li');
        li.textContent = 'El carrito está vacío';
        list.appendChild(li);
        totalEl.textContent = '$0';
        return;
    }

    let total = 0;

    cart.forEach(item => { // por cada producto en el carrito
        const li = document.createElement('li');
        li.className = 'cart-item';
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        li.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <div>$${item.price} x <input type="number" min="1" value="${item.quantity}" data-name="${item.name}" class="qty-input" style="width:70px" /></div>
                <div>Subtotal: $${itemTotal}</div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" data-name="${item.name}">Eliminar</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = `$${total}`;

    // Detecta cambios en la cantidad y actualiza
    document.querySelectorAll('.qty-input').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const name = e.target.dataset.name;
            let qty = Number(e.target.value) || 1;
            if (qty < 1) qty = 1;
            updateQuantity(name, qty);
            renderCart(); // vuelve a dibujar el carrito
        });
    });

    // Botón de eliminar producto
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            if (!confirm(`Eliminar ${name} del carrito?`)) return;
            removeFromCart(name);
            renderCart();
        });
    });
}

// Finalizar compra
function checkout() {
    const cart = getCart();
    if (cart.length === 0) return alert('El carrito está vacío');
    alert('Compra realizada con éxito. ¡Gracias!');
    clearCart();
    renderCart();
}

// Inicialización cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge(); // actualiza el contador
    renderCart();       // dibuja el carrito
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});
