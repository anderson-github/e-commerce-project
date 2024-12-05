import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteReview, getAllReviews } from '../../actions/productAction';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const ReviewsTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");

    const { reviews, error: fetchError } = useSelector((state) => state.reviews);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);

    useEffect(() => {
        if (productId.trim().length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (fetchError) {
            enqueueSnackbar(fetchError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar('Review deleted successfully!', { variant: 'success' });
            dispatch({ type: DELETE_REVIEW_RESET });
            if (productId.trim().length === 24) dispatch(getAllReviews(productId)); // Refrescar las vistas
        }
    }, [dispatch, fetchError, deleteError, isDeleted, productId, enqueueSnackbar]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Review ID',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'user',
            headerName: 'User',
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            minWidth: 200,
            flex: 0.3,
            renderCell: (params) => (
                <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            ),
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => (
                <Actions
                    editRoute="review"
                    deleteHandler={deleteReviewHandler}
                    id={params.row.id}
                />
            ),
        },
    ];

    const rows =
        reviews?.map((rev) => ({
            id: rev._id,
            user: rev.name,
            rating: rev.rating,
            comment: rev.comment,
        })) || [];

    return (
        <>
            <MetaData title="Reseñas administrativas | Dashboard" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center gap-4 mb-4">
                <h1 className="text-lg font-medium uppercase">Reviews</h1>
                <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="outline-none border rounded p-2 w-full sm:w-1/3 shadow hover:shadow-lg"
                />
            </div>

            <div className="bg-white rounded-lg shadow-md w-full" style={{ height: 450 }}>
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

export default ReviewsTable;
