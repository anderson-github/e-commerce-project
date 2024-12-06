const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ email, templateId, data }) => {
    try {
        const msg = {
            to: email,
            from: process.env.SENDGRID_MAIL, // Correo autorizado por SendGrid
            templateId: templateId, // ID de la plantilla dinámica en SendGrid
            dynamic_template_data: data, // Datos dinámicos para la plantilla
        };

        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = sendEmail;


/*
// Ejemplificación del modelo

const sendEmail = require('../utils/sendEmail');

const sendOrderConfirmationEmail = async (order) => {
    try {
        await sendEmail({
            email: order.user.email,
            templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
            data: {
                name: order.user.name,
                orderId: order._id,
                totalPrice: order.totalPrice,
                shippingAddress: order.shippingInfo.address,
            },
        });
    } catch (error) {
        console.error('Error sending order confirmation email:', error.message);
    }
};

*/