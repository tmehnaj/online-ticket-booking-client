import axios from "axios";

// const instance = axios.create({
//      baseURL: 'https://online-ticket-booking-server-chi.vercel.app',
// })

const instance = axios.create({
     baseURL: 'https://online-ticket-booking-server-chi.vercel.app',
})

const useAxios = () => {
   return instance;
};

export default useAxios;