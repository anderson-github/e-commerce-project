import { REMOVE_FROM_SAVE_FOR_LATER, SAVE_FOR_LATER } from "../constants/saveForLaterConstants";

// Save For Later
export const saveForLater = (id) => (dispatch, getState) => {
    const cartItemsArr = getState().cart.cartItems;
    const product = cartItemsArr.find((item) => item.product === id);

    if (product) {
        dispatch({
            type: SAVE_FOR_LATER,
            payload: product,
        });

        localStorage.setItem(
            "saveForLaterItems",
            JSON.stringify(getState().saveForLater.saveForLaterItems)
        );
    }
};

// Remove From Save For Later
export const removeFromSaveForLater = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_SAVE_FOR_LATER,
        payload: id,
    });

    localStorage.setItem(
        "saveForLaterItems",
        JSON.stringify(getState().saveForLater.saveForLaterItems)
    );
};
