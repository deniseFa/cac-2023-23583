// itemController.js
const { conn } = require('../config/database');

// Función para obtener productos con información de la categoría y la licencia desde la base de datos
const getProductosFromDB = async (limit = 6) => {
  try {
    const [rows, fields] = await conn.execute(`
      SELECT p.*, l.licence_name
      FROM product p
      JOIN licence l ON p.licence_id = l.licence_id
    `);
    
    // Limitar la cantidad de productos
    const limitedProductos = rows.slice(0, limit);

    return limitedProductos;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
    throw error;
  }
};

// Controlador para la página de items
exports.getItem = async (req, res) => {
  try {
    const productos = await getProductosFromDB();
    res.render('item', { productos }); // Asegúrate de pasar { productos }
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};
