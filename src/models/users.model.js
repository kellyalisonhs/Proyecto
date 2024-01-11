/* users.model.js */
import {conn} from '../../db.js';
import { createHash } from 'crypto';

export async function getAllUsers(){
  const strSql = 'select * from user';    
  const [result] = await conn.query(strSql);  // callback
  return result;
}

export async function getUserById(id){  
  const strSql = 'SELECT * FROM user WHERE id = ?';   
  const [result] = await conn.query(strSql,[id]);      
  return result;
}

export async function getUserByEmail(correo_electronico){  
  const strSql = 'SELECT * FROM user WHERE email_u = ?';   
  const [result] = await conn.query(strSql,[correo_electronico]);      
  return result;
}

/* modelo para inicio de sesión (se recupera el nombre de usuario) */
export async function getUserByUsername(username){  
  const strSql = 'SELECT * FROM user WHERE name_u = ?';   
  const [result] = await conn.query(strSql,[username]);      
  return result;
}

export async function getUserByUsernameAndPassword(username, password) {
  const strSql = 'SELECT * FROM user WHERE name_u = ? AND passwd_u = ?';
  const [result] = await conn.query(strSql, [username, password]);
  return result;
}

// Agrega una función para obtener el tipo de usuario por nombre de usuario
export async function getUserTypeByUsername(username) {
  const strSql = 'SELECT type_u FROM user WHERE name_u = ?';
  const [result] = await conn.query(strSql, [username]);
  return result.length > 0 ? result[0].type_u : null;
}

/* modelo para registrar usuario */
export async function createUser(user) {
  const { username, correo_electronico, usertype, password } = user;
  
  // Hash de la contraseña proporcionada antes de almacenarla en la base de datos
  const hashedPassword = createHash('md5').update(password).digest('hex');
  
  const strSql = 'INSERT INTO user (name_u, email_u, type_u, passwd_u) VALUES (?, ?, ?, ?)';
  // para manejar errores en la consulta
  try {
    const [result] = await conn.query(strSql, [username, correo_electronico, usertype, password]);
    console.log(result); // loguea el resultado de la consulta
    return result;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    throw error; // propaga el error para que sea manejado en el servicio
  }
}

/* modelo para recuperación de contraseña (se recupera la pregunta y respuesta) */
export async function getRecoveryInfoByEmail(correo_electronico) {
  const strSql = 'SELECT email_u, question_u, answer_u FROM user WHERE email_u = ?';
  const [result] = await conn.query(strSql, [correo_electronico]);
  return result[0]; // Devuelve la pregunta y respuesta del usuario
}

/* modelo para cambiar la contraseña */
export async function updatePasswordByEmail(correo_electronico, newPassword) {
  const hashedPassword = createHash('md5').update(newPassword).digest('hex');
  const strSql = 'UPDATE user SET passwd_u = ? WHERE email_u = ?';
  const [result] = await conn.query(strSql, [hashedPassword, correo_electronico]);
  return result;
}

/* modelo para Actualizar usuario */
export async function actualizar(user) {
  const { id, username, correo_electronico, usertype, password} = user;
  
  // Hash de la contraseña proporcionada antes de almacenarla en la base de datos
  const hashedPassword = createHash('md5').update(password).digest('hex');
  
  const strSql = 'UPDATE user SET name_u = ?, email_u = ?, passwd_u = ?, type_u = ? WHERE id = ?';
  // para manejar errores en la consulta
  try {
    const [result] = await conn.query(strSql, [id,username, correo_electronico, usertype, password]);
    console.log(result); // loguea el resultado de la consulta
    return result;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    throw error; // propaga el error para que sea manejado en el servicio
  }
}

//Modelo para eliminar un usuario
export async function eliminar (id)
{
  const strSql = 'DELETE FROM user Where id = ?';
  try {
    const [result] = await conn.query(strSql, [id]);
    console.log(result); // Loguea el resultado de la consulta
    return result;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    throw error; // Propaga el error para que sea manejado en el servicio
  }

}

