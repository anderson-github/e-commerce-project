const { Payment } = require('../models'); // Modelo de Sequelize para pagos
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const { v4: uuidv4 } = require('uuid');

// Simular el procesamiento de un pago
exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    const { amount, email, phoneNo } = req.body;

    // Generar un ID único de transacción
    const orderId = `oid-${uuidv4()}`;

    // Simulación del pago (puedes integrar una API real aquí)
    const paymentDetails = {
        orderId,
        amount,
        email,
        phoneNo,
        status: "Pending", // Estado inicial
    };

    // Registrar el pago en la base de datos
    await Payment.create(paymentDetails);

    res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        paymentDetails,
    });
});

// Simular respuesta del proveedor de pagos (callback)
exports.paymentCallback = asyncErrorHandler(async (req, res, next) => {
    const { orderId, status } = req.body;

    // Verificar y actualizar el estado del pago
    const payment = await Payment.findOne({ where: { orderId } });

    if (!payment) {
        return next(new ErrorHandler("Payment not found", 404));
    }

    payment.status = status || "Success";
    await payment.save();

    res.status(200).json({
        success: true,
        message: "Payment status updated",
        payment,
    });
});

// Obtener el estado de un pago
exports.getPaymentStatus = asyncErrorHandler(async (req, res, next) => {
    const { orderId } = req.params;

    const payment = await Payment.findOne({ where: { orderId } });

    if (!payment) {
        return next(new ErrorHandler("Payment details not found", 404));
    }

    res.status(200).json({
        success: true,
        paymentStatus: payment.status,
    });
});
