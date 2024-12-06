const { Order, Product, User } = require('../models'); // Importar modelos usando Sequelize
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

// Crear Nueva Orden
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

    // Verificar si ya existe una orden con el mismo pago
    const orderExist = await Order.findOne({ where: { paymentInfo } });

    if (orderExist) {
        return next(new ErrorHandler("Order Already Placed", 400));
    }

    const order = await Order.create({
        shippingInfo: JSON.stringify(shippingInfo),
        orderItems: JSON.stringify(orderItems),
        paymentInfo: JSON.stringify(paymentInfo),
        totalPrice,
        paidAt: new Date(),
        userId: req.user.id, // Sequelize utiliza userId como FK
    });

    await sendEmail({
        email: req.user.email,
        templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
        data: {
            name: req.user.name,
            shippingInfo,
            orderItems,
            totalPrice,
            oid: order.id,
        },
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Obtener Detalles de una Orden
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByPk(req.params.id, {
        include: [
            { model: User, attributes: ['name', 'email'] },
        ],
    });

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Obtener Órdenes del Usuario Logueado
exports.myOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.findAll({ where: { userId: req.user.id } });

    if (!orders.length) {
        return next(new ErrorHandler("No Orders Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});

// Obtener Todas las Órdenes (ADMIN)
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.findAll();

    if (!orders.length) {
        return next(new ErrorHandler("No Orders Found", 404));
    }

    const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

// Actualizar Estado de Orden (ADMIN)
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = new Date();
        const orderItems = JSON.parse(order.orderItems);

        for (const item of orderItems) {
            await updateStock(item.productId, item.quantity);
        }
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
        success: true,
    });
});

// Actualizar Inventario de Productos
async function updateStock(productId, quantity) {
    const product = await Product.findByPk(productId);
    product.stock -= quantity;
    await product.save();
}

// Eliminar Orden (ADMIN)
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.destroy();

    res.status(200).json({
        success: true,
    });
});
