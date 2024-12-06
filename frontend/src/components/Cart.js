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

export default Cart;
