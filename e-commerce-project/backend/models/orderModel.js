const { Schema, model } = require('mongoose');

// Esquema de Pedido
const orderSchema = new Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true }, // Cambiado pincode a postalCode por claridad
        phone: { type: String, required: true }, // Cambiado phoneNo a phone
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        paymentId: { type: String, required: true }, // Renombrado id a paymentId para mayor claridad
        status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Limitación de valores permitidos
        default: "Processing",
    },
    deliveredAt: { type: Date },
    shippedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

// Exportación del Modelo de Pedido
module.exports = model("Order", orderSchema);



/*
// Este esquema puede ser usado directamente con Mongoose para interactuar con la colección de pedidos en MongoDB:

const Order = require('./models/orderModel');

// Crear un nuevo pedido
const newOrder = new Order({
    shippingInfo: {
        address: "123 Main St",
        city: "Metropolis",
        state: "NY",
        country: "USA",
        postalCode: "10001",
        phone: "1234567890",
    },
    orderItems: [
        {
            name: "Laptop",
            price: 1500,
            quantity: 1,
            image: "laptop.jpg",
            product: "productId123",
        },
    ],
    user: "userId123",
    paymentInfo: {
        paymentId: "paymentId456",
        status: "Paid",
    },
    paidAt: new Date(),
    totalPrice: 1500,
});

await newOrder.save();

*/