import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const NewProduct = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [brand, setBrand] = useState('');
    const [highlights, setHighlights] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [logo, setLogo] = useState('');
    const [logoPreview, setLogoPreview] = useState('');

    const handleHighlightsChange = (highlight) => {
        if (!highlight.trim()) return;
        setHighlights([...highlights, highlight]);
    };

    const handleSpecificationsChange = (title, description) => {
        if (!title.trim() || !description.trim()) return;
        setSpecifications([...specifications, { title, description }]);
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                    setImages((prev) => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setLogoPreview(reader.result);
                setLogo(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('price', price);
        formData.set('cuttedPrice', cuttedPrice);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('warranty', warranty);
        formData.set('brand', brand);
        formData.set('logo', logo);

        images.forEach((image) => formData.append('images', image));
        highlights.forEach((highlight) => formData.append('highlights', highlight));
        specifications.forEach((spec) => formData.append('specifications', JSON.stringify(spec)));

        dispatch(createProduct(formData));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar('Product created successfully!', { variant: 'success' });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate('/admin/products');
        }
    }, [dispatch, error, success, enqueueSnackbar, navigate]);

    return (
        <>
            <MetaData title="Nuevo Producto | Panel Administrador" />
            {loading && <BackdropLoader />}
            <form
                onSubmit={submitHandler}
                className="bg-white shadow rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
                encType="multipart/form-data"
            >
                <div className="space-y-4">
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Discounted Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            label="Warranty"
                            type="number"
                            variant="outlined"
                            required
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                        />
                        <TextField
                            select
                            label="Category"
                            variant="outlined"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {['Electronics', 'Fashion', 'Home Appliances'].map((cat, idx) => (
                                <MenuItem key={idx} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="space-y-4">
                    <TextField
                        label="Brand"
                        variant="outlined"
                        fullWidth
                        required
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {imagesPreview.map((img, idx) => (
                            <img key={idx} src={img} alt="Preview" className="object-cover h-20 w-20" />
                        ))}
                        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            Upload Images
                            <input type="file" multiple hidden onChange={handleImagesChange} />
                        </label>
                    </div>
                    <div>
                        <label className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                            Upload Logo
                            <input type="file" hidden onChange={handleLogoChange} />
                        </label>
                        {logoPreview && <img src={logoPreview} alt="Logo Preview" className="h-16 mt-4" />}
                    </div>
                </div>
                <button
                    type="submit"
                    className="col-span-1 sm:col-span-2 bg-green-500 text-white py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default NewProduct;
