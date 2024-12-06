import { Link } from 'react-router-dom';

const categories = [
    { name: "Mobiles" },
    { name: "Fashion" },
    { name: "Electronics" },
    { name: "Home" },
    { name: "Travel" },
    { name: "Appliances" },
    { name: "Furniture" },
    { name: "Beauty, Toys & More" },
    { name: "Grocery" },
];

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 w-full px-12 py-4 shadow overflow-hidden">
            <div className="flex items-center justify-between">
                {categories.map((category, index) => (
                    <div className="flex flex-col gap-2 items-center p-3" key={index}>
                        <span className="text-sm text-gray-800 font-medium">
                            {category.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
