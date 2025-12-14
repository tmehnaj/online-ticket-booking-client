import React from 'react';
import { Link } from 'react-router';
import { IoIosCall } from 'react-icons/io';
import { TfiEmail } from 'react-icons/tfi';
import { FaAddressBook, FaCcStripe } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Logo from '../Logo/Logo';
import Container from '../Container';
import { BsStripe } from 'react-icons/bs';

const Footer = () => {
    return (
               <footer className=" bg-primary-content text-dark-content font-semibold ">
  <Container>
    <div className='footer sm:footer-horizontal px-9 py-12  text-center md:text-left'>
    <aside className='flex flex-col  text-left'>
   <Link to="/">
   <Logo></Logo>
   </Link>
    <p className='mt-0 pt-0 text-base'>
      “Book bus, train, launch & flight tickets easily”
    </p>
  </aside>
  <nav>
    <h6 className="footer-title font-bold text-base">Quick Links</h6>
    <Link to="/" className="link link-hover text-base">Home</Link>
    <Link to='/all-tickets' className="link link-hover text-base">All Tickets</Link>
    <Link className="link link-hover text-base">Contact Us</Link>
    <Link to="/about" className="link link-hover text-base">About</Link>
  </nav>

    <nav>
    <h6 className="footer-title font-bold text-base">Contact Info.</h6>
    <a className="link link-hover text-base flex items-center gap-2"><TfiEmail />
    ticekt_bari@gmail.com</a>
    <a className="link link-hover text-base flex items-center gap-2"><IoIosCall /> +8801700000000</a>
     <a className="link link-hover text-base flex items-center gap-2"><FaAddressBook />123, Dhaka, Bangladesh</a>
  </nav>

  <nav>
    <h6 className="footer-title font-bold text-base">Payment Methods</h6>
    <Link className="link link-hover text-base flex items-center gap-2"><BsStripe />   Stripe</Link>
    
  </nav>


  </div>
  </Container>
  <hr className=" border-gray-400 mx-4"/>

   
  <Container>
    <div className='px-10 py-8 flex flex-col items-center gap-3 text-xs  text-dark-content font-normal'>
        <nav>
    <div className="flex gap-4 ">
      <a>
        <FaXTwitter className='fill-current w-6 h-6'/>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside>
    <p className='text-sm '>Copyright © {new Date().getFullYear()} - 2025 TicketBari. All rights reserved.</p>
  </aside>
  </div>
  </Container>
</footer>
    );
};

export default Footer;