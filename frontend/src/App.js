import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Importa el archivo Home.js
import CreateProducts from './CreateProducts';
import './App.css';
import Header from './Header';
import Footer from './Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create/products" element={<CreateProducts />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
