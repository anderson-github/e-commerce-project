// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');

  return (
    <div className="app">
      <Header cart={cart} setCurrentPage={setCurrentPage} />
      {currentPage === 'products' && (
        <ProductList cart={cart} setCart={setCart} />
      )}
      {currentPage === 'admin' && (
        <AdminPanel />
      )}
      <Footer />
    </div>
  );
};

export default App;
