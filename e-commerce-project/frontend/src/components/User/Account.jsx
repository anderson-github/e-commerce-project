import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const Account = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user?.name?.split(' ');
        return nameArray?.length > 1 ? nameArray[nameArray.length - 1] : '';
    };

    return (
        <>
            <MetaData title="My Profile | E-commerce Final" />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <Sidebar activeTab="profile" />

                            {/* Details Column */}
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    {/* Personal Information */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">
                                            Personal Information{' '}
                                            <Link
                                                to="/account/update"
                                                className="text-sm text-primary-blue font-medium ml-8 cursor-pointer"
                                            >
                                                Edit
                                            </Link>
                                        </span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed">
                                                <label className="text-xs text-gray-500">First Name</label>
                                                <input
                                                    type="text"
                                                    value={user?.name?.split(' ', 1)}
                                                    className="text-sm outline-none border-none text-gray-500"
                                                    disabled
                                                />
                                            </div>
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed">
                                                <label className="text-xs text-gray-500">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={getLastName()}
                                                    className="text-sm outline-none border-none text-gray-500"
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-sm">Your Gender</h2>
                                            <div className="flex items-center gap-8">
                                                <div className="flex items-center gap-4 text-gray-500 cursor-not-allowed">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        checked={user?.gender === 'male'}
                                                        id="male"
                                                        className="h-4 w-4 cursor-not-allowed"
                                                        disabled
                                                    />
                                                    <label htmlFor="male" className="cursor-not-allowed">
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-4 text-gray-500 cursor-not-allowed">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        checked={user?.gender === 'female'}
                                                        id="female"
                                                        className="h-4 w-4 cursor-not-allowed"
                                                        disabled
                                                    />
                                                    <label htmlFor="female" className="cursor-not-allowed">
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Address */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">
                                            Email Address
                                            <Link
                                                to="/account/update"
                                                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to="/password/update"
                                                className="text-sm text-primary-blue font-medium ml-3 sm:ml-8"
                                            >
                                                Change Password
                                            </Link>
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed">
                                                <label className="text-xs text-gray-500">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={user?.email}
                                                    className="text-sm outline-none border-none text-gray-500"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Number */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Mobile Number</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed">
                                                <label className="text-xs text-gray-500">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    value={user?.phone || 'N/A'}
                                                    className="text-sm outline-none border-none text-gray-500"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* FAQs */}
                                    <div className="flex flex-col gap-4 mt-4">
                                        <span className="font-medium text-lg mb-2">FAQs</span>
                                        <h4 className="text-sm font-medium">
                                            What happens when I update my email address (or mobile number)?
                                        </h4>
                                        <p className="text-sm">
                                            Your login email or mobile number changes, and you will receive all account-related
                                            communication on the updated email or mobile.
                                        </p>
                                    </div>

                                    <Link className="text-sm text-primary-blue font-medium" to="/">
                                        Deactivate Account
                                    </Link>
                                </div>
                                <img
                                    draggable="false"
                                    className="w-full object-contain"
                                    src="/assets/images/account-footer.png"
                                    alt="footer"
                                />
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default Account;
