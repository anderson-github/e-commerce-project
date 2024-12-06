import axios from "axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

// Add to Wishlist
export const addToWishlist = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: ADD_TO_WISHLIST,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                cuttedPrice: data.product.cuttedPrice,
                image: data.product.images[0]?.url,
                ratings: data.product.ratings,
                reviews: data.product.numOfReviews,
            },
        });

        // Persist the wishlist items in local storage
        localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
    } catch (error) {
        console.error("Error adding to wishlist:", error.response?.data?.message || error.message);
    }
};

// Remove from Wishlist
export const removeFromWishlist = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: id,
        });

        // Persist the updated wishlist items in local storage
        localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
    } catch (error) {
        console.error("Error removing from wishlist:", error.response?.data?.message || error.message);
    }
};
