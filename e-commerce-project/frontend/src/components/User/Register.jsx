import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import MetaData from '../Layouts/MetaData';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();

    const { isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const { name, email, gender, password, cpassword } = user;

    const handleRegister = (e) => {
        e.preventDefault();
        // if (password.length < 8) {
        //     enqueueSnackbar("Password length must be at least 8 characters", { variant: "warning" });
        //     return;
        // }
        // if (password !== cpassword) {
        //     enqueueSnackbar("Password Doesn't Match", { variant: "error" });
        //     return;
        // }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);

        dispatch(registerUser(formData));
    };

    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error, { variant: "error" });
    //         dispatch(clearErrors());
    //     }
    //     if (isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register | Simplified" />
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    <div className="flex-1 overflow-hidden">
                        <form onSubmit={handleRegister} className="p-5 sm:p-10">
                            <div className="flex flex-col gap-4 items-start">
                                <div className="flex flex-col w-full gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                                <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;
