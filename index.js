const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const databaseConfig = require('./src/config/database');

// Conexión a la base de datos con mysql2
const { conn } = require('./src/config/database');

// Middleware para agregar la conexión a cada solicitud
app.use((req, res, next) => {
  req.mysql = conn;
  next();
});

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    const nombreImagen = `${Date.now()}.${extension}`;
    callback(null, nombreImagen);
  },
});

const upload = multer({ storage });

// Configuración de body-parser para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload.array('imagenes', 5));

// Configuración de la sesión
app.use(session({
  secret: 'secreto_5112634128dfa',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: 'strict',
    maxAge: 3600000,
  },
}));

// Rutas de la aplicación
app.use('/', require('./src/routes/index'));
app.use('/auth', require('./src/routes/auth'));
app.use('/admin', require('./src/routes/admin'));

// Inicia el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
