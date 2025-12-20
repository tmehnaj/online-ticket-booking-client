import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import GoogleLogin from './SocialLogin/GoogleLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, setLoading, user, updateUserProfile, setUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    if (user) {
        return navigate(location?.state || '/');
    }


    const handleRegister = data => {
        // console.log(data);
        const imageFile = data.photo[0];

        createUser(data.email, data.password)
            .then(result => {
               // console.log("after create user", result);
                //store image in formdata and get the link
                const formData = new FormData();
                formData.append('image', imageFile);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        // console.log('after axios',res.data.data.url);
                        //update profile
                        const updateProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }


                        //put user in database
                        const userInfo = {
                            displayName: data.name,
                            email: data.email,
                            photoURL: res.data.data.url,
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                // console.log('users after post',res.data);
                                if (res.data.insertedId) {
                                   // console.log('user is stored in database');
                                }
                            })


                        updateUserProfile(updateProfile)
                            .then(() => {
                               // console.log('user profile updated successfully');
                                setUser({ ...user, ...updateProfile });
                                setLoading(false);
                                toast.success('registration successful!');
                                navigate(location?.state || "/");
                            })
                            .catch(err => {
                               // console.log(err)
                            })
                    })

            })
            .catch(err => {
                let errorMessage = err.message;

                // Check for common Firebase errors and provide a user-friendly message
                if (err.code === 'auth/email-already-in-use') {
                    errorMessage = 'This email is already in use.';
                } else if (err.code === 'auth/invalid-email') {
                    errorMessage = 'The email address is not valid.';
                } else if (err.code === 'auth/weak-password') {
                    errorMessage = 'The password must be at least 6 characters.';
                }

                toast.error(errorMessage);
                //  setLoading(false);
            })
            .finally(() => { setLoading(false); })
    }


    return (
        <div className="my-10  relative overflow-hidden">
            <title>Sign Up</title>
            <div className="relative z-10">


                <motion.div
                    className=" backdrop-blur-lg border-3 border-secondary shadow-2xl rounded-3xl p-8"
                    variants={cardAnimation}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}>

                    <h2 className="mb-2 text-center drop-shadow-sm py-2">SignUp Now</h2>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                        {/* name field */}
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                {...register("name", { required: 'name is required',
                                    maxLength:{
                                        value: 20,
                                        message: 'name cannot greater than 20 characters'
                                    }
                                 })}
                            />
                            {errors.name && <p className='text-error'>{errors.name.message}</p>}
                        </div>


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


                        {/* email field */}
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
                                {...register("email", { 
                                    required: 'email is required',
                                pattern:{
                                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'enter a valid email'
                                } })}
                            />
                            {errors.email && <p className='text-error'>{errors.email.message}</p>}
                        </div>


                        <div className="relative">
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                type='password'
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
                                {...register("password", {
                                    required: 'password is required',
                                    minLength: {value: 6, message: 'password must have at least 6 characters'},
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                        message: 'password must have a capital letter and a small letter'
                                    }
                                }
                                )}
                            />
                            {errors.password && <p className='text-error'>{errors.password.message}</p>}
                           
                        </div>

                        <button type='submit' className="btn1 w-full">SignUp</button>

                    </form>


                    {/* Google Signin */}

                    <GoogleLogin></GoogleLogin>
                    <p className='py-2'>Already have an account? Please <Link to="/login" className='text-blue-700 font-semibold underline'>LogIn</Link></p>
                </motion.div>

            </div>

        </div>
    );
};

export default Register;