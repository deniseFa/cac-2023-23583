# Trabajo final Codo a codo

---

## Estructura del Proyecto

- **node_modules:** Carpeta que contiene las dependencias del proyecto
- **public:** Carpeta con recursos públicos
  - **CSS:** Estilos CSS
  - **img:** Imágenes

- **src:** Código fuente de la aplicación
  - **config:** Configuraciones de la aplicación
    - `database.js`: Configuración de la base de datos
  - **controllers:** Controladores de la aplicación
    - `adminController.js`: Controlador para la administración
    - `authController.js`: Controlador de autenticación
    - `carritoController.js`: Controlador del carrito
    - `createProductController.js`: Controlador para crear productos
    - `dashboardController.js`: Controlador del panel de control
    - `deleteProductController.js`: Controlador para eliminar productos
    - `editProductController.js`: Controlador para editar productos
    - `footerController.js`: Controlador del pie de página
    - `homeController.js`: Controlador de la página de inicio
    - `itemController.js`: Controlador para los elementos
    - `menuController.js`: Controlador del menú
    - `shopController.js`: Controlador de la tienda
  - **routes:** Rutas de la aplicación
    - `admin.js`: Rutas para la administración
    - `auth.js`: Rutas de autenticación
    - `createProduct.js`: Rutas para crear productos
    - `index.js`: Rutas principales
  - **views:** Vistas de la aplicación
    - **admin:**
      - `dashboard.ejs`: Vista del panel de control
      - `users.ejs`: Vista de los usuarios
      - `editProducts.ejs`: Vista para editar productos
      - `createProducts.ejs`: Vista para crear productos
    - **auth:**
      - `login.ejs`: Vista de inicio de sesión
      - `register.ejs`: Vista de registro
    - **partials:**
      - `footer.ejs`: Vista del pie de página
      - `header.ejs`: Vista del encabezado
      - `headerFront.ejs`: Vista del encabezado para el frontend
    - `carrito.ejs`: Vista del carrito de compras
    - `footer.ejs`: Vista del pie de página
    - `index.ejs`: Vista de la página de inicio
    - `item.ejs`: Vista de un elemento
    - `menu.ejs`: Vista del menú
    - `shop.ejs`: Vista de la tienda

- **.env:** Archivo de variables de entorno
- **app.js:** Archivo principal de la aplicación
- **package-lock.json:** Bloqueo de versión de las dependencias
- **package.json:** Archivo de configuración de Node.js

---

## Instrucciones de Uso en local

1. **Instalación de Dependencias:**
    ```bash
    npm install
    ```

2. **Configuración de Variables de Entorno:**
   - Copia el archivo `.env.example` y renómbralo a `.env`. Luego, configura las variables según sea necesario.

3. **Ejecutar la Aplicación:**
    ```bash
    node app.js
    ```

4. Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en acción.

---

