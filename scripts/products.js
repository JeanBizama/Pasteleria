//Se crea la lista de productos si no existe previamente la lista de productos base
if (!localStorage.getItem('productos')) { 
  const productos = [
        {
            id: 'torta-chocolate',
            name: 'Torta de Chocolate',
            description: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
            price: 15000,
            image: 'https://brigams.pe/wp-content/uploads/chocolate-2.jpg',
            categories: ['tortas-cuadradas']
        },
        {
            id: 'postre-frutilla',
            name: 'Postre Individual de Frutilla',
            description: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
            price: 3500,
            image: 'https://www.recetasnestle.com.ar/sites/default/files/srh_recipes/f8f1012b7969ac181b0eea003ea6b8f0.jpg',
            categories: ['postres-individuales']
        },
        {
            id: 'torta-vegana-vainilla',
            name: 'Torta Vegana de Vainilla',
            description: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
            price: 18000,
            image: 'https://happyvegannie.com/wp-content/uploads/2021/07/img-4302-ps-copia.jpg',
            categories: ['veganos', 'sin-gluten']
        },
        {
            id: 'torta-red-velvet',
            name: 'Torta Red Velvet',
            description: 'Bizcocho rojo aterciopelado con un delicado frosting de queso crema, ideal para celebraciones elegantes.',
            price: 20000,
            image: 'https://www.infobae.com/new-resizer/DGoMOTuyK29Gwu_0GG0rzZg4VGk=/arc-anglerfish-arc2-prod-infobae/public/52E6H6YM2NHAHHAR6S7SL47SEM.jpg',
            categories: ['tortas-circulares']
        },
        {
            id: 'mini-cheesecake',
            name: 'Mini Cheesecake',
            description: 'Suave y cremoso, este mini cheesecake es una opción perfecta para disfrutar sin culpa.',
            price: 4500,
            image: 'https://www.savingdessert.com/wp-content/uploads/2023/08/Mini-Cheesecake-Recipe-10-500x500.jpg',
            categories: ['postres-individuales', 'sin-azúcar']
        },
        {
            id: 'torta-moka',
            name: 'Torta de Moka',
            description: 'Torta de bizcocho con delicado sabor a café, rellena y cubierta con crema moka.',
            price: 17000,
            image: 'https://cocinerosargentinos.com/content/recipes/original/recipes.17549.jpg',
            categories: ['tortas-cuadradas', 'especiales']
        },
        {
            id: 'torta-limon',
            name: 'Torta de Limón',
            description: 'Bizcocho suave con un refrescante toque de limón y glaseado cítrico.',
            price: 16000,
            image: 'https://www.bakeandshare.com/wp-content/uploads/2020/10/chiffon-cake-limo%CC%81n-7-500x500.jpg',
            categories: ['tortas-circulares', 'sin-gluten']
        },
        {
            id: 'mousse-chocolate-vegano',
            name: 'Mousse de Chocolate Vegano',
            description: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
            price: 3800,
            image: 'https://deliciaskitchen.b-cdn.net/wp-content/uploads/2016/03/mousse-de-chocolate-vegana.jpg',
            categories: ['postres-individuales', 'veganos']
        },
        {
            id: 'pie-manzana',
            name: 'Pie de Manzana',
            description: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
            price: 12000,
            image: 'https://annaspasteleria.com/images/_imageBlock/DSC_3536web.jpg',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'torta-sin-azucar-frutos-rojos',
            name: 'Torta Sin Azúcar de Frutos Rojos',
            description: 'Torta ligera y deliciosa, endulzada naturalmente con frutos rojos, ideal para quienes buscan opciones más saludables.',
            price: 19000,
            image: 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/9abcfeee54a8ddae05bf733b2c9e1b04.jpg',
            categories: ['tortas-especiales', 'veganos']
        },
        {
            id: 'torta-zanahoria',
            name: 'Torta de Zanahoria',
            description: 'Bizcocho húmedo con zanahoria rallada, especias y un suave glaseado de queso crema.',
            price: 15500,
            image: 'https://veggiefestchicago.org/wp-content/uploads/2021/04/21-carrot-cake.jpg',
            categories: ['tortas-cuadradas', 'sin-gluten']
        },
        {
            id: 'brownie-individual',
            name: 'Brownie Individual',
            description: 'Brownie de chocolate rico y denso, ideal para quienes buscan un snack sin azúcar.',
            price: 3200,
            image: 'https://recetasdecocina.elmundo.es/wp-content/uploads/2016/11/brownie-de-chocolate.jpg',
            categories: ['postres-individuales', 'sin-azúcar']
        },
        {
            id: 'galletas-avena-veganas',
            name: 'Galletas de Avena Veganas',
            description: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
            price: 2800,
            image: 'https://i.pinimg.com/564x/72/48/a3/7248a3939f041e2089b02a7c35f66e8c.jpg',
            categories: ['veganos']
        },
        {
            id: 'panqueques-dulce-leche',
            name: 'Panqueques con Dulce de Leche',
            description: 'Panqueques esponjosos rellenos de dulce de leche, perfectos para una merienda especial.',
            price: 5000,
            image: 'https://i.ytimg.com/vi/vBYY1qZRYxE/maxresdefault.jpg',
            categories: ['pasteleria-tradicional', 'especiales']
        },
        {
            id: 'torta-maracuya',
            name: 'Torta de Maracuyá',
            description: 'Bizcocho suave relleno con crema de maracuyá, refrescante y exótica.',
            price: 18500,
            image: 'https://www.gourmet.cl/wp-content/uploads/2022/08/torta-de-maracuya-ajustada-web-570x458.jpg',
            categories: ['tortas-circulares', 'especiales']
        },
        {
            id: 'mini-tiramisu',
            name: 'Mini Tiramisú',
            description: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
            price: 4200,
            image: 'https://pastelerialaceleste.cl/wp-content/uploads/2024/01/Captura-de-Pantalla-2024-01-09-a-las-14.37.19.png',
            categories: ['postres-individuales', 'sin-gluten']
        },
        {
            id: 'torta-especial-chocolate',
            name: 'Torta Especial de Chocolate',
            description: 'Torta de chocolate de lujo con decoración especial para grandes celebraciones.',
            price: 21000,
            image: 'https://www.recetasnestle.com.ve/sites/default/files/srh_recipes/e2928ff551a360cdadb4e5a2528841b7.jpg',
            categories: ['tortas-especiales', 'sin-azúcar']
        },
        {
            id: 'torta-vegana-coco',
            name: 'Torta Vegana de Coco',
            description: 'Bizcocho suave de coco sin productos de origen animal, ideal para una dieta vegana.',
            price: 17500,
            image: 'https://happyvegannie.com/wp-content/uploads/2023/10/IMG_9367-1.jpg',
            categories: ['tortas-cuadradas', 'veganos']
        },
        {
            id: 'ensalada-frutas',
            name: 'Ensalada de Frutas',
            description: 'Variedad de frutas frescas de temporada, ideal para un postre ligero y saludable.',
            price: 6000,
            image: 'https://comedera.com/wp-content/uploads/sites/9/2023/07/ensalada-de-frutas.jpg',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'panna-cotta',
            name: 'Panna Cotta',
            description: 'Suave postre italiano de crema cocida, acompañado de salsa de frutas.',
            price: 4800,
            image: 'https://assets.epicurious.com/photos/62d6c513077a952f4a8c338c/1:1/w_2848,h_2848,c_limit/PannaCotta_RECIPE_04142022_9822_final.jpg',
            categories: ['postres-individuales', 'especiales']
        },
        {
            id: 'barritas-energeticas-veganas',
            name: 'Barritas Energéticas Veganas',
            description: 'Barritas caseras con avena y frutos secos, perfectas para un snack saludable y vegano.',
            price: 2500,
            image: 'https://www.conasi.eu/blog/wp-content/uploads/2019/04/barritas-energeticas-caseras-y-veganas-2.jpg',
            categories: ['veganos', 'sin-azúcar']
        },
        {
            id: 'torta-nuez',
            name: 'Torta de Nuez',
            description: 'Torta de manjar y nuez, suave y dulce, perfecta para los amantes de sabores clásicos.',
            price: 19500,
            image: 'https://images.aws.nestle.recipes/original/726dc2757d7c67d7ae4df13651725bed_torta_de_manjar_nuez_y_merengue.jpg',
            categories: ['tortas-circulares', 'sin-gluten']
        },
        {
            id: 'torta-chocolate-avellanas',
            name: 'Torta de Chocolate y Avellanas',
            description: 'Elegante torta de chocolate con trozos de avellanas, ideal para los fanáticos de los frutos secos.',
            price: 22000,
            image: 'https://images.aws.nestle.recipes/resized/2024_10_28T08_40_46_badun_images.badun.es_2d4d3c281ef9_tarta_de_galletas_y_avellanas_1290_742.jpg',
            categories: ['tortas-especiales', 'veganos']
        },

        // Productos que estaban en las imágenes y no en la lista original:
        {
            id: 'torta-cuadrada-frutas',
            name: 'Torta Cuadrada de Frutas',
            description: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
            price: 50000,
            image: 'https://i.pinimg.com/originals/7f/9d/3c/7f9d3c38cc45d64efdfbd491ff2465e0.jpg',
            categories: ['tortas-cuadradas']
        },
        {
            id: 'torta-circular-vainilla',
            name: 'Torta Circular de Vainilla',
            description: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
            price: 40000,
            image: 'https://cdn.prod.website-files.com/6421ce75be42e6b8e2158e40/64c42c0ba0442cfa0ea9b001_64bf466f222b6be8cc2e4d78_c3jtcssprhd6jbj5tyd6e1pzsqdyhq25.jpeg',
            categories: ['tortas-circulares']
        },
        {
            id: 'torta-circular-manjar',
            name: 'Torta Circular de Manjar',
            description: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
            price: 42000,
            image: 'https://cocinachilena.cl/wp-content/uploads/2012/05/Torta-chocolate-manjar-5-scaled.jpg',
            categories: ['tortas-circulares']
        },
        {
            id: 'tiramisu-clasico',
            name: 'Tiramisú Clásico',
            description: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
            price: 5500,
            image: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2019/12/05/5e9976f33136c.jpeg',
            categories: ['postres-individuales']
        },
        {
            id: 'torta-sin-azucar-naranja',
            name: 'Torta Sin Azúcar de Naranja',
            description: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
            price: 48000,
            image: 'https://www.gourmet.cl/wp-content/uploads/2022/12/torta-de-panqueque-naranja.jpg',
            categories: ['sin-azúcar']
        },
        {
            id: 'cheesecake-sin-azucar',
            name: 'Cheesecake Sin Azúcar',
            description: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
            price: 47000,
            image: 'https://www.splenda.com/wp-content/uploads/2020/05/american-classic-cheesecake-thumb.jpg',
            categories: ['sin-azúcar']
        },
        {
            id: 'empanada-manzana',
            name: 'Empanada de Manzana',
            description: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
            price: 3000,
            image: 'https://okdiario.com/img/recetas/2017/06/10/empanada-de-manzanas.jpg',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'tarta-santiago',
            name: 'Tarta de Santiago',
            description: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
            price: 6000,
            image: 'https://recipesblob.oetker.es/assets/c104e75b79384f3b94873bd15cdfe66c/1272x764/tarta-de-santiago.webp',
            categories: ['pasteleria-tradicional']
        },
        {
            id: 'brownie-sin-gluten',
            name: 'Brownie Sin Gluten',
            description: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
            price: 4000,
            image: 'https://www.soyceliaconoextraterrestre.com/wp-content/uploads/2020/10/brownie-sin-harina-y-sin-tacc-1024x683.jpg',
            categories: ['sin-gluten']
        },
        {
            id: 'pan-sin-gluten',
            name: 'Pan Sin Gluten',
            description: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.',
            price: 3500,
            image: 'https://glutendence.com/wp-content/uploads/2023/10/barritas-de-pan-sin-gluten.jpg',
            categories: ['sin-gluten']
        },
        {
            id: 'torta-vegana-chocolate',
            name: 'Torta Vegana de Chocolate',
            description: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
            price: 50000,
            image: 'https://brigams.pe/wp-content/uploads/chocolate-2.jpg',
            categories: ['veganos']
        },
        {
            id: 'torta-especial-cumpleanos',
            name: 'Torta Especial de Cumpleaños',
            description: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
            price: 55000,
            image: 'https://www.clarin.com/img/2022/04/19/2dLW3_B8e_1200x0__1.jpg',
            categories: ['tortas-especiales']
        },
        {
            id: 'torta-especial-boda',
            name: 'Torta Especial de Boda',
            description: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
            price: 60000,
            image: 'https://cdn0.matrimonio.com.co/article/9533/3_2/1280/jpg/3359-pastel-adornado-con-flores.jpeg',
            categories: ['tortas-especiales']
        }
    ];
    localStorage.setItem('productos', JSON.stringify(productos));
}

//funcion para guardar la lista de productos en el localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// funcion para cargar los productos de la lista en el localStorage
function cargarProductos() {
    const storedProducts = localStorage.getItem('productos');
    return storedProducts ? JSON.parse(storedProducts) : productos;
}

//funcion que muestra los productos en el html
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
            <button class="products-button" onclick="verProducto('${product.name}', ${product.price}, '${product.image}', '${product.description}')">Ver Detalle</button>
        `;
        productsList.appendChild(productElement);
    });
}

//funcion que lleva hacia la pagina "producto.html" para mostrar el detalle de producto
function verProducto(name, precio, imagen, description) {
    const producto = {
        name: name,
        precio: precio,
        imagen: imagen,
        description: description
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