import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingBag, MdRemoveShoppingCart } from "react-icons/md";
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import PriceComponent from '../common/Price';

export default function CategoryProduct() {
    const { banner, productData, selectedCategory } = useSelector((state) => state.product);
    const { cart } = useSelector((state) => state.cart);

    const [visibleProducts, setVisibleProducts] = useState(10);

    useEffect(() => {
        //console.log("Product : ", productData);
    }, [productData]);

    const placeholderImage = "https://via.placeholder.com/150";

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 6);
    };

    const dispatch = useDispatch();

    const handleAddToCart = (data) => {
        const isProductInCart = cart.find(item => item._id === data._id);
        if (isProductInCart) {
            dispatch(removeFromCart(data));
            //console.log('Removed from cart: ', data);
        } else {
            dispatch(addToCart(data));
            //console.log('Added to cart: ', data);
        }
    }

    const isInCart = (productId) => {
        return cart.some(item => item._id === productId);
    }

    return (
        <div className='flex mt-[3%] w-full md:px-[13%] flex-col justify-center items-center'>
            {/* Banner Section */}
            <div className='flex w-full flex-col justify-center items-center'>
                <div className='w-[95%] flex flex-col justify-center items-center'>
                    {banner && (
                        <div className='w-[100%] flex flex-col justify-start items-start gap-5'>
                            <p className='font-bold text-[24px]'>Deals for you</p>
                            <img className='rounded-xl w-full h-full bg-cover' src={banner} alt="Banner" />
                        </div>
                    )}
                </div>
            </div>

            {/* Product Section */}
            <div className='flex mt-[3%] flex-col justify-center items-center'>
                {productData ? (
                    <div className='flex gap-5 flex-col justify-center items-start'>
                        <p className='font-bold md:text-left text-center text-[24px]'>Choose what you are looking for</p>
                        <div className='grid place-content-center grid-cols-2 md:grid-cols-3 gap-6 w-full'>
                            {productData.slice(0, visibleProducts).map((data) => (
                                <div
                                    className='flex flex-col w-[180px] md:w-[250px] p-2 md:p-4 border rounded-lg shadow-md bg-white'
                                    key={data?._id}
                                >
                                    {/* Image Section */}
                                    <div className='relative w-full h-[200px] flex justify-center items-center overflow-hidden bg-gray-100 border rounded-lg'>
                                        <button
                                            onClick={() => handleAddToCart(data)}
                                            className='absolute hover:text-white transition-all duration-400 right-[5%] bg-gray-400 p-2 rounded-full hover:bg-green top-[5%]'
                                        >
                                            {isInCart(data._id)
                                                ? <MdRemoveShoppingCart style={{ width: "23px", height: "23px" }} />
                                                : <MdOutlineShoppingBag style={{ width: "23px", height: "23px" }} />}
                                        </button>
                                        <Link
                                            onClick={() => window.scrollTo(0, 0)}
                                            to={`/product/${selectedCategory}/${data.name}/${data?._id}`}
                                        >
                                            <img
                                                loading='lazy'
                                                className='w-full h-full object-contain'
                                                src={data?.image?.length > 0 ? data.image[0] : placeholderImage}
                                                alt={data?.name}
                                            />
                                        </Link>
                                    </div>

                                    {/* Info Section */}
                                    <div className='p-2 text-center'>
                                        <p className='text-[16px] font-bold truncate'>{data?.name}</p>
                                        <p className='text-[14px] font-medium text-[#949494] truncate'>{data?.about?.slice(0, 20) || ""}...</p>
                                        <p className='text-[14px] font-medium text-[#949494]'>{data?.state}</p>
                                        <p className='text-[16px] font-bold mt-1'>
                                            <PriceComponent amount={data?.price} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleProducts < productData.length && (
                            <div className='w-full flex flex-col justify-center items-center mt-4'>
                                <button className='bg-gray-500 p-3 rounded-lg text-white' onClick={loadMoreProducts}>
                                    View More
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>No Product available for this category</p>
                )}
            </div>
        </div>
    );
}
