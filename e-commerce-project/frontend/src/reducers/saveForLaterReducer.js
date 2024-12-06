// Importación de constantes relacionadas con la funcionalidad de guardar para más tarde
import { REMOVE_FROM_SAVE_FOR_LATER, SAVE_FOR_LATER } from "../constants/saveForLaterConstants";

// Reducer para manejar los elementos guardados para más tarde
export const saveForLaterReducer = (state = { saveForLaterItems: [] }, { type, payload }) => {
    switch (type) {
        case SAVE_FOR_LATER:
            // Añadir un elemento a la lista de "guardar para más tarde"
            const item = payload;
            const isItemExist = state.saveForLaterItems.find((i) => i.product === item.product);

            if (isItemExist) {
                // Si el elemento ya existe, reemplazarlo con el nuevo
                return {
                    ...state,
                    saveForLaterItems: state.saveForLaterItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                // Si no existe, agregar el nuevo elemento a la lista
                return {
                    ...state,
                    saveForLaterItems: [...state.saveForLaterItems, item],
                };
            }
        case REMOVE_FROM_SAVE_FOR_LATER:
            // Eliminar un elemento de la lista de "guardar para más tarde"
            return {
                ...state,
                saveForLaterItems: state.saveForLaterItems.filter((i) =>
                    i.product !== payload
                ),
            };
        default:
            // Retornar el estado actual por defecto
            return state;
    }
};
