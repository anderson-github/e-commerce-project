import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
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
                <Link
                    to="/products"
                    className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg uppercase"
                >
                    View All
                </Link>
            </div>
            <hr />

            {/* Product Slider */}
            {!loading && products && (
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {getRandomProducts(products, 12).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </Slider>
            )}
        </section>
    );
};

export default ProductSlider;
