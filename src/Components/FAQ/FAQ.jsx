import React from 'react';
import Container from '../Shared/Container';


const FAQ = () => {
    return (
       <Container>
          <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 mt-3">
          Everything you need to know about booking tickets on TicketBari
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {/* FAQ 1 */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-medium">
            How do I book a ticket?
          </div>
          <div className="collapse-content text-base-content">
            <p>
              Simply browse available tickets, view ticket details, click on
              the <strong>Book Now</strong> button, select your quantity, and
              confirm the booking. Payment is required after vendor approval.
            </p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-medium">
            When can I make the payment?
          </div>
          <div className="collapse-content text-base-content">
            <p>
              You can make the payment only after the vendor accepts your
              booking request. Once accepted, a <strong>Pay Now</strong> button
              will appear in your dashboard.
            </p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-medium">
            Can I cancel a booking?
          </div>
          <div className="collapse-content text-base-content">
            <p>
              Yes, you can cancel a booking only before the vendor accepts your
              request. Once accepted, cancellation is no longer available.
            </p>
          </div>
        </div>

        {/* FAQ 4 */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-medium">
            Are all tickets verified?
          </div>
          <div className="collapse-content text-base-content">
            <p>
              Yes. Every ticket is reviewed and approved by an admin before it
              appears on the platform to ensure reliability and quality.
            </p>
          </div>
        </div>

        {/* FAQ 5 */}
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-medium">
            Is my payment information secure?
          </div>
          <div className="collapse-content text-base-content">
            <p>
              Absolutely. All payments are processed securely using
              <strong> Stripe</strong>, and we do not store your card details.
            </p>
          </div>
        </div>
      </div>
    </section>
       </Container>
    );
};

export default FAQ;