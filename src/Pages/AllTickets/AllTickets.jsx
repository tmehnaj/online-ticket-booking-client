import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from '../../Components/Shared/Container';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import TicketCard from '../../Components/Shared/TicketCard/TicketCard';
import Loader from '../../Components/Shared/Loader';

const AllTickets = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("price");
    const [order, setOrder] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [transportType, setTransportType] = useState("");
    const limit = 9;
    
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['tickets', currentPage, sort, order, searchText, transportType],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/tickets/all-tickets?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${searchText}&type=${transportType}`
            );
            return res.data; 
        }
    });


    const tickets = data?.tickets || [];
    const totalCount = data?.totalCount || 0;
    const totalPage = Math.ceil(totalCount / limit);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.search.value);
        setCurrentPage(0);
    };

    const handleSortChange = (e) => {
        const [field, dir] = e.target.value.split('-');
        setSort(field);
        setOrder(dir);
        setCurrentPage(0);
    };

    if (isLoading) return <Loader />;

    return (
        <Container>
            <title>All Tickets</title>
            <div className='my-12'>
                <h1 className='mb-10 flex gap-3 items-end justify-center drop-shadow-sm py-2 text-dark-blue'>
                    Explore All Tickets <FaArrowRight />
                </h1>

               
                <div className='flex flex-col md:flex-row gap-4 justify-between mb-8'>
                    <form onSubmit={handleSearch} className="join w-full md:w-auto">
                        <input name="search" className="input input-bordered join-item w-full rounded-3xl mr-3" placeholder="Search here" />
                        <button className="btn1 join-item"><FaSearch /></button>
                    </form>

                    <div className='flex gap-2'>
                        <select 
                            className="select select-bordered w-full rounded-3xl" 
                            onChange={(e) => {setTransportType(e.target.value); setCurrentPage(0);}}
                        >
                            <option value="">All Transports</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Launch">Launch</option>
                            <option value="Airplane">Airplane</option>
                        </select>

                        <select className="select select-bordered w-full rounded-3xl" onChange={handleSortChange}>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Ticket Grid */}
                {tickets.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center'>
                        {tickets.map(ticket => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-base-100 rounded-xl shadow-inner">
                        <p className="text-xl text-gray-500">No tickets found!</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPage > 1 && (
                    <div className="flex justify-center mt-12 join">
                        {[...Array(totalPage).keys()].map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`join-item btn ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                {page + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default AllTickets;