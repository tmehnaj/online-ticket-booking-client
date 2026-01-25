import React from 'react';
import { MdSearch, MdConfirmationNumber, MdPayment, MdDirectionsBus } from "react-icons/md";
import Container from '../../../Components/Shared/Container';


const steps = [
  {
    id: 1,
    title: "Search Routes",
    desc: "Find tickets by selecting your departure and destination.",
    icon: <MdSearch size={32} />,
  },
  {
    id: 2,
    title: "Choose Ticket",
    desc: "Compare price, transport type, and perks easily.",
    icon: <MdConfirmationNumber size={32} />,
  },
  {
    id: 3,
    title: "Book & Pay",
    desc: "Confirm your seat and pay securely using Stripe.",
    icon: <MdPayment size={32} />,
  },
  {
    id: 4,
    title: "Travel Smart",
    desc: "Enjoy a smooth journey with verified vendors.",
    icon: <MdDirectionsBus size={32} />,
  },
];

const HowItWorks = () => {
    return (
        <Container>
                <section className="py-16 my-30 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2>How TicketBari Works</h2>
          <p className="mt-3 text-base-content/70">
            Book your journey in just a few simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div
              key={step.id}
              className="card scale bg-base-200 border border-base-300 shadow-sm hover:shadow-lg text-center"
            >
              <div className="card-body items-center">
                
                <div className="w-14 h-14 rounded-full bg-soft-green text-secondary 
                  flex items-center justify-center mb-4">
                  {step.icon}
                </div>

                <h4 className="text-dark-blue">{step.title}</h4>
                <p className="text-sm text-base-content/70">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
        </Container>
    );
};

export default HowItWorks;