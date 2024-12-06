import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link } from 'react-router-dom';

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown }) => {
    const handleLogout = () => {
        alert('Logout functionality is disabled.');
    };

    const navs = [
        {
            title: "Rewards",
            icon: <OfflineBoltIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Exclusive Zone",
            icon: <AddCircleIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Orders",
            icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
            redirect: "/orders",
        },
        {
            title: "Wishlist",
            icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
            redirect: "/wishlist",
        },
        {
            title: "Chats",
            icon: <ChatIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Coupons",
            icon: <ConfirmationNumberIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Gift Cards",
            icon: <AccountBalanceWalletIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
        {
            title: "Notifications",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
    ];

    return (
        <div className="absolute w-60 -left-24 ml-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">
            <Link
                className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
                to="/account"
            >
                <span className="text-primary-blue">
                    <AccountCircleIcon sx={{ fontSize: "18px" }} />
                </span>
                Mi Pérfil
            </Link>

            {navs.map((item, i) => (
                <Link
                    key={i}
                    className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
                    to={item.redirect}
                >
                    <span className="text-primary-blue">{item.icon}</span>
                    {item.title}
                </Link>
            ))}

            <div
                className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer"
                onClick={handleLogout}
            >
                <span className="text-primary-blue">
                    <PowerSettingsNewIcon sx={{ fontSize: "18px" }} />
                </span>
                Salir
            </div>

            <div className="absolute right-1/2 -top-2.5">
                <div className="arrow_down"></div>
            </div>
        </div>
    );
};

export default PrimaryDropDownMenu;
