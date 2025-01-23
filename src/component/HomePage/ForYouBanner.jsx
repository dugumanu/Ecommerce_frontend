import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { allCategory } = useSelector((state) => state.product);
    const banners = allCategory?.map((category) => category.banner);

    useEffect(() => {
        if (banners?.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, 4000); 

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [banners]);

    if (!banners || banners.length === 0) {
        return <div>No banners available</div>;
    }

    return (
        <div className="w-full overflow-hidden">
        <p className="font-bold text-[24px]">Deals for you</p>
            <div
                className="flex transition-transform duration-1000"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
            
                {banners.map((banner, index) => (
                    <Link
                        key={index}
                        to={`/`}
                        className="w-full shrink-0 flex flex-col items-center justify-center"
                    >
                        <div className="w-full h-[400px] flex flex-col justify-center items-center">
                            {banner && (
                                <div className="w-full flex flex-col justify-start items-start gap-5">
                                    
                                    <img
                                        className="rounded-xl w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
                                        src={banner}
                                        alt="Banner"
                                    />
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
