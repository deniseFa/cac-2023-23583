// src/controllers/shopController.js
const { conn } = require('../config/database');

// Función para obtener productos con información de la categoría desde la base de datos
const getProductosFromDB = async () => {
  try {
    const [rows, fields] = await conn.execute(`
      SELECT p.*, l.licence_name
      FROM product p
      JOIN licence l ON p.licence_id = l.licence_id
    `);
 
    return rows;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
    throw error;
  }
};

// Controlador para la página de tienda (shop)
exports.getShop = async (req, res) => {
  try {
    const productos = await getProductosFromDB();
    res.render('shop', { productos });
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};
