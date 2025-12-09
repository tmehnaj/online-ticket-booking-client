import React from 'react';
import Container from '../Components/Shared/Container';
import Logo from '../Components/Shared/Logo/Logo';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
         <div className=' min-h-screen'>
          <Container>
              <div className='pt-5 flex justify-end'>
                <Link to="/"><Logo></Logo></Link>
            </div>
            <div className='flex flex-col-reverse md:flex-row gap-5 items-center my-15'>
                <div className='w-full'>
                    <Outlet></Outlet>
                </div>
                <div className='w-full'>
                    <figure>
                      <img src="" alt="" />
                    </figure>
                </div>
            </div>
          </Container>
        </div>
    );
};

export default AuthLayout;