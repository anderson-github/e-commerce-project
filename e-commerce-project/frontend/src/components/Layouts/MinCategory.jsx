import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

// Categories List
const categories = [
    { name: "Electronics", route: "/products?category=Electronics" },
    { name: "TVs & Appliances", route: "/products?category=TVs%20%26%20Appliances" },
    { name: "Men", route: "/products?category=Men" },
    { name: "Women", route: "/products?category=Women" },
    { name: "Baby & Kids", route: "/products?category=Baby%20%26%20Kids" },
    { name: "Home & Furniture", route: "/products?category=Home%20%26%20Furniture" },
    { name: "Sports, Books & More", route: "/products?category=Sports%2C%20Books%20%26%20More" },
    { name: "Flights", route: "/flights" },
    { name: "Offer Zone", route: "/offers" },
    { name: "Grocery", route: "/products?category=Grocery" },
];

const MinCategory = () => {
    return (
        <section className="hidden sm:block bg-white w-full px-4 sm:px-12 overflow-hidden border-b mt-16">
            <div className="flex items-center justify-between py-2">
                {categories.map((category, index) => (
                    <Link 
                        to={category.route} 
                        key={index} 
                        className="text-sm px-3 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                    >
                        {category.name}
                        <span className="text-gray-400 group-hover:text-primary-blue">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;
