// itemController.js
const { conn } = require('../config/database');

// Función para obtener detalles de un producto por su ID desde la base de datos
const getProductoByIdFromDB = async (productId) => {
  try {
    const [productRows, productFields] = await conn.execute(
      'SELECT p.*, l.licence_name FROM product p JOIN licence l ON p.licence_id = l.licence_id WHERE p.product_id = ?',
      [productId]
    );

    if (productRows.length > 0) {
      const producto = productRows[0];

      const [relatedRows, relatedFields] = await conn.execute(
        'SELECT p.*, l.licence_name FROM product p JOIN licence l ON p.licence_id = l.licence_id WHERE p.licence_id = ? AND p.product_id != ? LIMIT 3',
        [producto.licence_id, productId]
      );

      const productosRelacionados = relatedRows;

      return { producto, productosRelacionados };
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
    throw error;
  }
};

// Controlador para la página de detalle del producto
exports.getItemById = async (req, res) => {
  const productId = req.params.id; 

  try {
    const { producto, productosRelacionados } = await getProductoByIdFromDB(productId);

    if (producto) {
      res.render('item', { producto, productosRelacionados });
    } else {
      // Manejar el caso donde el producto no se encuentra
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};
