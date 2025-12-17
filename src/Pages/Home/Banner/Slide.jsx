import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const Slide = () => {
    const slidesData = [
        {
            id: 1,
            title: "Your Gateway to Every Journey",
            description: "Experience the ultimate convenience in travel booking. Whether it's by road, rail, water, or air, find your perfect ticket in seconds.",
            image: "https://i.ibb.co.com/3ykY6Nbq/ashique-anan-abir-p-Mf7c5w7-Dmc-unsplash.jpg",
            btnText: "Check All Tickets",
            // Using your theme's dark blue and soft green variables
            textBg: "bg-[var(--color-base-200)]",
            titleColor: "text-[var(--color-secondary)]"
        },
        {
            id: 2,
            title: "Travel with Peace of Mind",
            description: "Verified vendors, secure payments, and 24/7 support. We ensure your journey is as comfortable as the booking process.",
            image: "https://i.ibb.co.com/Z1N3fP20/images-1.jpg",
            btnText: "Explore",
            textBg: "bg-[var(--color-soft-green)]",
            titleColor: "text-[var(--color-dark-green)]"
        },
        {
            id: 3,
            title: "Best Rates Guaranteed",
            description: "Compare prices across multiple transport types and choose the one that fits your budget. No hidden fees, just transparency.",
            image: "https://i.ibb.co.com/r1N7pLW/bernd-dittrich-N4dsl3vm3to-unsplash.jpg",
            btnText: "Check All Tickets",
            textBg: "bg-[var(--color-base-200)]",
            titleColor: "text-[var(--color-secondary)]"
        }
    ];

    return (
        <div className="mb-20 rounded-b-2xl overflow-hidden shadow-xl ">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                emulateTouch={true}
            >
                {slidesData.map((slide) => (
                    <div key={slide.id} className={`flex flex-col md:flex-row items-center ${slide.textBg} min-h-[400px] lg:h-[500px]`}>
                        
                        {/* Left Side: Content Area */}
                        <div className="w-full md:w-1/2 p-10 md:p-16 text-left flex flex-col justify-center">
                            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight ${slide.titleColor}`}>
                                {slide.title}
                            </h2>
                            <p className="text-base-content text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                                {slide.description}
                            </p>
                            <div>
                                <Link to="/all-tickets">
                                    {/* Using your Primary Green for the Button */}
                                    <button className="px-10 py-4 bg-secondary text-primary-content hover:opacity-90 transition-all duration-300 rounded-lg font-bold uppercase tracking-widest text-sm shadow-lg transform hover:scale-105">
                                        {slide.btnText}
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Visual Area */}
                        <div className="w-full md:w-1/2 h-72 md:h-full overflow-hidden">
                            <img 
                                src={slide.image} 
                                className="w-full h-full object-cover transition-transform duration-3000 hover:scale-110" 
                                alt="Travel" 
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slide;