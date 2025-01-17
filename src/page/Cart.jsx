import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { removeFromCart } from '../slices/cartSlice';
import PriceComponent from '../component/common/Price';

export default function Cart() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(cart.map((item) => item._id));

    const totalDiscount = cart.reduce((discount, item) => {
        if (selectedItem.includes(item._id)) {
          return discount + (item.originalPrice - item.price);
        }
        return discount;
      }, 0);
    // Calculate total price
    const totalPrice = cart.reduce((total, item) => {
        if (selectedItem.includes(item._id)) {
            return total + item.price;
        }
        return total;
    }, 0);

    const isAllSelected = cart.length > 0 && selectedItem.length === cart.length;

    const toggleSelectAll = () => {
        setSelectedItem(isAllSelected ? [] : cart.map((item) => item._id));
    };

    const toggleSelectItem = (id) => {
        setSelectedItem((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id]
        );
    };

    const handleRemoveFromCart = (data) => {
        dispatch(removeFromCart(data)); 
        setSelectedItem((prev) => prev.filter((itemId) => itemId !== data._id));
    };

    if (cart.length === 0) {
        return (
            <div className="text-center mt-8">
                <p className="text-gray-600 text-lg">No items added to the cart.</p>
            </div>
        );
    }

    const buyNowHandler = () => {

        if (!Array.isArray(selectedItem) || selectedItem.length === 0) {
            alert("No products have been selected yet.");
          }
        else {
            navigate("/checkout", {
                state: {
                  productId: selectedItem,
                  byCart : true,
                  totalAmount : totalPrice,
                  totalDiscount: totalDiscount
                }
              })
        }
    }

    return (
        <div className="text-gray-800 p-4 md:px-[8%] flex flex-col w-full">
            <div className="flex flex-col items-center w-full">
                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

                <div className="mb-4">
                    <label className="flex items-center text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                            className="mr-2 h-5 w-5 text-green-500 rounded focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        />
                        Select All
                    </label>
                </div>

                {/* Cart Items */}
                <div className="w-full space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                            <input
                                type="checkbox"
                                checked={selectedItem.includes(item._id)}
                                onChange={() => toggleSelectItem(item._id)}
                                className="h-5 w-5 text-green-500 rounded focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            />
                            <img
                                src={item?.image[0]}
                                alt={item?.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex flex-col flex-grow">
                                <p
                                    onClick={() => navigate(`/product/${item.categoryId?.name}/${item.name}/${item._id}`)}
                                    className="font-bold text-lg text-blue-600 cursor-pointer hover:underline"
                                >
                                    {item.name || "Unnamed Product"}
                                </p>
                                <p className="text-gray-500 text-sm">{item.categoryId?.name || "No Category"}</p>
                                <p className="text-sm">
                                    <span className="line-through text-gray-400 mr-2"> <PriceComponent amount={item.originalPrice} />  </span>
                                    <span className="text-red-600 font-semibold"> <PriceComponent amount={item.price} /> </span>
                                </p>
                                <p className="text-gray-500 text-xs">Discount: {item.discount.toFixed(2)}%</p>
                                <p className="text-gray-500 text-xs">Seller: {item.sellerId?.fullName || "Unknown"}</p>
                                <button
                                    onClick={() => handleRemoveFromCart(item)}
                                    className="text-red-600 mt-2 hover:underline text-sm"
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Price and Buy Now */}
                <div className="mt-6 w-full flex justify-between items-center">
                    <p className="text-xl font-semibold">Total Price: <span className="text-green-600"> <PriceComponent amount={totalPrice} /> </span></p>
                    <button onClick={() => buyNowHandler()} className="bg-green text-white py-2 px-6 rounded-md hover:bg-green-700 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
