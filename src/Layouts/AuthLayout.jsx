import React from 'react';
import Container from '../Components/Shared/Container';
import Logo from '../Components/Shared/Logo/Logo';
import { Link, Outlet } from 'react-router';
import transportImg from '../assets/transport.jpg'

const AuthLayout = () => {
    return (
         <div className=' min-h-screen'>
          <Container>
              <div className='pt-5 flex justify-end'>
                <Link to="/"><Logo></Logo></Link>
            </div>
            <div className='flex flex-col-reverse lg:flex-row-reverse gap-5 sm:gap-8 md:gap-20 items-center justify-center my-20 '>
                <div className='w-full max-w-md'>
                    <Outlet></Outlet>
                </div>
                <div className='w-full max-w-sm md:max-w-md lg:max-w-xl'>
                    <figure >
                      <img src={transportImg} alt="" className='rounded-3xl'/>
                    </figure>
                </div>
            </div>
          </Container>
        </div>
    );
};

export default AuthLayout;