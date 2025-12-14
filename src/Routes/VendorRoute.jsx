import React from 'react';
import ForbiddenPage from '../Pages/Errors/ForbiddenPage';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const VendorRoute = ({ children }) => {
    const { user, loading} = useAuth();
    const {role, roleLoading} = useRole();

    if( loading || roleLoading){
        return <Loader></Loader>
    }
    if( !user || role !== 'rider'){
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default VendorRoute;