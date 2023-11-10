let usuarios = [];

function validar(formulario) {
    let username = formulario.username.value;
    let correo_electronico = formulario.correo_electronico.value;
    let usertype = formulario.usertype.value;
    let password = formulario.password.value;
    let confirmPassword = formulario.confirmPassword.value;
    let recoveryQuestion = formulario.recoveryQuestion.value;
    let answer = formulario.answer.value;

    if (username === "" || correo_electronico === "" || usertype === "" || password === "" || confirmPassword === "" || recoveryQuestion === "" || answer === "") {
        alert("Por favor, llene todos los campos.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
    }

    return true;
}

function registrar(formulario) {
    if (validar(formulario)) {
        let username = formulario.username.value;
        let correo_electronico = formulario.correo_electronico.value;
        let usertype = formulario.usertype.value;
        let password = formulario.password.value;
        let recoveryQuestion = formulario.recoveryQuestion.value;
        let answer = formulario.answer.value;

        let nuevoUsuario = {
            username,
            correo_electronico,
            usertype,
            password,
            recoveryQuestion,
            answer
        };

        usuarios.push(nuevoUsuario);
        alert("Usuario registrado con éxito");
        formulario.reset();

        // Guardar los datos en un archivo JSON
        fs.writeFile('usuarios.json', JSON.stringify(usuarios), (err) => {
            if (err) throw err;
            console.log('Los datos se han guardado en el archivo usuarios.json.');
        });
    }
}