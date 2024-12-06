// Reducer para gestionar la lista de deseos (wishlist)
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, { type, payload }) => {
    switch (type) {
        // Agregar un elemento a la lista de deseos
        case ADD_TO_WISHLIST:
            const item = payload;
            // Verificar si el elemento ya existe en la lista de deseos
            const itemExist = state.wishlistItems.find((i) => i.product === item.product);

            if (itemExist) {
                // Actualizar el elemento existente
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map((i) =>
                        i.product === itemExist.product ? item : i
                    ),
                };
            } else {
                // Agregar un nuevo elemento
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item],
                };
            }
        // Eliminar un elemento de la lista de deseos
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.product !== payload),
            };
        // Retornar el estado por defecto si no coincide ningún caso
        default:
            return state;
    }
};
