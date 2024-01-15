import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import hbs from 'hbs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {conn} from './db.js'; 
import indexRoutes from './routes/index.routes.js';
import usersRoutes from './routes/users.routes.js';


// obtiene la ruta raíz del proyecto
const PORT = 3000;

// Instancia para el servidor HTTP de la aplicación
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

// Se habilita el uso de routes users.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// se establece la ruta para los recursos estáticos
app.use(express.static(__dirname + "/public"));

// configuración de hbs como motor de plantillas
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// Agregado para pasar el tipo de usuario a todas las vistas
app.use((req, res, next) => {
  res.locals.userType = req.user ? req.user.usertype : null;
  next();
});

app.use(indexRoutes);
app.use(usersRoutes);
app.use("/API", usersRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${ PORT }`);
});

const apiKey = process.env.JWT_PRIVATE_KEY;
console.log(apiKey);

app.get('/allUsers',async(req,res)=>{
  const [rows]=await conn.query('select *from user');
  res.json(rows)

});
 // DELETE
 app.delete('/eliminar/:id', async (req, res) => {
  const id = req.params.id;
  try {
      await conn.query('DELETE FROM user WHERE id = ?', [id]);
      res.json({ msg: `Usuario con ID ${id} eliminado` });
  } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});
