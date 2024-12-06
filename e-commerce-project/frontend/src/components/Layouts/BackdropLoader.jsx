const BackdropLoader = () => {
    // Puedes sustituir el indicador de carga por un mensaje estático o un componente básico
    return (
        <div className="text-center">
            <p>Loading...</p> {/* Cargando componentes, por favor espere.*/}
        </div>
    );
};

export default BackdropLoader;
