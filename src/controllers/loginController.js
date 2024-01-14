// Importa los módulos necesarios de Express y Firebase
import express from 'express';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { hash, compare } from 'bcrypt';
import firebaseApp from '../config/Conexion.js';

// Desestructura el objeto 'express' para obtener la función 'render'
const { render } = express;

// Controlador para mostrar la página de inicio de sesión
export const getLogin = (req, res) => {
  res.render('login', { title: 'Página de inicio de sesión' });
};

// Controlador para procesar el inicio de sesión
export const postLogin = async (req, res) => {
  try {
    // Extrae el correo electrónico y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    // Acceder a Firestore usando la configuración de Firebase
    const db = getFirestore(firebaseApp);

    // Consultar el usuario en Firestore
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      // El usuario no existe
      req.flash('error_msg', 'Credenciales inválidas. Verifica tu email y contraseña.');
      res.redirect('/login');
      return;
    }

    // Comparar la contraseña hasheada almacenada con la proporcionada
    const userData = querySnapshot.docs[0].data();
    const isPasswordValid = await compare(password, userData.password);

    if (!isPasswordValid) {
      // Contraseña incorrecta
      req.flash('error_msg', 'Credenciales inválidas. Verifica tu email y contraseña.');
      res.redirect('/login');
      return;
    }

    // Si las credenciales son válidas, redirige al usuario a la vista 'cabecera'
    res.redirect('/Crud/index');
  } catch (error) {
    // Manejar errores internos al iniciar sesión
    req.flash('error_msg', 'Error interno al iniciar sesión. Por favor, intenta nuevamente.');
    res.redirect('/login');
  }
};

// Controlador para mostrar la página de registro
export const getRegister = (req, res) => {
  res.render('register', { title: 'Página de registro' });
};

// Controlador para procesar el registro de usuarios
export const postRegister = async (req, res) => {
  try {
    // Extrae el correo electrónico, contraseña, nombre y cédula del cuerpo de la solicitud
    const { email, password, name, cedula } = req.body;

    // Acceder a Firestore usando la configuración de Firebase
    const db = getFirestore(firebaseApp);

    // Verificar si el correo electrónico ya está registrado
    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);

    if (emailSnapshot.size > 0) {
      // El correo electrónico ya está registrado
      req.flash('error_msg', 'Este correo electrónico ya está registrado. Por favor, utiliza otro.');
      res.redirect('/register');
      return;
    }

    // Verificar si la cédula ya está registrada
    const cedulaQuery = query(collection(db, 'users'), where('cedula', '==', cedula));
    const cedulaSnapshot = await getDocs(cedulaQuery);

    if (cedulaSnapshot.size > 0) {
      // La cédula ya está registrada
      req.flash('error_msg', 'Esta cédula ya está registrada. Por favor, utiliza otra.');
      res.redirect('/register');
      return;
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await hash(password, 10);

    // Agregar el usuario a la colección 'users' en Firestore
    const docRef = await addDoc(collection(db, 'users'), {
      email: email,
      password: hashedPassword,
      name: name,
      cedula: cedula,
    });

    console.log('Usuario registrado con ID:', docRef.id);

    // Redirigir a la página de inicio de sesión u otra página después del registro
    res.redirect('/login');
  } catch (error) {
    // Manejar errores internos al registrar el usuario
    console.error('Error al registrar el usuario:', error);
    req.flash('error_msg', 'Error interno al registrar el usuario. Por favor, intenta nuevamente.');
    res.redirect('/login');
  }
};
