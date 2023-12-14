const bcrypt = require('bcrypt');
const authController = {};

authController.showLoginForm = (req, res) => {
  res.render('auth/login');
};

authController.processLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await req.mysql.query('SELECT * FROM user WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.render('auth/login', { error: 'Usuario o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.render('auth/login', { error: 'Usuario o contraseña incorrectos' });
    }

    req.session.user = {
      userId: user[0].user_id,
      name: user[0].name,
      email: user[0].email,
    };

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al procesar el inicio de sesión:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

authController.showRegisterForm = (req, res) => {
  res.render('auth/register');
};

authController.processRegister = async (req, res) => {
  try {
    const { name, lastname, email, password, confirmPassword } = req.body;
    const [userExists] = await req.mysql.query('SELECT * FROM user WHERE email = ?', [email]);

    if (userExists.length > 0) {
      console.error('El usuario ya existe:', email);
      return res.render('auth/register', { error: 'El usuario ya existe' });
    }

    if (password !== confirmPassword) {
      console.error('Las contraseñas no coinciden:', password, confirmPassword);
      return res.render('auth/register', { error: 'Las contraseñas no coinciden' });
    }

    // Verificar condiciones de seguridad de la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[.,\-_/?@]).{4,}$/;
    if (!passwordRegex.test(password)) {
      let errorMessage = 'La contraseña no cumple con los requisitos de seguridad.';

      // Verificar requisitos específicos y agregar mensajes de error
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage += ' | Debe contener al menos una letra mayúscula.';
      }
      
      if (!/(?=.*\d)/.test(password)) {
        errorMessage += ' | Debe contener al menos un número.  ';
      }

      if (!/(?=.*[.,\-_/?@])/.test(password)) {
        errorMessage += ' | Debe contener al menos un carácter especial (.,-_/?@). |';
      }

      console.error('Error en la contraseña:', errorMessage);
      return res.render('auth/register', { error: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await req.mysql.query('INSERT INTO user (name, lastname, email, password, create_time) VALUES (?, ?, ?, ?, NOW())', [name, lastname, email, hashedPassword]);

    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error al procesar el registro:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

// Cerrar sesión
authController.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    // Redirigir 
    res.redirect('/auth/login');
  });
};

module.exports = authController;
