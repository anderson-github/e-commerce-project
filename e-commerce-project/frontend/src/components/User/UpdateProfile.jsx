import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../Layouts/MetaData';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);

        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        // if (error) {
        //     enqueueSnackbar(error, { variant: "error" });
        //     dispatch(clearErrors());
        // }
        // if (isUpdated) {
        //     enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
        //     dispatch(loadUser());
        //     navigate('/account');
        //     dispatch({ type: UPDATE_PROFILE_RESET });
        // }
    }, [dispatch, error, user, isUpdated, navigate]);

    return (
        <>
            <MetaData title="Update Profile | Simplified" />
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Profile</h2>
                        <form
                            onSubmit={updateProfileHandler}
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col w-full gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Update</button>
                                <Link className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium" to="/account">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdateProfile;
