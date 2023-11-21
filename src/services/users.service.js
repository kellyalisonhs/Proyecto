import * as userModel from '../models/users.model.js';
import { createHash } from "crypto";

export const getAllUsers = async()=> {
   let obj, userObjs=[];
   /**
    *  1. Se consume la promesa proveniente del modelo de usuarios mediante
    *     código bloqueante.
    *  2. Se genera un nuevo objeto que no contiene la contraseña
    *  3. Se añade a un nuevo array que se retorna al controller como promesa
    */
   let users = await userModel.getAllUsers();
   if (users) {      
        users.forEach(row=>{
        obj = {
            id:row.id,
            name:row.name_u,
            email:row.email_u
            
        }
        userObjs.push(obj);                      
      })    
   }
   return userObjs;               
}

export const valAuth = async(email, passwd)=> {
   let user = await userModel.getUserByEmail(email);
   let hash = createHash("md5").update(passwd).digest("hex");

   console.log(user[0].passwd_u);
   console.log(hash);
   
   if (user) {
      if(user[0].email_u === email && user[0].passwd_u === hash)
         return true;      
   }     
   return false;
}

/* serivicio para registro de nuevo usuario */
export const registerUser = async (userData) => {
   // Validaciones previas al registro en la base de datos
   if (
      !userData.username ||
      !userData.correo_electronico ||
      !userData.usertype ||
      !userData.password ||
      !userData.confirmPassword ||
      !userData.question ||
      !userData.answer
   ) {
      throw new Error("Todos los campos son obligatorios.");
   }

   // this one doesnt works (apparently now it does)
   const existingUser = await userModel.getUserByEmail(userData.email_u);
   if (existingUser.length > 0) {
     throw new Error("El correo electrónico ya está registrado.");
   }

   if (userData.password !== userData.confirmPassword) {
      throw new Error("Las contraseñas no coinciden.");
   }
 
   // hash para la contraseña antes de almacenarla
   const hashedPassword = createHash("md5").update(userData.password).digest("hex");
   userData.password = hashedPassword;
 
   // se llama a la función del modelo para crear el usuario
   const result = await userModel.createUser(userData);
   return result;
};

/* servicio para incio de sesión */
export const loginUser = async (username, password) => {
   try {
      console.log('Inicio de sesión para el usuario:', username);

      // validaciones previas al inicio de sesión
      // se corrobora que los campos estén llenos
      if (!username || !password) {
        throw new Error("Nombre de usuario y contraseña son obligatorios.");
      }
  
      // hash de la contraseña proporcionada antes de llamar al modelo
      /* const hashedPassword = createHash('md5').update(password).digest('hex'); */
  
      // consulta el usuario por nombre de usuario (llamada al modelo)
      const user = await userModel.getUserByUsername(username);

      console.log('Resultado de la consulta:', user);
  
      // se verifica si se encontró un usuario con los datos proporcionados
      if (!user || user.length === 0) {
         throw new Error(`El usuario "${username}" no existe.`);
      }

      // hash de la contraseña proporcionada para comparar con la almacenada en la base de datos
      const hashedPassword = createHash('md5').update(password).digest('hex');

      // se verifica si la contraseña proporcionada coincide con la almacenada en la base de datos
      if (user[0].passwd_u !== hashedPassword) {
         throw new Error(`La contraseña para el usuario "${username}" es incorrecta.`);
      }
  
      // autenticación exitosa, devuelve la información del usuario
      return user[0];
   } catch (error) {
      // manejo de errores
      console.error('Error en el inicio de sesión:', error);
      throw error;
   }
};