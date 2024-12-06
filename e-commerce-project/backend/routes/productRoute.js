const express = require('express');
const {
    listProducts,
    listAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    addProductReview,
    listProductReviews,
    removeReview,
} = require('../controllers/productController');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Rutas públicas
router.get('/products', listProducts); // Lista de productos paginada
router.get('/products/all', listAllProducts); // Lista completa de productos
router.get('/product/:id', getProductDetails); // Detalles de un producto

// Rutas privadas para usuarios autenticados
router.put('/product/review', authenticateUser, addProductReview); // Agregar una reseña

// Rutas de administrador
router.get('/admin/products', authenticateUser, authorizeRoles('admin'), listAllProducts);
router.post('/admin/product', authenticateUser, authorizeRoles('admin'), createProduct);
router
    .route('/admin/product/:id')
    .put(authenticateUser, authorizeRoles('admin'), updateProduct)
    .delete(authenticateUser, authorizeRoles('admin'), deleteProduct);

router
    .route('/admin/reviews')
    .get(authenticateUser, authorizeRoles('admin'), listProductReviews) // Listar reseñas de productos
    .delete(authenticateUser, authorizeRoles('admin'), removeReview); // Eliminar una reseña

module.exports = router;


/*
//  El controlador puede manejar la lógica como se ha establecido en versiones anteriores, pero manteniendo los nombres actualizados.

exports.listProducts = asyncHandler(async (req, res) => {
    const resultPerPage = 12; // Paginación
    const products = await Product.find().limit(resultPerPage);

    res.status(200).json({ success: true, products });
});

exports.listAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
});

// Otros métodos como `createProduct`, `updateProduct`, `deleteProduct`, y más...

*/