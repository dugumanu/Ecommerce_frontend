import React, { useEffect, useState } from 'react'; 
import { fetchAllCategories } from '../../services/operations/category';
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchProductByCategoryId, fetchForYouProducts } from '../../services/operations/product'; 
import { setProductData, setBanner, setCategory } from '../../slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; 
const FORYOU = require("../../assets/award_star.png");

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);  
    const [selectedCategory, setSelectedCategory] = useState(1); 
    const { productData } = useSelector((state) => state.product);
    const categoriesPerPage = 6; 
    const dispatch = useDispatch();

    const fetchCategory = async () => {
        try {
            const result = await fetchAllCategories();
            setCategories(result || []); // Ensure fallback to an empty array if result is null or undefined
        } catch (error) {
            console.log("Error in fetching categories: ", error);
            setCategories([]); // Set to an empty array if an error occurs
        }
    };

    const fetchProductDetails = async(selectedCategory) => {
        try {
            const response = await fetchProductByCategoryId(selectedCategory);
            dispatch(setBanner(response[0]?.banner || null)); // Safeguard for null or undefined response
            dispatch(setProductData(response[0]?.products || [])); // Safeguard for null or undefined products
        } catch (error) {
            console.log("Error in fetching product by category: ", error);
        }
    };

    const fetchForYouProductDetails = async () => {
        try {
            const response = await fetchForYouProducts(); 
            dispatch(setBanner(null));
            dispatch(setProductData(response || [])); // Safeguard for null or undefined response
        } catch (error) {
            console.log("Error in fetching products for you: ", error);
        }
    };

    useEffect(() => {
        fetchCategory(); 
        fetchForYouProductDetails(); 
    }, []); 

    useEffect(() => {
        if (selectedCategory !== 1) {
            fetchProductDetails(selectedCategory);
        } else {
            fetchForYouProductDetails();
        }
    }, [selectedCategory]); 

    const loadNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const loadPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-row p-5 gap-5 overflow-x-auto scroll-smooth no-scrollbar items-center justify-between md:justify-center'>
                {/* "Previous" button */}
                <div onClick={loadPrevious}>
                    <div className="flex justify-center items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-white cursor-pointer">
                        <FiArrowLeft style={{ width: "30px", height: "30px" }} />
                    </div>
                    <p className="text-center text-white font-bold mt-2 md:text-base text-sm">Previous</p>
                </div>

                {/* "For You" section */}
                <div 
                    className='flex flex-col justify-center items-center rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer' 
                    onClick={() => {
                        setSelectedCategory(1);
                        dispatch(setCategory("For You"));
                    }} 
                >  
                    <div className={`flex justify-center items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full p-4 ${selectedCategory === 1 ? "bg-green" : "bg-white"}`}>
                        <img 
                            src={FORYOU} 
                            alt='for you'
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                    <p className='text-white font-bold text-center mt-2 md:text-base text-sm'>For You</p>
                    {selectedCategory === 1 && <div className="arrow"></div>}
                </div>
                
                {/* Displaying categories or fallback message */}
                {
                    categories.length > 0 ? (
                        categories.slice(currentIndex, currentIndex + categoriesPerPage).map((data) => (
                            <div 
                                 className='flex flex-col justify-center items-center rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer' 
                                onClick={() => {
                                    setSelectedCategory(data._id);
                                    dispatch(setCategory(data.name));
                                }}
                                key={data.id}
                            >  
                                <div className={`flex justify-center items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full p-4 ${selectedCategory === data._id ? "bg-green" : "bg-white"}`}>
                                    {data.image ? (
                                        <img 
                                            src={data.image} 
                                            alt={data.name} 
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#333',
                                                fontSize: '12px',
                                                border: '1px solid #ccc',
                                            }}
                                        >
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                <p className='text-white font-bold text-center mt-2 md:text-base text-sm'>{data.name}</p>
                                {selectedCategory === data._id && <div className="arrow"></div>}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-white font-bold">No categories available</p>
                    )
                }

                {/* "Next" (More) button */}
                <div onClick={loadNext}>
                    <div className="flex justify-center items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-white cursor-pointer">
                        <FiArrowRight style={{ width: "30px", height: "30px" }} />
                    </div>
                    <p className="text-center text-white font-bold mt-2 md:text-base text-sm">More</p>
                </div>
            </div>
        </div>
    );
}
