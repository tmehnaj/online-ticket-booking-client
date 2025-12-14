import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
    const { user } = useAuth();
    const { role } = useRole();
    
    return (
         <div className=' flex items-center justify-center my-40 px-2'>
            <title>Profile</title>
            <div className='border-transparent bg-base-300 py-15 px-20 rounded-2xl max-w-[600px] flex flex-col items-center  sm:flex-row gap-10'>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2 shadow-lg shadow-amber-100">
                        <img src={user?.photoURL || <FaUserCircle />} />
                    </div>
                </div>
                <div className='text-base-content'>
                    <p><span className='font-bold'>Name:</span> {user?.displayName || 'Update Profile'}</p>
                    <p><span className='font-bold'>Email</span> {user?.email || user?.providerData[0]?.email || user?.providerData[0]?.uid}</p>
                    <p>
                        <span className='font-bold'>Role:</span> <strong>{role}</strong>
                    </p>
                </div>
            </div>

           

        </div>
    );
};

export default Profile;