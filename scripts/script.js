const userHeader = document.getElementById("userHeader");
const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

if (usuarioLogueado && userHeader) {
    userHeader.innerHTML = `
        <div class="dropdown">
            Hola, ${usuarioLogueado.username} ▼
            <div class="dropdown-content" id="dropdownMenu">
                <a href="perfil.html">Perfil</a>
                <a href="#" id="logout">Cerrar sesión</a>
            </div>
        </div>
    `;

    const dropdown = userHeader.querySelector(".dropdown");
    const dropdownContent = document.getElementById("dropdownMenu");

    dropdown.addEventListener("click", () => {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

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
