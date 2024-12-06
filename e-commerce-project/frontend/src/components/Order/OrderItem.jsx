import { Link } from 'react-router-dom';

const OrderItem = (props) => {
    const { orderId, productImage } = props;

    return (
        <div className="flex p-4 items-start bg-white border rounded gap-2 sm:gap-0 hover:shadow-lg">
            {/* Image Container */}
            <div className="w-full sm:w-32 h-20">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={productImage}
                    alt="Product"
                />
            </div>

            {/* Simplified Description */}
            <div className="flex flex-col sm:flex-row justify-between w-full">
                <p className="text-sm">Order Summary Simplified</p>
            </div>
        </div>
    );
};

export default OrderItem;
