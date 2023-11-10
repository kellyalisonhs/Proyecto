document.getElementById("button").addEventListener("click", function () {
    const email = document.getElementById("email").value.toLowerCase();
    
    // Cargar la página "tabla.html" en un iframe oculto para acceder a la tabla de usuarios
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "tabla.html";

    iframe.onload = function () {
        // Obtener la tabla de usuarios de la página cargada en el iframe
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const table = iframeDocument.getElementById("lista");
        const rows = table.getElementsByTagName("tr");

        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            let found = false;

            for (let cell of cells) {
                if (cell.innerHTML.toLowerCase().includes(email)) {
                    found = true;
                    break;
                }
            }

            if (found) {
                alert("Usuario encontrado, da click en el boton de Recuperar contraseña.");
                break;// Detener la búsqueda después de encontrar el usuario
            }
        }

        // Eliminar el iframe después de su uso
        iframe.parentNode.removeChild(iframe);
    };

    document.body.appendChild(iframe);
});