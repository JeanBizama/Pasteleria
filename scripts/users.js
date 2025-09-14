let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const adminEmail = "admin@admin.cl";  
const adminExistente = usuarios.find(u => u.email === adminEmail);
if (!adminExistente) {
    const admin = {
        email: adminEmail,
        username: "Admin",
        fechaNacimiento: "1980-01-01",
        password: "admin",
        cupon: "", 
        descuento: 0,
        beneficio: "Acceso total como administrador.",
        rol: "admin"
    };
    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function calcularBeneficio(email, fechaNacimiento, cupon) {
    let beneficio = "No tienes ningún beneficio activo!";
    let descuento = 0;
    
    let nacimiento = new Date(fechaNacimiento);
    let hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    if (edad >= 50) {
        descuento = 50;
        beneficio = "Descuento del 50% por ser mayor de 50 años.";
    }

    if (cupon.trim().toUpperCase() === "FELICES50" && descuento === 0) {
        descuento = 10;
        beneficio = "Descuento del 10% de por vida con el cupón FELICES50.";
    }

    let mesNacimiento = nacimiento.getMonth();
    let diaNacimiento = nacimiento.getDate();

    if (email.includes("@duocuc.cl") || email.includes("@profesor.duocuc.cl")) {
        if (hoy.getMonth() === mesNacimiento && hoy.getDate() === diaNacimiento) {
            beneficio = "Torta gratis por cumpleaños (Por ser parte de Duoc).";
        } else {
            beneficio = "Eres parte de Duoc, espera tu cumpleaños para una torta gratis.";
        }
    }

    return { beneficio, descuento };
}


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
            
            let email = document.getElementById("emailRegistro").value
            let username = document.getElementById("username").value
            let fechaNacimiento = document.getElementById("fecha_nacimiento").value
            let cupon = document.getElementById("cupon").value
            let { beneficio, descuento } = calcularBeneficio(email, fechaNacimiento, cupon);

            const nuevoUsuario = {
            email: email,
            username: username,
            fechaNacimiento: fechaNacimiento,
            password: password,
            cupon: cupon,
            descuento: descuento,
            beneficio: beneficio,
            rol: "cliente"
            };
        
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
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
    const beneficioText = document.getElementById("beneficioTexto")
    if (usuarioLogueado) {
        beneficioText.textContent = usuarioLogueado.beneficio;
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

            const { beneficio: nuevoBeneficio, descuento: nuevoDescuento } = calcularBeneficio(usuario.email, usuario.fechaNacimiento, usuario.cupon);
            usuario.beneficio = nuevoBeneficio;
            usuario.descuento = nuevoDescuento;

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