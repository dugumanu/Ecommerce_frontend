import React from 'react';
import * as ICON from "react-icons/ci";

export default function Button({ content, icon, onClick }) {
    const IconComponent = ICON[icon];

    return (
        <div className=' flex justify-center items-center ' >
            <button className='flex flex-row justify-center items-center md:px-6 shadow-xl p-2 bg-green rounded-lg text-white  gap-2' onClick={onClick}>
                <IconComponent style={{width:"25px", height:"25px"}} /> {content}
            </button>
        </div>
    );
}
