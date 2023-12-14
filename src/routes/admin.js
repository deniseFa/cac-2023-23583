// src/routes/admin.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const createProductController = require('../controllers/createProductController'); 
const editProductController = require('../controllers/editProductController');
const deleteProductController = require('../controllers/deleteProductController');

// Middleware de autenticación 
// const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', dashboardController.getProducts);
router.post('/dashboard', dashboardController.getProducts);

// Ruta para mostrar 
router.get('/createProduct', createProductController.showCreateForm);

// Ruta para procesar 
router.post('/createProduct', createProductController.processCreateForm);

router.get('/editProduct/:id', editProductController.showEditForm);
router.post('/editProduct/:id', editProductController.processEditForm);

router.post('/deleteProduct/:id', deleteProductController.processDelete);

module.exports = router;



