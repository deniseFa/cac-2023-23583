// src/routes/admin.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const createProductController = require('../controllers/createProductController'); 
const editProductController = require('../controllers/editProductController');
const deleteProductController = require('../controllers/deleteProductController');

// Importa el middleware de autenticación (comentado para desactivarlo temporalmente)
// const authMiddleware = require('../middlewares/authMiddleware');

// Ruta sin autenticación
router.get('/dashboard', dashboardController.getProducts);
// Manejar solicitudes POST a /admin/dashboard (para la búsqueda)
router.post('/dashboard', dashboardController.getProducts);

// Ruta para mostrar el formulario de creación de producto
router.get('/createProduct', createProductController.showCreateForm);

// Ruta para procesar el formulario de creación de producto
router.post('/createProduct', createProductController.processCreateForm);

router.get('/editProduct/:id', editProductController.showEditForm);
router.post('/editProduct/:id', editProductController.processEditForm);

router.post('/deleteProduct/:id', deleteProductController.processDelete);

module.exports = router;



