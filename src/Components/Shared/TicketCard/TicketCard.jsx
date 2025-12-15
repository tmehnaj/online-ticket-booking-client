import React from 'react';
import { MdDoubleArrow, MdOutlineDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router';

const TicketCard = () => {
    return (
    //    <div className="card scale bg-base-200  max-w-96 h-full hover:shadow-lg shadow-accent-content ce-y-3 justify-self-center">
    //         <figure className="px-1 sm:px-3 md:px-8 pt-6 md:pt-9">
    //             <img
    //                 src=''
    //                 alt="Shoes"
    //                 className="rounded-xl h-[190px] w-[286px] lg:h-[210px] lg:w-[306px] border" />
    //         </figure>
    //         <div className="card-body   sm:px-1 md:px-8 ">
    //             <h3 className="card-title text-dark-blue w-full text-left">title</h3>
                
                   
    //                  <p className='font-semibold text-accent-content text-left'>Created By: </p>
                 
              
    //             <div className='flex items-center justify-between gap-2 w-full my-4'>
    //                 <div class="badge badge-secondary bg-secondary">badge</div>
    //                 <div className="badge badge-warning text-accent-content font-bold px-8 py-3">streak</div>
    //             </div>
    //             <div className='w-full'>
    //                 <Link to=''><button className='card-btn w-full flex items-center justify-center'>See Details<MdOutlineDoubleArrow /></button></Link>
    //             </div>
    //         </div>
    //     </div>

    <div className="card scale bg-base-200 max-w-[600px] h-full hover:shadow-lg shadow-accent-content ce-y-3 justify-self-center">
            {/* Image Section */}
            <figure className="px-1 sm:px-3 md:px-8 pt-6 md:pt-9">
                <img
                    src=""
                    alt=""
                    // Tailwind classes for size, you might need to adjust these to fit your design system
                    className="rounded-xl h-[190px] w-[286px] lg:h-[210px] lg:w-[306px] border object-cover" 
                />
            </figure>

            {/* Card Body (Details) */}
            <div className="card-body sm:px-1 md:px-8 ">
                
                {/* Title and Transport Type */}
                <h3 className="card-title text-dark-blue w-full text-left">title</h3>
                <p className='font-semibold text-base-content text-left mb-2'>
                    Transport: <span className='font-normal text-secondary'>transportType</span>
                </p>

                {/* Locations (From -> To) */}
                <div className='flex items-center text-left text-sm font-medium mb-3'>
                    <span className='text-base-content mr-2'>fromLocation</span>
                    <MdOutlineDoubleArrow className='text-secondary mx-1 rotate-90 sm:rotate-0' />
                    <span className='text-base-content ml-2'>toLocation</span>
                </div>

                {/* Price, Quantity, and Departure */}
                <div className='grid grid-cols-2 gap-y-2 gap-x-4 w-full text-left text-sm'>
                    {/* Price */}
                    <div className='flex flex-col'>
                        <span className='text-xs text-gray-500'>Price (Unit)</span>
                        <span className='font-bold text-lg text-secondary'>price </span>
                    </div>

                    {/* Quantity */}
                    <div className='flex flex-col items-start'>
                        <span className='text-xs text-gray-500'>Available</span>
                        <div className="badge badge-warning text-accent-content font-bold px-4 py-3">quantity Tickets</div>
                    </div>

                    {/* Departure Date/Time */}
                    <div className='flex flex-col col-span-2'>
                        <span className='text-xs text-gray-500'>Departure</span>
                        <span className='font-medium text-dark-blue'>departureDateTime</span>
                    </div>
                </div>


                {/* Perks Badge (Replaces old badge) */}
                <div className='w-full my-4'>
                    <div className="badge badge-secondary bg-secondary text-white p-3">perks</div>
                </div>

                {/* See Details Button */}
                <div className='w-full'>
                    <Link>
                        <button className='card-btn w-full flex items-center justify-center'>
                            See Details
                            <MdOutlineDoubleArrow className='ml-1' />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;