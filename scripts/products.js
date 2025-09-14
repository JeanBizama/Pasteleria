// filtro de productos por categoría
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('#categoryFilter a');
    const products = document.querySelectorAll('.product-item');

    categoryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cat = link.dataset.category;

            products.forEach(product => {
                const categories = product.dataset.category.split(','); // separa por comas
                if (cat === 'all' || categories.includes(cat)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
});
