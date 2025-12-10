import React from 'react';
import Container from '../../Components/Shared/Container';

const mission = [
    {
        title: "Mission",
        details: "To make transportation booking fast, transparent, and hassle-free for everyone."
    },
     {
        title: "Reliable Ticket Availability",
        details: "We ensure tickets are always up-to-date so you can book with confidence—any time, from anywhere."
    },
     {
        title: "Secure Online Booking",
        details: "Your transactions are protected with strong security measures to keep your information safe."
    },
     {
        title: "Transparent Pricing",
        details: "What you see is what you pay—no hidden fees, no confusion."
    },
     {
        title: "User-Friendly Experience",
        details: "Simple layouts, easy navigation, and smooth interaction designed for all travelers."
    }
]

const About = () => {
    return (
        <div className="flex items-center justify-center my-10 md:my-15 ">
            <title>About Us</title>
            <Container>
                <div class=" shadow-xl rounded-2xl text-center p-5 md:p-10 backdrop-blur-lg ">
                    <h2 className='drop-shadow-lg pb-5 text-dark-blue'>Who We Are?</h2>
                    <div className='text-base pb-6 '>
                        <p>
                            Welcome to TicketBari, your trusted digital partner for buying travel tickets easily, safely, and quickly.
                            We created this platform to make your journey smoother—whether you’re traveling by bus, train, or launch.

                            Our goal is simple:
                            To bring all travel services into one place so you can book your tickets with confidence.
                        </p>
                    </div>

                    <div className='my-7'>
                         <h2 className='drop-shadow-lg pb-5 text-dark-blue'>Our Mission</h2>
                    <div className='text-base pb-6'>
                       {
                        mission.map(term=> <div className='bg-[#FFE5E5] shadow-sm rounded-2xl p-6 text-left mb-5'>
                            <h4 className='text-[#1E293B] mb-2'>{term.title}</h4>
                            <p className='text-accent-content'>{term.details}</p>
                        </div>)
                       }
                    </div>
                    </div>


                    <div className="border-3 border-secondary rounded-lg p-6 bg-base-100 text-base-content space-y-1">
                        <h2 className='pb-1 text-dark-blue'>Contact Information</h2>
                        <p ><strong>Email:</strong> <a href="" className=" hover:underline">ticket_bari@gmail.com</a></p>
                        <p><strong>Phone:</strong> +8801700000000</p>
                         <p ><strong>Address:</strong> 123, Dhaka, Bangladesh</p>
                    </div>
                </div>
            </Container>
        </div>

    );
};

export default About;