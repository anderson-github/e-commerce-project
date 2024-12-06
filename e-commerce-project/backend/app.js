// Importación de módulos necesarios
const express = require('express'); // Framework para crear el servidor web.
const bodyParser = require('body-parser'); // Middleware para analizar datos enviados en formularios.
const cookieParser = require('cookie-parser'); // Middleware para manejar cookies.
const fileUpload = require('express-fileupload'); // Middleware para manejar la subida de archivos.
const errorMiddleware = require('./middlewares/error'); // Middleware personalizado para manejar errores.

const app = express(); // Inicialización de la aplicación Express.

// Configuración de entorno
// Si el entorno no es producción, se cargan las variables de entorno desde el archivo `config.env`.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

// Middlewares globales
app.use(express.json()); // Analiza las solicitudes con datos en formato JSON.
app.use(cookieParser()); // Permite manejar cookies en las solicitudes.
app.use(bodyParser.urlencoded({ extended: true })); // Analiza datos enviados en formularios.
app.use(fileUpload()); // Permite la carga de archivos a través de solicitudes HTTP.

// Importación de rutas
const user = require('./routes/userRoute'); // Rutas relacionadas con usuarios.
const product = require('./routes/productRoute'); // Rutas relacionadas con productos.
const order = require('./routes/orderRoute'); // Rutas relacionadas con pedidos.
const payment = require('./routes/paymentRoute'); // Rutas relacionadas con pagos.

// Registro de rutas
// Todas las rutas están prefijadas con `/api/v1`.
app.use('/api/v1', user); // Rutas para la gestión de usuarios.
app.use('/api/v1', product); // Rutas para la gestión de productos.
app.use('/api/v1', order); // Rutas para la gestión de pedidos.
app.use('/api/v1', payment); // Rutas para la gestión de pagos.

// Middleware para manejo de errores
// Captura errores y los gestiona de manera centralizada.
app.use(errorMiddleware);

// Exportación de la aplicación
// Esto permite que la aplicación se use en otros archivos, como el servidor principal.
module.exports = app;
