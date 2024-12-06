import { useSelector } from 'react-redux';
import Product from './Product';

const ProductSlider = ({ title, tagline }) => {
    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* Header Section */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                {/* Removed dynamic navigation */}
            </div>
            <hr />

            {/* Product List */}
            {!loading && products && (
                <div className="flex flex-wrap justify-between p-1">
                    {products.slice(0, 4).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductSlider;
