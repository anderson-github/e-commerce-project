import { Link, useNavigate } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../redux/actions/userActions';
import './Sidebar.css';

const navMenu = [
  {
    icon: <EqualizerIcon />,
    label: "Dashboard",
    ref: "/admin/dashboard",
  },
  {
    icon: <ShoppingBagIcon />,
    label: "Orders",
    ref: "/admin/orders",
  },
  {
    icon: <InventoryIcon />,
    label: "Products",
    ref: "/admin/products",
  },
  {
    icon: <AddBoxIcon />,
    label: "Add Product",
    ref: "/admin/new-product",
  },
  {
    icon: <GroupIcon />,
    label: "Users",
    ref: "/admin/users",
  },
  {
    icon: <AccountBoxIcon />,
    label: "My Profile",
    ref: "/account",
  },
  {
    icon: <LogoutIcon />,
    label: "Logout",
  },
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    navigate("/login");
  };

  return (
    <aside className="sidebar z-10 block min-h-screen fixed left-0 pb-14 max-h-screen w-3/4 sm:w-1/5 bg-gray-800 text-white overflow-x-hidden border-r">
      {/* Información de usuario */}
      <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
        <Avatar alt="User Avatar" src={user?.avatar || '/default-avatar.png'} />
        <div className="flex flex-col gap-0">
          <span className="font-medium text-lg">{user?.name || "Usuario"}</span>
          <span className="text-gray-300 text-sm">{user?.email || "Alexander@ciaf.edu.co"}</span>
        </div>
        <button
          onClick={() => setToggleSidebar(false)}
          className="sm:hidden bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Menú de Navegación */}
      <div className="flex flex-col w-full gap-0 my-8">
        {navMenu.map((item, index) => {
          const { icon, label, ref } = item;
          return label === "Logout" ? (
            <button
              key={index}
              onClick={handleLogout}
              className="hover:bg-gray-700 flex gap-3 items-center py-3 px-4 font-medium"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ) : (
            <Link
              key={index}
              to={ref}
              className={`${
                activeTab === index ? "bg-gray-700" : "hover:bg-gray-700"
              } flex gap-3 items-center py-3 px-4 font-medium`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* información de los desarrollañdores */}
      <div className="flex flex-col gap-1 bg-gray-700 p-3 rounded-lg shadow-lg mb-6 mt-28 mx-3.5 overflow-hidden">
        <h5> Desarrollo con el ❤️ por:</h5>
        <div className="flex flex-col gap-0">
          <a
            href="https://github.com/anderson-github"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lg hover:text-blue-500"
          >
            Anderson Ivan Rincon Soler
          </a>

          <a
            href="https://github.com/andres1996u"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lg hover:text-blue-500"
          >
            Yulian Andres Trejos Zapata
          </a>

          <a
            href="mailto:your-email@example.com"
            className="text-gray-300 text-sm hover:text-blue-500"
          >
            ai.rincon26@ciaf.edu.co 
            ya.trejos24@ciaf.edu.co
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
