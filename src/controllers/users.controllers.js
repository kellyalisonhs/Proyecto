/* users.controllers.js */
import dotenv from 'dotenv';
dotenv.config();
import * as userService from '../services/users.service.js';
import { SignJWT, jwtVerify } from 'jose';
import md5 from 'md5';
import { conn } from '../../db.js';

/* renders */
/* Vista Administrador -> lista de usuarios */
export const getAllUsers = (req, res) => {
   // Obtén el tipo de usuario desde el token
   const userType = req.user ? req.user.usertype : null;

   // Consumo de la promesa retornada en el servicio que accede a la BD
   (async () => {
      let users = await userService.getAllUsers();
      res.render("users", { "list": users, userType });
   })();
};

/* form de registro */
export const getRegisterForm = (req, res) => {
   res.render("register.hbs");
};

/* form: inicio de sesión */
export const getLoginForm = (req, res) => {
   res.render("login.hbs");
};

/* form: ¿olvidaste tu contraseña? (búsqueda de correo) */
export const getForgotPasswd = (req, res) => {
   res.render("forgotPasswd.hbs");
};

/* form: cambiar contraseña */
export const getChangePasswd = (req, res) => {
   res.render("changePasswd.hbs");
};

/* Vista Operador -> catalogo de personajes de Marvel */
export const getMarvelCatalogue = (req, res) => {
   res.render("marvelCatalogue.hbs");
};

/* controlador: inicio de sesión (perfiles) */
export const loginUser = async (req, res) => {
   const { username, password } = req.body;
   const hashedPassword = md5(password);

   try {
      const user = await userService.loginUser(username, hashedPassword);

      if (!user) {
         res.status(400).send("Usuario o contraseña incorrectos");
         return;
      }

      const userType = await userService.getUserType(username);

      const encoder = new TextEncoder();
      const jwtConstructor = new SignJWT({ user });

      let template = 'defaultView.hbs'; // Vista predeterminada (no hay)

      if (userType === 'Admin') {
         template = 'usersList.hbs'; // Vista para administradores
      } else if (userType === 'Operativo') {
         template = 'marvelCatalogue.hbs'; // Vista para usuarios operativos
      }

      const jwt = await jwtConstructor.setProtectedHeader({ alg: 'HS256', tpy: 'JWT' }).setIssuedAt().setExpirationTime('1h').sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

      res.render(template, { jwt });
   } catch (error) {
      res.status(500).send("Error al iniciar sesión: ${error.message}");
   }
};

export const getCatalogue = async (req, res) => {
   const { authorization } = req.headers;
   if (!authorization) return res.status(401);

   try {
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));
      const { id } = payload.user;
      const strSql = 'SELECT * FROM user WHERE id = ?';
      const [result] = await conn.query(strSql, [id]);
      if (result.length === 0) {
         return res.status(401).send("ID de usuario no válido");
      }
      console.log(id);

      res.render("marvelCatalogue.hbs");
   } catch (err) {
      return res.status(401).send("Token inválido");
   }
};

export const registerUser = async (req, res) => {
   const { username, correo_electronico, usertype, password, confirmPassword } = req.body;

   try {
      await userService.registerUser({
         username,
         correo_electronico,
         usertype,
         password,
         confirmPassword
      });

      res.redirect('/login?success=usuario-registrado-exitosamente');
   } catch (error) {
      res.status(400).send("Error al registrar usuario: ${error.message}");
   }
};

export const catalogueJWT = async (req, res) => {
   const { authorization } = req.headers;
   if (!authorization) return res.status(401);

   try {
      const encoder = new TextEncoder();
      const jwtdata = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY));
      console.log(jwtdata);
   } catch (err) {
      return res.status(401);
   }
};

/* controlador: recuperación de contraseña mediante búsqueda por correo electrónico */
export const searchUserByEmail = async (req, res) => {
   const { correo_electronico } = req.body;

   try {
      const user = await userService.searchUserByEmail(correo_electronico);
      res.render("passwdRecovery", { user });
   } catch (error) {
      res.status(400).send("Error en la búsqueda: ${error.message}");
   }
};