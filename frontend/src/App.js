// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header cartCount={cartItems.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <ProductList
                products={sampleProducts}
                addToCart={addToCart}
              />
            } />
            <Route path="/cart" element={
              <Cart
                items={cartItems}
                total={getCartTotal()}
              />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const sampleProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    image: "/api/placeholder/200/200"
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
    image: "/api/placeholder/200/200"
  }
];

export default App;
