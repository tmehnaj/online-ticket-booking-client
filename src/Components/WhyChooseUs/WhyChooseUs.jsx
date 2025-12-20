import React from "react";
import { FaBusAlt, FaShieldAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const cardAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <div className="container mx-auto my-16 px-2 md:px-0">
      {/* Section Heading */}
      <motion.h2
        className="text-center text-dark-blue my-10 text-3xl md:text-4xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Why Choose TicketBari?
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <motion.div
          className="bg-base-200 p-6 rounded-xl shadow-sm flex gap-4"
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FaBusAlt className="w-12 h-12 text-secondary" />
          <div>
            <h3 className="text-dark-blue font-semibold">
              Multiple Transport Options
            </h3>
            <p className="text-base-content text-sm">
              Book bus, train, launch, and flight tickets from one platform.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-base-200 p-6 rounded-xl shadow-sm flex gap-4"
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <FaShieldAlt className="w-12 h-12 text-secondary" />
          <div>
            <h3 className="text-dark-blue font-semibold">
              Verified Tickets
            </h3>
            <p className="text-base-content text-sm">
              All tickets are approved by admin to ensure safe and trusted booking.
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-base-200 p-6 rounded-xl shadow-sm flex gap-4"
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FaClock className="w-12 h-12 text-secondary" />
          <div>
            <h3 className="text-dark-blue font-semibold">
              Real-Time Booking
            </h3>
            <p className="text-base-content text-sm">
              View live availability, countdown timers, and instant booking status.
            </p>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="bg-base-200 p-6 rounded-xl shadow-sm flex gap-4"
          variants={cardAnimation}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <FaMoneyBillWave className="w-12 h-12 text-secondary" />
          <div>
            <h3 className="text-dark-blue font-semibold">
              Secure Payment
            </h3>
            <p className="text-base-content text-sm">
              Fast and secure payments powered by Stripe with full transaction history.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
