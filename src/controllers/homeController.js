// Importa tu configuración de la base de datos
const { conn } = require('../config/database');

// Función para obtener productos
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

// Controlador para la página de inicio (index)
exports.getHome = async (req, res) => {
  try {
    const productos = await getProductosFromDB();

    const [licences, fieldsLicences] = await conn.execute('SELECT * FROM licence');

    res.render('index.ejs', { productos, licences });
  } catch (error) {
    console.error('Error al obtener datos de la tabla licence o product:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};
