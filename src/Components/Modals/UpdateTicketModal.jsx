import React, { useEffect, forwardRef } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { imageUpload } from '../../Utils';

const availablePerks = ["AC","Breadkfast", "Wifi", "Restroom"];

// WE MUST USE forwardRef HERE
const UpdateTicketModal = forwardRef(({ ticket, refetch }, ref) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (ticket) {
            // Mapping to your specific DB fields: origin, destination, transportType
            reset({
                title: ticket.title,
                origin: ticket.origin,
                destination: ticket.destination,
                transportType: ticket.transportType,
                price: ticket.price,
                quantity: ticket.quantity,
                departure: ticket.departure,
                perks: ticket.perks || [],
                vendorName: ticket.vendorName,
                vendorEmail: ticket.vendorEmail
            });
        }
    }, [ticket, reset]);

    const handleUpdateTicket = async (data) => {
        const imageFile = data.photo?.[0];
        let imageURL = ticket.ticketImageUrl;

        try {
            if (imageFile) {
                imageURL = await imageUpload(imageFile);
            }

            const { photo, ...otherData } = data;
            const updatedTicket = {
                ...otherData,
                ticketImageUrl: imageURL,
            };

            const res = await axiosSecure.put(`/tickets/${ticket._id}`, updatedTicket);
            
            if (res.data.modifiedCount > 0 || res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
                ref.current.close(); // Closes the dialog using the ref
            }
        } catch (err) {
            // console.error(err);
            Swal.fire("Error", "Failed to update", "error");
        }
    };

    return (
        /* The 'ref' is attached directly to the dialog tag */
        <dialog ref={ref} className="modal">
            <div className="modal-box w-11/12 max-w-5xl bg-slate-900 text-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                
                <h3 className="font-bold text-lg mb-6 text-blue-400">Update Ticket: {ticket?.title}</h3>
                
                <form onSubmit={handleSubmit(handleUpdateTicket)} className="space-y-4">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        {/* Left Side */}
                        <div className='space-y-4'>
                            <div>
                                <label className="label-text text-white">Title</label>
                                <input {...register("title")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <label className="label-text text-white">Origin</label>
                                    <input {...register("origin")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                                </div>
                                <div className='w-1/2'>
                                    <label className="label-text text-white">Destination</label>
                                    <input {...register("destination")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                                </div>
                            </div>
                            <div>
                                <label className="label-text text-white">Transport Type</label>
                                <input {...register("transportType")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <label className="label-text text-white">Price</label>
                                    <input type="number" {...register("price")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                                </div>
                                <div className='w-1/2'>
                                    <label className="label-text text-white">Quantity</label>
                                    <input type="number" {...register("quantity")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className='space-y-4'>
                            <div>
                                <label className="label-text text-white">Departure Date & Time</label>
                                <input type="datetime-local" {...register("departure")} className="input input-bordered w-full bg-white/10 rounded-2xl" />
                            </div>
                            <div>
                                <label className="label-text text-white font-bold">Perks</label>
                                <div className="grid grid-cols-2 gap-2 mt-2 p-3 border border-white/10 rounded-2xl">
                                    {availablePerks.map(perk => (
                                        <label key={perk} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" value={perk} {...register("perks")} className="checkbox checkbox-primary checkbox-sm" />
                                            <span className="text-sm">{perk}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="label-text text-white">New Image (Optional)</label>
                                <input type="file" {...register("photo")} className="file-input file-input-bordered w-full bg-white/10 rounded-2xl" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-6 rounded-2xl">Update Ticket Now</button>
                </form>
            </div>
        </dialog>
    );
});

export default UpdateTicketModal;