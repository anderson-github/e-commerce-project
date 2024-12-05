import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addProductToCart } from '../../actions/cartActions';

const Product = ({ id, name, image, price, stock, description }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);

    const isInCart = cartItems.some((item) => item.id === id);

    const handleAddToCart = () => {
        if (stock <= 0) {
            enqueueSnackbar("This product is out of stock.", { variant: "error" });
            return;
        }

        if (isInCart) {
            enqueueSnackbar("Product already in the cart.", { variant: "info" });
        } else {
            dispatch(addProductToCart({ id, name, price, image, quantity: 1 }));
            enqueueSnackbar("Product added to the cart.", { variant: "success" });
        }
    };

    return (
        <div className="flex flex-col items-start gap-2 px-4 py-6 relative hover:shadow-lg rounded-sm">
            {/* Imagen del producto */}
            <Link to={`/products/${id}`} className="flex flex-col items-center text-center group">
                <div className="w-44 h-48">
                    <img
                        draggable="false"
                        className="w-full h-full object-contain"
                        src={image}
                        alt={name}
                    />
                </div>
                <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">
                    {name.length > 50 ? `${name.substring(0, 50)}...` : name}
                </h2>
            </Link>

            {/* Detalles del producto */}
            <div className="flex flex-col gap-2 items-start">
                {/* Precio */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{price.toLocaleString()}</span>
                </div>
                {/* Stock */}
                <span className={`text-xs font-medium ${stock > 0 ? 'text-primary-green' : 'text-red-500'}`}>
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                </span>
            </div>

            {/* Botón de agregar al carrito */}
            <button
                onClick={handleAddToCart}
                className={`absolute bottom-4 right-4 px-3 py-1 text-sm font-medium rounded-md ${
                    stock > 0 ? 'bg-primary-blue text-white' : 'bg-gray-300 text-gray-500'
                }`}
                disabled={stock <= 0}
            >
                {isInCart ? "In Cart" : "Add to Cart"}
            </button>
        </div>
    );
};

export default Product;
