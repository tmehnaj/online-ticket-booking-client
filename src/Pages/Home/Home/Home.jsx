import React from 'react';
import Navbar from '../../../Components/Shared/Navbar/Navbar';
import TicketCard from '../../../Components/Shared/TicketCard/TicketCard';
import AdvertiseSection from '../AdvertiseSection/AdvertiseSection';
import LatestSection from '../LatestSection/LatestSection';
import Slide from '../Banner/Slide';

const Home = () => {
    return (
        <div>
            <Slide></Slide>
   <AdvertiseSection></AdvertiseSection>
   <LatestSection></LatestSection>
        </div>
    );
};

export default Home;