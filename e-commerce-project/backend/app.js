const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');

const app = express();

// Configuración de variables de entorno
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './config/config.env' });
}

// Middlewares globales
app.use(express.json()); // Manejo de solicitudes con JSON
app.use(cookieParser()); // Manejo de cookies
app.use(fileUpload()); // Manejo de archivos

// Importación de rutas
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoutes = require('./routes/paymentRoute');

// Registro de rutas con prefijo `/api/v1`
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Middleware para manejo de errores
app.use(errorMiddleware);

module.exports = app;

/*
// Ejemplificación de las app

// userRoute.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

*/