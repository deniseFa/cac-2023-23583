const express = require('express');
const router = express.Router();
const path = require('path');

const homeController = require('../controllers/homeController');
const carritoController = require('../controllers/carritoController');
const footerController = require('../controllers/footerController');
const itemController = require('../controllers/itemController');
const menuController = require('../controllers/menuController');
const shopController = require('../controllers/shopController');
const authRoutes = require('./auth'); 

// Rutas para tus archivos HTML o los mios convertidos en ejs
router.get('/', homeController.getHome);
router.get('/carrito', carritoController.getCarrito);
router.get('/footer', footerController.getFooter);
router.get('/item/:id', itemController.getItemById);
router.get('/menu', menuController.getMenu);
router.get('/shop', shopController.getShop);

// Aca las rutas de autenticación
router.use('/auth', authRoutes);

module.exports = router;
