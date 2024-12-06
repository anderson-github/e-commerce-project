import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Estilos globales de la aplicación
import App from './App'; // Componente principal de la aplicación
import { BrowserRouter as Router } from 'react-router-dom'; // Configuración de rutas para la navegación
import { Provider } from 'react-redux'; // Proveedor de Redux para manejar el estado global
import store from './store'; // Almacén de Redux configurado con reducers y middlewares
import { SnackbarProvider } from 'notistack'; // Proveedor de notificaciones en la interfaz

ReactDOM.render(
  <React.StrictMode>
    {/* Provider permite que toda la aplicación acceda al estado global de Redux */}
    <Provider store={store}>
      {/* SnackbarProvider para mostrar notificaciones en la aplicación */}
      <SnackbarProvider
        maxSnack={2} // Número máximo de notificaciones visibles al mismo tiempo
        anchorOrigin={{
          vertical: 'bottom', // Posición vertical (parte inferior de la pantalla)
          horizontal: 'center', // Posición horizontal (centro de la pantalla)
        }}
      >
        {/* Router para manejar la navegación en la aplicación */}
        <Router>
          <App /> {/* Componente principal de la aplicación */}
        </Router>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // Punto de entrada principal en el DOM (generalmente el elemento con id 'root')
);
