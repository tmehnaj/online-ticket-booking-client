import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Shared/Loader'
import { Link } from 'react-router';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], refetch, isPending } = useQuery({
        queryKey: ['parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/vendor?vendorEmail=${user.email}`)
            return res.data;
        }
    })


    const handleDeleteTicket = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(result => {
                        refetch();
                        // console.log(result);
                        if (result.data.deletedCount) {
                            
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Deleted Successfully!`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        });

    }

    if (isPending) {
        return <Loader></Loader>
    }

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Added Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">My Added Tickets: {tickets.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-8'>
                {tickets.map(ticket => <div className="card scale bg-base-200 max-w-96 h-full hover:shadow-lg shadow-accent-content justify-self-center md:justify-self-auto">
                    {/* Image Section */}
                    <figure className="px-1 sm:px-3 md:px-8 pt-6 md:pt-9">
                        <img
                            src={ticket?.ticketImageUrl}
                            alt=''
                            // Tailwind classes for size, you might need to adjust these to fit your design system
                            className="rounded-xl h-[190px] w-[310px] lg:h-[250px] lg:w-[400px] object-cover"
                        />
                    </figure>

                    {/* Card Body (Details) */}
                    <div className="card-body sm:px-1 md:px-8 ">

                        {/* Title and Transport Type */}
                        <div className='flex gap-2 items-center'><h3 className="card-title text-dark-blue w-full text-left">{ticket?.title}</h3>
                        <span className='badge badge-info font-semibold'>{ticket?.status}</span></div>
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
                            <div className="badge badge-secondary bg-secondary text-white p-3">{ticket?.perks.join(' ')}</div>
                        </div>

                        {/* See Details Button */}
                        <div className='w-full flex items-center justify-between gap-3'>
                            <button
                            disabled = { ticket?.status === 'rejected'? true : false }
                            className='btn2 w-1/2'>Update</button>
                            <button
                            // disabled = { ticket?.status === 'rejected'? true : false }
                                onClick={() => handleDeleteTicket(ticket._id)}
                                className='btn1 w-1/2'>Delete</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default MyAddedTickets;