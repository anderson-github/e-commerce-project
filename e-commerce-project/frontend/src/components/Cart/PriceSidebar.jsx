const PriceSidebar = ({ cartItems }) => {
    // Helper functions to calculate prices
    const calculateTotalPrice = (items) =>
        items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString();

    const calculateCuttedPrice = (items) =>
        items.reduce((sum, item) => sum + item.cuttedPrice * item.quantity, 0).toLocaleString();

    const calculateDiscount = (items) =>
        items.reduce((sum, item) => sum + (item.cuttedPrice - item.price) * item.quantity, 0).toLocaleString();

    const calculateSavings = (items) =>
        items.reduce((sum, item) => sum + (item.cuttedPrice - item.price) * item.quantity, 0).toLocaleString();

    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
            {/* Price Details Container */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <h1 className="px-6 py-3 border-b font-medium text-gray-500">PRICE DETAILS</h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between">
                        Price ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}) 
                        <span>₹{calculateCuttedPrice(cartItems)}</span>
                    </p>
                    <p className="flex justify-between">
                        Discount 
                        <span className="text-primary-green">- ₹{calculateDiscount(cartItems)}</span>
                    </p>
                    <p className="flex justify-between">
                        Delivery Charges 
                        <span className="text-primary-green">FREE</span>
                    </p>

                    <div className="border border-dashed"></div>
                    <p className="flex justify-between text-lg font-medium">
                        Total Amount 
                        <span>₹{calculateTotalPrice(cartItems)}</span>
                    </p>
                    <div className="border border-dashed"></div>

                    <p className="font-medium text-primary-green">
                        You will save ₹{calculateSavings(cartItems)} on this order
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceSidebar;
