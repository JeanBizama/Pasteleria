actualizarTablaUsuarios();

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
            <td class="email">${u.email}</td>
            <td class="username">${u.username}</td>
            <td class="password">${u.password}</td>
            <td class="fechaNacimiento">${u.fechaNacimiento}</td>
            <td class="cupon">${u.cupon}</td>
            <td class="rol">${u.rol}</td>
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
    location.href = "#finalTabla"
    const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
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