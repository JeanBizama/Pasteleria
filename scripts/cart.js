function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(name, price) {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para añadir productos al carrito.");
        window.location.href = "login.html";
        return;
    }

    let cart = getCart();
    let product = cart.find(item => item.name === name);
    if (product) {
        product.quantity = (product.quantity || 1) + 1;
    } else {
        cart.push({ name: name, price: Number(price), quantity: 1 });
    }
    saveCart(cart);
    alert(`${name} añadido al carrito`);
}

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
}

function updateQuantity(name, quantity) {
    let cart = getCart();
    const it = cart.find(i => i.name === name);
    if (!it) return;
    it.quantity = Math.max(0, Number(quantity));
    cart = cart.filter(i => i.quantity > 0);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const cart = getCart();
    const totalItems = cart.reduce((s, it) => s + (it.quantity || 0), 0);
    badge.textContent = totalItems > 0 ? totalItems : '';
}

function renderCart() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
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

    cart.forEach(item => {
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

function checkout() {
    const cart = getCart();
    if (cart.length === 0) return alert('El carrito está vacío');

    const modal = document.getElementById('checkoutModal');
    const modalTotal = document.getElementById('modalTotal');
    modalTotal.textContent = `$${cart.reduce((sum, it) => sum + it.price * it.quantity, 0)}`;

    modal.style.display = 'block';

    document.getElementById('closeModal').onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    document.getElementById('confirmPurchaseBtn').onclick = () => {
        alert('Compra realizada con éxito. ¡Gracias!');
        clearCart();
        renderCart();
        modal.style.display = 'none';
    };
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCart();
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});
