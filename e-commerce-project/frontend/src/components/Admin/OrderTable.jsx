import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const OrderTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error: fetchError } = useSelector((state) => state.allOrders);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.order);

    useEffect(() => {
        if (fetchError) {
            enqueueSnackbar(fetchError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('Order deleted successfully!', { variant: 'success' });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, fetchError, deleteError, isDeleted, enqueueSnackbar]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                const statusClasses = {
                    Delivered: 'text-green-800 bg-green-100',
                    Shipped: 'text-yellow-800 bg-yellow-100',
                    Processing: 'text-purple-800 bg-purple-100',
                };
                return (
                    <span
                        className={`text-sm font-medium p-1 px-2 rounded-full ${
                            statusClasses[params.row.status] || 'text-gray-800 bg-gray-100'
                        }`}
                    >
                        {params.row.status}
                    </span>
                );
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => `₹${params.row.amount.toLocaleString()}`,
        },
        {
            field: 'orderOn',
            headerName: 'Order Date',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 100,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Actions
                    editRoute="order"
                    deleteHandler={deleteOrderHandler}
                    id={params.row.id}
                />
            ),
        },
    ];

    const rows = orders?.map((order) => ({
        id: order._id,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
        orderOn: new Date(order.createdAt).toLocaleDateString(),
        status: order.orderStatus,
    })) || [];

    return (
        <>
            <MetaData title="Admin Orders | Dashboard" />

            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase mb-4">Orders</h1>
            <div className="bg-white rounded-lg shadow-md p-4">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                    sx={{
                        boxShadow: 0,
                        border: 0,
                        '& .MuiDataGrid-cell': {
                            outline: 'none',
                        },
                    }}
                />
            </div>
        </>
    );
};

export default OrderTable;
