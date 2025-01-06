import React, { useState, useEffect } from 'react';
import { getMyOrder } from '../services/operations/order';
import { useSelector } from 'react-redux';
import OrderList from '../component/MyOrder/OrderList';

export default function MyOrder() {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await getMyOrder(token);
      if (response.success) {
        setOrderData(response.order);
      } else {
        console.error("Failed to fetch orders:", response.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl ">
        {loading ? (
          <div className="text-center text-gray-600">Loading orders...</div>
        ) : orderData && orderData.length > 0 ? (
          <OrderList orders={orderData} />
        ) : (
          <div className="text-center text-gray-600">No orders found.</div>
        )}
      </div>
    </div>
  );
}
