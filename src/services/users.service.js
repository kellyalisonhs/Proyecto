/* users.service.js */
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
   try {
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

      const existingUser = await userModel.getUserByEmail(userData.correo_electronico);
      
      console.log("Existing User:", existingUser); // Añadido para depuración

      if (existingUser.length > 0) {
         throw new Error("El correo electrónico ya está registrado.");
      }

      if (userData.password !== userData.confirmPassword) {
         throw new Error("Las contraseñas no coinciden.");
      }

      // Hash para la contraseña antes de almacenarla
      const hashedPassword = createHash("md5").update(userData.password).digest("hex");
      userData.password = hashedPassword;

      // Hash para la respuesta antes de almacenarla
      const hashedAnswer = createHash("md5").update(userData.answer).digest("hex");
      userData.answer = hashedAnswer;

      // Se llama a la función del modelo para crear el usuario
      const result = await userModel.createUser(userData);
      return result;
   } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error; // Propaga el error para que pueda ser manejado en el controlador o donde sea que se llame a esta función
   }
};

export const loginUser = async (username, password) => {
   // Validaciones previas al inicio de sesión en la base de datos
   if (!username || !password) {
     throw new Error("Todos los campos son obligatorios.");
   }
 
   const user = await userModel.getUserByUsernameAndPassword(username, password);
 
   if (user.length === 0) {
     throw new Error("Usuario o contraseña incorrectos.");
   }
 
   return user[0];
 };

/* servicio para forgotPasswd (se busca el correo electronico)*/
export const searchUserByEmail = async (correo_electronico) => {
   try {
      // Validación: Verificar que el correo electrónico no esté vacío
      if (!correo_electronico) {
         throw new Error("El campo de correo electrónico no puede estar vacío.");
      }

      // Validación: Verificar el formato del correo electrónico
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(correo_electronico)) {
         throw new Error("El formato del correo electrónico es inválido.");
      }

      const user = await userModel.getUserByEmail(correo_electronico);

      // Validación: Verificar si el usuario existe
      if (!user || user.length === 0) {
         throw new Error("No se encontró ningún usuario con ese correo electrónico.");
      }

      return user[0];
   } catch (error) {
      console.error("Error en la búsqueda de usuario por correo electrónico:", error);
      throw error;
   }
};

/* servicio para obtener la pregunta de seguridad y validar la respuesta */
export const getRecoveryInfoAndValidateAnswer = async (correo_electronico, answer) => {
   try {
      // se obtiene la pregunta de recuperación y la respuesta del usuario
      const securityInfo = await userModel.getRecoveryInfoByEmail(correo_electronico);

      // valida que la respuesta proporcionada coincida con la almacenada en la base de datos
      const hashedAnswer = createHash('md5').update(answer).digest('hex');

      if (securityInfo && securityInfo.answer_u === hashedAnswer) {
         return true; // respuesta correcta
      } else {
         return false; // respuesta incorrecta
      }
   } catch (error) {
      console.error("Error al obtener la pregunta de seguridad y validar la respuesta:", error);
      throw error;
   }
} 