import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, myOrders } from '../../actions/orderActions';
import Loader from '../Layouts/Loader';
import OrderItem from './OrderItem';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const MyOrders = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MetaData title="My Orders" />
            <MinCategory />

            <main className="w-full mt-16 sm:mt-0">
                <div className="flex gap-3.5 mt-2 sm:mt-6 sm:mx-3 m-auto mb-7">
                    {/* Orders Section */}
                    <div className="flex-1">
                        {loading ? (
                            <Loader />
                        ) : (
                            orders &&
                            orders.map((order) =>
                                order.orderItems.map((item, index) => (
                                    <OrderItem
                                        key={index}
                                        {...item}
                                        orderId={order._id}
                                        orderStatus={order.orderStatus}
                                        createdAt={order.createdAt}
                                        deliveredAt={order.deliveredAt}
                                    />
                                ))
                            )
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default MyOrders;
