let listaUsuarios = [];
let error = 0;

function getAllUsers(a) {
    const url = 'usuarios.json';
    const http = new XMLHttpRequest();  // Objeto para configurar la petición
    http.open('GET', url); // método GET para obtener el archivo
    http.onreadystatechange = function () { // función que procesa la respuesta
        if (this.readyState == 4 && this.status == 200) {
            if (a!=1)
                listaUsuarios = JSON.parse(this.responseText); // recupera la respuesta en un objeto Javascript
                    
            let tabla = document.querySelector("#lista");            
                let row, col1, col2, col3;
                console.log(listaUsuarios);

            /* Se añade título de la tabla */
            listaUsuarios.forEach(objeto => {           
                row = document.createElement('tr');     
                col1 = document.createElement('td');
                col2 = document.createElement('td');
                col3 = document.createElement('td');
                col1.innerHTML = `${objeto.user}`;
                col2.innerHTML = `${objeto.email}`;

                // link para eliminar usuario (each row)
                let eliminarLink = document.createElement('a');
                eliminarLink.href = "#";
                eliminarLink.innerHTML = "Eliminar usuario";
                eliminarLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    eliminarUsuario(objeto.id); // se llama a la función de eliminar usuario con el id del usuario
                });
                col3.appendChild(eliminarLink);

                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                tabla.appendChild(row);
            });
        }
    };
    http.send();
}

/* eliminar usuario */
async function eliminarUsuario(id) {
    if (confirm('¿Está seguro de que desea eliminar a este usuario?')) {
        const response = await fetch('usuarios.json');
        const usuarios = await response.json();
        const usuarioEliminado = usuarios.find((usuario) => usuario.id === id);

        if (usuarioEliminado) {
            const indiceUsuario = usuarios.indexOf(usuarioEliminado);
            usuarios.splice(indiceUsuario, 1);
            await fetch('usuarios.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarios),
            });
            location.reload();
            alert('Usuario eliminado');
        } else {
            console.error('Usuario no encontrado');
        }
    }
}

function setUser(user){   
    if (user != null) {      
        listaUsuarios.push(user);   
        alert (listaUsuarios[listaUsuarios.length].user);
        error = 0;      
    } else
        error = 1;
    return error;
}
 
function registerUser(){
    let userF = {
        user:"Juan Pablo",
        email:"juan.pablo@dominio.mx",
        question:"Lugar favorito",
        answer:"a48f7dfe488185fe9b9c8c723d318c66",
        passwd:"2ff3eb9deea5be1c49585e8fa3a1f6c1"        
    } 
 
    let res = setUser(userF);     
    if (res === 0) {
        alert(`Usuario ${userF.user} registrado`);
        getAllUsers(1);
    } else
        alert(`Error al registrar el usuario`);
}
 
/* function inicioSesion(){
    // recupera valor de passwd en texto plano
    let pw = document.formIS.passwd.value;
    let u = document.formIS.user.value;
 
    let userF = {
        user:"Juan Pablo",
        email:"juan.pablo@dominio.mx",
        question:"Lugar favorito",
        answer:"a48f7dfe488185fe9b9c8c723d318c66",
        passwd:"2ff3eb9deea5be1c49585e8fa3a1f6c1"        
    }
 
    if (userF.user === u && userF.passwd === md5(pw)) 
        alert ('Usuario encontrado');
    else
        alert ('Datos incorrectos');
} */