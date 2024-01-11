import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const userType = req.user ? req.user.usertype : null; 
    if (userType === 'admin') {
        // Redirigir al panel de administrador
        return res.redirect('/admin-dashboard');
    } else if (userType === 'operativo') {
        // Redirigir al panel de operativo
        return res.redirect('/operativo-dashboard');
    } else {
        // Redirigir a una página de inicio general
        return res.render('index', { titulo: 'Aplicación web con express y HBS', userType: userType });
    }
});

export default router;