const path = require('path');
const express = require('express');

const app = express();

// Middleware para servir los archivos estáticos generados por React
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Redirige todas las rutas al archivo `index.html` de React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Puerto de ejecución del servidor
const PORT = process.env.PORT || 5000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Frontend server running at http://localhost:${PORT}`);
});
