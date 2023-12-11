// src/routes/admin.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const createProductController = require('../controllers/createProductController'); 
const editProductController = require('../controllers/editProductController');
const deleteProductController = require('../controllers/deleteProductController');


// Rutas para el panel de administración
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
