import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import Loader from '../Layouts/Loader';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {order && order.client && order.shippingInfo && (
                        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                            {/* Simplified Order Details */}
                            <h1 className="text-lg font-medium">Order Details Simplified</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default OrderDetails;
