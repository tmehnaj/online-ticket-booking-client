import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loader from '../../../../Components/Shared/Loader'

const Success = () => {
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const session_Id = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (session_Id) {
            axiosSecure.patch(`/payment-success?session_id=${session_Id}`)
                .then(res => {
                    setPaymentInfo(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    // console.error(err);
                    setLoading(false);
                });
        }
    }, [session_Id, axiosSecure]);

  if(loading){
    return <Loader></Loader>
  }

    return (
        <div className=' my-20 px-5 '>
            <h1 className='text-secondary'>Payment is Successful!</h1>
            <div className='my-10 text-accent-content space-y-4'>
                <p> <strong>Ticket Title:</strong> {paymentInfo.ticketTitle}</p>
                <p> <strong>User Email:</strong> {paymentInfo.customer_email}</p>
                <p> <strong>Your Transaction Id:</strong> {paymentInfo.transactionId}</p>

            </div>
        </div>
    );
};

export default Success;