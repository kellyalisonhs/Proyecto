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

export async function getUserByEmail(email){  
  const strSql = 'SELECT * FROM user WHERE email_u = ?';   
  const [result] = await conn.query(strSql,[email]);      
  return result;
}

/* modelo para inicio de sesión (se recupera el nombre de usuario) */
export async function getUserByUsername(username){  
  const strSql = 'SELECT * FROM user WHERE name_u = ?';   
  const [result] = await conn.query(strSql,[username]);      
  return result;
}

/* modelo para registrar usuario */
export async function createUser(user) {
  const { username, correo_electronico, usertype, password, question, answer } = user;
  
  // Hash de la contraseña proporcionada antes de almacenarla en la base de datos
  const hashedPassword = createHash('md5').update(password).digest('hex');
  
  const strSql = 'INSERT INTO user (name_u, email_u, type_u, passwd_u, question_u, answer_u) VALUES (?, ?, ?, ?, ?, ?)';
  // para manejar errores en la consulta
  try {
    const [result] = await conn.query(strSql, [username, correo_electronico, usertype, password, question, answer]);
    console.log(result); // loguea el resultado de la consulta
    return result;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    throw error; // propaga el error para que sea manejado en el servicio
  }
}