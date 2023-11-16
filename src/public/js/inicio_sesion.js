let usuarios = [];

function ingresar(formulario) {
    let username = formulario.username.value;
    let password = formulario.password.value;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username && usuarios[i].password === password) {
            console.log(usuarios[i].username)
            console.log(usuarios[i].password)
            console.log(username)
            console.log(password)
            alert("Usuario autenticado con éxito");
            formulario.reset();
            return true;
        }else{
            alert("Usuario o contraseña incorrecta");
            return false;
        }
    }
}