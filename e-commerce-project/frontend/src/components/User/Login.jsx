import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    const redirect = location.search ? location.search.split("=")[1] : "account";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Login | E-commerce Final" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* Sidebar column */}
                    <FormSidebar
                        title="Login"
                        tag="Get access to your Orders, Wishlist, and Recommendations"
                    />

                    {/* Login column */}
                    <div className="flex-1 overflow-hidden">
                        <div className="text-center py-10 px-4 sm:px-14">
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">
                                            By continuing, you agree to our{" "}
                                            <a href="/terms" className="text-primary-blue">
                                                Terms of Use
                                            </a>{" "}
                                            and{" "}
                                            <a href="/privacy" className="text-primary-blue">
                                                Privacy Policy
                                            </a>.
                                        </p>
                                        <button
                                            type="submit"
                                            className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
                                        >
                                            Login
                                        </button>
                                        <Link
                                            to="/password/forgot"
                                            className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                            <Link to="/register" className="font-medium text-sm text-primary-blue">
                                New here? Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
