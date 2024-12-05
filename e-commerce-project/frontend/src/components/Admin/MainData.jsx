import { useEffect } from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../actions/productAction';
import { fetchOrders } from '../../actions/orderAction';
import { fetchUsers } from '../../actions/userAction';
import MetaData from '../Layouts/MetaData';

const MainData = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.orders);
    const { users } = useSelector((state) => state.users);

    let outOfStock = 0;

    products?.forEach((product) => {
        if (product.stock === 0) outOfStock++;
    });

    const totalSales = orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchOrders());
        dispatch(fetchUsers());
    }, [dispatch]);

    const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Beauty', 'Sports'];

    const lineChartState = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                data: orders ? orders.map(order => order.totalPrice) : [],
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
            },
        ],
    };

    const pieChartState = {
        labels: ['Processing', 'Shipped', 'Delivered'],
        datasets: [
            {
                data: [
                    orders?.filter(order => order.status === 'Processing').length,
                    orders?.filter(order => order.status === 'Shipped').length,
                    orders?.filter(order => order.status === 'Delivered').length,
                ],
                backgroundColor: ['#facc15', '#9333ea', '#4ade80'],
            },
        ],
    };

    const doughnutChartState = {
        labels: ['In Stock', 'Out of Stock'],
        datasets: [
            {
                data: [products?.length - outOfStock, outOfStock],
                backgroundColor: ['#22c55e', '#ef4444'],
            },
        ],
    };

    const barChartState = {
        labels: categories,
        datasets: [
            {
                label: 'Products',
                data: categories.map(category => products?.filter(product => product.category === category).length),
                backgroundColor: '#9333ea',
            },
        ],
    };

    return (
        <>
            <MetaData title=" Dashboard Administrador | Final App" />

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                <div className="bg-green-500 text-white rounded-lg p-4 shadow">
                    <h4 className="text-lg">Total Sales</h4>
                    <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-500 text-white rounded-lg p-4 shadow">
                    <h4 className="text-lg">Total Orders</h4>
                    <p className="text-2xl font-bold">{orders?.length}</p>
                </div>
                <div className="bg-blue-500 text-white rounded-lg p-4 shadow">
                    <h4 className="text-lg">Total Products</h4>
                    <p className="text-2xl font-bold">{products?.length}</p>
                </div>
                <div className="bg-purple-500 text-white rounded-lg p-4 shadow">
                    <h4 className="text-lg">Total Users</h4>
                    <p className="text-2xl font-bold">{users?.length}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow w-full">
                    <Line data={lineChartState} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow w-full">
                    <h4 className="text-center font-medium mb-2">Order Status</h4>
                    <Pie data={pieChartState} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white p-4 rounded-lg shadow w-full">
                    <Bar data={barChartState} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow w-full">
                    <h4 className="text-center font-medium mb-2">Stock Status</h4>
                    <Doughnut data={doughnutChartState} />
                </div>
            </div>
        </>
    );
};

export default MainData;
