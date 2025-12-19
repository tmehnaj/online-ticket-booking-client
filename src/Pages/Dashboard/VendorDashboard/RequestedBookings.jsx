import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Shared/Loader'
import Swal from 'sweetalert2';

const RequestedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['bookings', user?.email, 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/vendor?vendorEmail=${user.email}&bookingStatus=pending`)
            return res.data;
        }
    })



    const updateTicketStatus = (booking, status)=>{
                 const updateInfo = {
            bookingStatus: status,
        }

             axiosSecure.patch(`/bookings/${booking._id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Booking has been ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        })

    }

    const handleApproveBooking = (booking) => {
        updateTicketStatus(booking, 'accept');
    }

    const handleRejectBooking = (booking) => {
        updateTicketStatus(booking, 'rejected');
    }




    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Requested Bookings</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Total Tickets: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Ticket Title</th>
                            <th>Booking Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {booking?.userName}
                            </td>
                            <td>
                                {booking?.userEmail}
                            </td>
                            <td>
                                 {booking?.title}
                            </td>
                            <td>
                                {booking?.bookingQuantity}
                            </td>
                            <td>
                                {booking?.totalPrice}
                            </td>
                        
                            <td>

                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={() => handleApproveBooking(booking)}
                                        className='btn bg-green-500 rounded-3xl hover:bg-green-600'>
                                        Accept                                 </button>
                                    <button
                                        onClick={() => handleRejectBooking(booking)}
                                        className='btn bg-secondary rounded-3xl hover:bg-[#d53f3f]'>
                                        Reject
                                    </button>

                                </div>
                            </td>

                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedBookings;