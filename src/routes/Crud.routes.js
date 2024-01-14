import express from 'express';
const router = express.Router();

// Importa el controlador del login para poder acceder a las funciones necesarias

// Importa el controlador del Crud
import { getIndex } from '../controllers/CrudController.js';

// Ruta principal para la vista 'Crud/index'
router.get('/Crud/index', getIndex);


// Puedes agregar más rutas según tus necesidades para el CRUD

export default router;
