import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, myOrders } from '../../actions/orderActions'; // Ruta actualizada para la acción
import Loader from '../Layouts/Loader';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const orderStatus = ['Processing', 'Shipped', 'Delivered'];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState('');
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const { orders, loading, error } = useSelector((state) => state.orders); // Actualiza el estado según tu lógica

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (!loading) {
            setFilteredOrders(orders);
        }
    }, [loading, orders]);

    useEffect(() => {
        setSearch('');
        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        const filteredArr = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const matchesStatus = status ? order.orderStatus === status : true;
            const matchesTime =
                +orderTime === dt.getMonth()
                    ? orderDate.getMonth() === +orderTime
                    : orderDate.getFullYear() === +orderTime;

            return matchesStatus && matchesTime;
        });

        setFilteredOrders(filteredArr);
    }, [status, orderTime, orders]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar('Please enter a valid search term', { variant: 'warning' });
            return;
        }

        const filteredArr = orders.map((order) => ({
            ...order,
            orderItems: order.orderItems.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            ),
        }));
        setFilteredOrders(filteredArr);
    };

    const clearFilters = () => {
        setStatus('');
        setOrderTime(0);
        setSearch('');
        setFilteredOrders(orders);
    };

    return (
        <>
            <MetaData title="My Orders | Final E-commerce" />

            <MinCategory />
            <main className="w-full mt-16 sm:mt-0">
                <div className="flex gap-3.5 mt-2 sm:mt-6 sm:mx-3 m-auto mb-7">
                    {/* Sidebar Column */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">
                        <div className="flex flex-col bg-white rounded-sm shadow">
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span
                                    onClick={clearFilters}
                                    className="text-blue-600 font-medium text-sm uppercase cursor-pointer hover:text-blue-700"
                                >
                                    Clear All
                                </span>
                            </div>

                            {/* Order Status Filter */}
                            <div className="flex flex-col py-3 text-sm">
                                <span className="font-medium px-4">Order Status</span>
                                <div className="flex flex-col gap-3 px-4 mt-1 pb-3 border-b">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="orderstatus-radio-buttons-group"
                                            onChange={(e) => setStatus(e.target.value)}
                                            value={status}
                                        >
                                            {orderStatus.map((el, i) => (
                                                <FormControlLabel
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    key={i}
                                                    label={<span className="text-sm">{el}</span>}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>

                            {/* Order Time Filter */}
                            <div className="flex flex-col pb-2 text-sm">
                                <span className="font-medium px-4">Order Time</span>
                                <div className="flex flex-col gap-3 mt-1 px-4 pb-3">
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="ordertime-radio-buttons-group"
                                            onChange={(e) => setOrderTime(e.target.value)}
                                            value={orderTime}
                                        >
                                            {ordertime.map((el, i) => (
                                                <FormControlLabel
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    key={i}
                                                    label={<span className="text-sm">{i === 0 ? 'This Month' : el}</span>}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orders Column */}
                    <div className="flex-1">
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="flex flex-col gap-3 sm:mr-4 overflow-hidden">
                                <form
                                    onSubmit={searchOrders}
                                    className="flex items-center justify-between mx-1 sm:mx-0 sm:w-10/12 bg-white border rounded hover:shadow"
                                >
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        placeholder="Search your orders here"
                                        className="p-2 text-sm outline-none flex-1 rounded-l"
                                    />
                                    <button
                                        type="submit"
                                        className="h-full text-sm px-1 sm:px-4 py-2.5 text-white bg-primary-blue hover:bg-blue-600 rounded-r flex items-center gap-1"
                                    >
                                        <SearchIcon sx={{ fontSize: '22px' }} />
                                        Search Orders
                                    </button>
                                </form>

                                {filteredOrders.length === 0 && (
                                    <div className="flex items-center flex-col gap-2 p-8 bg-white">
                                        <img
                                            draggable="false"
                                            src="/assets/images/empty-orders.png"
                                            alt="No Orders Found"
                                        />
                                        <span className="text-lg font-medium">No results found</span>
                                        <p>Edit search or clear all filters</p>
                                    </div>
                                )}

                                {filteredOrders.map((order) =>
                                    order.orderItems.map((item, index) => (
                                        <OrderItem
                                            {...item}
                                            key={index}
                                            orderId={order._id}
                                            orderStatus={order.orderStatus}
                                            createdAt={order.createdAt}
                                            deliveredAt={order.deliveredAt}
                                        />
                                    ))
                                ).reverse()}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default MyOrders;
