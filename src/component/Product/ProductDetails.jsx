import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { fetchProductById } from '../../services/operations/product';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from '../common/Button';
import { CiShoppingCart } from "react-icons/ci";
import { GrDeliver } from "react-icons/gr";
import { BiSolidOffer } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import CategoryProduct from '../HomePage/CategoryProduct';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData as setproduct } from '../../slices/productSlice';
import { searchAll } from '../../services/operations/search';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import PriceComponent from '../common/Price';

export default function ProductDetail() {
  const [productData, setProductData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { productId, productCategory, productName } = useParams();
  const decodedProductCategory = decodeURIComponent(productCategory);
  const decodedProductName = decodeURIComponent(productName);

  const { productData: product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      const response = await fetchProductById(productId);
      setProductData(response);
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  };

  // Call the fetch function when productId changes
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Set default selected image index to 0 after productData is fetched
  useEffect(() => {
    if (productData?.image && productData.image.length > 0) {
      setSelectedIndex(0);
    }
  }, [productData]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await searchAll(productCategory);
        dispatch(setproduct(response));
      } catch (error) {
        console.error("Error searching products: ", error);
      }
    };
    searchProducts();
  }, [productCategory, dispatch]);

  // Handle left and right navigation
  const handleNextImage = () => {
    if (productData?.image) {
      setSelectedIndex((selectedIndex + 1) % productData.image.length);
    }
  };

  const handlePrevImage = () => {
    setSelectedIndex((selectedIndex - 1 + productData?.image.length) % productData.image.length);
  };

  // Check if the product is in the cart
  const isInCart = cart.some(item => item._id === productData?._id);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (productData) {
      dispatch(addToCart(productData));
    }
  };


  const handleRemoveFromCart = () => {
    if (productData) {
      dispatch(removeFromCart(productData));
    }
  };

  const buyNowHandler = (id) => {
    
    navigate("/checkout", {
      state: {
        productId: id,
        byCart : false
      }
    })
  }

  return (
    <>
      <div className='w-full flex flex-col gap-3 justify-start items-start mt-[5%] mx-[5%] md:mx-[13%]'>
        <Link className='flex gap-2 text-[20px] justify-center items-center font-bold' to="/">
          <IoArrowBackOutline />
          <p>{decodedProductCategory}/{decodedProductName}</p>
        </Link>
        
        {/* Product details */}
        <div className='h-full mt-[2%] flex flex-col md:flex-row w-full justify-between items-start'>
          {/* Left section */}
          <div className='w-full md:w-[70%] flex md:flex-row flex-col-reverse justify-center items-start gap-2 md:gap-4'>
            <div className='md:w-[10%] w-[80%] grid md:grid-cols-1 grid-cols-5 justify-center gap-2'>
              {productData?.image && productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index}`}
                  style={{
                    cursor: "pointer",
                    border: selectedIndex === index ? "2px solid blue" : "none",
                    height: `${400 / productData.image.length}px`,
                    objectFit: "contain"
                  }}
                  onClick={() => setSelectedIndex(index)}
                  className='w-full h-auto'
                />
              ))}
            </div>

            <div className='md:w-[85%] w-full p-4 flex flex-col justify-center items-center'>
              <div className='flex flex-row w-[80%] justify-center items-center'>
                <button onClick={handlePrevImage} style={{ marginRight: '10px', cursor: 'pointer' }}>
                  <FaAngleLeft />
                </button>

                {productData?.image && (
                  <img className='w-full h-[400px] object-contain' src={productData.image[selectedIndex]} alt="Selected product" />
                )}

                <button onClick={handleNextImage} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className='w-full md:w-[70%] flex flex-col md:justify-start gap-5 md:items-start items-start justify-center'>
            {/* <p className='text-[16px]'>Rating: {productData?.rating}</p> */}
            <p className='font-bold text-[22px]'>{productData?.name}</p>
            <div className='flex flex-row items-start justify-start gap-6'>
              <p className='md:text-[28px] text-[22px] font-bold text-green'> <PriceComponent amount={productData?.price} />  </p>
              <p className='md:text-[22px] text-gray-500 text-[18px] line-through'> <PriceComponent amount={productData?.originalPrice} /> </p>
            </div>

            {productData?.discount && (
              <div className="md:w-[40%] w-[80%] bg-red-500 text-white p-4 rounded-md flex justify-between items-center mb-4">
                <p className='font-bold text-lg'>Discount:   <PriceComponent amount={(productData.originalPrice - productData.price).toFixed(2)} /> </p>
                <span className='bg-white text-red-500 rounded-full px-3 py-1 font-semibold'>
                  {productData.discount.toFixed(2)}% OFF
                </span>
              </div>
            )}

            <div className='flex gap-4'>
              {isInCart ? (
                <button onClick={handleRemoveFromCart} className='bg-green px-8 flex flex-row justify-center items-center text-white text-[16px] p-2 font-semibold rounded-lg gap-2 hover:bg-red-700 shadow-xl transition-all duration-600'>
                  Remove from Cart
                </button>
              ) : (
                <button onClick={handleAddToCart} className='bg-[#D9D9D9] px-8 flex flex-row justify-center items-center text-green text-[16px] p-2 font-semibold rounded-lg gap-2 hover:bg-green hover:text-white shadow-xl transition-all duration-600'>
                  <CiShoppingCart style={{ width: "25px", height: "25px" }} /> Add to Cart
                </button>
              )}
              <Button onClick={() => buyNowHandler(productId)} content="Buy Now" icon="CiBookmark" />

            </div>
          </div>
        </div>
      </div>

      {/* Delivery, Offer, and Non-returnable Section */}
      <div className='flex px-[5%] mt-[2%] md:px-[13%] w- flex-col md:flex-row justify-between items-center'>
        <div className='flex justify-center items-center gap-3'>
          <GrDeliver className='text-green' style={{ width: "25px", height: "25px" }} />
          <div className='flex justify-center items-start flex-col'>
            <p className='text-green font-semibold text-[16px]'>Free Delivery</p>
            <p className='text-gray-500'>Apply to all orders over ₹400</p>
          </div>
        </div>
        
        <div className='flex justify-center items-center gap-3'>
          <BiSolidOffer className='text-green' style={{ width: "25px", height: "25px" }} />
          <div className='flex justify-center items-start flex-col'>
            <p className='text-green font-semibold text-[16px]'>Limited Offer</p>
            <p className='text-gray-500'>Don't miss this limited time offer</p>
          </div>
        </div>
        
        <div className='flex justify-center items-center gap-3'>
          <ImCancelCircle className='text-green' style={{ width: "25px", height: "25px" }} />
          <div className='flex justify-center items-start flex-col'>
            <p className='text-green font-semibold text-[16px]'>Non-returnable</p>
            <p className='text-gray-500'>This product is non-returnable</p>
          </div>
        </div>
      </div>
      <div className='flex px-[5%] mt-[2%] md:px-[13%] flex-col justify-center items-start gap-3'>
  <p className='text-2xl font-semibold text-gray-800'>About the product</p>
  {productData?.about && (
    <p className='text-gray-700 text-base leading-relaxed'>
      {productData?.about}
    </p>
  )}
</div>


    
      <div className='w-full mt-[3%] flex flex-col justify-center items-center'>
        <CategoryProduct title="Similar Products" categoryProducts={product} />
      </div>
    </>
  );
}
