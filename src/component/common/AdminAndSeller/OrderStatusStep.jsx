import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function OrderStatusStep({ productId, paymentId, currentStatus = "pending" }) {
  const steps = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Shipped" },
    { id: 3, name: "Delivered" },
    { id: 4, name: "Cancelled" },
  ];

  const { profileData } = useSelector((state) => state.auth);
  const role = profileData?.role;

  const [selectedStep, setSelectedStep] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");

  const currentStepIndex = steps.findIndex(
    (step) => step.name.toLowerCase() === currentStatus.toLowerCase()
  );

  const handleStepClick = (step) => {
    if (role === 'customer' && step.name !== 'Cancelled') {
      return; 
    }
    setSelectedStep(step);
    setShowModal(true); 
  };

  const handleConfirm = () => {
    console.log(`Status updated to: ${selectedStep.name}`);
    if (selectedStep.name === "Delivered") {
      console.log(`Payment Status: ${paymentStatus}`);
    }
    
    setShowModal(false);
  };

  const handleCancel = () => {
    setSelectedStep(null);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <button
                className={`rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold cursor-pointer
                  ${index <= currentStepIndex ? 'bg-green text-white' : 'bg-gray-300 text-black'}
                  ${role === 'customer' && step.name !== 'Cancelled' ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => handleStepClick(step)}
                disabled={role === 'customer' && step.name !== 'Cancelled'}
              >
                {index + 1}
              </button>
              <div
                className={`mt-2 text-xs ${
                  index <= currentStepIndex ? 'text-green font-semibold' : 'text-gray-500'
                }`}
              >
                {step.name}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStepIndex ? 'bg-green' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p className="text-sm mb-4">
              Are you sure you want to update the status to{' '}
              <span className="font-bold">{selectedStep?.name}</span>?
            </p>

            {/* Payment Status Selection */}
            {selectedStep?.name === "Delivered" && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Payment Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="Paid">Paid</option>
                  <option value="Not Paid">Not Paid</option>
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-green text-white px-4 py-2 rounded-md"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
