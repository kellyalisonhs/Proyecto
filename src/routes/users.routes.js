import { Router } from "express";
import { getChangePasswd, getForgotPasswd, getLoginForm, getPasswdRecovery, getRegisterForm, getAllUsers, registerUser } from "../controllers/users.controllers.js"

const router = Router();

//router.get("/users", getAllUsers);
//router.post("/login", login);

router.get("/change-passwd", getChangePasswd);
router.get("/forgot-passwd", getForgotPasswd);
router.get("/login", getLoginForm);
router.get("/recovery-passwd", getPasswdRecovery);
router.get("/register", getRegisterForm);
router.get("/users-list", getAllUsers);

router.post('/register', registerUser);

export default router;