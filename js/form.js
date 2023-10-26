const singUp = document.getElementById("signUp");
const singIn = document.getElementById("signIn");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

singIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
})

singUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
})


// formulario
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores de los campos
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    // Expresiones regulares para validar
    const letrasRegEx = /^[A-Za-z\s]+$/;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaLength = contrasena.length;

    // Variables para controlar los errores
    let errores = 0;

    // Validar nombre completo
    if (!letrasRegEx.test(nombreCompleto)) {
        document.getElementById("nombreCompleto").classList.add("error");
        document.getElementById("nombreCompletoError").textContent = "Caracteres inválidos";
        errores++;
    } else {
        document.getElementById("nombreCompleto").classList.remove("error");
        document.getElementById("nombreCompletoError").textContent = "";
    }

    // Validar email
    if (!emailRegEx.test(email)) {
        document.getElementById("email").classList.add("error");
        document.getElementById("emailError").textContent = "Email inválido";
        errores++;
    } else {
        document.getElementById("email").classList.remove("error");
        document.getElementById("emailError").textContent = "";
    }

    // Validar contraseña
    if (contrasenaLength < 6 || contrasenaLength > 12) {
        document.getElementById("contrasena").classList.add("error");
        document.getElementById("contrasenaError").textContent = "La contraseña debe tener entre 6 y 12 caracteres";
        errores++;
    } else {
        document.getElementById("contrasena").classList.remove("error");
        document.getElementById("contrasenaError").textContent = "";
    }

    // Comprobar si hay errores antes de enviar el formulario
    if (errores === 0) {
        form.submit(); // Envía el formulario si no hay errores
    }
});