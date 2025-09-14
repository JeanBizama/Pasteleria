actualizarTablaUsuarios();
actualizarTablaProductos();

const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
const path = window.location.pathname;

if (path.includes("admin.html")) {
    if (!usuarioLogueado || usuarioLogueado.rol !== "admin") {
        alert("Acceso denegado. Debes iniciar sesión como administrador.");
        window.location.href = "login.html";
    }
}

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

    const btnAgregar = document.getElementById("btnAgregarUsuario");
    if (btnAgregar) {
        btnAgregar.disabled = false;
    }
}

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

    // Desplazamiento suave después de añadir la fila
    setTimeout(() => {
        tablaUsuarios.parentElement.scrollIntoView({ behavior: "smooth", block: "end" });
        window.scrollBy(0, -70); // Ajusta este valor según el diseño
    }, 0);

    const btnAgregar = document.getElementById("btnAgregarUsuario");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

function eliminarUsuario(i) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    actualizarTablaUsuarios();
}

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
        <td><input type="number" value="" class="edit-price" placeholder="Precio"></td>
        <td><input type="text" value="" class="edit-image" placeholder="URL de Imagen"></td>
        <td><input type="text" value="" class="edit-categories" placeholder="Categorías (separadas por coma)"></td>
        <td>
            <button onclick="guardarProducto(null, this)">Guardar</button>
            <button onclick="actualizarTablaProductos()">Cancelar</button>
        </td>
    `;
    tablaProductos.appendChild(fila);

    // Desplazamiento suave después de añadir la fila
    setTimeout(() => {
        tablaProductos.parentElement.scrollIntoView({ behavior: "smooth", block: "end" });
        window.scrollBy(0, -70); // Ajusta este valor según el diseño
    }, 0);

    const btnAgregar = document.getElementById("btnAgregarProducto");
    if (btnAgregar) {
        btnAgregar.disabled = true;
    }
}

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
    const price = fila.querySelector(".price").textContent;
    const image = fila.querySelector(".image").textContent;
    const categories = fila.querySelector(".categories").textContent;

    fila.innerHTML = `
        <td><input type="text" value="${id}" class="edit-id"></td>
        <td><input type="text" value="${name}" class="edit-name"></td>
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

function guardarProducto(i, boton) {
    const fila = boton.closest("tr");
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Depuración: Verifica los valores de los inputs
    console.log("Valores a guardar:", {
        id: fila.querySelector(".edit-id").value,
        name: fila.querySelector(".edit-name").value,
        price: fila.querySelector(".edit-price").value,
        image: fila.querySelector(".edit-image").value,
        categories: fila.querySelector(".edit-categories").value
    });

    const nuevoProducto = {
        id: fila.querySelector(".edit-id").value,
        name: fila.querySelector(".edit-name").value,
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

    localStorage.setItem("productos", JSON.stringify(productos));
    actualizarTablaProductos();
}

// Llamar a la función al cargar la página si estás en admin.html
if (path.includes("admin.html")) {
    actualizarTablaProductos();
}