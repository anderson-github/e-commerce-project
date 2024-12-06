import { Link } from 'react-router-dom';

const Product = ({ product, name, price, cuttedPrice, image }) => {
    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            {/* Product Image */}
            <div className="w-1/6 h-28 flex-shrink-0">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={image}
                    alt={name}
                />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* Product Title */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link
                        to={`/product/${product}`}
                        className="flex flex-col gap-0.5"
                    >
                        <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">
                            {name.length > 85 ? `${name.substring(0, 85)}...` : name}
                        </p>
                    </Link>
                </div>

                {/* Price Details */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through font-normal mt-1">
                        ₹{cuttedPrice.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product;
