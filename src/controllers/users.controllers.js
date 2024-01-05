/* users.controllers.js */
import dotenv from 'dotenv';
dotenv.config();
import * as userService from '../services/users.service.js';
import { SignJWT,jwtVerify } from 'jose';
import md5 from 'md5';
import {conn} from '../../db.js';

export const getAllUsers = (req, res)=>{
   // consumo de la promesa retornada en el servicio que accede a la BD  
   console.log(userService.getAllUsers());
   /* Consumo con async y await */
   (async () => {      
      let users = await userService.getAllUsers(); 
      res.render("users",{"list":users});    
    })();      
};

export const getRegisterForm = (req, res) => {
   res.render("register.hbs")
}

export const getLoginForm = (req, res) => {
   res.render("login.hbs")
}

export const getForgotPasswd = (req, res) => {
   res.render("forgotPasswd.hbs")
}

export const getPasswdRecovery = (req, res) => {
   res.render("passwdRecovery.hbs")
}

export const getChangePasswd = (req, res) => {
   res.render("changePasswd.hbs")
}

export const getCatalogue = async (req, res) => {
   const {authorization} = req.headers;;
    if(!authorization) return res.status(401);

    try{
      const encoder= new TextEncoder();
      const {payload}= await jwtVerify(authorization,encoder.encode(process.env.JWT_PRIVATE_KEY))
      const { id } =payload.user;
      const strSql = 'SELECT * FROM user WHERE id = ?';   
      const [result] = await conn.query(strSql,[id]);      
      if (result.length === 0) {
         return res.status(401).send("ID de usuario no válido");
       }
      console.log(id)
     
      res.render("catalogue.hbs")
    }catch(err){
    
      return res.status(401).send("Token inválido");
       }

}

export const getMarvelCatalogue = (req, res) => {
   res.render("marvelCatalogue.hbs")
}

export const login = (req, res)=>{
   let {email, passwd} = req.body;
   
   console.log(email+' '+passwd);

   if (email && passwd){      
      (async () => {      
         auth = await userService.valAuth(email, passwd); 
         res.send("Usuario registrado");
       })();            
   }
}

/* controlador para registrar usuario */
export const registerUser = async (req, res) => {
   const { username, correo_electronico, usertype, password, confirmPassword, question, answer } = req.body;

   try {
      // llama a la función del servicio para registrar al usuario
      await userService.registerUser({
         username,
         correo_electronico,
         usertype,
         password,
         confirmPassword,
         question,
         answer
      });

      // Redirige al usuario a la ruta "/login" con un mensaje de éxito
      res.redirect('/login?success=usuario-registrado-exitosamente');
      /* res.send("Usuario registrado exitosamente"); */
   } catch (error) {
      // Manejo de errores: Envía un mensaje de error y un código de estado 400
      res.status(400).send(`Error al registrar usuario: ${error.message}`);
   }
};

/* controlador para inicio de sesión */


export const loginUserJWT = async (req, res) => {
   const {username, password } = req.body;
     try {
      const {id} = await userService.loginUser(username, password);
      // si el usuario existe y la contraseña es correcta, redirige a la vista "/users-list"
      // se agrega un mensaje de inicio existoso en la url
      const encoder= new TextEncoder();
      const jwtCostructor= new SignJWT({id});
      const jwt= await jwtCostructor.setProtectedHeader({alg:'HS256', tpy:'JWT'}).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
      return res.send({jwt});
      //res.redirect("/users-list?success=inicio-de-sesion-exitoso");
   } catch (error) {
      res.status(400).send(`Error al iniciar sesión: ${error.message}`);
   }
};
export const catalogueJWT = async (req, res) => {
   const {authorization} = req.headers;;
    if(!authorization) return res.status(401);

    try{
      const encoder= new TextEncoder();
      const jwtdata= await jwtVerify(authorization,encoder.encode(process.env.JWT_PRIVATE_KEY))
      console.log(jwtdata)
    }catch(err){
      return res.status(401);
       }

};





export const loginUser = async (req, res) => {
   
   const { username, password } = req.body;
   const hashedPassword = md5(password);
   try {
     const user = await userService.loginUser(username,  hashedPassword);
     // si el usuario existe y la contraseña es correcta, redirige a la vista "/users-list"
     const encoder= new TextEncoder();
       const jwtCostructor= new SignJWT({user});
       const jwt= await jwtCostructor.setProtectedHeader({alg:'HS256', tpy:'JWT'}).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
       return res.send({jwt});
     res.redirect("/users-list");
   } catch (error) {
     res.status(400).send(`Error al iniciar sesión: ${error.message}`);
   }
 };



/* controlador para búsqueda de usuario por correo electrónico para recuperación de contraseña */
export const searchUserByEmail = async (req, res) => {
   const { correo_electronico } = req.body;

   try {
      // llamada al servicio para buscar el usuario por correo electrónico
      const user = await userService.searchUserByEmail(correo_electronico);

      // se redirige a el formulario de recuperar contraseña
      // res.redirect("/passwd-recovery?success=correo-electronico-encontrado");
       res.render("passwdRecovery", { user });
      // res.render("/recovery-passwd", { user });
   } catch (error) {
      // Manejo de errores: Redirige a la página de olvido de contraseña con un mensaje de error
      res.status(400).send(`Error en la búsqueda: ${error.message}`);
   }
};

/* Controlador para validación de la respuesta de recuperación */
export const recoveryAnswer = async (req, res) => {
   const { correo_electronico, answer } = req.body;

   try {
      // llamada al servicio para obtener la pregunta y validar la respuesta
      const isAnswerValid = await userService.getRecoveryInfoAndValidateAnswer(correo_electronico, answer);

      if (isAnswerValid) {
         const user = await userService.searchUserByEmail(correo_electronico);
         // respuesta válida -> redirige al usuario a la página de cambio de contraseña
         /* res.redirect("/change-passwd"); */
         res.render("changePasswd", { user });
      } else {
         // respuesta incorrecta -> redirige al usuario a la página de recuperación de contraseña con un mensaje de error
         res.status(400).send("La respuesta proporcionada es incorrecta.");
      }
   } catch (error) {
      // manejo de errores: redirige a la página de recuperación de contraseña con un mensaje de error
      res.status(400).send(`Error al validar la respuesta: ${error.message}`);
   }
}