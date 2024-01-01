// /src/routes/login.routes.js
import express from 'express';
import { getLogin, postLogin, getRegister, postRegister } from '../controllers/loginController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/register', getRegister);
router.post('/register', postRegister);

// Elimina la siguiente línea
// router.get('/login-register', getLoginRegister); // Agregamos una nueva ruta para mostrar el formulario combinado

export default router;
