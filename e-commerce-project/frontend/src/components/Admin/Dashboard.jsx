import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ activeTab, children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Detectar el tamaño de la pantalla para la barra lateral responsiva
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Control inicial
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex min-h-screen mt-14 sm:min-w-full">
      {/* Sidebar */}
      {!isMobile && <Sidebar activeTab={activeTab} />}
      {isMobile && isSidebarOpen && (
        <Sidebar activeTab={activeTab} setToggleSidebar={setIsSidebarOpen} />
      )}

      {/* Contenido principal */}
      <div className={`w-full ${!isMobile ? 'sm:w-4/5 sm:ml-72' : ''} min-h-screen`}>
        <div className="flex flex-col gap-6 sm:m-8 p-2 pb-6 overflow-hidden">
          {/* Menú móvil Toggle */}
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="sm:hidden bg-gray-700 w-10 h-10 rounded-full shadow text-white flex items-center justify-center"
            >
              <MenuIcon />
            </button>
          )}
          {/* Renderizar función Children */}
          {children}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
