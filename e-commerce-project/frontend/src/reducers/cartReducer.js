// Importar las constantes de las acciones del carrito
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

// Reducer para gestionar las acciones relacionadas con el carrito
export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, { type, payload }) => {
    switch (type) {
        // Agregar un producto al carrito
        case ADD_TO_CART:
            const item = payload;
            const isItemExist = state.cartItems.find((el) => el.product === item.product);

            if (isItemExist) {
                // Si el producto ya existe en el carrito, actualizarlo
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        el.product === isItemExist.product ? item : el
                    ),
                };
            } else {
                // Si el producto no existe en el carrito, agregarlo
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        // Eliminar un producto del carrito
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.product !== payload)
            };
        // Vaciar todo el carrito
        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
            };
        // Guardar la información de envío
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: payload
            };
        // Retornar el estado actual si la acción no coincide
        default:
            return state;
    }
};
