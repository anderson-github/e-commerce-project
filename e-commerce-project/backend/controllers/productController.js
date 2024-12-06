const { Product, Review } = require('../models'); // Modelos Sequelize
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Obtener todos los productos con paginación y filtros
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const limit = 12; // Productos por página
    const offset = req.query.page ? (req.query.page - 1) * limit : 0;

    const products = await Product.findAndCountAll({
        limit,
        offset,
    });

    res.status(200).json({
        success: true,
        products: products.rows,
        totalProducts: products.count,
        currentPage: req.query.page || 1,
        totalPages: Math.ceil(products.count / limit),
    });
});

// Obtener detalles de un producto
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id, {
        include: [{ model: Review }], // Incluye reseñas relacionadas
    });

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Crear un producto (Admin)
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Actualizar un producto (Admin)
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.update(req.body);

    res.status(200).json({
        success: true,
        product,
    });
});

// Eliminar un producto (Admin)
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.destroy();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

// Crear o actualizar reseñas
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const existingReview = await Review.findOne({
        where: { userId: req.user.id, productId },
    });

    if (existingReview) {
        await existingReview.update({ rating, comment });
    } else {
        await Review.create({
            userId: req.user.id,
            productId,
            rating,
            comment,
        });
    }

    const reviews = await Review.findAll({ where: { productId } });
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await product.update({ ratings: avgRating, numOfReviews: reviews.length });

    res.status(200).json({
        success: true,
        message: "Review added/updated successfully",
    });
});

// Obtener todas las reseñas de un producto
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
    const reviews = await Review.findAll({ where: { productId: req.query.id } });

    if (!reviews) {
        return next(new ErrorHandler("No reviews found for this product", 404));
    }

    res.status(200).json({
        success: true,
        reviews,
    });
});

// Eliminar una reseña
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const review = await Review.findByPk(req.query.id);

    if (!review) {
        return next(new ErrorHandler("Review not found", 404));
    }

    await review.destroy();

    const reviews = await Review.findAll({ where: { productId: review.productId } });
    const avgRating = reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

    await Product.update(
        { ratings: avgRating, numOfReviews: reviews.length },
        { where: { id: review.productId } }
    );

    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
});
