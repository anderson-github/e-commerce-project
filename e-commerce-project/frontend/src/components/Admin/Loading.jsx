import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ size = 40, thickness = 4, color = "primary" }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <CircularProgress size={size} thickness={thickness} color={color} />
        </div>
    );
};

export default Loading;
