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

   // this one doesnt works
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