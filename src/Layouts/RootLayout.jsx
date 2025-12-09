import React from 'react';
import Home from '../Pages/Home/Home/Home';
import Footer from '../Components/Shared/Footer/Footer';
import Navbar from '../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
         <div className='flex flex-col min-h-screen'>
          <header>
            <Navbar></Navbar>
        </header>
        <main className='flex-1'>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
      </div>
    );
};

export default RootLayout;