import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Rating from '@mui/material/Rating';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { products, error: fetchError } = useSelector((state) => state.products);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);

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
            enqueueSnackbar('Product deleted successfully!', { variant: 'success' });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProducts());
    }, [dispatch, fetchError, deleteError, isDeleted, enqueueSnackbar]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Product ID',
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => (
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                        <img
                            draggable="false"
                            src={params.row.image}
                            alt={params.row.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    {params.row.name}
                </div>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            minWidth: 100,
            flex: 0.2,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
            minWidth: 70,
            flex: 0.2,
            renderCell: (params) =>
                params.row.stock < 10 ? (
                    <span className="font-medium text-red-700 bg-red-200 p-1 px-2 rounded">
                        {params.row.stock}
                    </span>
                ) : (
                    params.row.stock
                ),
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => `₹${params.row.price.toLocaleString()}`,
        },
        {
            field: 'cprice',
            headerName: 'Cutted Price',
            type: 'number',
            minWidth: 100,
            flex: 0.2,
            renderCell: (params) => `₹${params.row.cprice.toLocaleString()}`,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            minWidth: 100,
            flex: 0.1,
            renderCell: (params) => (
                <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Actions
                    editRoute="product"
                    deleteHandler={deleteProductHandler}
                    id={params.row.id}
                />
            ),
        },
    ];

    const rows =
        products?.map((product) => ({
            id: product._id,
            name: product.name,
            image: product.images[0]?.url || '',
            category: product.category,
            stock: product.stock,
            price: product.price,
            cprice: product.cuttedPrice,
            rating: product.ratings,
        })) || [];

    return (
        <>
            <MetaData title="Administrador Productos | Dashboard" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-medium uppercase">Productos</h1>
                <Link
                    to="/admin/new_product"
                    className="bg-primary-blue text-white py-2 px-4 rounded shadow hover:shadow-lg"
                >
                    Nuevo Producto
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md w-full" style={{ height: 470 }}>
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

export default ProductTable;
