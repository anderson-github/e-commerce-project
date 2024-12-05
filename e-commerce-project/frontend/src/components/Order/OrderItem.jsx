import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';

const OrderItem = (props) => {
    const { orderId, productName, productImage, unitPrice, quantity, createdAt, deliveredAt, orderStatus } = props;

    return (
        <Link
            to={`/order-details/${orderId}`}
            className="flex p-4 items-start bg-white border rounded gap-2 sm:gap-0 hover:shadow-lg"
        >
            {/* Image Container */}
            <div className="w-full sm:w-32 h-20">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={productImage}
                    alt={productName}
                />
            </div>

            {/* Order Description Container */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
                {/* Product Info */}
                <div className="flex flex-col gap-1 overflow-hidden">
                    <p className="text-sm font-medium">
                        {productName.length > 40 ? `${productName.substring(0, 40)}...` : productName}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Quantity: {quantity}</p>
                    <p className="text-xs text-gray-500">
                        Total: ₹{(quantity * unitPrice).toLocaleString()}
                    </p>
                </div>

                {/* Order Status and Price */}
                <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
                    <p className="text-sm font-medium">₹{unitPrice.toLocaleString()}</p>

                    <div className="flex flex-col gap-1.5">
                        <p className="text-sm font-medium flex items-center gap-1">
                            {orderStatus === "Shipped" ? (
                                <>
                                    <span className="text-primary-orange pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Shipped
                                </>
                            ) : orderStatus === "Delivered" ? (
                                <>
                                    <span className="text-primary-green pb-0.5">
                                        <CircleIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Delivered on {formatDate(deliveredAt)}
                                </>
                            ) : (
                                <>
                                    <span className="text-primary-green pb-0.5">
                                        <RadioButtonUncheckedIcon sx={{ fontSize: "14px" }} />
                                    </span>
                                    Ordered on {formatDate(createdAt)}
                                </>
                            )}
                        </p>
                        {orderStatus === "Delivered" ? (
                            <p className="text-xs ml-1">Your item has been delivered</p>
                        ) : orderStatus === "Shipped" ? (
                            <p className="text-xs ml-1">Your item has been shipped</p>
                        ) : (
                            <p className="text-xs ml-1">Seller has processed your order</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OrderItem;
