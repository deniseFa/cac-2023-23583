// src/controllers/deleteProductController.js
const deleteProductController = {};

// Procesar la solicitud de borrado de un producto
deleteProductController.processDelete = async (req, res) => {
  try {
    const productId = req.params.id;
    await req.mysql.query('DELETE FROM product WHERE product_id = ?', [productId]);
    res.redirect('/admin/dashboard'); 
  } catch (error) {
    console.error('Error al borrar el producto:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = deleteProductController;
