// Acciones para crear una nueva orden
export const NEW_ORDER_REQUEST = "NEW_ORDER_REQUEST"; // Solicitud para crear una nueva orden
export const NEW_ORDER_SUCCESS = "NEW_ORDER_SUCCESS"; // Éxito en la creación de la nueva orden
export const NEW_ORDER_FAIL = "NEW_ORDER_FAIL"; // Error al crear una nueva orden

// Acciones para obtener las órdenes de un usuario
export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST"; // Solicitud para obtener las órdenes del usuario
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS"; // Éxito al obtener las órdenes del usuario
export const MY_ORDERS_FAIL = "MY_ORDERS_FAIL"; // Error al obtener las órdenes del usuario

// Acciones para obtener los detalles de una orden específica
export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST"; // Solicitud para obtener detalles de una orden
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS"; // Éxito al obtener los detalles de la orden
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL"; // Error al obtener los detalles de la orden

// Acciones para verificar el estado de pago
export const PAYMENT_STATUS_REQUEST = "PAYMENT_STATUS_REQUEST"; // Solicitud para verificar el estado de pago
export const PAYMENT_STATUS_SUCCESS = "PAYMENT_STATUS_SUCCESS"; // Éxito al verificar el estado de pago
export const PAYMENT_STATUS_FAIL = "PAYMENT_STATUS_FAIL"; // Error al verificar el estado de pago

// Acciones para obtener todas las órdenes (ADMIN)
export const ALL_ORDERS_REQUEST = "ALL_ORDERS_REQUEST"; // Solicitud para obtener todas las órdenes
export const ALL_ORDERS_SUCCESS = "ALL_ORDERS_SUCCESS"; // Éxito al obtener todas las órdenes
export const ALL_ORDERS_FAIL = "ALL_ORDERS_FAIL"; // Error al obtener todas las órdenes

// Acciones para actualizar una orden (ADMIN)
export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST"; // Solicitud para actualizar una orden
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS"; // Éxito al actualizar la orden
export const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET"; // Reinicio del estado de actualización de la orden
export const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL"; // Error al actualizar la orden

// Acciones para eliminar una orden (ADMIN)
export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST"; // Solicitud para eliminar una orden
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS"; // Éxito al eliminar la orden
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET"; // Reinicio del estado de eliminación de la orden
export const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL"; // Error al eliminar la orden

// Acción para limpiar los errores
export const CLEAR_ERRORS = "CLEAR_ERRORS"; // Limpieza de errores en las acciones
