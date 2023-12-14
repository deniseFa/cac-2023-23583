const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer'); // MULTEEEEER 
const databaseConfig = require('./src/config/database');

// ARchivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Cofig de EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Confi multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads'); // Ruta para imagenes que igual no se va a usar 
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    const nombreImagen = `${Date.now()}.${extension}`;
    callback(null, nombreImagen);
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.array('imagenes', 5)); // Multer 

// Configuración de la sesión
app.use(session({
  secret: 'secreto_5112634128dfa',
  resave: false,
  saveUninitialized: false
}));

// Conexión a la base de datos con mysql2
const { conn } = require('./src/config/database');

// Middleware para agregar la conexión a cada solicitud
app.use((req, res, next) => {
  req.mysql = conn;
  next();
});

// Rutas de la aplicación
app.use('/', require('./src/routes/index'));
app.use('/auth', require('./src/routes/auth'));
app.use('/admin', require('./src/routes/admin'));

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
