import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => (
  <Link to="/products" className="flex flex-col items-center gap-2 p-4 cursor-pointer">
    {/* Product Image */}
    <div className="w-36 h-36 transform hover:scale-105 transition-transform duration-200 ease-out">
      <img
        draggable="false"
        className="w-full h-full object-contain"
        src={image}
        alt={name}
      />
    </div>

    {/* Product Details */}
    <h2 className="font-medium text-sm mt-2 text-center">{name}</h2>
    <span className="text-primary-green text-sm">{offer}</span>
    <span className="text-gray-500 text-sm">{tag}</span>
  </Link>
);

export default Product;
