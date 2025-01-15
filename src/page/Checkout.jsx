import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/operations/product';
import PriceComponent from '../component/common/Price';
import { useDispatch, useSelector } from 'react-redux';
import { buy } from '../services/operations/order';
import { all } from 'axios';
import { toast } from 'react-toastify';

export default function Checkout() {
  const location = useLocation();
  const { productId, byCart, totalAmount = 0, totalDiscount = 0 } = location.state || {};
  const [allId, setAllId] = useState([]);
  const [productData, setProductData] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [products, setProducts] = useState([]);  // To store product data for all IDs

  const { token } = useSelector((state) => state.auth);

  // Fetch product details if not in cart
  const fetchProductDetails = async () => {
    try {
      const response = await fetchProductById(productId);
      setProductData(response);
    } catch (error) {
      console.error('Error fetching product: ', error);
    }
  };

  const fetchProductsByIds = async () => {
    try {
      // Fetch products for each ID in allId
      const fetchedProducts = await Promise.all(
        allId.map(async (id) => {
          const response = await fetchProductById(id);
          return response;  // Store product data for each ID
        })
      );
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    if (!byCart && productId) {
      fetchProductDetails();
    }
    // Set all product IDs if byCart is true
    if (byCart) {
      setAllId(location.state?.productId || []);
    } else {
      setAllId([productData?._id]);
    }

    console.log("All Id", allId, productData?._id)
  }, [productId, byCart, location.state?.allId]);

  useEffect(() => {
    if (byCart && allId.length > 0) {
      fetchProductsByIds();
    }
  }, [byCart, allId]);

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handlePlaceOrder = async () => {
    const orderData = {
      allId,
      byCart,
      productData,
      deliveryAddress,
      paymentMethod,
    };
  
    console.log('Order Data:', orderData);
    setLoading(true); 
  
    try {
      const response = await buy(orderData, token); 
      if (response.success) {
        toast.success("Orderd Placed")
        setLoading(false); 
        navigate("/dashboard/order")
      } else {
        setLoading(false);
        console.error("Order failed:", response.message);
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      setLoading(false); 
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      {/* Page Header */}
      <div className="w-full max-w-4xl p-4 bg-white rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white rounded-md shadow-md p-6 grid gap-8">
        {/* Delivery Address */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Delivery Address</h2>
          <form className="grid gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={deliveryAddress.fullName}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={deliveryAddress.address}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="City"
              value={deliveryAddress.city}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={deliveryAddress.postalCode}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500"
            />
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
          {byCart ? (
            products.map((product) => (
              <div key={product.id} className="flex gap-4 items-center">
                <img
                  src={product?.image?.[0]}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{product?.name}</p>
                  <p className="text-gray-600">₹ {product?.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex gap-4 items-center">
              <img
                src={productData?.image?.[0]}
                alt={productData?.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-gray-800 font-semibold">{productData?.name}</p>
                <p className="text-gray-600">₹ {productData?.price}</p>
              </div>
            </div>
          )}
        </div>

        {/* Payment Option */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Option</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-green-500 focus:ring-green-500"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Price Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Details</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-gray-600">
              <span>Total Price</span>
              <span>
                <PriceComponent amount={byCart ? totalAmount + totalDiscount : productData?.originalPrice} />
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>
                <PriceComponent
                  amount={byCart ? totalDiscount : (productData?.originalPrice - productData?.price)?.toFixed(2)}
                />
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span>₹ 0</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>
                <PriceComponent amount={byCart ? totalAmount : productData?.originalPrice} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="w-full max-w-4xl flex justify-end mt-6">
        <button
          onClick={handlePlaceOrder}
          className="bg-green text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition-all"
        >
          {
            loading ? "Ordering ..." : "Place Order"
          }
        </button>
      </div>
    </div>
  );
}
