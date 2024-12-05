import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successImage from '../../assets/images/Transaction/success.png';
import failedImage from '../../assets/images/Transaction/failed.png';

const OrderSuccess = ({ success }) => {
    const navigate = useNavigate();
    const [time, setTime] = useState(3);

    useEffect(() => {
        if (time === 0) {
            navigate(success ? "/orders" : "/cart");
            return;
        }
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time, navigate, success]);

    return (
        <>
            <MetaData title={`Transaction ${success ? "Successful" : "Failed"}`} />

            <main className="w-full mt-20">
                {/* <!-- row --> */}
                <div className="flex flex-col gap-4 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">
                    <img
                        draggable="false"
                        className="w-1/2 h-60 object-contain"
                        src={success ? successImage : failedImage}
                        alt={`Transaction ${success ? "Successful" : "Failed"}`}
                    />
                    <h1 className="text-2xl font-semibold">
                        Transaction {success ? "Successful" : "Failed"}
                    </h1>
                    <p className="mt-4 text-lg text-gray-800">
                        Redirecting to {success ? "orders" : "cart"} in {time} seconds...
                    </p>
                    <Link
                        to={success ? "/orders" : "/cart"}
                        className="bg-primary-blue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm"
                    >
                        Go to {success ? "Orders" : "Cart"}
                    </Link>
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default OrderSuccess;
