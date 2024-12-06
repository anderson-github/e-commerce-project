import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeTab }) => {
    // Datos ficticios para simplificar
    const user = { name: 'Guest', avatar: { url: 'placeholder-avatar.png' } };

    const handleLogout = () => {
        alert('Logout functionality is disabled.');
    };

    return (
        <div className="hidden sm:flex flex-col gap-4 w-1/4 px-1">
            {/* Profile Card */}
            <div className="flex items-center gap-4 p-3 bg-white rounded-sm shadow">
                <div className="w-12 h-12 rounded-full">
                    <img
                        draggable="false"
                        className="h-full w-full object-cover rounded-full"
                        src={user.avatar.url}
                        alt="Avatar"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-xs">Hello,</p>
                    <h2 className="font-medium">{user.name}</h2>
                </div>
            </div>

            {/* Navigation Tiles */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <div className="flex items-center gap-5 px-4 py-4 border-b">
                    <span className="text-primary-blue">
                        <FolderIcon />
                    </span>
                    <Link
                        className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue"
                        to="/orders"
                    >
                        My Orders
                        <span>
                            <ChevronRightIcon />
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-5 px-4 py-4 border-b">
                    <span className="text-primary-blue">
                        <PowerSettingsNewIcon />
                    </span>
                    <div
                        className="flex w-full justify-between font-medium text-gray-500 hover:text-primary-blue cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                        <span>
                            <ChevronRightIcon />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
