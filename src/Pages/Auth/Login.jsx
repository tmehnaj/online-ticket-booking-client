import React from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { motion } from "framer-motion";
import GoogleLogin from './SocialLogin/GoogleLogin';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser, setLoading, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (user) {
        return navigate(location?.state || '/');
    }

    const handleLogIn = (data) => {

        signInUser(data.email, data.password)
            .then(result => {

                toast.success('Log In Successfully!');
                navigate(location?.state || '/');
            })
            .catch(err => {
                //  console.log(err.message);

                if (err.code === 'auth/invalid-email') {
                    toast.error('Invalid email address. Please enter a valid one.');
                }
                else if (err.code === 'auth/user-disabled') {
                    toast.error('This account has been disabled. Please contact support.');
                }
                else if (err.code === 'auth/user-not-found') {
                    toast.error('No user found with this email.');
                }
                else if (err.code === 'auth/wrong-password' || err.message.includes('invalid-credential')) {
                    toast.error('Wrong email or password.');
                }
                else if (err.code === 'auth/too-many-requests') {
                    toast.error('Too many failed attempts. Please try again later.');
                }
                else if (err.code === 'auth/network-request-failed') {
                    toast.error('Network error. Check your internet connection.');
                }
                else {
                    toast.error('Something went wrong. Please try again later.');
                }

            })
            .finally(() => { setLoading(false); })
    }


    return (
        <div className="my-10  overflow-hidden">
            <title>Log In</title>
            <div className=" z-10">

                <motion.div
                    className="backdrop-blur-lg border-3 border-secondary shadow-2xl rounded-3xl p-8"
                    variants={cardAnimation}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}>

                    <h2 className="mb-2 text-center drop-shadow-sm py-2">LogIn Now</h2>

                    <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                                {...register("email", { required: true })}
                            />
                            {errors.email?.type === 'required' && <p className='text-error'>Email is required</p>}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                type='password'
                                placeholder="Enter Your Password"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                                }
                                )}
                            />
                            {errors.password?.type === 'required' && <p className='text-error'>Password is required</p>}
                            {
                                errors.password?.type === 'minLength' && <p className='text-error'>Password must have 6 characters</p>
                            }
                            {
                                errors.password?.type === 'pattern' && <p className='text-error'>Password must have at least one capital letter, one small letter.</p>
                            }

                            <p className="hover:underline cursor-pointer" > Forget password</p>
                        </div>

                        <button type='submit' className="btn1 w-full">Login</button>

                    </form>

                    {/* Google Signin */}

                    <GoogleLogin></GoogleLogin>
                    <p className='py-2'>New to Our Website? Please <Link className='text-blue-700  font-semibold underline' state={location?.state} to="/register">Register</Link></p>
                </motion.div>
            </div>

        </div>
    );

};

export default Login;