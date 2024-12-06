// Calcula el descuento en porcentaje basado en el precio actual y el precio original.
export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

// Calcula la fecha estimada de entrega, sumando 7 días a la fecha actual.
export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7);
    return deliveryDate.toUTCString().substring(0, 11); // Formato simplificado de fecha.
}

// Formatea una fecha en un formato legible (día, mes, año).
export const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0, 16); // Devuelve el formato simplificado.
}

// Selecciona al azar un número específico de productos de un array.
export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n); // Orden aleatorio y recorte del array.
}
