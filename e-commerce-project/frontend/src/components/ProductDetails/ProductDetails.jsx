import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {
    const navigate = useNavigate();

    // Datos estáticos de ejemplo
    const product = {
        name: "Example Product",
        image: "/placeholder.jpg",
        ratings: 4.5,
        description: "This is a placeholder description.",
        price: 999,
        originalPrice: 1299,
        stock: 10,
    };
    const loading = false;
    const error = null;

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="product-details-container p-4">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Imagen del producto */}
                <div className="flex-1">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Detalles del producto */}
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <Rating value={product.ratings} readOnly precision={0.5} />
                    <p className="text-gray-700">{product.description}</p>

                    {/* Precio */}
                    <div className="text-2xl font-semibold text-primary-blue">
                        ₹{product.price.toLocaleString()}
                    </div>
                    <div className="text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
