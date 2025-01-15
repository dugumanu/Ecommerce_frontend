import React from "react";
import { useNavigate } from "react-router-dom";
import PriceComponent from "../common/Price";
import { useSelector } from "react-redux";
import OrderStatusStep from "../common/AdminAndSeller/OrderStatusStep";

export default function OrderList({ orders }) {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    const productCategory = product?.categoryId?.name;
    const productName = product?.name;
    navigate(`/product/${productCategory}/${productName}/${product._id}`);
  };

  const {profileData} = useSelector((state) => state.auth)

  const role = profileData?.role

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
          >
            {/* Order Header */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Order #{index + 1} - {order.status.toUpperCase()}
              </h2>
              <p className="text-gray-600 text-sm">
                Order ID: <span className="font-mono">{order._id}</span>
              </p>
            </div>

            {/* Product Info */}
            <div
              className="flex items-start gap-4 mb-4 cursor-pointer"
              onClick={() => handleProductClick(order.productId)}
            >
              <img
                src={order?.productId?.image[0]}
                alt={order?.productId?.name}
                className="w-20 h-20 object-cover rounded-md border border-gray-200"
              />
              <div>
                <h3 className="font-semibold text-gray-800 hover:underline">
                  {order?.productId?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <PriceComponent amount={order?.productId?.price} />   ({order?.quantity} item)
                </p>
                <p className="text-sm text-gray-500">
                  Category: {order?.productId?.categoryId?.name}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-4">
              <h4 className="text-gray-700 font-semibold">Delivery Address:</h4>
              <p className="text-sm text-gray-600">
                {order.deliveryAddress.fullName}, {order.deliveryAddress.address},{" "}
                {order.deliveryAddress.city}, {order.deliveryAddress.postalCode}
              </p>
            </div>

            {/* Price and Status */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-700">
                Total Price:  <PriceComponent amount={order.price} />
              </p>
              <p
                className={`text-sm font-semibold ${
                  order.paymentStatus?.paymentStatus === "notPaid"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                Payment Status: {order.paymentStatus?.paymentStatus || "N/A"}
              </p>

              
            </div>
            
      
          <OrderStatusStep orderId = {order?._id} paymentId = {order?.paymentStatus?._id} currentStatus={order?.status} />
        
      
          </div>
        ))}

        
      </div>
    
    </div>
  );
}
