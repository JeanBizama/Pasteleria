// Script para la gestion del header del usuario
// Se crea un menu dropdown con opciones segun el rol del usuario (admin o user)
// Permite cerrar sesion y redirigir a paginas de administracion o perfil

//funcion para que el header del user se vea como un dropdown button con sus respectivas funciones cuando el usuario ingrese
document.addEventListener("DOMContentLoaded", () => {
    const userHeader = document.getElementById("userHeader");
    // Se recupera la informacion del usuario desde el localStorage
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    // Se verifica si la informacion del usuario es desde el localStorage y si el elemento del header existe
    if (usuarioLogueado && userHeader) {
        // Contenido personalizado segun el rol del usuario
        if (usuarioLogueado.rol === "admin") {
        // Menu para administrador
        userHeader.innerHTML = `
            <a href="carrito.html"><span class="material-symbols-outlined">shopping_cart</span></a>
            <div class="dropdown">
                Hola, ${usuarioLogueado.username} ▼
                <div class="dropdown-content" id="dropdownMenu">
                    <a href="admin.html">Administración</a>
                    <a href="#" id="logout">Cerrar sesión</a>
                </div>
            </div>
        `;
        }else {
            // Menu para usuario normal
        userHeader.innerHTML = `
            <a href="carrito.html"><span class="material-symbols-outlined">shopping_cart</span></a>
            <div class="dropdown">
                Hola, ${usuarioLogueado.username} ▼
                <div class="dropdown-content" id="dropdownMenu">
                    <a href="perfil.html">Perfil</a>
                    <a href="#" id="logout">Cerrar sesión</a>
                </div>
            </div>
        `;
        }
    
        // Obtener refencias a los elementos del menu desplegable
        const dropdown = userHeader.querySelector(".dropdown");
        const dropdownContent = document.getElementById("dropdownMenu");
    

        dropdown.addEventListener("click", () => {
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });
    

        // Elimina la informacion del usuario del localStorage y recarga la pagina
        document.getElementById("logout").addEventListener("click", function(e) {
            e.stopPropagation(); 
            localStorage.removeItem("usuarioLogueado");
            window.location.reload();
        });
    
        window.addEventListener("click", function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownContent.style.display = "none";
            }
        });
    }
});
