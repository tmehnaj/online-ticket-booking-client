import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const TransactionHistory = () => {
 const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Transactions History</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">Total Transactions: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Transaction Id</th>
                            <th>Amount</th>
                            <th>Ticket Title</th>
                            <th>Paid Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {payment?.transactionId}
                            </td>
                            <td>
                                {payment?.ticketTitle}
                            </td>
                            <td>
                                 {payment?.amount}
                            </td>
                            <td>
                                {payment?.date}
                            </td>
                            

                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;