let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const formRegistro = document.getElementById("FormularioRegistro");
if (formRegistro) {
        formRegistro.addEventListener("submit", function(e) {
        e.preventDefault();
            
            let password = document.getElementById("passwordRegistro").value;
            let confirmPassword = document.getElementById("confirm_password").value;
        
            if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
            }
        
            const nuevoUsuario = {
            email: document.getElementById("emailRegistro").value,
            username: document.getElementById("username").value,
            fechaNacimiento: document.getElementById("fecha_nacimiento").value,
            password: document.getElementById("passwordRegistro").value,
            cupon: document.getElementById("cupon").value
            };
        
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
            console.log("Usuario registrado:", nuevoUsuario);
            console.log("Lista actual de usuarios:", usuarios);
        
            alert("Usuario registrado con éxito");
        
            this.reset();
            
            window.location.href = "login.html";
    });
}

const formLogin = document.getElementById("FormularioInicio");
if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value.trim();
        const password = document.getElementById("passwordLogin").value;

        const usuarioEncontrado = usuarios.find(u => u.email === email);

        if (!usuarioEncontrado) {
            alert("Usuario no registrado");
            return;
        }

        if (usuarioEncontrado.password !== password) {
            alert("Contraseña incorrecta");
            return;
        }

        alert(`Bienvenido, ${usuarioEncontrado.username}`);

        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

        window.location.href = "index.html";
    });
}

const formRecuperar = document.getElementById("FormularioRecuperar");
if (formRecuperar) {
    formRecuperar.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email_reset").value.trim();
        const usuario = usuarios.find(u => u.email === email);

        if (!usuario) {
            alert("Correo no registrado");
            return;
        }

        let nuevaPassword = prompt("Ingresa tu nueva contraseña:");
        if (!nuevaPassword) return alert("Contraseña no válida");

        let confirmarPassword = prompt("Confirma tu nueva contraseña:");
        if (nuevaPassword !== confirmarPassword) {
            return alert("Las contraseñas no coinciden");
        }

        usuario.password = nuevaPassword;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Contraseña actualizada con éxito");
        window.location.href = "login.html";
    });
}

const formPerfil = document.getElementById("FormularioPerfil")
if (formPerfil) {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const usernamePerfil = document.getElementById("usernamePerfil");
    const emailPerfil = document.getElementById("emailPerfil");
    const fechaNacimientoPerfil = document.getElementById("fechaNacimientoPerfil");
    const cuponPerfil = document.getElementById("cuponPerfil");
   
    if (usuarioLogueado) {
        usernamePerfil.value = usuarioLogueado.username;
        emailPerfil.value = usuarioLogueado.email;
        fechaNacimientoPerfil.value = usuarioLogueado.fechaNacimiento;
        cuponPerfil.value = usuarioLogueado.cupon;

        formPerfil.addEventListener("submit", function(e) {
            e.preventDefault();

            const usuario = usuarios.find(u => u.email === usuarioLogueado.email);

            const nuevoUsername = usernamePerfil.value.trim();
            const nuevoEmail = emailPerfil.value.trim();
            const nuevoCupon = cuponPerfil.value.trim();


            usuario.username = nuevoUsername;
            usuario.cupon = nuevoCupon; 

            if (nuevoEmail !== usuarioLogueado.email) {
                usuario.email = nuevoEmail;
            }

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            const usuarioActualizadoLogueado = { ...usuarioLogueado, ...usuario };
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActualizadoLogueado));

            alert("Datos actualizados con éxito");
            window.location.reload();

        });
    } else {
        alert("Debes iniciar sesión para acceder al perfil.");
        window.location.href = "login.html";
    }
}