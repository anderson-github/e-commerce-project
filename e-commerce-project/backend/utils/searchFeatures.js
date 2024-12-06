class QueryHandler {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Método para buscar por palabra clave
    search() {
        const keyword = this.queryString.keyword
            ? {
                  name: { $regex: this.queryString.keyword, $options: "i" }, // Búsqueda insensible a mayúsculas
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Método para filtrar por rango de precios u otros campos
    filter() {
        const queryObject = { ...this.queryString };

        // Campos excluidos de los filtros
        const excludeFields = ["keyword", "page", "limit"];
        excludeFields.forEach((field) => delete queryObject[field]);

        // Convertir operadores como gt, gte, lt, lte a formato MongoDB ($gt, $gte, etc.)
        let filterString = JSON.stringify(queryObject);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(filterString));
        return this;
    }

    // Método para manejar la paginación
    paginate(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = QueryHandler;

/*
// Uso en un Controlador

const Product = require('../models/productModel');
const QueryHandler = require('../utils/QueryHandler');

exports.getAllProducts = async (req, res, next) => {
    try {
        const resultsPerPage = 10;
        const queryHandler = new QueryHandler(Product.find(), req.query);

        const products = await queryHandler.search().filter().paginate(resultsPerPage).query;

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
};

*/