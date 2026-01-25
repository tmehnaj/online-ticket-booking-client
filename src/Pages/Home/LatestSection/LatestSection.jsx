import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Container from '../../../Components/Shared/Container';
import { FaArrowRight } from 'react-icons/fa';
import TicketCard from '../../../Components/Shared/TicketCard/TicketCard';
import useAxios from '../../../Hooks/useAxios';

const LatestSection = () => {
 const axios = useAxios();

    const { data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'latest'],
        queryFn: async () => {
            const res = await axios.get('/tickets/latest');
            return res.data;
        }
    })


    return (
       <Container>
        <div className='my-30'>
            <h2 className='text-dark-blue pb-12 text-left flex items-end gap-2'>Latest Tickets <FaArrowRight /></h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    tickets.map(ticket=> <TicketCard key={ticket._id} ticket={ticket}></TicketCard>)
                }
            </div>
        </div>
       </Container>
    );
};

export default LatestSection;