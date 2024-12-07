import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/sales/orders/');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/sales/orders/${cartItemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
        alert('Product removed from cart successfully!');
      } else {
        throw new Error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      alert('Error removing product from cart. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.product.name}</h3>
          <p>${item.product.price}</p>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
