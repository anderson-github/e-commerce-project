import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">
      {/* Navbar Container */}
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">
        {/* Logo & Search Container */}
        <div className="flex items-center flex-1">
          <Link className="h-7 mr-1 sm:mr-4" to="/">
            <div className="h-full w-full flex items-center font-bold text-white">
              ShopLogo
            </div>
          </Link>
          <Searchbar />
        </div>
        {/* Right Navigation */}
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
          <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
            <span>
              <ShoppingCartIcon />
            </span>
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
