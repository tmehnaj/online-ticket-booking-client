import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Shared/Container';
import { FaArrowRight } from 'react-icons/fa';
import TicketCard from '../../Components/Shared/TicketCard/TicketCard';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();
     const [searchLoading, setSearchLoading] = useState(false);


    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'all-tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/all-tickets');
            return res.data;
        }
    })

const handleSearch = ()=>{

}

const handleFilter=()=>{

}

    return (
       <Container>
        <div className='my-20'>
            <title>All Tickets</title>
            <h2 className='text-dark-blue pb-12 flex items-end justify-center gap-2'>All Tickets({tickets.length}) <FaArrowRight /></h2>
    
            <div>
                  <div className=' flex flex-col md:flex-row items-center justify-between gap-3'>
                <form onSubmit={handleSearch} className=" md:mt-5   md:mb-10 flex gap-2 ">
                    <label className="input input-bordered bg-white/20 text-base-content  focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            name="search"
                            type="search"
                            placeholder="Search"
                        />
                    </label>
                    <button className="search-btn">{searchLoading ? "Searching...." : "Search"}</button>
                </form>

                <select
                    onChange={(e) => { handleFilter(e.target.value) }}
                    // value={selectedCategory}
                    name="category"
                    id=""
                    className="input input-bordered max-w-36 bg-white/20 text-base-content focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl mt-5 mb-10">
                    <option value="">Filter By Transport Type</option>
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Launch">Launch</option>
                    <option value="Airplane">Airplane</option>
                </select>

            </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                {
                    tickets.map(ticket=> <TicketCard key={ticket._id} ticket={ticket}></TicketCard>)
                }
            </div>
        </div>
       </Container>
    );
};

export default AllTickets;