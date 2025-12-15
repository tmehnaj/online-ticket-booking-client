import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaStore, FaStoreSlash } from 'react-icons/fa';
import { ImBlocked } from "react-icons/im";

const ManageUsers = () => {
    const [searchText, setSearchText] = useState('');
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })


    const handleMakeAdmin = user => {
        const userUpdateInfo = {
            role: 'admin',
        }
        axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user?.displayName} is now Admin`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRemoveAdmin = user => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const userUpdateInfo = {
                    role: 'user',
                }
                axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user?.displayName} is removed from Admin`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });

    }


    const handleMakeVendor = user => {
        const userUpdateInfo = {
            role: 'vendor',
        }
        axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user?.displayName} is accepted as Vendor`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleRemoveVendor = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const userUpdateInfo = {
                    role: 'user',
                }
                axiosSecure.patch(`/users/${user._id}/role`, userUpdateInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user?.displayName} is rejected as Vendor`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        });

    }

    return (
        <div className='p-10 md:p-15 lg:p-20'>
            <title>Manage Users</title>
            <h2 className='text-4xl text-dark-blue'>All Users: {users.length}</h2>
            <label className="input m-10">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search" required placeholder="Search" />
            </label>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {
                                    user.role === 'admin' ? <span className='badge bg-green-500 text-black font-bold'>admin</span>
                                        : user.role === 'vendor' ? <span className='badge badge-warning text-black font-bold'>vendor</span>
                                            : <span className='badge badge-info text-black font-bold'>user</span>
                                }
                            </td>
                            <td>
                                {user.role === 'admin' ?
                                    <button
                                        onClick={() => handleRemoveAdmin(user)}
                                        className='btn bg-secondary tooltip tooltip-info' data-tip="Remove Admin">
                                        <FiShieldOff className='text-black h-4 w-4'></FiShieldOff>                                  </button> :
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className='btn bg-green-500  tooltip tooltip-info' data-tip="Mark as Admin">
                                        <MdAdminPanelSettings className='text-black h-4 w-4' />
                                    </button>
                                }
                            </td>
                            <td className='flex items-center gap-3'>
                                <div>
                                    {user.role === 'vendor' ?
                                        <button
                                            onClick={() => handleRemoveVendor(user)}
                                            className='btn bg-secondary tooltip tooltip-info' data-tip="Remove Vendor">
                                            <FaStoreSlash className='text-black h-4 w-4' />                                  </button> :
                                        <button
                                            onClick={() => handleMakeVendor(user)}
                                            className='btn bg-warning  tooltip tooltip-info' data-tip="Mark as Vendor">
                                            <FaStore className='text-black h-4 w-4' />
                                        </button>
                                    }
                                </div>
                                <div>
                                    {
                                        user.role === 'vendor' && <button

                                            className='btn bg-red-700  tooltip tooltip-info' data-tip="Mark as Fraud">
                                            <ImBlocked className='text-black h-4 w-4' />
                                        </button>
                                    }
                                </div>
                            </td>
                        </tr>)}



                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;