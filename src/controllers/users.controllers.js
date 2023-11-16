import * as userService from '../services/users.service.js';

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

export const getUsers = (req, res) => {
   res.render("usersList.hbs")
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

/* export const login = (req, res)=>{
   let {email, passwd} = req.body;
   
   console.log(email+' '+passwd);

   if (email && passwd){      
      (async () => {      
         auth = await userService.valAuth(email, passwd); 
         res.send("Usuario registrado");
       })();            
   }
} */

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

      res.send("Usuario registrado exitosamente");
   } catch (error) {
      res.status(400).send(`Error al registrar usuario: ${error.message}`);
   }
};