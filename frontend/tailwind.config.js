/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Busca clases Tailwind en los archivos React
      "./public/index.html",        // Analiza también el archivo HTML principal
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1d4ed8", // Azul primario personalizado
          background: "#f1f3f6", // Fondo claro personalizado
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'], // Incluye la fuente 'Roboto'
        },
      },
    },
    plugins: [],
  };
  