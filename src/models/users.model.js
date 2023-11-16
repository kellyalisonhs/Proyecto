import {conn} from '../../db.js';

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

/* modelo para registrar usuario */
export async function createUser(user) {
  const { username, correo_electronico, usertype, password, question, answer } = user;
  const strSql = 'INSERT INTO user (name_u, email_u, type_u, passwd_u, question_u, answer_u) VALUES (?, ?, ?, ?, ?, ?)';
  //const [result] = await conn.query(strSql, [username, email, usertype, password, question, answer]);
  //return result;
  // para manejar errores en la consulta
  try {
    const [result] = await conn.query(strSql, [username, correo_electronico, usertype, password, question, answer]);
    console.log(result); // Loguea el resultado de la consulta
    return result;
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    throw error; // Propaga el error para que sea manejado en el servicio
  }
}