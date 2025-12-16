import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

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

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Advertise Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Advertise Tickets: {tickets.length}</h2>
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
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success"
                                />
                            </td>

                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseTickets;