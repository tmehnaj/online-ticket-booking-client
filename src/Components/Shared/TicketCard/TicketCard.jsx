import React from 'react';
import { MdDoubleArrow, MdOutlineDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router';

const TicketCard = () => {
    return (
       <div className="card scale bg-base-200  max-w-96 h-full hover:shadow-lg shadow-accent-content ce-y-3 justify-self-center">
            <figure className="px-1 sm:px-3 md:px-8 pt-6 md:pt-9">
                <img
                    src=''
                    alt="Shoes"
                    className="rounded-xl h-[190px] w-[286px] lg:h-[210px] lg:w-[306px] border" />
            </figure>
            <div className="card-body   sm:px-1 md:px-8 ">
                <h3 className="card-title text-neutral-content w-full text-left">title</h3>
                
                   
                     <p className='font-semibold text-neutral-content text-left'>Created By: </p>
                 
              
                <div className='flex items-center justify-between gap-2 w-full my-4'>
                    <div class="badge badge-secondary bg-secondary">badge</div>
                    <div className="badge badge-warning text-neutral-content font-bold px-8 py-3">streak</div>
                </div>
                <div className='w-full'>
                    <Link to=''><button className='card-btn w-full flex items-center justify-center'>See Details<MdOutlineDoubleArrow /></button></Link>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;