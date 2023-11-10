// inicio_sesion.mjs
import { usuarios } from './registrar_usuario.mjs';

function ingresar(formulario) {
    let username = formulario.username.value;
    let password = formulario.password.value;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username && usuarios[i].password === password) {
            console.log(usuarios[i].username);
            console.log(usuarios[i].password);
            console.log(username);
            console.log(password);
            alert("Usuario autenticado con éxito");
            formulario.reset();
            window.location.href = "tabla.html"; // redirige al usuario a la página "tabla.html"
            return true;
        }
    }

    alert("Usuario o contraseña incorrecta");
    return false;
}

// Llamar a la función ingresar después de que el módulo se haya cargado
/* ingresar(document.getElementById('formularioIngreso')); */

export { ingresar };