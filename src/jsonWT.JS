//Libreria
import jwt from 'jsonwebtoken';

//Llave secreta para firmar el token
const secretKey = 'IEJE3180113';

// Función para generar un token
function generarToken(username,userposition)
{
//Indicamos los datos de la carga util
    const payload = { usuario: username,position:userposition };
//Firmamos el token, con la carga util, firma y tiempo de vida
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

// Función para verificar un token
function verificarToken(token) 
{
    try {
//decodificamos el token con la funcion y jwt.verify
        const decoded = jwt.verify(token, secretKey);

        return decoded.usuario;
    } catch (error) 
    {
        console.error('Error al verificar el token:', error);
        throw error;
    }
}

//Funcion para autenticar un token
export const Tokenauth = (req, res, next) => {
//obtenemos el token apartir de las cookies del navegador
   const token = req.cookies.token;
   console.log('Cookies:', req.cookies);
 
   if (!token) {
     return res.render("error404", {
       title: "ERROR DE AUTENTICACIÓN",
       descripcion: "No se proporcionó un token.",
     });
   }
 
   try {
//llamamos a la funcion cerificar y comprobamos el estado del token
     const usuarioVerificado = verificarToken(token);
     req.user = usuarioVerificado;
     next();
   } catch (error) {
     console.error("Error al verificar el token:", error);
     return res.render("error404", {
       title: "ERROR DE AUTENTICACIÓN",
       descripcion: "Token inválido.",
     });
   }
 };

//Implementacion de token 
 //declaramos una variable
let tokenGenerado;

//llamamos a la funcion generar token y pasamos como argumentos los datos de la //carga util
      tokenGenerado = generarToken(auth.username,auth.userposition);
//enviamos el token mediante cookies
      res.cookie('token', tokenGenerado, { httpOnly: true });