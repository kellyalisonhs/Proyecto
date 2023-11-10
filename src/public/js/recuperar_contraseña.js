document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['formCon'];

    // Manejar el clic en el botón
    form.querySelector('#btn').addEventListener('click', function() {
        const questionInput = form.elements['question'].value;
        const responseInput = form.elements['response'].value;

        // Cargar datos de usuarios desde el archivo JSON
        fetch('usuarios.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.question === questionInput && u.answer === responseInput);

                if (user) {
                    alert(`Tu contraseña es: ${user.passwd}`);
                } else {
                    alert('Pregunta de recuperación o respuesta incorrecta');
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON', error);
            });
    });
});