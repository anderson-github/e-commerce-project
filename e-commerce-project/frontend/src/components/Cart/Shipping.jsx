import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || '');
    const [city, setCity] = useState(shippingInfo.city || '');
    const [country] = useState('IN'); // Country is fixed as India
    const [state, setState] = useState(shippingInfo.state || '');
    const [pincode, setPincode] = useState(shippingInfo.pincode || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || '');

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length !== 10) {
            enqueueSnackbar('Invalid Phone Number', { variant: 'error' });
            return;
        }

        dispatch(saveShippingInfo({ address, city, country, state, pincode, phoneNo }));
        navigate('/order/confirm');
    };

    return (
        <>
            <MetaData title="Shipping Details | Flipkart" />
            <main className="w-full mt-20">
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden">
                    {/* Shipping Form */}
                    <div className="flex-1">
                        <Stepper activeStep={1}>
                            <div className="w-full bg-white">
                                <form
                                    onSubmit={shippingSubmit}
                                    autoComplete="off"
                                    className="flex flex-col gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4"
                                >
                                    <TextField
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                        required
                                    />

                                    <div className="flex gap-6">
                                        <TextField
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            type="number"
                                            label="Pincode"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            value={phoneNo}
                                            onChange={(e) => setPhoneNo(e.target.value)}
                                            type="number"
                                            label="Phone No"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-6">
                                        <TextField
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            required
                                        />
                                        <TextField
                                            label="Landmark (Optional)"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </div>

                                    <div className="flex gap-6">
                                        <FormControl fullWidth>
                                            <InputLabel id="country-select">Country</InputLabel>
                                            <Select
                                                labelId="country-select"
                                                id="country-select"
                                                value={country}
                                                disabled
                                            >
                                                <MenuItem value="IN">India</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <InputLabel id="state-select">State</InputLabel>
                                            <Select
                                                labelId="state-select"
                                                id="state-select"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                            >
                                                {states.map((item) => (
                                                    <MenuItem key={item.code} value={item.code}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none"
                                    >
                                        Save and Deliver Here
                                    </button>
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    {/* Price Sidebar */}
                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Shipping;
