import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loader from '../Components/Shared/Loader';

const PrivateRoutes = ({children}) => {
   const { user, loading} = useAuth();
    const location = useLocation();
    // console.log(location.pathname);

    if(loading){
        return <Loader></Loader>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoutes;