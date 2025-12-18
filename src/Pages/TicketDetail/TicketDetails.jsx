import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../../Components/Shared/Loader';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaTicketAlt, FaUserTie } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Container from '../../Components/Shared/Container';
import useAuth from '../../Hooks/useAuth';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

const TicketDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [bookingQty, setBookingQty] = useState(1);
    const [timeLeft, setTimeLeft] = useState("");

    const { data: ticket = {}, isLoading, refetch } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const result = await axiosSecure.get(`/ticket-details/${id}`);
            return result.data;
        },
    });

    // Countdown Logic (Requirement 4)
    useEffect(() => {
        if (!ticket?.departure) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const dest = new Date(ticket.departure).getTime();
            const diff = dest - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}d ${hours}h ${mins}m`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [ticket?.departure]);

    const isExpired = new Date(ticket?.departure) < new Date();
    const isOutOfStock = ticket?.quantity <= 0;

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingData = {
            ticketId: ticket._id,
            title: ticket.title,
            image: ticket.ticketImageUrl,
            bookingQuantity: parseInt(bookingQty),
            unitPrice: ticket.price,
            totalPrice: ticket.price * bookingQty,
            origin: ticket.origin,
            destination: ticket.destination,
            transportType: ticket.transportType,
            departure: ticket.departure,
            userName: user?.displayName,
            userEmail: user?.email,
            vendorEmail: ticket.vendorEmail,
            bookingStatus: 'pending'
        };

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Booking request sent to vendor.", "success");
                document.getElementById('booking_modal').close();
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong.", error);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <Container>
            <div className='flex flex-col lg:flex-row gap-10 items-start my-30'>
                
                {/* Image Section */}
                <motion.div 
                    className='w-full lg:w-1/2'
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <img src={ticket?.ticketImageUrl} alt={ticket?.title} className='w-full h-[400px] object-cover rounded-3xl shadow-2xl' />
                </motion.div>

                {/* Details Section */}
                <motion.div 
                    className='w-full lg:w-1/2 space-y-6'
                    variants={cardAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8 }}
                >
                    <div className='flex justify-between items-start'>
                        <h1 className='text-4xl font-extrabold text-dark-blue'>{ticket?.title}</h1>
                        <span className="badge badge-lg bg-primary text-white border-none">{ticket?.transportType}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-base-200 shadow-xl p-4 rounded-2xl">
                            <FaMapMarkerAlt className="text-xl" />
                            <div>
                                <p className="text-xs">Route:</p>
                                <span className="font-bold">{ticket?.origin} → {ticket?.destination}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-base-200 shadow-xl  p-4 rounded-2xl">
                            <FaClock className="text-xl" />
                            <div>
                                <p className="text-xs ">Time Left</p>
                                <p className="font-bold text-secondary">{timeLeft}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-secondary">৳ {ticket?.price} <span className="text-sm text-base-content opacity-60">/per unit</span></p>
                        <p>Available Tickets: <span className="font-bold badge badge-warning">{ticket?.quantity}</span></p>
                    </div>

                    {/* Perks Section */}
                    <div>
                        <p className="font-bold mb-2">Perks:</p>
                        <div className="flex gap-2">
                            {ticket?.perks?.map((perk, idx) => (
                                <span key={idx} className="badge badge-lg bg-primary text-white border-none">{perk}</span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 border-gray-400">
                       
                            <p>Vendor Information:</p>
                            <p className="font-bold">{ticket?.vendorName}</p>
                            <p className="font-bold">{ticket?.vendorEmail}</p>
                     
                    </div>

                    {/* Booking Button Logic */}
                    <button 
                        onClick={() => document.getElementById('booking_modal').showModal()}
                        disabled={isExpired || isOutOfStock}
                        className={`btn1 ${isExpired || isOutOfStock ? 'btn-disabled bg-gray-400' : 'bg-primary text-white hover:scale-105'}`}
                    >
                        {isExpired ? "Trip Departed" : isOutOfStock ? "Sold Out" : "Book Now"}
                    </button>
                </motion.div>
            </div>

            {/* DAISY UI MODAL */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white border-3 border-secondary rounded-3xl">
                    <h3 className="font-bold text-2xl mb-4">Confirm Booking</h3>
                    <p className="py-2"><strong>{ticket.title}</strong></p>
                    
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div className="form-control">
                            <label className="block text-sm mb-1">Quantity (Max: <span>{ticket.quantity})</span></label>
                            <input 
                                type="number" 
                                min="1" 
                                max={ticket.quantity} 
                                value={bookingQty}
                                onChange={(e) => setBookingQty(e.target.value)}
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl" 
                                required 
                            />
                        </div>
                        <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
                            <span className="font-bold">Total Price:</span>
                            <span className="text-xl font-bold text-secondary">৳ {ticket.price * bookingQty}</span>
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={() => document.getElementById('booking_modal').close()} className="btn2">Cancel</button>
                            <button type="submit" className="btn1">Submit Request</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </Container>
    );
};

export default TicketDetails;