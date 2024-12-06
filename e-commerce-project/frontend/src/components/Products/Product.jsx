import { Link } from 'react-router-dom';

const Product = ({ id, name, image, price }) => {
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
            </div>
        </div>
    );
};

export default Product;
