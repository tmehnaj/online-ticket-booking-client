import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

import { FcGoogle } from 'react-icons/fc';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import GoogleLogin from './SocialLogin/GoogleLogin';
import { AuthContext } from '../../Providers/AuthContext';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

const Login = () => {
    const { signInUser, googleSignIn, setUser, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    //   const emailRef = useRef();


    //  const handleEmailOnChange = (e) => {
    //     const email = e.target.value;
    //     const regxForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (!email.trim()) {
    //         setError('Email is required');
    //     } else if (!regxForEmail.test(email)) {
    //         setError('Please enter a valid email');
    //     } else {
    //         setError('');
    //     }
    // }




    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        //clean
        setError('');
        signInUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                toast.success('Log In Successfully!');
                e.target.reset();
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
        <div className="my-10  relative overflow-hidden">
            <title>Log In</title>
            <div className="relative z-10">

                <motion.div
                    className="max-w-md backdrop-blur-lg border-3 border-secondary shadow-2xl rounded-3xl p-8"
                    variants={cardAnimation}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}>

                    <h2 className="mb-2 text-center drop-shadow-sm py-2">LogIn Now</h2>

                    <form onSubmit={handleLogIn} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                // onChange={handleEmailOnChange}
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your Email"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                // type={show ? "text" : "password"}
                                type='password'
                                name="password"
                                required
                                placeholder="Enter Your Password"
                                autoComplete="off"
                                autoCorrect="off"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
                            />

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