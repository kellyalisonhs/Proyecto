document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['formCam'];

    // Manejar el clic en el botón
    form.querySelector('#btn').addEventListener('click', function() {
        const usernameInput = form.elements['username'].value;
        const passwdInput = form.elements['passwd'].value;
        const newpasswdInput = form.elements['newpasswd'].value;
        const confirmnewpasswdInput = form.elements['confirmnewpasswd'].value;

        fetch('usuarios.json')
            .then(response => response.json())
            .then(usuarios => {
                const user = usuarios.find(u => u.user === usernameInput);

                if (!user) {
                    alert('Usuario no encontrado.');
                } else if (passwdInput !== user.passwd) {
                    alert('La contraseña actual no es válida.');
                } else if (!/^[A-Za-z0-9!?-]{4,8}$/.test(newpasswdInput)) {
                    alert('La nueva contraseña no cumple con los requisitos.');
                } else if (newpasswdInput !== confirmnewpasswdInput) {
                    alert('La nueva contraseña y la confirmación no coinciden.');
                } else {
                    // Actualizar la contraseña del usuario en el objeto JSON
                    user.passwd = newpasswdInput;

                    // Guardar los cambios en el archivo JSON
                    const updatedUsersJSON = JSON.stringify(usuarios);

                    fetch('usuarios.json', {
                        method: 'PUT',
                        body: updatedUsersJSON
                    })
                    .then(() => {
                        alert('Contraseña cambiada con éxito (simulado en el lado del cliente).');
                        // Limpia los campos del formulario si es necesario.
                        form.reset();
                    })
                    .catch(error => {
                        console.error('Error al guardar los cambios en el archivo JSON', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON de usuarios', error);
            });
    });
});