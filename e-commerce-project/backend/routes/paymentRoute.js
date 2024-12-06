const express = require('express');
const {
    initiatePayment,
    handlePaymentCallback,
    fetchPaymentStatus,
} = require('../controllers/paymentController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Procesar pago
router.post('/payments', initiatePayment);

// Callback de Paytm u otros métodos de pago
router.post('/payments/callback', handlePaymentCallback);

// Obtener estado de pago
router.get('/payments/:id/status', authenticateUser, fetchPaymentStatus);

module.exports = router;


/*
// Ejemplo de Uso en Controlador

// controllers/paymentController.js
const Payment = require('../models/paymentModel');
const asyncHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Iniciar un nuevo pago
exports.initiatePayment = asyncHandler(async (req, res) => {
    const { amount, email, phoneNo } = req.body;

    // Ejemplo de lógica para generar detalles de pago (Paytm, Stripe, etc.)
    const paymentDetails = {
        amount,
        email,
        phoneNo,
        orderId: `OID-${Date.now()}`,
    };

    res.status(200).json({ success: true, paymentDetails });
});

// Manejar la respuesta del callback de pago
exports.handlePaymentCallback = asyncHandler(async (req, res) => {
    const { orderId, txnStatus } = req.body;

    // Validar y actualizar el estado del pago
    if (txnStatus === 'SUCCESS') {
        await Payment.create(req.body);
        res.redirect(`/payments/${orderId}/success`);
    } else {
        res.redirect(`/payments/${orderId}/failure`);
    }
});

// Obtener el estado del pago
exports.fetchPaymentStatus = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findOne({ orderId: req.params.id });

    if (!payment) {
        return next(new ErrorHandler('Payment not found', 404));
    }

    res.status(200).json({ success: true, payment });
});

*/