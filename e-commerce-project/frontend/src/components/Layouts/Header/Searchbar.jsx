import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products?search=${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full sm:w-9/12 px-2 sm:px-4 py-1 flex justify-between items-center shadow-sm bg-white rounded-md"
        >
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="text-sm flex-1 outline-none border-none placeholder-gray-500 px-2"
                type="text"
                placeholder="Search for products, categories, and more"
            />
            <button type="submit" className="text-primary-blue">
                <SearchIcon />
            </button>
        </form>
    );
};

export default Searchbar;
