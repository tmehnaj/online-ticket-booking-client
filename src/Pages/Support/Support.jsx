import React from 'react';
import { MdHelpOutline, MdPayment, MdEventSeat, MdSupportAgent } from "react-icons/md";
import Container from '../../Components/Shared/Container';

const Support = () => {
    return (
        <Container>
                <section className="min-h-screen bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Header */}
        <div className="text-center mb-14">
          <h1>Help & Support</h1>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Need help with booking, payments, or your tickets? We’re here to help you.
          </p>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="card scale bg-base-200 border border-base-300 shadow-sm hover:shadow-lg text-center">
            <div className="card-body items-center">
              <MdEventSeat size={34} className="text-secondary mb-3" />
              <h4 className="text-dark-blue">Booking Help</h4>
              <p className="text-sm text-base-content/70">
                Learn how to book tickets and track your booking status.
              </p>
            </div>
          </div>

          <div className="card scale bg-base-200 border border-base-300 shadow-sm hover:shadow-lg text-center">
            <div className="card-body items-center">
              <MdPayment size={34} className="text-secondary mb-3" />
              <h4 className="text-dark-blue">Payment Issues</h4>
              <p className="text-sm text-base-content/70">
                Facing issues with payment or refunds? Find solutions here.
              </p>
            </div>
          </div>

          <div className="card scale bg-base-200 border border-base-300 shadow-sm hover:shadow-lg text-center">
            <div className="card-body items-center">
              <MdHelpOutline size={34} className="text-secondary mb-3" />
              <h4 className="text-dark-blue">General Questions</h4>
              <p className="text-sm text-base-content/70">
                Common questions about TicketBari and how it works.
              </p>
            </div>
          </div>

          <div className="card scale bg-base-200 border border-base-300 shadow-sm hover:shadow-lg text-center">
            <div className="card-body items-center">
              <MdSupportAgent size={34} className="text-secondary mb-3" />
              <h4 className="text-dark-blue">Contact Support</h4>
              <p className="text-sm text-base-content/70">
                Reach out to our support team for personalized help.
              </p>
            </div>
          </div>

        </div>

        {/* FAQ Preview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h4 className="text-dark-blue">How do I book a ticket?</h4>
                <p className="text-sm text-base-content/70">
                  Select your route, choose a ticket, and complete the booking by making a payment.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h4 className="text-dark-blue">Can I cancel my booking?</h4>
                <p className="text-sm text-base-content/70">
                  You can cancel a booking before the vendor accepts the request.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h4 className="text-dark-blue">What payment methods are supported?</h4>
                <p className="text-sm text-base-content/70">
                  We support secure online payments through Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-base-200 border border-base-300 rounded-2xl p-10">
          <h3 className="text-dark-blue mb-3">Still need help?</h3>
          <p className="text-base-content/70 mb-6">
            Contact our support team and we’ll get back to you as soon as possible.
          </p>
          <button className="btn1">
            Contact Support
          </button>
        </div>

      </div>
    </section>
        </Container>
    );
};

export default Support;