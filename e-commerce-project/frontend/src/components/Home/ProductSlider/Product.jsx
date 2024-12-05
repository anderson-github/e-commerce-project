import { getDiscount } from '../../../utils/functions';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../actions/wishlistAction';
import { useSnackbar } from 'notistack';

const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);
    const itemInWishlist = wishlistItems.some((item) => item.product === _id);

    const handleWishlistToggle = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Removed from Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 px-2 py-4 relative">
            {/* Product Image and Title */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center text-center group">
                <div className="w-36 h-36">
                    <img
                        draggable="false"
                        className="w-full h-full object-contain"
                        src={images[0].url}
                        alt={name}
                    />
                </div>
                <h2 className="text-sm mt-3 group-hover:text-primary-blue">
                    {name.length > 50 ? `${name.substring(0, 50)}...` : name}
                </h2>
            </Link>

            {/* Product Details */}
            <div className="flex flex-col gap-2 items-center">
                {/* Ratings */}
                <div className="flex gap-2 items-center text-sm text-gray-500">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green text-white rounded-sm flex items-center gap-0.5">
                        {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
                    </span>
                    <span>({numOfReviews.toLocaleString()})</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-1.5 text-md font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-xs">
                        ₹{cuttedPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-primary-green">
                        {getDiscount(price, cuttedPrice)}% off
                    </span>
                </div>
            </div>

            {/* Wishlist Toggle */}
            <span
                onClick={handleWishlistToggle}
                className={`absolute top-5 right-2 cursor-pointer ${
                    itemInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"
                }`}
            >
                <FavoriteIcon sx={{ fontSize: "16px" }} />
            </span>
        </div>
    );
};

export default Product;

