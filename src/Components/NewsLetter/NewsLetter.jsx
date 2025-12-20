import React from 'react';
import { toast } from 'react-toastify';
import { FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {
     const handleSubscribe = (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        if(!email.trim()){
            toast.error('Please Enter Your Email')
        }else{
            toast.success('Subscription Successful');
        }
        
        e.target.reset();
    }

    return (
   <section className=" px-4 py-16">
      <div className="bg-linear-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelopeOpenText className="text-3xl" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Subscribe to Our Newsletter
              </h2>
            </div>
            <p className="text-white/90 max-w-md">
              Get the latest ticket deals, new routes, and exclusive offers
              delivered straight to your inbox.
            </p>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered py-1.5 w-full text-base-content rounded-3xl"
              required
            />
            <button className="card-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
    );
};

export default Newsletter;