if (!localStorage.getItem('productos')) { 
  const productos = [
        {
            id: 'torta-chocolate',
            name: 'Torta de Chocolate',
            price: 15000,
            image: 'https://brigams.pe/wp-content/uploads/chocolate-2.jpg',
            categories: ['tortas-cuadradas']
        },
        {
            id: 'postre-frutilla',
            name: 'Postre Individual de Frutilla',
            price: 3500,
            image: 'https://www.recetasnestle.com.ar/sites/default/files/srh_recipes/f8f1012b7969ac181b0eea003ea6b8f0.jpg',
            categories: ['postres-individuales']
        },
        {
            id: 'torta-vegana-vainilla',
            name: 'Torta Vegana de Vainilla',
            price: 18000,
            image: 'https://happyvegannie.com/wp-content/uploads/2021/07/img-4302-ps-copia.jpg',
            categories: ['veganos', 'sin-gluten']
        },
        {
            id: 'torta-red-velvet',
            name: 'Torta Red Velvet',
            price: 20000,
            image: 'https://www.infobae.com/new-resizer/DGoMOTuyK29Gwu_0GG0rzZg4VGk=/arc-anglerfish-arc2-prod-infobae/public/52E6H6YM2NHAHHAR6S7SL47SEM.jpg',
            categories: ['tortas-circulares']
        },
        {
            id: 'mini-cheesecake',
            name: 'Mini Cheesecake',
            price: 4500,
            image: 'https://www.savingdessert.com/wp-content/uploads/2023/08/Mini-Cheesecake-Recipe-10-500x500.jpg',
            categories: ['postres-individuales', 'sin-azúcar']
        },
        {
            id: 'torta-moka',
            name: 'Torta de Moka',
            price: 17000,
            image: 'https://cocinerosargentinos.com/content/recipes/original/recipes.17549.jpg',
            categories: ['tortas-cuadradas', 'especiales']
        },
        {
            id: 'torta-limon',
            name: 'Torta de Limón',
            price: 16000,
            image: 'https://www.bakeandshare.com/wp-content/uploads/2020/10/chiffon-cake-limo%CC%81n-7-500x500.jpg',
            categories: ['tortas-circulares', 'sin-gluten']
        },
        {
            id: 'mousse-chocolate-vegano',
            name: 'Mousse de Chocolate Vegano',
            price: 3800,
            image: 'https://deliciaskitchen.b-cdn.net/wp-content/uploads/2016/03/mousse-de-chocolate-vegana.jpg',
            categories: ['postres-individuales', 'veganos']
        },
        {
            id: 'pie-manzana',
            name: 'Pie de Manzana',
            price: 12000,
            image: 'https://annaspasteleria.com/images/_imageBlock/DSC_3536web.jpg',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'torta-sin-azucar-frutos-rojos',
            name: 'Torta Sin Azúcar de Frutos Rojos',
            price: 19000,
            image: 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/9abcfeee54a8ddae05bf733b2c9e1b04.jpg',
            categories: ['tortas-especiales', 'veganos']
        },
        {
            id: 'torta-zanahoria',
            name: 'Torta de Zanahoria',
            price: 15500,
            image: 'https://veggiefestchicago.org/wp-content/uploads/2021/04/21-carrot-cake.jpg',
            categories: ['tortas-cuadradas', 'sin-gluten']
        },
        {
            id: 'brownie-individual',
            name: 'Brownie Individual',
            price: 3200,
            image: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2016/11/brownie-de-chocolate.jpg',
            categories: ['postres-individuales', 'sin-azúcar']
        },
        {
            id: 'galletas-avena-veganas',
            name: 'Galletas de Avena Veganas',
            price: 2800,
            image: 'https://i.pinimg.com/564x/72/48/a3/7248a3939f041e2089b02a7c35f66e8c.jpg',
            categories: ['veganos']
        },
        {
            id: 'panqueques-dulce-leche',
            name: 'Panqueques con Dulce de Leche',
            price: 5000,
            image: 'https://i.ytimg.com/vi/vBYY1qZRYxE/maxresdefault.jpg',
            categories: ['pasteleria-tradicional', 'especiales']
        },
        {
            id: 'torta-maracuya',
            name: 'Torta de Maracuyá',
            price: 18500,
            image: 'https://www.gourmet.cl/wp-content/uploads/2022/08/torta-de-maracuya-ajustada-web-570x458.jpg',
            categories: ['tortas-circulares', 'especiales']
        },
        {
            id: 'mini-tiramisu',
            name: 'Mini Tiramisú',
            price: 4200,
            image: 'https://pastelerialaceleste.cl/wp-content/uploads/2024/01/Captura-de-Pantalla-2024-01-09-a-las-14.37.19.png',
            categories: ['postres-individuales', 'sin-gluten']
        },
        {
            id: 'torta-especial-chocolate',
            name: 'Torta Especial de Chocolate',
            price: 21000,
            image: 'https://www.recetasnestle.com.ve/sites/default/files/srh_recipes/e2928ff551a360cdadb4e5a2528841b7.jpg',
            categories: ['tortas-especiales', 'sin-azúcar']
        },
        {
            id: 'torta-vegana-coco',
            name: 'Torta Vegana de Coco',
            price: 17500,
            image: 'https://happyvegannie.com/wp-content/uploads/2023/10/IMG_9367-1.jpg',
            categories: ['tortas-cuadradas', 'veganos']
        },
        {
            id: 'ensalada-frutas',
            name: 'Ensalada de Frutas',
            price: 6000,
            image: 'https://comedera.com/wp-content/uploads/sites/9/2023/07/ensalada-de-frutas.jpg',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'panna-cotta',
            name: 'Panna Cotta',
            price: 4800,
            image: 'https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/1:1/w_2848,h_2848,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg',
            categories: ['postres-individuales', 'especiales']
        },
        {
            id: 'barritas-energeticas-veganas',
            name: 'Barritas Energéticas Veganas',
            price: 2500,
            image: 'https://www.conasi.eu/blog/wp-content/uploads/2019/04/barritas-energeticas-caseras-y-veganas-2.jpg',
            categories: ['veganos', 'sin-azúcar']
        },
        {
            id: 'torta-nuez',
            name: 'Torta de Nuez',
            price: 19500,
            image: 'https://images.aws.nestle.recipes/original/726dc2757d7c67d7ae4df13651725bed_torta_de_manjar_nuez_y_merengue.jpg',
            categories: ['tortas-circulares', 'sin-gluten']
        },
        {
            id: 'torta-chocolate-avellanas',
            name: 'Torta de Chocolate y Avellanas',
            price: 22000,
            image: 'https://images.aws.nestle.recipes/resized/2024_10_28T08_40_46_badun_images.badun.es_2d4d3c281ef9_tarta_de_galletas_y_avellanas_1290_742.jpg',
            categories: ['tortas-especiales', 'veganos']
        }
    ];
}

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
    const storedProducts = localStorage.getItem('productos');
    return storedProducts ? JSON.parse(storedProducts) : productos;
}

function renderProductos(products) {
    const productsList = document.getElementById('productsList');
    if (!productsList) {
        console.error('El elemento #productsList no se encontró en el DOM.');
        return;
    }
    productsList.innerHTML = ''; // Limpiar productos existentes

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.dataset.category = product.categories.join(',');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%;">
            <p>Precio: $${product.price.toLocaleString('es-CL')}</p>
            <button class="products-button" onclick="verProducto('${product.id}', ${product.price}, '${product.image}')">Ver Detalle</button>
        `;
        productsList.appendChild(productElement);
    });
}

function verProducto(id, precio, imagen) {
    const producto = {
        id: id,
        precio: precio,
        imagen: imagen,
        name: name
    };
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'producto.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar y renderizar productos
    const productosCargados = cargarProductos();
    renderProductos(productosCargados);

    // Configurar filtros de categoría
    const categoryLinks = document.querySelectorAll('#categoryFilter a');
    const productItems = document.querySelectorAll('.product-item');

    categoryLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const cat = link.dataset.category;

            productItems.forEach(product => {
                const categories = (product.dataset.category || '').split(',');
                if (cat === 'all' || categories.includes(cat)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Guardar productos iniciales en localStorage (solo la primera vez o al actualizar)
    guardarProductos();
});