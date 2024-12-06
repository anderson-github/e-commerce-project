import axios from "axios";
import { 
    ADD_TO_CART, 
    EMPTY_CART, 
    REMOVE_FROM_CART, 
    SAVE_SHIPPING_INFO 
} from "../constants/cartConstants";

// Add product to cart
export const addProductToCart = (id, quantity = 1) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                seller: data.product.brand.name,
                price: data.product.price,
                cuttedPrice: data.product.cuttedPrice,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            },
        });

        // Save cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

// Remove product from cart
export const removeProductFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id,
        });

        // Update local storage after removal
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

// Empty cart
export const emptyCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPTY_CART });

        // Clear cart items from local storage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.error("Error emptying the cart:", error);
    }
};

// Save shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });

        // Save shipping info to local storage
        localStorage.setItem('shippingInfo', JSON.stringify(data));
    } catch (error) {
        console.error("Error saving shipping information:", error);
    }
};
