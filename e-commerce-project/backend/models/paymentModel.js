const { Schema, model } = require('mongoose');

// Esquema de Pago
const paymentSchema = new Schema({
    resultInfo: {
        status: { type: String, required: true }, // Renombrado resultStatus a status
        code: { type: String, required: true },   // Renombrado resultCode a code
        message: { type: String, required: true }, // Renombrado resultMsg a message
    },
    transactionId: { type: String, required: true }, // Renombrado txnId a transactionId
    bankTransactionId: { type: String, required: true }, // Renombrado bankTxnId a bankTransactionId
    orderId: { type: String, required: true },
    transactionAmount: { type: Number, required: true }, // Cambiado txnAmount a Number
    transactionType: { type: String, required: true }, // Renombrado txnType a transactionType
    gatewayName: { type: String, required: true },
    bankName: { type: String, required: true },
    merchantId: { type: String, required: true }, // Renombrado mid a merchantId
    paymentMode: { type: String, required: true },
    refundAmount: { type: Number, default: 0 }, // Cambiado refundAmt a Number y default 0
    transactionDate: { type: Date, required: true }, // Cambiado txnDate a Date
    createdAt: { type: Date, default: Date.now },
});

// Exportación del Modelo de Pago
module.exports = model("Payment", paymentSchema);


/*
// Este modelo puede ser utilizado de manera sencilla en controladores:

const Payment = require('./models/paymentModel');

// Crear un nuevo pago
const newPayment = new Payment({
    resultInfo: {
        status: "SUCCESS",
        code: "01",
        message: "Payment processed successfully",
    },
    transactionId: "TXN123456",
    bankTransactionId: "BANK78910",
    orderId: "ORDER56789",
    transactionAmount: 1500,
    transactionType: "Credit",
    gatewayName: "Paytm",
    bankName: "HDFC Bank",
    merchantId: "MID12345",
    paymentMode: "UPI",
    refundAmount: 0,
    transactionDate: new Date("2024-11-29T10:30:00Z"),
});

await newPayment.save();


*/