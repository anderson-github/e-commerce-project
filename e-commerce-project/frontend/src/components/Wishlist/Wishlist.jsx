import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';
import Sidebar from '../User/Sidebar';
import Product from './Product';

const Wishlist = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MetaData title="Wishlist | Final E-commerce" />

            <MinCategory />
            <main className="w-full mt-12 sm:mt-0">
                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                    {/* Sidebar */}
                    <Sidebar activeTab="wishlist" />

                    {/* Wishlist Container */}
                    <div className="flex-1 shadow bg-white">
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                                My Wishlist ({wishlistItems.length})
                            </span>

                            {/* Empty Wishlist Message */}
                            {wishlistItems.length === 0 && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <img
                                        draggable="false"
                                        className="object-contain"
                                        src="/assets/images/empty-wishlist.png"
                                        alt="Empty Wishlist"
                                    />
                                    <span className="text-lg font-medium mt-6">
                                        Empty Wishlist
                                    </span>
                                    <p>
                                        You have no items in your wishlist. Start adding!
                                    </p>
                                </div>
                            )}

                            {/* Wishlist Items */}
                            {wishlistItems
                                .map((item, index) => <Product {...item} key={index} />)
                                .reverse()}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Wishlist;
