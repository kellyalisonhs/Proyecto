import { Router } from "express";
<<<<<<< HEAD
import { getChangePasswd, getForgotPasswd, getLoginForm, getPasswdRecovery, getRegisterForm, getAllUsers, registerUser, loginUser, searchUserByEmail, recoveryAnswer,  getCatalogue, ActualizarUser} from "../controllers/users.controllers.js"
//import { getChangePasswd, getForgotPasswd, getLoginForm, getPasswdRecovery, getRegisterForm, getAllUsers, registerUser, loginUser, searchUserByEmail, recoveryAnswer, getCatalogue } from "../controllers/users.controllers.js"
=======
import { getChangePasswd, getForgotPasswd, getLoginForm, getPasswdRecovery, getRegisterForm, getAllUsers, registerUser, loginUser, searchUserByEmail, recoveryAnswer, getCatalogue } from "../controllers/users.controllers.js"
>>>>>>> d288a628a8f9e82c781b79a47ede2edcefa06d31

const router = Router();

//router.get("/users", getAllUsers);
//router.post("/login", login);

router.get("/change-passwd", getChangePasswd);
router.get("/forgot-passwd", getForgotPasswd);
router.get("/login", getLoginForm);
router.get("/passwd-recovery", getPasswdRecovery);
router.get("/register", getRegisterForm);
router.get("/users-list", getAllUsers);

router.get("/catalogue", getCatalogue);

router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/forgot-passwd", searchUserByEmail);
router.post("/passwd-recovery", recoveryAnswer);

router.put("/", ActualizarUser);

export default router;