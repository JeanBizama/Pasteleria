//al cargar la pagina actualizar ambas tablas inmediatamente
actualizarTablaUsuarios();
actualizarTablaProductos();

const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
const path = window.location.pathname;

//solo se podra acceder a esta pagina si el rol del usuario es admin
if (path.includes("admin.html")) {
    if (!usuarioLogueado || usuarioLogueado.rol !== "admin") {
        alert("Acceso denegado. Debes iniciar sesión como administrador.");
        window.location.href = "login.html";
    }
}

//funcion para actualizar y mostrar la tabla de datos de USUARIOS
function actualizarTablaUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
    tablaUsuarios.innerHTML = "";
    usuarios.forEach((u, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="email">${u.email || ''}</td>
            <td class="username">${u.username || ''}</td>
            <td class="password">${u.password || ''}</td>
            <td class="fechaNacimiento">${u.fechaNacimiento || ''}</td>
            <td class="cupon">${u.cupon || ''}</td>
            <td class="rol">${u.rol || ''}</td>
            <td><button onclick="editarUsuario(${i}, this)">Editar</button></td>
            <td><button onclick="eliminarUsuario(${i})">Eliminar</button></td>
        `;
        tablaUsuarios.appendChild(fila);
    });

    //reactiva el boton de agregar cuando se actualice la tabla
    const btnAgregar = document.getElementById("btnAgregarUsuario");
    if (btnAgregar) {
        btnAgregar.disabled = false;
    }
}

//funcion para agregar usuarios a la tabla y lista usuarios del LocalStorage
function agregarUsuario() {
    const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
    if (!tablaUsuarios) {
        console.error("El elemento #tablaUsuarios tbody no se encontró.");
        return;
    }
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td><input type="email" value="" class="edit-email" placeholder="Email"></td>
        <td><input type="text" value="" class="edit-username" placeholder="Nombre de usuario"></td>
        <td><input type="text" value="" class="edit-password" placeholder="Contraseña"></td>
        <td><input type="text" value="" class="edit-fechaNacimiento" placeholder="Fecha de nacimiento"></td>
        <td><input type="text" value="" class="edit-cupon" placeholder="Cupon"></td>
        <td><input type="text" value="" class="edit-rol" placeholder="Rol"></td>
        <td>
            <button onclick="guardarUsuario(null, this)">Guardar</button>
            <button onclick="actualizarTablaUsuarios()">Cancelar</button>
        </td>
    `;
    tablaUsuarios.appendChild(fila);

    //al dar click al boton agregar este se desactiva para que se cree uno a la vez
    const btnAgregar = document.getElementById("btnAgregarUsuario");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

//funcion para eliminar usuarios 
function eliminarUsuario(i) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    actualizarTablaUsuarios();
}


//funcion para editar usuarios desde la tabla de administracion 
function editarUsuario(i, boton) {
    const fila = boton.closest("tr");
    const email = fila.querySelector(".email").textContent;
    const username = fila.querySelector(".username").textContent;
    const password = fila.querySelector(".password").textContent;
    const fechaNacimiento = fila.querySelector(".fechaNacimiento").textContent;
    const cupon = fila.querySelector(".cupon").textContent;
    const rol = fila.querySelector(".rol").textContent;

    fila.innerHTML = `
        <td><input type="email" value="${email}" class="edit-email"></td>
        <td><input type="text" value="${username}" class="edit-username"></td>
        <td><input type="text" value="${password}" class="edit-password"></td>
        <td><input type="text" value="${fechaNacimiento}" class="edit-fechaNacimiento"></td>
        <td><input type="text" value="${cupon}" class="edit-cupon"></td>
        <td><input type="text" value="${rol}" class="edit-rol"></td>
        <td>
            <button onclick="guardarUsuario(${i}, this)">Guardar</button>
            <button onclick="actualizarTablaUsuarios()">Cancelar</button>
        </td>
    `;

    const btnAgregar = document.getElementById("btnAgregarUsuario");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

//funcion para guardar usuario nuevo creado con el boton de agregar
function guardarUsuario(i, boton) {
    const fila = boton.closest("tr");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    const nuevoUsuario = {
        email: fila.querySelector(".edit-email").value,
        username: fila.querySelector(".edit-username").value,
        password: fila.querySelector(".edit-password").value,
        fechaNacimiento: fila.querySelector(".edit-fechaNacimiento").value,
        cupon: fila.querySelector(".edit-cupon").value,
        rol: fila.querySelector(".edit-rol").value
    };

    if (i === null) {
        usuarios.push(nuevoUsuario);
    } else {
        usuarios[i] = nuevoUsuario;
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    actualizarTablaUsuarios();
}


//funcion para actualizar y mostrar la tabla de datos de PRODUCTOS
function actualizarTablaProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    const tablaProductos = document.querySelector("#tablaProductos tbody");
    if (!tablaProductos) {
        console.error("El elemento #tablaProductos tbody no se encontró.");
        return;
    }
    tablaProductos.innerHTML = "";
    productos.forEach((p, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="id">${p.id || ''}</td>
            <td class="name">${p.name || ''}</td>
            <td class="description">${p.description || ''}</td>
            <td class="price">${p.price || ''}</td>
            <td class="image">${p.image || ''}</td>
            <td class="categories">${(p.categories || []).join(", ") || ''}</td>
            <td><button onclick="editarProducto(${i}, this)">Editar</button><button onclick="eliminarProducto(${i})">Eliminar</button></td>
        `;
        tablaProductos.appendChild(fila);
    });

    const btnAgregar = document.getElementById("btnAgregarProducto");
    if (btnAgregar) {
        btnAgregar.disabled = false;
    }
}
//funcion para agregar productos a la tabla y lista productos del LocalStorage
function agregarProducto() {
    const tablaProductos = document.querySelector("#tablaProductos tbody");
    if (!tablaProductos) {
        console.error("El elemento #tablaProductos tbody no se encontró.");
        return;
    }
    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td><input type="text" value="" class="edit-id" placeholder="ID"></td>
        <td><input type="text" value="" class="edit-name" placeholder="Nombre"></td>
        <td><input type="text" value="" class="edit-desc" placeholder="Descripcion"></td>
        <td><input type="number" value="" class="edit-price" placeholder="Precio"></td>
        <td><input type="text" value="" class="edit-image" placeholder="URL de Imagen"></td>
        <td><input type="text" value="" class="edit-categories" placeholder="Categorías (separadas por coma)"></td>
        <td>
            <button onclick="guardarProducto(null, this)">Guardar</button>
            <button onclick="actualizarTablaProductos()">Cancelar</button>
        </td>
    `;
    tablaProductos.appendChild(fila);

    const btnAgregar = document.getElementById("btnAgregarProducto");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

//funcion para eliminar el producto
function eliminarProducto(i) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    actualizarTablaProductos();
}

function editarProducto(i, boton) {
    const fila = boton.closest("tr");
    const id = fila.querySelector(".id").textContent;
    const name = fila.querySelector(".name").textContent;
    const description = fila.querySelector(".description").textContent;
    const price = fila.querySelector(".price").textContent;
    const image = fila.querySelector(".image").textContent;
    const categories = fila.querySelector(".categories").textContent;

    fila.innerHTML = `
        <td><input type="text" value="${id}" class="edit-id"></td>
        <td><input type="text" value="${name}" class="edit-name"></td>
        <td><input type="text" value="${description}" class="edit-desc"></td>
        <td><input type="number" value="${price}" class="edit-price"></td>
        <td><input type="text" value="${image}" class="edit-image"></td>
        <td><input type="text" value="${categories}" class="edit-categories"></td>
        <td>
            <button onclick="guardarProducto(${i}, this)">Guardar</button>
            <button onclick="actualizarTablaProductos()">Cancelar</button>
        </td>
    `;

    const btnAgregar = document.getElementById("btnAgregarProducto");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

//funcion para guardar producto nuevo creado con el boton de agregar
function guardarProducto(i, boton) {
    const fila = boton.closest("tr");
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const nuevoProducto = {
        id: fila.querySelector(".edit-id").value,
        name: fila.querySelector(".edit-name").value,
        description: fila.querySelector(".edit-desc").value,
        price: Number(fila.querySelector(".edit-price").value) || 0,
        image: fila.querySelector(".edit-image").value,
        categories: fila.querySelector(".edit-categories").value.split(",").map(cat => cat.trim()).filter(cat => cat)
    };

    if (i === null) {
        productos.push(nuevoProducto);
    } else {
        // Asegurarse de que el índice sea válido
        if (i >= 0 && i < productos.length) {
            productos[i] = nuevoProducto;
        } else {
            console.error("Índice inválido al editar producto:", i);
            return; // Salir si el índice no es válido
        }
    }

    //guardar lista productos en LocalStorage
    localStorage.setItem("productos", JSON.stringify(productos));
    actualizarTablaProductos();
}


if (path.includes("admin.html")) {
    actualizarTablaProductos();
}