import React from 'react';
import { MdDoubleArrow, MdOutlineDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router';

const TicketCard = ({ ticket }) => {
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

        <div className="card scale bg-base-200 max-w-96 h-full hover:shadow-lg shadow-accent-content justify-self-center md:justify-self-auto">
            {/* Image Section */}
            <figure className="px-4 sm:px-5 md:px-8 pt-6 md:pt-9">
                <img
                    src={ticket?.ticketImageUrl}
                    alt=''
                    // Tailwind classes for size, you might need to adjust these to fit your design system
                    className="rounded-xl h-[190px] w-[300px] lg:h-[250px] lg:w-[400px] object-cover"
                />
            </figure>

            {/* Card Body (Details) */}
            <div className="card-body px-4 sm:px-5 md:px-8 ">

                {/* Title and Transport Type */}
                <div className='flex gap-2 items-center'><h3 className="card-title text-dark-blue w-full text-left">{ticket?.title}</h3>
                    {/* <span className='badge badge-info font-semibold'></span> */}
                    </div>
                <p className='font-semibold text-accent-content text-left mb-2'>
                    Transport: <span className='font-bold text-secondary'>{ticket?.transportType}</span>
                </p>

                {/* Locations (From -> To) */}
                <div className='flex items-center text-left text-sm font-medium mb-3'>
                    <span className='text-accent-content mr-2'>{ticket?.origin}</span>
                    <MdOutlineDoubleArrow className='text-secondary mx-1 rotate-90 sm:rotate-0' />
                    <span className='text-accent-content ml-2'>{ticket?.destination}</span>
                </div>

                {/* Price, Quantity, and Departure */}
                <div className='grid grid-cols-2 gap-y-2 gap-x-4 w-full text-left text-sm'>
                    {/* Price */}
                    <div className='flex flex-col'>
                        <span className='text-xs text-gray-500'>Price (Unit)</span>
                        <span className='font-bold text-lg text-secondary'>{ticket?.price} BDT</span>
                    </div>

                    {/* Quantity */}
                    <div className='flex flex-col items-start'>
                        <span className='text-xs text-gray-500'>Available</span>
                        <div className="badge badge-warning text-accent-content font-bold px-4 py-3">{ticket?.quantity}</div>
                    </div>

                    {/* Departure Date/Time */}
                    <div className='flex flex-col col-span-2'>
                        <span className='text-xs text-gray-500'>Departure</span>
                        <span className='font-medium text-dark-blue'>{ticket?.departure}</span>
                    </div>
                </div>


                {/* Perks Badge (Replaces old badge) */}
                <div className='w-full my-4'>
                    <div className="badge badge-secondary bg-secondary text-white p-3">{ticket?.perks.join(', ')}</div>
                </div>

                {/* See Details Button */}
                <div className='w-full'>
                    <Link to={`/details/${ticket._id}`}><button className='card-btn w-full flex items-center justify-center'>See Details<MdOutlineDoubleArrow /></button></Link>
                </div>


            </div>
        </div>
    );
};

export default TicketCard;