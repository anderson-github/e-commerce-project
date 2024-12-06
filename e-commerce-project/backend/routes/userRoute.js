const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    listUsers,
    getUser,
    updateUserRole,
    removeUser,
} = require('../controllers/userController');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Rutas públicas
router.post('/register', registerUser); // Registro de usuario
router.post('/login', loginUser); // Inicio de sesión
router.get('/logout', logoutUser); // Cerrar sesión
router.post('/password/forgot', forgotPassword); // Recuperación de contraseña
router.put('/password/reset/:token', resetPassword); // Restablecimiento de contraseña

// Rutas privadas para usuarios autenticados
router.get('/me', authenticateUser, getUserDetails); // Obtener detalles del usuario
router.put('/password/update', authenticateUser, updatePassword); // Actualizar contraseña
router.put('/me/update', authenticateUser, updateProfile); // Actualizar perfil

// Rutas de administrador
router.get('/admin/users', authenticateUser, authorizeRoles('admin'), listUsers); // Listar usuarios
router
    .route('/admin/user/:id')
    .get(authenticateUser, authorizeRoles('admin'), getUser) // Obtener un usuario
    .put(authenticateUser, authorizeRoles('admin'), updateUserRole) // Actualizar rol de usuario
    .delete(authenticateUser, authorizeRoles('admin'), removeUser); // Eliminar usuario

module.exports = router;


/*
// Métodos Simplificados en userController.js:

// Listar usuarios (administrador)
exports.listUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// Obtener un usuario por ID (administrador)
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, user });
});

// Actualizar rol de usuario (administrador)
exports.updateUserRole = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, user: updatedUser });
});

// Eliminar usuario (administrador)
exports.removeUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
    }
    await user.remove();
    res.status(200).json({ success: true, message: 'User removed successfully' });
});

*/