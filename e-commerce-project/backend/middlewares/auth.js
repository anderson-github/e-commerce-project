const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ajustar la importación al modelo en "final"
const asyncHandler = require('./asyncHandler');

// Middleware para verificar si el usuario está autenticado
exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado de autorización

    if (!token) {
        return res.status(401).json({ success: false, message: "Please login to access this resource." });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decodedData.id); // Usar findByPk para Sequelize
    if (!req.user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    next();
});

// Middleware para autorizar roles específicos
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Role: ${req.user.role} is not allowed to access this resource.` 
            });
        }
        next();
    };
};
