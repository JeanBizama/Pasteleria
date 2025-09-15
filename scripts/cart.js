// Obtener el carrito desde el localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar el carrito en el localStorage y actualizar indicador
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Añadir producto al carrito (necesario el inicio de sesión)
function addToCart(name, price, image = "") {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert('Debes iniciar sesión para añadir productos al carrito.');
        window.location.href = 'login.html';
        return;
    }

    let cart = getCart();
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity = (product.quantity || 1) + 1;
    } else {
        cart.push({ name: name, price: Number(price), quantity: 1, image: image });
    }
    saveCart(cart);
    alert(`${name} añadido al carrito`);
}

// Eliminar producto del carrito
function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
}

// Actualizar cantidad de un producto en el carrito
function updateQuantity(name, quantity) {
    let cart = getCart();
    const it = cart.find(i => i.name === name);
    if (!it) return;
    it.quantity = Math.max(0, Number(quantity));
    cart = cart.filter(i => i.quantity > 0);
    saveCart(cart);
}

// Vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    updateCartBadge();
}

// Actualizar el contador del carrito en la interfaz
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const cart = getCart();
    const totalItems = cart.reduce((s, it) => s + (it.quantity || 0), 0);
    badge.textContent = totalItems > 0 ? totalItems : '';
}


// Renderizar los items del carrito en la página
function renderCart() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const list = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!list || !totalEl) return;

    if (!usuarioLogueado) {
        list.innerHTML = '<li>Debes iniciar sesión para ver el carrito.</li>';
        totalEl.textContent = '$0';
        return;
    }

    const cart = getCart();
    list.innerHTML = '';

    if (cart.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'El carrito está vacío';
        list.appendChild(li);
        totalEl.textContent = '$0';
        return;
    }

    let total = 0;

    // Generacion dinamica de elementos del carrito
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        li.innerHTML = `
            <div class="cart-item-info" style="display:flex; align-items:center; gap:12px;">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:5px;">` : ''}
                <div>
                    <strong>${item.name}</strong>
                    <div>$${item.price.toLocaleString()} x <input type="number" min="1" value="${item.quantity}" data-name="${item.name}" class="qty-input" style="width:70px" /></div>
                    <div>Subtotal: $${(itemTotal).toLocaleString()}</div>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" data-name="${item.name}">Eliminar</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalEl.textContent = `$${total.toLocaleString()}`;

    // Configuracion de eventos para inputs y botones
    document.querySelectorAll('.qty-input').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const name = e.target.dataset.name;
            let qty = Number(e.target.value) || 1;
            if (qty < 1) qty = 1;
            updateQuantity(name, qty);
            renderCart();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            if (!confirm(`Eliminar ${name} del carrito?`)) return;
            removeFromCart(name);
            renderCart();
        });
    });
}

// import de funciones de users.js
// mostrar modal con resumen, aplica descuentos si corresponde
// Procesa la compra al confirmar
function checkout() {
    const cart = getCart();
    if (cart.length === 0) return alert('El carrito está vacío');

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')) || {};
    const modal = document.getElementById('checkoutModal');
    const modalSubtotalEl = document.getElementById('modalSubtotal');
    const modalDiscountRow = document.getElementById('modalDiscountRow');
    const modalDiscountPercentEl = document.getElementById('modalDiscountPercent');
    const modalDiscountEl = document.getElementById('modalDiscount');
    const modalTotalEl = document.getElementById('modalTotal');

    if (!(modal && modalSubtotalEl && modalTotalEl)) {
        alert('Compra realizada con éxito. ¡Gracias!');
        clearCart();
        renderCart();
        return;
    }

    const subtotal = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

    // calcular descuentos basados en información del usuario
    let discountPercent = 0;
    if (usuarioLogueado.email && usuarioLogueado.fechaNacimiento && usuarioLogueado.cupon !== undefined) {
        const beneficioData = calcularBeneficio(usuarioLogueado.email, usuarioLogueado.fechaNacimiento, usuarioLogueado.cupon);
        discountPercent = beneficioData.descuento;
    }

    const discountAmount = Math.round(subtotal * discountPercent / 100);
    const finalTotal = subtotal - discountAmount;

    modalSubtotalEl.textContent = `$${subtotal.toLocaleString()}`;

    // Mostrar o ocultar fila de descuento
    if (discountPercent > 0) {
        modalDiscountRow.style.display = 'block';
        modalDiscountPercentEl.textContent = discountPercent;
        modalDiscountEl.textContent = `- $${Math.abs(discountAmount).toLocaleString()}`;
    } else {
        modalDiscountRow.style.display = 'none';
    }

    modalTotalEl.textContent = `$${finalTotal.toLocaleString()}`;

    modal.style.display = 'flex';

    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelPurchaseBtn');
    const hideModal = () => { modal.style.display = 'none'; };
    if (closeModal) closeModal.onclick = hideModal;
    if (cancelBtn) cancelBtn.onclick = hideModal;
    modal.querySelector('.modal-overlay').onclick = hideModal;

    const confirmBtn = document.getElementById('confirmPurchaseBtn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            alert('Compra realizada con éxito. ¡Gracias!');
            clearCart();
            renderCart();
            modal.style.display = 'none';
        };
    }
}


// Configuracion inicial al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCart();
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});
