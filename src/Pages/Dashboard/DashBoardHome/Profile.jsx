import React, { useRef } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import useRole from '../../../Hooks/useRole';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../Utils';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, setLoading, updateUserProfile, setUser } = useAuth();
    const { role } = useRole();
    const modalRef = useRef();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            name: user?.displayName,
        }
    });
   

    const handleModal = () => {
        reset({ name: user?.displayName });
        modalRef.current.showModal();

    }

    const handleUpdateProfile = async data => {
        // console.log('inside handleupdate profile', data.name);
        const imageFile = data.photo?.[0];
        let imageURl = user?.photoURL;

        try {
            setLoading(true);

            if (imageFile) {
                // Only call imageUpload if a file is selected
                imageURl = await imageUpload(imageFile);
            }
            // const imageURl = await imageUpload(imageFile);
            const updateProfile = {
                displayName: data.name,
                photoURL: imageURl,
            }

            await updateUserProfile(updateProfile)
                .then(() => {
                    
                    setUser({ ...user, displayName: data.name, photoURL: imageURl });
                    toast.success('Updated Successfully!');
                    modalRef.current.close();
                });
        } catch (err) {
            // toast.error(err?.message);
        }
        finally{
            setLoading(false)
        }

    }

    return (

        <div className="flex items-center justify-center my-40 px-2">
            <div className="w-full max-w-xl bg-base-100 rounded-2xl shadow-lg overflow-hidden">
                {/* Thumbnail Background */}
                <div className="h-32 bg-primary relative">
                    {/* Avatar */}
                    <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="ring-secondary ring-offset-base-100 w-24 rounded-full ring-3 ring-offset-2 shadow-lg shadow-amber-100">
                                <img src={user?.photoURL || <FaUserCircle />} />
                            </div>
                        </div>
                    </div>
                </div>


                {/* User Info */}
                <div className="pt-16 pb-6 px-6 text-center">
                    <h2 className="text-xl font-bold mt-3">{user?.displayName}</h2>
                    <p className="text-sm text-base-content/70 mt-1 mb-3">{user?.email}</p>
                    <p><strong>Role: </strong><span className='badge badge-primary rounded-3xl font-bold text-black px-4 py-3 mb-3'>{role}</span></p>


                    {/* Update Button */}
                    <div className="mt-6">
                        <button 
                        onClick={handleModal} 
                        className="btn1">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>



             <dialog ref={modalRef} className="modal">
                <div className="modal-box  max-w-md p-8">
                    <form method="dialog">
                        
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="mb-2 text-center drop-shadow-sm py-2">Update Profile</h3>
                    <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">

                       
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                {...register("name", {
                                    maxLength: {
                                        value: 20,
                                        message: 'name cannot greater than 20 characters'
                                    }
                                })}
                            />
                            {errors.name && <p className='text-error'>{errors.name.message}</p>}
                        </div>
                       
                        <div>
                            <label className="block text-sm mb-1">Upload Image</label>
                            <input
                                type="file"
                                placeholder="Image"
                                className="file-input input-bordered w-full bg-white/20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl placeholder-blue"

                                {...register("photo", {
                                    validate: {
                                        fileType: value => ["image/jpeg", "image/png"].includes(value[0]?.type) || "Only JPG or PNG allowed",

                                        fileSize: value => value[0]?.size < 2 * 1024 * 1024 || "Max file size is 2MB",
                                    }
                                })}
                            />
                            {errors.photo && <p className='text-error'>{errors.photo.message}</p>}
                        </div>

                        <button type='submit' className="btn1 min-w-full mt-3">Update Profile</button>


                    </form>
                </div>
            </dialog> 


        </div>
    );
};

export default Profile;