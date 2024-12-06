module.exports = (err, req, res, next) => {
    // Establecer valores predeterminados para el código de estado y mensaje de error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Inicializar un objeto de respuesta simplificado
    const errorResponse = {
        success: false,
        message,
    };

    // Manejo de errores específicos

    // Error de formato de ID (por ejemplo, Sequelize u otro ORM)
    if (err.name === "SequelizeDatabaseError" || err.name === "CastError") {
        errorResponse.message = `Invalid resource identifier: ${err.path || "unknown"}`;
        errorResponse.statusCode = 400;
    }

    // Error de clave duplicada (por ejemplo, Sequelize Unique Constraint)
    if (err.name === "SequelizeUniqueConstraintError" || err.code === 11000) {
        errorResponse.message = `Duplicate field value entered`;
        errorResponse.statusCode = 400;
    }

    // Error de JWT (Token Inválido o Expirado)
    if (err.name === "JsonWebTokenError") {
        errorResponse.message = "Invalid JWT Token";
        errorResponse.statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
        errorResponse.message = "JWT Token has expired";
        errorResponse.statusCode = 401;
    }

    // Respuesta del servidor
    res.status(statusCode).json(errorResponse);
};


/*
// Este middleware se puede usar directamente en la cadena de middlewares de Express:

const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Otros middlewares y rutas

app.use(errorMiddleware); // Manejo centralizado de errores

module.exports = app;

*/