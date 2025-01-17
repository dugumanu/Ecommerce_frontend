import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
            {/* Optional: Add an image here if required */}
            <h1 className="text-[55px] font-bold">404</h1>
            <p className="text-3xl mt-4">Oops! Page Not Found.</p>
            <p className="text-lg mt-2 text-center">
                The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
