import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../../Components/Shared/Container';
import { FaArrowRight } from 'react-icons/fa';
import TicketCard from '../../../Components/Shared/TicketCard/TicketCard';

const LatestSection = () => {
 const axiosSecure = useAxiosSecure();
    //    const { user } = useAuth();


    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'latest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/latest');
            return res.data;
        }
    })


    return (
       <Container>
        <div className='my-30'>
            <h2 className='text-dark-blue pb-12 text-left flex items-end gap-2'>Latest Tickets <FaArrowRight /></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tickets.map(ticket=> <TicketCard key={ticket._id} ticket={ticket}></TicketCard>)
                }
            </div>
        </div>
       </Container>
    );
};

export default LatestSection;