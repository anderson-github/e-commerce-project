import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="mt-16 flex flex-col gap-4 items-center justify-center text-center">
            <img
                draggable="false"
                className="sm:w-1/3 h-auto"
                src="/assets/images/404-not-found.svg" // Ruta adaptada para "final"
                alt="Page Not Found"
            />
            <h1 className="text-2xl font-semibold text-gray-800">
                ¡Ups! La página que busca no existe.
            </h1>
            <p className="text-gray-600">
                It seems you may have taken a wrong turn. Don't worry, it happens to the best of us!
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-primary-blue rounded-sm uppercase shadow hover:shadow-lg text-white"
            >
                Volver a Inicio
            </Link>
        </div>
    );
};

export default NotFound;
