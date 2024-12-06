import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Importación de reducers para manejar el estado de diferentes partes de la aplicación
import {
    forgotPasswordReducer,
    profileReducer,
    userReducer,
    allUsersReducer,
    userDetailsReducer,
} from './reducers/userReducer';
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productsReducer,
    productReviewsReducer,
    reviewReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReducer';
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
    paymentStatusReducer,
} from './reducers/orderReducer';
import { wishlistReducer } from './reducers/wishlistReducer';

// Combinación de todos los reducers en un único objeto
const reducer = combineReducers({
    user: userReducer, // Reducer para la autenticación y datos del usuario
    profile: profileReducer, // Reducer para la actualización del perfil
    forgotPassword: forgotPasswordReducer, // Reducer para manejar contraseñas olvidadas
    products: productsReducer, // Reducer para la lista de productos
    productDetails: productDetailsReducer, // Reducer para los detalles de un producto específico
    newReview: newReviewReducer, // Reducer para agregar una nueva reseña
    cart: cartReducer, // Reducer para el carrito de compras
    saveForLater: saveForLaterReducer, // Reducer para guardar productos para más tarde
    newOrder: newOrderReducer, // Reducer para crear nuevas órdenes
    myOrders: myOrdersReducer, // Reducer para las órdenes del usuario autenticado
    paymentStatus: paymentStatusReducer, // Reducer para manejar el estado de los pagos
    orderDetails: orderDetailsReducer, // Reducer para los detalles de una orden específica
    allOrders: allOrdersReducer, // Reducer para listar todas las órdenes (admin)
    order: orderReducer, // Reducer para actualizar o eliminar órdenes
    newProduct: newProductReducer, // Reducer para agregar un nuevo producto (admin)
    product: productReducer, // Reducer para actualizar o eliminar un producto (admin)
    users: allUsersReducer, // Reducer para manejar la lista de usuarios (admin)
    userDetails: userDetailsReducer, // Reducer para manejar los detalles de un usuario específico
    reviews: productReviewsReducer, // Reducer para la lista de reseñas de un producto
    review: reviewReducer, // Reducer para eliminar una reseña
    wishlist: wishlistReducer, // Reducer para manejar la lista de deseos
});

// Estado inicial de la aplicación
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') // Productos almacenados en el carrito
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo") // Información de envío almacenada
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
    saveForLater: {
        saveForLaterItems: localStorage.getItem('saveForLaterItems') // Productos guardados para más tarde
            ? JSON.parse(localStorage.getItem('saveForLaterItems'))
            : [],
    },
    wishlist: {
        wishlistItems: localStorage.getItem('wishlistItems') // Productos en la lista de deseos
            ? JSON.parse(localStorage.getItem('wishlistItems'))
            : [],
    },
};

// Configuración de middlewares
const middleware = [thunk];

// Creación del store de Redux con los reducers, estado inicial y middlewares
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)) // Integración con herramientas de desarrollo de Redux
);

export default store;
