import React from 'react';

const Cancelled = () => {
    return (
        <div className=' my-20 px-5'>
            <h1 className='text-secondary mb-10'>Payment is Cancelled</h1>
            <Link to="/dashboard/booked-tickets"><button className='btn1'>Try Again</button></Link>
        </div>
    );
};

export default Cancelled;