import { Router } from "express";
import { getChangePasswd, getForgotPasswd, getLoginForm, getPasswdRecovery, getRegisterForm, getAllUsers, registerUser, loginUser, searchUserByEmail, recoveryAnswer, getCatalogue, getMarvelCatalogue } from "../controllers/users.controllers.js"

const router = Router();

//router.get("/users", getAllUsers);
//router.post("/login", login);

router.get("/change-passwd", getChangePasswd);
router.get("/forgot-passwd", getForgotPasswd);
router.get("/login", getLoginForm);

router.get("/passwd-recovery", getPasswdRecovery);
router.get("/register", getRegisterForm);
router.get("/users-list", getAllUsers);

router.get("/catalogue", getCatalogue); /* buscador de personajes y tarjetas individules (versión anterior)*/
router.get("/marvel-characters", getMarvelCatalogue); /* ruta con el catalogo y carrito */

router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/forgot-passwd", searchUserByEmail);
router.post("/passwd-recovery", recoveryAnswer);

export default router;