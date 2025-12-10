import React from 'react';
import { FaBus } from 'react-icons/fa';
    
const Logo = () => {
    return (
        <div className='flex gap-2 items-center'>
            <FaBus className='text-secondary w-5 h-5 md:w-6 md:h-6 lg:h-7 lg:w-7 '/> 
            <span className='logo text-xl  md:text-2xl lg:text-3xl font-extrabold bg-[linear-gradient(30deg,#44c781,#d53f3fe6)]
 text-transparent bg-clip-text'>TicketBari</span>
        </div>
    );
};

export default Logo;