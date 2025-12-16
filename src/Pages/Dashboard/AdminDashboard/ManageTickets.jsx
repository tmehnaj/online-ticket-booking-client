import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const ManageTickets = () => {
       const axiosSecure = useAxiosSecure();
    //    const { user } = useAuth();


    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/admin?status=pending');
            return res.data;
        }
    })



    const updateTicketStatus = (ticket, status)=>{
                 const updateInfo = {
            status: status,
        }

             axiosSecure.patch(`/tickets/${ticket._id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                 Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Ticket has been ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        })

    }

    const handleApproveTicket = (ticket) => {
        updateTicketStatus(ticket, 'approved');
    }

    const handleRejectTicket = (ticket) => {
        updateTicketStatus(ticket, 'rejected');
    }


    return (
        <div className='p-10 md:p-15 lg:p-20'>
             <title>Manage Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Total Tickets: {tickets.length}</h2>
             <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            #
                                        </th>
                                        <th>Ticket Title</th>
                                        <th>From</th>
                                        <th>to</th>
                                        <th>Transport Type</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Departure Time</th>
                                        <th>Status</th>
                                        <th>Vendor Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => <tr>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                         {ticket?.title}
                                        </td>
                                        <td>
                                            {ticket?.origin}
                                        </td>
                                        <td>
                                           {ticket?.destination}
                                        </td>
                                        <td>
                                           {ticket?.transportType}
                                        </td>
                                        <td>
                                           {ticket?.price}
                                        </td>
                                        <td>
                                           {ticket?.quantity}
                                        </td>
                                        <td>
                                           {ticket?.departure}
                                        </td>
                                        <td>
                                           {ticket?.status}
                                        </td>
                                        <td>
                                           {ticket?.vendorEmail}
                                        </td>
                                        <td>
                                          
                                               <div className='flex items-center gap-2'>
                                                 <button
                                                    onClick={() => handleApproveTicket(ticket)}
                                                    className='btn bg-green-500 rounded-3xl hover:bg-green-600'>
                                                    Approve                                  </button> 
                                                <button
                                                    onClick={() => handleRejectTicket(ticket)}
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

export default ManageTickets;