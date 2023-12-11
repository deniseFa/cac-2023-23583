// authMiddleware.js
const authMiddleware = (req, res, next) => {
  console.log('Middleware de autenticación llamado');
  console.log('Sesión:', req.session);

  // Verifica si hay un usuario en la sesión
  if (!req.session || !req.session.user) {
    console.log('Usuario no autenticado. Redirigiendo...');
    return res.redirect('../auth/login'); // O redirige a la página
  }

  // Usuario autenticado, permite el acceso
  console.log('Usuario autenticado. Continuando...');
  next();
};

module.exports = authMiddleware;



