import React, { Children } from 'react';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import ForbiddenPage from '../Pages/Errors/ForbiddenPage';
import Loader from '../Components/Shared/Loader'

const AdminRoute = ({ children }) => {
    const { role, roleLoading } = useRole();
    const { user, loading } = useAuth();
                                     
    if(loading || roleLoading){
        return <Loader></Loader>
    }
    if(!user || role !== 'admin'){
        return <ForbiddenPage></ForbiddenPage>
    }
    return children;
};

export default AdminRoute;