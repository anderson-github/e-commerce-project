const { User } = require('../models'); // Modelo Sequelize
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');
const crypto = require('crypto');

// Registrar usuario
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, gender, password } = req.body;

    const user = await User.create({
        name,
        email,
        gender,
        password,
    });

    sendToken(user, 201, res);
});

// Login usuario
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout usuario
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Detalles del usuario
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Olvidar contraseña
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    const resetPasswordUrl = `https://${req.get("host")}/password/reset/${resetToken}`;

    // Enviar email
    // Nota: Implementar `sendEmail` en un contexto real
    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
    });
});

// Resetear contraseña
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        where: {
            resetPasswordToken,
            resetPasswordExpire: { [Op.gt]: Date.now() },
        },
    });

    if (!user) {
        return next(new ErrorHandler("Invalid reset token or token expired", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    sendToken(user, 200, res);
});

// Actualizar contraseña
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    if (!(await user.checkPassword(req.body.oldPassword))) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Actualizar perfil
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
    const { name, email } = req.body;

    const user = await User.findByPk(req.user.id);

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({
        success: true,
    });
});

// ADMIN - Obtener todos los usuarios
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.findAll();

    res.status(200).json({
        success: true,
        users,
    });
});

// ADMIN - Obtener detalles de un usuario
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// ADMIN - Actualizar rol de usuario
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
    const { role } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.role = role;

    await user.save();

    res.status(200).json({
        success: true,
    });
});

// ADMIN - Eliminar usuario
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    await user.destroy();

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});
