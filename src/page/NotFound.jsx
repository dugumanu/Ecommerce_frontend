// src/Page/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
// import notFoundImage from '../assets/not-found.jpg'; // Ensure you have an image in your assets

const NotFound = () => {
    return (
        <div className="not-found-container  flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
            {/* <img
                src={notFoundImage}
                alt="Not Found"
                className="w-full max-w-md h-auto mb-4"
            /> */}
            <h1 className="text-[55px] font-bold animate-bounce">404</h1>
            <p className="text-3xl mt-4">Oops! Page Not Found.</p>
            <p className="text-lg mt-2 text-center">
                The page you are looking for does not exist.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;