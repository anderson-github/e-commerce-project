import { useSelector } from 'react-redux';
import Product from './Product';

const Wishlist = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <main className="w-full mt-12 sm:mt-0">
            <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                {/* Wishlist Container */}
                <div className="flex-1 shadow bg-white">
                    <div className="flex flex-col">
                        <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                            My Wishlist ({wishlistItems.length})
                        </span>

                        {/* Wishlist Items */}
                        {wishlistItems.map((item, index) => <Product {...item} key={index} />)}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Wishlist;
