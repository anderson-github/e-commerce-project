class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Captura el stack trace para mayor claridad en el seguimiento de errores
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;


/*
//  Uso en un Middleware Global de Manejo de Errores

const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

// Uso en un Controlador

const AppError = require('../utils/AppError');

exports.someFunction = (req, res, next) => {
    try {
        // Alguna lógica
        if (!data) {
            throw new AppError('Data not found', 404);
        }
    } catch (error) {
        next(error); // Manejo por middleware de errores
    }
};

*/ 