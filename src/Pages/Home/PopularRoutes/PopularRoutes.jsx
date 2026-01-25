import React from 'react';
import { MdDirectionsBus, MdTrain, MdFlight } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from '../../../Components/Shared/Container';

const routes = [
  { id: 1, from: "Dhaka", to: "Chittagong" },
  { id: 2, from: "Dhaka", to: "Cox’s Bazar" },
  { id: 3, from: "Dhaka", to: "Sylhet" },
  { id: 4, from: "Dhaka", to: "Rajshahi" },
];

const PopularRoutes = () => {
    return (
        <Container>
             <section className="py-16 my-30 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2>Popular Routes</h2>
          <p className="mt-3 text-base-content/70">
            Most booked routes by travelers
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {routes.map(route => (
            <div
              key={route.id}
              className="card scale bg-base-100 border border-base-300 
              shadow-sm hover:shadow-lg text-center"
            >
              <div className="card-body items-center">

                <h4 className="text-dark-blue">
                  {route.from} → {route.to}
                </h4>

                {/* Transport Icons */}
                <div className="flex gap-3 text-secondary my-3">
                  <MdDirectionsBus size={22} />
                  <MdTrain size={22} />
                  <MdFlight size={22} />
                </div>

                <Link to="/all-tickets">
                  <button className="card-btn">
                    View Tickets
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
        </Container>
    );
};

export default PopularRoutes;