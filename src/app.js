import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import loginRoutes from './routes/login.routes.js';
import { urlencoded } from 'express';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Configura connect-flash después de express-session
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Elimina una de las configuraciones de urlencoded
// app.use(urlencoded({ extended: true }));

app.use('/', loginRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
