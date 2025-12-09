import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { AuthContext } from '../../Providers/AuthContext';
import toast from 'react-hot-toast';
import GoogleLogin from './SocialLogin/GoogleLogin';

const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};


const Register = () => {
    const [error, setError] = useState('');
    // const [eye,setEye] = useState(false);
    const { createUser, setUser, googleSignIn, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    // const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        //  console.log(e.target);
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (name.trim().length > 30) {
            setError('Name cannot be longer than 30 characters');
            return;
        }
        //clean
        setError('');

        //regular expression for password
        // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        // if (!passwordPattern.test(password)) {
        //   setError('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter');
        //   return;
        // }
        createUser(email, password)
            .then(result => {
                const newUser = result.user;
                setUser(newUser);
                // setLoading(false);
                toast.success('Your account has been created successfully!');
                e.target.reset();
                navigate('/');
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



    //   const handleEmailOnChange = (e) => {
    //     const email = e.target.value;
    //     const regxForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (!email.trim()) {
    //       setError('Email is required');
    //     } else if (!regxForEmail.test(email)) {
    //       setError('Please enter a valid email');
    //     } else {
    //       setError('');
    //     }
    //   }


    return (
        <div className="my-10  relative overflow-hidden">
            <title>Sign Up</title>
            <div className="relative z-10">


                <motion.div
                    className="max-w-md backdrop-blur-lg border-3 border-secondary shadow-2xl rounded-3xl p-8"
                    variants={cardAnimation}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}>

                    <h2 className="mb-2 text-center drop-shadow-sm py-2">SignUp Now</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* name field */}
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-3xl"
                            />
                        </div>


 {/* image field */}
                        <div>
                            <label className="block text-sm mb-1">Upload Image</label>
                            <input
                                type="file"
                                name="Upload Image"
                                placeholder="Image"
                                className="file-input input-bordered w-full bg-white/20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl placeholder-blue"
                            />
                        </div>


                        {/* email field */}
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input
                                // onChange={handleEmailOnChange}
                                type="email"
                                name="email"
                                required
                                placeholder="Enter your Email"
                                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
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
                                className="input input-bordered w-full bg-white/20  focus:outline-none focus:ring-2 focus:ring-blue-200  rounded-3xl"
                            />
                            {/* <span
                                   onClick={() => setShow(!show)}
                                   className="absolute right-3 top-9 cursor-pointer z-50"
                               >
                                   {show ? <FaEye /> : <IoEyeOff />}
                               </span> */}

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