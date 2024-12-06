// Header.js
const Header = ({ cart, setCurrentPage }) => {
  return (
    <header className="header">
      <h1>E-Shop</h1>
      <nav>
        <button onClick={() => setCurrentPage('products')}>Products</button>
        <button onClick={() => setCurrentPage('admin')}>Admin</button>
        <div className="cart-icon">
          🛒 ({cart.length})
        </div>
      </nav>
    </header>
  );
};

export default Header;
