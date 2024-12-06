import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DownloadIcon from '@mui/icons-material/Download';

const SecondaryDropDownMenu = () => {
    const navs = [
        {
            title: "Notification Preferences",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
        },
        {
            title: "Sell Your Products",
            icon: <BusinessCenterIcon sx={{ fontSize: "18px" }} />,
        },
        {
            title: "Customer Support",
            icon: <LiveHelpIcon sx={{ fontSize: "18px" }} />,
        },
        {
            title: "Advertise With Us",
            icon: <TrendingUpIcon sx={{ fontSize: "18px" }} />,
        },
        {
            title: "Download App",
            icon: <DownloadIcon sx={{ fontSize: "18px" }} />,
        },
    ];

    return (
        <div className="absolute w-60 -right-2 top-9 bg-white shadow-2xl rounded flex-col text-sm">
            {navs.map((item, i) => {
                const { title, icon } = item;

                return (
                    <div
                        className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
                        key={i}
                    >
                        <span className="text-primary-blue">{icon}</span>
                        {title}
                    </div>
                );
            })}
        </div>
    );
};

export default SecondaryDropDownMenu;
