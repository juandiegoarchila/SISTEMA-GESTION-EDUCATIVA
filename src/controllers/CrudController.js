// /src/controllers/CrudController.js
import express from 'express';

const { render } = express;

// Función para manejar la vista 'Crud/index'
export const getIndex = (req, res) => {
  // Puedes agregar la lógica necesaria aquí antes de renderizar la vista
  res.render('Crud/index', { title: 'Página del CRUD' });
};
