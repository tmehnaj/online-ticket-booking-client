import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Shared/Loader'
import { MdOutlineDoubleArrow } from 'react-icons/md';

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/user?email=${user?.email}`)
            return res.data;
        }
    })


    //countdown




    if (isLoading) {
        return <Loader></Loader>
    }



    const handlePayment = async (booking) => {
        const paymentInfo = {
            bookingId: booking?._id,
            ticketId: booking?.ticketId,
            userEmail: booking?.userEmail,
            ticketTitle: booking?.title,
            totalPrice: booking?.totalPrice,
            bookingQuantity: booking?.bookingQuantity,
            vendorEmail: booking?.vendorEmail,
            transportType: booking?.transportType,
            departure: booking?.departure,
            ticketQuantity: booking?.bookingQuantity,
        }

        const res = await axiosSecure.post(`/payment-checkout-session`, paymentInfo);
        // console.log(res.data.url);
        window.location.assign(res.data.url);
    }




    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Booked Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">My Booked Tickets: {bookings.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-8'>
                {
                    bookings.map(booking => <div className="card scale bg-base-200 max-w-96 h-full hover:shadow-lg shadow-accent-content justify-self-center md:justify-self-auto">
                        {/* Image Section */}
                        <figure className="px-4 sm:px-5 md:px-8 pt-6 md:pt-9">
                            <img
                                src={booking?.image}
                                alt=''
                                // Tailwind classes for size, you might need to adjust these to fit your design system
                                className="rounded-xl h-[190px] w-[310px] lg:h-[250px] lg:w-[400px] object-cover"
                            />
                        </figure>

                        {/* Card Body (Details) */}
                        <div className="card-body  px-4 sm:px-5 md:px-8">

                            {/* Title and Transport Type */}
                            <div className='flex gap-2 items-center'><h3 className="card-title text-dark-blue w-full text-left">{booking?.title}</h3>
                                <span className='badge badge-info font-semibold'>{booking?.bookingStatus}</span></div>
                            <p className='font-semibold text-accent-content text-left mb-2'>
                                Transport: <span className='font-bold text-secondary'>{booking?.transportType}</span>
                            </p>

                            {/* Locations (From -> To) */}
                            <div className='flex items-center text-left text-sm font-medium mb-3'>
                                <span className='text-accent-content mr-2'>{booking?.origin}</span>
                                <MdOutlineDoubleArrow className='text-secondary mx-1 rotate-90 sm:rotate-0' />
                                <span className='text-accent-content ml-2'>{booking?.destination}</span>
                            </div>

                            {/* Price, Quantity, and Departure */}
                            <div className='grid grid-cols-2 gap-y-2 gap-x-4 w-full text-left text-sm'>
                                {/* Price */}
                                <div className='flex flex-col'>
                                    <span className='text-xs text-gray-500'>Price (Unit)</span>
                                    <span className='font-bold text-lg text-secondary'>{booking?.totalPrice} BDT</span>
                                </div>

                                {/* Quantity */}
                                <div className='flex flex-col items-start'>
                                    <span className='text-xs text-gray-500'>Quantity</span>
                                    <div className="badge badge-warning text-accent-content font-bold px-4 py-3">{booking?.bookingQuantity}</div>
                                </div>

                                {/* Departure Date/Time */}
                                <div className='flex flex-col col-span-2'>
                                    <span className='text-xs text-gray-500'>Departure</span>
                                    <span className='font-medium text-dark-blue'>{booking?.departure}</span>
                                </div>
                            </div>


                            {/* Perks Badge (Replaces old badge) */}
                            <div className='w-full my-4'>
                                <div className="badge badge-secondary bg-secondary text-white p-3">perks</div>
                            </div>

                            {/* pay  now Button */}

                            {
                                booking?.bookingStatus === 'accept' && <button
                                    onClick={() => handlePayment(booking)}
                                    disabled={(new Date()) > booking?.departure ? true : false}
                                    className='w-full  btn1'>Pay Now</button>
                            }

                            {
                                booking?.bookingStatus === 'paid' && <button

                                    disabled={true}
                                    className='w-full  btn1'>Paid</button>
                            }

                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default MyBookedTickets;