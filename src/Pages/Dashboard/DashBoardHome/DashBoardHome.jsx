import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loader from  '../../../Components/Shared/Loader'
import Profile from './Profile';
import VendorProfile from './VendorProfile';
import AdminProfile from './AdminProfile';

const DashBoardHome = () => {
    const { role, roleLoading} = useRole();

 if(roleLoading){
    return <Loader></Loader>
 }


    if (role === 'admin') {
        return <AdminProfile></AdminProfile>
    }
    else if (role === 'vendor') {
        return <VendorProfile></VendorProfile>
    }
    else {
        return <Profile></Profile>
    }
};

export default DashBoardHome;