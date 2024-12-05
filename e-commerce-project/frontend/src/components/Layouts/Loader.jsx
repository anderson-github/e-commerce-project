import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-gray-100">
            <CircularProgress color="primary" />
        </div>
    );
};

export default Loader;
