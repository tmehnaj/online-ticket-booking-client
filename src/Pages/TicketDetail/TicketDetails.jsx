import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader

const TicketDetails = () => {
    let [isOpen, setIsOpen] = useState(false)
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: ticket = {}, isLoading } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const result = await axiosSecure.get(`/details/${id}`)
            return result.data;
        },
    })

    const closeModal = () => {
        setIsOpen(false)
    }
    if (isLoading) return <Loader/>

    const {  quantity, price, vendorEmail, vendorName } = ticket;


    return (
        <div>
            <h2>{id}</h2>
        </div>
    );
};

export default TicketDetails;