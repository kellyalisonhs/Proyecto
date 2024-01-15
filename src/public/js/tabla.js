let listaUsuarios = [];
let error = 0;
/*
function getAllUsers(a) {
    const url = 'scr/allUsers';
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
            /*listaUsuarios.forEach(objeto => {           
                row = document.createElement('tr');     
                col1 = document.createElement('td');
                col2 = document.createElement('td');
                col3 = document.createElement('td');
                col1.innerHTML = `${objeto.user}`;
                col2.innerHTML = `${objeto.email}`;

                // link para eliminar usuario (each row)
                let eliminarButton = document.createElement('button');
                eliminarButton.href = "#";
                eliminarButton.classList.add('eliminar-button');
                eliminarButton.innerHTML = "Eliminar usuario";
                eliminarButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    eliminarUsuario(objeto.id); // se llama a la función de eliminar usuario con el id del usuario
                });

                
                col3.appendChild(eliminarButton);

                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                tabla.appendChild(row);
            });
        }
    };
    http.send();
    
}
*/


/*function getAllUsers() {
    fetch('http://localhost:3000/allUsers')
        .then(response => response.json())
        .then(data => {
            // Manipula el DOM para mostrar la lista de usuarios
            const usuariosList= document.getElementById('listaUsuarios');
            usuariosList.innerHTML = '';

            data.forEach(usuario => {
                const usuariotable = document.createElement('table');
                usuariotable.textContent = `ID: ${usuario.id}, Nombre: ${usuario.name}, Email: ${usuario.email}`;
                usuariosList.appendChild(usuarioDiv);
            });
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error.message);
        });
}
*/

document.addEventListener('DOMContentLoaded', function () {
    getAllUsers();
});

function getAllUsers() {
    fetch('/allUsers')
        .then(response => response.json())
        .then(data => {
            const usuariosBody = document.getElementById('usuariosBody');
            if (usuariosBody) {
                usuariosBody.innerHTML = '';

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${user.id}</td><td>${user.name_u}</td><td>${user.email_u}</td><td>${user.type_u}</td><td><button class="eliminar-btn" onclick="eliminarUsuario(${user.id})">Eliminar</button></td>`;
                    usuariosBody.appendChild(row);
                });
            } else {
                console.error('Elemento con ID usuariosBody no encontrado en el DOM.');
            }
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error.message);
        });
}






function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        fetch(`/eliminar/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log(`Usuario con ID ${id} eliminado correctamente.`);
                getAllUsers(); // Actualizar la lista después de eliminar
            } else {
                console.error(`Error al intentar eliminar usuario con ID ${id}.`);
            }
        })
        .catch(error => {
            console.error('Error de red al intentar eliminar usuario:', error.message);
        });
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