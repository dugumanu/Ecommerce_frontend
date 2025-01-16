import React, { useState } from 'react';

function OrderOnDemand() {
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up visibility
  const contactNumber = "+1234567890"; // Replace with your contact number
  const contactEmail = "support@example.com"; // Replace with your email

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    setShowPopup(true); // Show the pop-up notification
  };

  // Close the pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order on Demand</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Can't find what you're looking for? Contact us, and we'll arrange it for you!
      </p>

      {/* Contact Information */}
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
        <div className="flex items-center mb-4">
          <span className="font-semibold text-gray-600">Phone:</span>
          <a
            href={`tel:${contactNumber}`}
            className="ml-2 text-blue-500 hover:underline"
          >
            {contactNumber}
          </a>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-600">Email:</span>
          <a
            href={`mailto:${contactEmail}`}
            className="ml-2 text-blue-500 hover:underline"
          >
            {contactEmail}
          </a>
        </div>
      </div>

      {/* Order Form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Submit Your Order Request
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-600 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="product" className="block font-medium text-gray-600 mb-1">
              Product Details
            </label>
            <textarea
              id="product"
              placeholder="Describe the product you want to order..."
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green text-white rounded-md py-2 hover:bg-blue-600 transition"
          >
            Submit Request
          </button>
        </form>
      </div>

      {/* Pop-up Notification */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Feature Not Available
            </h2>
            <p className="text-gray-600 mb-4">
              This feature is currently not working. Please contact us directly using the phone or email provided above.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-green text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderOnDemand;
