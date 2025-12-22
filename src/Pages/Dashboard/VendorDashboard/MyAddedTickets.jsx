import React, { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Components/Shared/Loader'
import { Link } from 'react-router';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import Swal from 'sweetalert2';
import UpdateTicketModal from '../../../Components/Modals/UpdateTicketModal';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../Utils';
import { toast } from 'react-toastify';

const availablePerks = ['AC', 'Breakfast', 'Wi-Fi', 'Restroom'];



const MyAddedTickets = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const updateModalRef = useRef();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        defaultValues: {
            name: user?.displayName,
            email: user?.email,
        }
    });


    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ['tickets', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/vendor?vendorEmail=${user.email}`)
            return res.data;
        }
    })

    const openUpdateModal = (ticket) => {
        setSelectedTicket(ticket);

        // Pre-fill the input fields
        setValue("title", ticket.title);
        setValue("from", ticket.origin);
        setValue("to", ticket.destination);
        setValue("transport", ticket.transportType);
        setValue("price", ticket.price);
        setValue("quantity", ticket.quantity);
        setValue("departureDateTime", ticket.departure);
        setValue("perks", ticket.perks);

        updateModalRef.current.showModal();
    };


    const handleUpdateTicket = async (data) => {
        let newTicket;
        if (data.photo) {
            const imageFile = data.photo[0];

            const imageURL = await imageUpload(imageFile);
            newTicket = {
            title: data.title,
                origin: data.from,
                destination: data.to,
                transportType: data.transport,
                price: parseFloat(data.price), 
                quantity: parseInt(data.quantity),
                departure: data.departureDateTime, 
                perks: data.perks,
                ticketImageUrl: imageURL,
        }

        newTicket = {
            title: data.title,
                origin: data.from,
                destination: data.to,
                transportType: data.transport,
                price: parseFloat(data.price), 
                quantity: parseInt(data.quantity),
                departure: data.departureDateTime, 
                perks: data.perks
        }

        }

       
        axiosSecure.put(`/tickets/${selectedTicket?._id}`, newTicket)
            .then(data => {
                // console.log(data);
                updateModalRef.current.close();
                toast.success('ticket updated successfully');
                refetch();
                setSelectedTicket({});
            })
    };

    const handleDeleteTicket = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(result => {
                        refetch();
                        // console.log(result);
                        if (result.data.deletedCount) {

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Deleted Successfully!`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
            }
        });

    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Added Tickets</title>
            <h2 className="mb-10 text-left drop-shadow-sm py-2 text-dark-blue">My Added Tickets: {tickets.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-8'>
                {tickets.map(ticket => <div key={ticket?._id} className="card scale bg-base-200 max-w-96 h-full hover:shadow-lg shadow-accent-content justify-self-center md:justify-self-auto">
                    {/* Image Section */}
                    <figure className="px-4 sm:px-5 md:px-8 pt-6 md:pt-9">
                        <img
                            src={ticket?.ticketImageUrl}
                            alt=''
                            // Tailwind classes for size, you might need to adjust these to fit your design system
                            className="rounded-xl h-[190px] w-[310px] lg:h-[250px] lg:w-[400px] object-cover"
                        />
                    </figure>

                    {/* Card Body (Details) */}
                    <div className="card-body  px-4 sm:px-5 md:px-8">

                        {/* Title and Transport Type */}
                        <div className='flex gap-2 items-center'><h3 className="card-title text-dark-blue w-full text-left">{ticket?.title}</h3>
                            <span className='badge badge-info font-semibold'>{ticket?.status}</span></div>
                        <p className='font-semibold text-accent-content text-left mb-2'>
                            Transport: <span className='font-bold text-secondary'>{ticket?.transportType}</span>
                        </p>

                        {/* Locations (From -> To) */}
                        <div className='flex items-center text-left text-sm font-medium mb-3'>
                            <span className='text-accent-content mr-2'>{ticket?.origin}</span>
                            <MdOutlineDoubleArrow className='text-secondary mx-1 rotate-90 sm:rotate-0' />
                            <span className='text-accent-content ml-2'>{ticket?.destination}</span>
                        </div>

                        {/* Price, Quantity, and Departure */}
                        <div className='grid grid-cols-2 gap-y-2 gap-x-4 w-full text-left text-sm'>
                            {/* Price */}
                            <div className='flex flex-col'>
                                <span className='text-xs text-gray-500'>Price (Unit)</span>
                                <span className='font-bold text-lg text-secondary'>{ticket?.price} BDT</span>
                            </div>

                            {/* Quantity */}
                            <div className='flex flex-col items-start'>
                                <span className='text-xs text-gray-500'>Available</span>
                                <div className="badge badge-warning text-accent-content font-bold px-4 py-3">{ticket?.quantity}</div>
                            </div>

                            {/* Departure Date/Time */}
                            <div className='flex flex-col col-span-2'>
                                <span className='text-xs text-gray-500'>Departure</span>
                                <span className='font-medium text-dark-blue'>{ticket?.departure}</span>
                            </div>
                        </div>


                        {/* Perks Badge (Replaces old badge) */}
                        <div className='w-full my-4'>
                            <div className="badge badge-secondary bg-secondary text-white p-3">{ticket?.perks.join(' ')}</div>
                        </div>

                        {/* See Details Button */}
                        <div className='w-full flex items-center justify-between gap-3'>
                            <button
                                onClick={() => openUpdateModal(ticket)}
                                disabled={ticket?.status === 'rejected' ? true : false}
                                className='btn2 w-1/2'>Update</button>
                            <button
                                disabled={ticket?.status === 'rejected' ? true : false}
                                onClick={() => handleDeleteTicket(ticket._id)}
                                className='btn1 w-1/2'>Delete</button>
                        </div>
                    </div>
                </div>)}
            </div>


            {/* modal */}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={updateModalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handleSubmit(handleUpdateTicket)} className="space-y-4 w-full">
                        <div className='flex flex-col lg:flex-row justify-between gap-10'>

                            {/* left side */}

                            <div className='w-full lg:w-1/2 space-y-4'>
                                {/* title field */}
                                <div>
                                    <label className="block text-sm mb-1">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                        {...register("title", {

                                            maxLength: {
                                                value: 30,
                                                message: 'title cannot greater than 30 characters'
                                            }
                                        })}
                                    />
                                    {errors.title && <p className='text-error'>{errors.title.message}</p>}
                                </div>

                                {/* from and to location */}
                                <div className='md:flex items-center justify-between gap-3'>
                                    {/* from */}
                                    <div className='w-full'>
                                        <label className="block text-sm mb-1">From</label>
                                        <input
                                            type="text"
                                            placeholder="Origin Location"
                                            className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                            {...register("from", {

                                                maxLength: {
                                                    value: 20,
                                                    message: 'location cannot greater than 20 characters'
                                                }
                                            })}
                                        />
                                        {errors.from && <p className='text-error'>{errors.from.message}</p>}
                                    </div>
                                    {/* to */}
                                    <div className='w-full'>
                                        <label className="block text-sm mb-1">To</label>
                                        <input
                                            type="text"
                                            placeholder="Destination"
                                            className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                            {...register("to", {

                                                maxLength: {
                                                    value: 20,
                                                    message: 'location cannot greater than 20 characters'
                                                }
                                            })}
                                        />
                                        {errors.to && <p className='text-error'>{errors.to.message}</p>}
                                    </div>

                                </div>


                                {/* transport type */}
                                <div>
                                    <label className="block text-sm mb-1">Transport Type</label>
                                    <input
                                        type="text"
                                        placeholder="Transport Type"
                                        className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                        {...register("transport", {

                                            maxLength: {
                                                value: 10,
                                                message: 'Transport type cannot greater than 10 characters'
                                            }
                                        })}
                                    />
                                    {errors.transport && <p className='text-error'>{errors.transport.message}</p>}
                                </div>

                                {/* price and quantity */}
                                <div className='flex items-center justify-between gap-3'>
                                    {/* price */}
                                    <div className='w-full'>
                                        <label className="block text-sm mb-1">Price</label>
                                        <input

                                            className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                            type='number'
                                            placeholder='Price per ticket'
                                            {...register('price', {

                                                min: { value: 0, message: 'Price must be positive' },
                                            })}
                                        />
                                        {errors.price && <p className='text-error'>{errors.price.message}</p>}
                                    </div>
                                    {/* quantity */}
                                    <div className='w-full'>
                                        <label className="block text-sm mb-1">Quantity</label>
                                        <input

                                            className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                            type='number'
                                            placeholder='Available quantity'
                                            {...register('quantity', {

                                                min: { value: 1, message: 'Quantity must be at least 1' },
                                            })}
                                        />
                                        {errors.quantity && <p className='text-error'>{errors.quantity.message}</p>}
                                    </div>

                                </div>

                                {/* Departure date & time */}
                                <div>
                                    <label className="block text-sm mb-1">Departure date & time</label>
                                    <input
                                        type="datetime-local"
                                        placeholder="Departure date & time"
                                        className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                        {...register("departureDateTime", {})}
                                    />
                                    {errors.departureDateTime && <p className='text-error'>{errors.departureDateTime.message}</p>}
                                </div>
                                {/* perks */}
                                <div>
                                    <label className="block text-sm mb-1">Perks</label>
                                    <div className="flex flex-wrap gap-4">
                                        {availablePerks.map((perk) => (
                                            <div key={perk} className="flex items-center space-x-2">
                                                <input
                                                    id={`perk-${perk}`}
                                                    type="checkbox"
                                                    value={perk}
                                                    className="checkbox checkbox-sm"
                                                    {...register("perks", {})}
                                                />
                                                <label htmlFor={`perk-${perk}`} className="text-sm cursor-pointer">
                                                    {perk}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>


                            {/* right side */}

                            <div className='w-full lg:w-1/2 space-y-4'>
                                {/* image field */}
                                <div>
                                    <label className="block text-sm mb-1">Upload Image</label>
                                    <input
                                        type="file"
                                        placeholder="Image"
                                        className="file-input input-bordered w-full bg-white/20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl placeholder-blue"

                                        {...register("photo")}
                                    />
                                    {errors.photo && <p className='text-error'>{errors.photo.message}</p>}
                                </div>

                                {/* vendor name field */}
                                <div>
                                    <label className="block text-sm mb-1">Name</label>
                                    <input
                                        // defaultValue={user?.displayName}
                                        readOnly={true}
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                        {...register("name")}
                                    />
                                </div>

                                {/*vendor email */}
                                <div>
                                    <label className="block text-sm mb-1">Email</label>
                                    <input
                                        // defaultValue={user?.email}
                                        readOnly={true}
                                        type="email"
                                        placeholder="Enter your Email"
                                        className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                        {...register("email")}
                                    />
                                    {/* {errors.email?.type === 'required' && <p className='text-error'>Email is required</p>} */}
                                </div>
                            </div>
                        </div>



                        <button type='submit' className="btn1 mt-6">Add Ticket</button>

                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default MyAddedTickets;