// Filtro de productos por categoría
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('#categoryFilter a');
    const products = document.querySelectorAll('.product-item');

    categoryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cat = link.dataset.category;

            products.forEach(product => {
                const categories = (product.dataset.category || '').split(','); // separa por comas
                if (cat === 'all' || categories.includes(cat)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});

// Guardar producto seleccionado y redirigir a producto.html
function verProducto(id, precio, imagen) {
    // Normalizamos el objeto (usar claves en español para consistencia)
    const producto = {
        nombre: id,     // aquí `id` es el slug o identificador legible (puedes usar otro campo si quieres)
        precio: precio,
        imagen: imagen
    };
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'producto.html';
}
