const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Validar que la carpeta de build de React existe
const buildPath = path.join(__dirname, 'frontend', 'build');
if (!fs.existsSync(buildPath)) {
    console.error("Build folder not found. Ensure React app is built.");
    process.exit(1);
}

// Middleware de seguridad y optimización
app.use(helmet()); // Añade encabezados de seguridad HTTP
app.use(compression()); // Comprime las respuestas para optimizar el rendimiento

// Middleware para servir los archivos estáticos generados por React
app.use(express.static(buildPath));

// Ruta para APIs del backend
app.use('/api/v1', require('./routes/apiRoutes')); // Asegúrate de que './routes/apiRoutes' sea correcto

// Redirige todas las rutas al archivo `index.html` de React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
});

// Puerto de ejecución del servidor
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
