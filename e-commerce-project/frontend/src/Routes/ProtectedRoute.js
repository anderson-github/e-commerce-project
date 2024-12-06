// Componente para gestionar rutas protegidas y validar autenticación y rol de administrador
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin }) => {
    // Obtener el estado del usuario desde Redux
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <>
            {/* Verificar si el estado de carga ha finalizado */}
            {loading === false && (
                // Si el usuario no está autenticado, redirigir al inicio de sesión
                isAuthenticated === false ? (
                    <Navigate to="/login" />
                ) : 
                // Si se requiere rol de administrador, validar que el usuario sea admin
                isAdmin ? (
                    user.role !== "admin" ? <Navigate to="/login" /> : children
                ) : (
                    // Si no se requiere rol de administrador, mostrar el contenido protegido
                    children
                )
            )}
        </>
    );
};

export default ProtectedRoute;
