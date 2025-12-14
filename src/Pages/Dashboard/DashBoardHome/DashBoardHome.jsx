import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loader from  '../../../Components/Shared/Loader'
import Profile from './Profile';

const DashBoardHome = () => {
    const { role, roleLoading} = useRole();

 if(roleLoading){
    return <Loader></Loader>
 }

    return <Profile></Profile>
};

export default DashBoardHome;