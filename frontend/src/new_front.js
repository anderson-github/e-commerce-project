// Header.js
import React from 'react';
import './Header.css';

const Header = ({ cartCount }) => {
  return (
    <header className="header">
      <h1>My Shop</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/cart">Cart ({cartCount})</a>
      </nav>
    </header>
  );
};

// ProductList.js
import React from 'react';
import './ProductList.css';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

// Cart.js
import React from 'react';
import './Cart.css';

const Cart = ({ items, total }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${total}</h3>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

// Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your trusted online shop since 2024</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@myshop.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
    </footer>
  );
};

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

// CSS Files

// App.css
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

// Header.css
.header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header nav a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

// ProductList.css
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-card button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

// Cart.css
.cart {
  padding: 20px;
}

.cart-item {
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.cart-total {
  margin-top: 20px;
  text-align: right;
}

.checkout-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

// Footer.css
.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  margin: 0 20px;
}