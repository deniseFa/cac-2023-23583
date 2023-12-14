// src/routes/createProduct.js
const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/createProductController');

// Mostrar formulario
router.get('/new', createProductController.showCreateForm);

// Procesar formulario
router.post('/new', createProductController.processCreateForm);

module.exports = router;
