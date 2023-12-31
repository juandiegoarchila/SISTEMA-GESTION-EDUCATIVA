// /src/config/Conexion.js
import { initializeApp } from 'firebase/app';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDHxpGaNJQelnhayxHQJJ2MRdYMNr-5BI4",
  authDomain: "sistema-gestion-educativ-2ed4f.firebaseapp.com",
  projectId: "sistema-gestion-educativ-2ed4f",
  storageBucket: "sistema-gestion-educativ-2ed4f.appspot.com",
  messagingSenderId: "1720652712",
  appId: "1:1720652712:web:a874791fa8e1a6086d039d"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
