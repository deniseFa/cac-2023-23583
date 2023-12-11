// authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Verifica si hay un usuario en la sesión
  if (!req.session || !req.session.user) {
    return res.redirect('/auth/login'); // O redirige a la página de inicio de sesión
  }
  // Usuario autenticado, permite el acceso
  next();
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});


module.exports = authMiddleware;
