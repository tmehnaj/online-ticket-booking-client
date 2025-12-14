import React from 'react';
import Home from '../Pages/Home/Home/Home';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet, ScrollRestoration } from 'react-router';

const RootLayout = () => {
    return (
         <div className='flex flex-col min-h-screen'>
          <header className='sticky top-0 z-50'>
            <Navbar></Navbar>
        </header>
        <main className='flex-1'>
            <ScrollRestoration></ScrollRestoration>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
      </div>
    );
};

export default RootLayout;