// Importa los módulos necesarios de Express y Node.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import loginRoutes from './routes/login.routes.js';
import crudRoutes from './routes/Crud.routes.js';

// Importa middleware y configuraciones adicionales
import { urlencoded } from 'express';
import session from 'express-session';
import flash from 'connect-flash';

// Crea una instancia de Express
const app = express();

// Obtiene la ruta del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importa el módulo 'path' de Node.js
import path from 'path';

// Configuración del motor de vistas y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar datos de formularios
app.use(urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para gestionar sesiones con express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Configura connect-flash después de express-session para manejar mensajes flash
app.use(flash());

// Middleware para establecer variables locales disponibles en todas las vistas
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Monta las rutas específicas para manejar la lógica del login y el CRUD
app.use('/', loginRoutes);
app.use(crudRoutes);

// Configura el puerto en el que el servidor Express escuchará
const port = process.env.PORT || 5000;

// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
