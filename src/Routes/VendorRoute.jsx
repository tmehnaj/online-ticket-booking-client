import React from 'react';
import ForbiddenPage from '../Pages/Errors/ForbiddenPage';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loader from '../Components/Shared/Loader'

const VendorRoute = ({ children }) => {
     const { role, roleLoading } = useRole();
        const { user, loading } = useAuth();
                                         
        if(loading || roleLoading){
            return <Loader></Loader>
        }
        if(!user || role !== 'vendor'){
            return <ForbiddenPage></ForbiddenPage>
        }
        return children;
};

export default VendorRoute;