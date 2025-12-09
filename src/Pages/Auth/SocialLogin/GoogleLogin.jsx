import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FcGoogle } from 'react-icons/fc';


const GoogleLogin = () => {
    const { googleLogIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleLogIn = () => {
        googleLogIn()
            .then(result => {
                // console.log("after google login", result);
                //store user in database
                // const userInfo = {
                //     displayName: result.user?.displayName,
                //     email: result.user?.email,
                //     photoURL: result.user?.photoURL,
                // }
                // axiosSecure.post('/users', userInfo)
                //     .then(res => {
                //         if (res.data.insertedId) {
                //             console.log('user is stored');
                //             navigate(location?.state || "/");
                //         }
                //     })

            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <div className="divider w-full">OR</div>
            {/* Google */}
            <button
                onClick={handleGoogleLogIn}
                className="w-full btn2 flex items-center justify-center gap-2">
             <FcGoogle className='h-6 w-6' />
                Login with Google
            </button>
        </div>
    );
};

export default GoogleLogin;