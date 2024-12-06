import { useEffect } from "react";

const MetaData = ({ title }) => {
    useEffect(() => {
        document.title = title; // Establece el título dinámicamente sin dependencias externas
    }, [title]);

    return null; // No se necesita renderizar nada
};

export default MetaData;
