import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    //    const { user } = useAuth();


    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'approved'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/admin?status=approved');
            return res.data;
        }
    })


    const countAdvertise = ()=>{
        // refetch();
        const count = tickets.filter(ticket=> ticket?.advertiseStatus === 'advertise');
        return count.length;
    }

     const updateAdvertiseStatus = (ticket, status)=>{
                     const updateInfo = {
                advertiseStatus: status,
                status: ticket?.status,
            }
    
                 axiosSecure.patch(`/tickets/${ticket._id}`, updateInfo)
            .then(res=>{
                if(res.data.modifiedCount){
                    refetch();
                
                }
            })
    
        }
    
        const handleAdvertise = (ticket) => {
           const count = countAdvertise();
          // console.log('count inside handleaaadvertise', count);
           if(count < 6 )
           {
            updateAdvertiseStatus(ticket, 'advertise');
           }else{
            return toast.error('advertise tickets can not be more than 6')
           }
        }
    
        const handleRemoveAdvertise = (ticket) => {
            updateAdvertiseStatus(ticket, 'unadvertise');
        }

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Advertise Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Advertise Tickets: {countAdvertise()}</h2>
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
                                
                                   {
                                    ticket?.advertiseStatus === 'advertise' ? <button
                                        onClick={() => handleRemoveAdvertise(ticket)}
                                        className='btn bg-secondary rounded-3xl hover:bg-[#d53f3f] whitespace-nowrap'>
                                        Remove Advertise
                                    </button> :  <button
                                        onClick={() => handleAdvertise(ticket)}
                                        className='btn bg-green-500 rounded-3xl hover:bg-green-600'>
                                        Advertise                                 
                                         </button>
                                   }
                                    
                                
                            </td>

                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseTickets;