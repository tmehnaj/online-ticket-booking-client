import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../../Components/Shared/Loader';
import { imageUpload } from '../../../Utils';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const availablePerks = ['AC', 'Breakfast', 'Wi-Fi', 'Restroom'];

const AddTickets = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            email: user?.email || '',
        }
    });


    const handleAddTicket =async data => {
        const imageFile = data.photo[0]; 

             const imageURL = await imageUpload(imageFile);

            // 2. Construct the final data object payload (JSON structure)
            const ticketData = {
                title: data.title,
                origin: data.from,
                destination: data.to,
                transportType: data.transport,
                price: parseFloat(data.price), 
                quantity: parseInt(data.quantity),
                departure: data.departureDateTime, 
                perks: data.perks,
                vendorName: data.name,
                vendorEmail: data.email,
                ticketImageUrl: imageURL,
                createdAt: new Date()
            };

            //add request to the admin
            axiosSecure.post('/tickets', ticketData)
        .then(res=>{
            if(res.data.insertedId){
                  Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Tickets added successfully!",
                        showConfirmButton: false,
                        timer: 2000
                    });
            }
        })

      
    }

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Add Tickets</title>
            <h2 className="mb-5 text-left drop-shadow-sm py-2 text-dark-blue">Add Tickets</h2>
            <form onSubmit={handleSubmit(handleAddTicket)} className="space-y-4 w-full">
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
                                    required: 'title is required',
                                    maxLength: {
                                        value: 50,
                                        message: 'title cannot greater than 50 characters'
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
                                        required: 'Origin is required',
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
                                        required: 'Destination is required',
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
                                    required: 'Transport type is required',
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
                                        required: 'Price is required',
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
                                        required: 'Quantity is required',
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
                                {...register("departureDateTime", { required: "Departure date and time is required" })}
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
                                            {...register("perks", { required: "perks is required" })}
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

                                {...register("photo", {
                                    required: "Image is required",
                                    validate: {
                                        fileType: value => ["image/jpeg", "image/png"].includes(value[0]?.type) || "Only JPG or PNG allowed",

                                        fileSize: value => value[0]?.size < 2 * 1024 * 1024 || "Max file size is 2MB",
                                    }
                                })}
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
    );
};

export default AddTickets;