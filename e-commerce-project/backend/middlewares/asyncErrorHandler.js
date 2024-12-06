const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error("Error caught by asyncHandler:", error.message);
        next(error);
    });
};

module.exports = asyncHandler;


/*
// Este middleware puede ser usado para envolver controladores asíncronos, simplificando su manejo de errores:

const asyncHandler = require('./middlewares/asyncHandler');

app.get('/example-route', asyncHandler(async (req, res) => {
    const data = await fetchData(); // Operación asíncrona
    res.status(200).json({ success: true, data });
}));

*/