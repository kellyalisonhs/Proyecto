/* users.routes.js */
import { Router } from "express";
import { getChangePasswd, getForgotPasswd, getLoginForm, getRegisterForm, getAllUsers, registerUser, loginUser, searchUserByEmail, getCatalogue, getMarvelCatalogue, ActualizarUser, eliminar } from "../controllers/users.controllers.js";

const router = Router();

// Añadido para pasar el tipo de usuario a todas las vistas
router.use((req, res, next) => {
  res.locals.userType = req.user && req.user.usertype;
  next();
});

router.get("/change-passwd", getChangePasswd);
router.get("/forgot-passwd", getForgotPasswd);
router.get("/login", getLoginForm);

router.get("/register", getRegisterForm);
router.get("/users-list", getAllUsers);

router.get("/catalogue", getCatalogue); /* buscador de personajes y tarjetas individuales (versión anterior) */
router.get("/marvel-characters", getMarvelCatalogue); /* ruta con el catálogo y carrito */

/* router.get("/login", function(req, res) {
  res.sendFile(__dirname + "/public/login.html");
}); */

router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/forgot-passwd", searchUserByEmail);

router.put("/actualizar", ActualizarUser);
router.delete("/eliminar", eliminar);

// Filtro para verificar la autenticación
router.get("/users-list", (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("No estás autorizado para acceder a esta ruta.");
  }
});

export default router;