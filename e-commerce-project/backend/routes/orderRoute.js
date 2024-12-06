const express = require('express');
const {
    createOrder,
    getOrderDetails,
    getUserOrders,
    listAllOrders,
    modifyOrderStatus,
    removeOrder,
} = require('../controllers/orderController');
const { authenticateUser, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Rutas para usuarios autenticados
router.post('/orders', authenticateUser, createOrder); // Crear una nueva orden
router.get('/orders/:id', authenticateUser, getOrderDetails); // Obtener detalles de una orden específica
router.get('/orders', authenticateUser, getUserOrders); // Obtener órdenes del usuario autenticado

// Rutas para administradores
router.get('/admin/orders', authenticateUser, restrictTo('admin'), listAllOrders); // Listar todas las órdenes
router
    .route('/admin/orders/:id')
    .put(authenticateUser, restrictTo('admin'), modifyOrderStatus) // Modificar estado de una orden
    .delete(authenticateUser, restrictTo('admin'), removeOrder); // Eliminar una orden

module.exports = router;


/*
Ejemplo de Uso en Controlador

// controllers/orderController.js
const Order = require('../models/orderModel');
const asyncHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Crear una nueva orden
exports.createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        user: req.user._id,
        paidAt: Date.now(),
    });

    res.status(201).json({ success: true, order });
});

// Obtener detalles de una orden
exports.getOrderDetails = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    res.status(200).json({ success: true, order });
});

*/