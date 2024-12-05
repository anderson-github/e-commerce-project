import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../actions/productActions'; // Acción para obtener detalles del producto
import Loader from '../Layouts/Loader';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: productId } = useParams();

    const [quantity, setQuantity] = useState(1);

    const { product, loading, error } = useSelector((state) => state.productDetails);

    const addToCartHandler = () => {
        // Lógica para agregar al carrito
        console.log(`Adding product ${productId} with quantity ${quantity} to cart`);
    };

    useEffect(() => {
        dispatch(getProductDetails(productId));
    }, [dispatch, productId]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="product-details-container p-4">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Imagen del producto */}
                <div className="flex-1">
                    <img
                        src={product?.image || '/placeholder.jpg'}
                        alt={product?.name}
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Detalles del producto */}
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product?.name}</h1>
                    <Rating
                        value={product?.ratings || 0}
                        readOnly
                        precision={0.5}
                    />
                    <p className="text-gray-700">{product?.description}</p>

                    {/* Precio */}
                    <div className="text-2xl font-semibold text-primary-blue">
                        ₹{product?.price?.toLocaleString()}
                    </div>
                    <div className="text-gray-500 line-through">
                        ₹{product?.originalPrice?.toLocaleString()}
                    </div>

                    {/* Control de cantidad */}
                    <div className="flex gap-4 items-center">
                        <label htmlFor="quantity" className="font-medium">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product?.stock || 1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="border rounded p-2 w-16"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={addToCartHandler}
                            className="bg-primary-yellow text-white px-6 py-2 rounded"
                            disabled={product?.stock < 1}
                        >
                            {product?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-primary-blue text-white px-6 py-2 rounded"
                        >
                            Go to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
