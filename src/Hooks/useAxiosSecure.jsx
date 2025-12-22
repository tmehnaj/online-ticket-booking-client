import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import ForbiddenPage from "../Pages/Errors/ForbiddenPage";
import { toast } from "react-toastify";

// const instance = axios.create({
//     baseURL: 'https://online-ticket-booking-server-chi.vercel.app',
// })

const instance = axios.create({
    baseURL: 'https://online-ticket-booking-server-chi.vercel.app',
})

const useAxiosSecure = () => {
    // console.log('from axios secure')
    const { user, logOutUser } = useAuth();
    // console.log('user from axios secure',user)
    useEffect(() => {
        // console.log('from axios secure useeffect')
        const requestInterceptors = instance.interceptors.request.use((config) => {
           if (user?.accessToken) {
            // console.log("Setting Auth Header:", `Bearer ${user.accessToken.substring(0, 10)}...`);
        config.headers.authorization = `Bearer ${user.accessToken}`;
    }
            return config;
        })

        const responseInterceptors = instance.interceptors.response.use((res)=>{
            return res;
        },(err)=>{
           // console.log(err);
            if(err.status === 401){
             return  toast.error('unauthorized access');
                // logOutUser()
                // .then(()=>{})
                // .catch()
            }
            if(err.status === 403){
               return toast.error('forbidden access');
            }
        })
   
        return () => {
            instance.interceptors.request.eject(requestInterceptors);
            instance.interceptors.response.eject(responseInterceptors);
        }
    }, [user,logOutUser])

    return instance;
};

export default useAxiosSecure;