const { Schema, model } = require('mongoose');

// Esquema de Producto
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
    },
    cuttedPrice: {
        type: Number,
        required: [true, "Please enter the cutted price"],
    },
    images: [
        {
            publicId: { type: String, required: true }, // Simplificado
            url: { type: String, required: true },
        },
    ],
    brand: {
        name: { type: String, required: true },
        logo: {
            publicId: { type: String, required: true },
            url: { type: String, required: true },
        },
    },
    category: {
        type: String,
        required: [true, "Please enter the product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stock"],
        max: [9999, "Stock cannot exceed 9999 units"],
        default: 1,
    },
    warranty: {
        type: Number,
        default: 1, // Default warranty is 1 year
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        },
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("Product", productSchema);


/*
// Este esquema puede ser utilizado en el controlador para crear un producto:

const Product = require('../models/productModel');

// Crear un Producto
const newProduct = new Product({
    name: "Smartphone",
    description: "High-end smartphone with great features.",
    price: 499.99,
    cuttedPrice: 599.99,
    images: [
        { publicId: "img123", url: "https://example.com/image1.jpg" },
        { publicId: "img124", url: "https://example.com/image2.jpg" },
    ],
    brand: {
        name: "TechBrand",
        logo: { publicId: "brandLogo123", url: "https://example.com/logo.jpg" },
    },
    category: "Electronics",
    stock: 50,
    ratings: 4.5,
    numOfReviews: 10,
    createdBy: userId, // Este valor será dinámico
});

await newProduct.save();

*/