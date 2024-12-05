import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fetchProducts } from '../../actions/productActions'; // Acción para obtener productos
import Loader from '../Layouts/Loader';
import Product from './Product'; // Componente individual de producto

const Products = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 1000]); // Ajustar rango de precios según lógica de negocio
    const [searchQuery, setSearchQuery] = useState('');

    const { products, loading, error } = useSelector((state) => state.products);

    const handlePriceChange = (e) => {
        setPriceRange(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClearFilters = () => {
        setPriceRange([0, 1000]);
        setSearchQuery('');
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
        }
        dispatch(fetchProducts({ searchQuery, priceRange, currentPage }));
    }, [dispatch, searchQuery, priceRange, currentPage, enqueueSnackbar, error]);

    return (
        <div className="products-page-container">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            {/* Filtros */}
            <div className="filters-container mb-6">
                <div className="flex gap-4">
                    {/* Filtro de búsqueda */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border rounded p-2 w-full"
                    />

                    {/* Rango de precios */}
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                        className="slider"
                    />
                    <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
                </div>

                <button
                    onClick={handleClearFilters}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Clear Filters
                </button>
            </div>

            {/* Lista de productos */}
            {loading ? (
                <Loader />
            ) : (
                <div className="products-list grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Product key={product.id} {...product} />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            )}

            {/* Paginación */}
            <div className="pagination mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
