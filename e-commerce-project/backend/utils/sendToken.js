const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Configuración de la cookie
    const cookieOptions = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRE || 5) * 24 * 60 * 60 * 1000 // Valor por defecto: 5 días
        ),
        httpOnly: true, // La cookie solo puede ser accedida por el servidor
        secure: process.env.NODE_ENV === 'production', // Enviar solo en HTTPS en producción
        sameSite: 'Strict', // Evita el uso cruzado de cookies
    };

    // Respuesta con el token
    res.status(statusCode)
        .cookie('token', token, cookieOptions)
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
};

module.exports = sendToken;


/*
// Ejemplificación del componente Enviar Token

const sendToken = require('../utils/sendToken');

exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);
});

*/