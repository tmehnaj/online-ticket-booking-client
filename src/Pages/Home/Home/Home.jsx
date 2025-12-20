import React from 'react';
import Navbar from '../../../Components/Shared/Navbar/Navbar';
import TicketCard from '../../../Components/Shared/TicketCard/TicketCard';
import AdvertiseSection from '../AdvertiseSection/AdvertiseSection';
import LatestSection from '../LatestSection/LatestSection';
import Slide from '../Banner/Slide';
import Newsletter from '../../../Components/NewsLetter/NewsLetter';
import FAQ from '../../../Components/FAQ/FAQ';
import WhyChooseUs from '../../../Components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Slide></Slide>
   <AdvertiseSection></AdvertiseSection>
   <WhyChooseUs></WhyChooseUs>
   <LatestSection></LatestSection>
   <FAQ></FAQ>
   <Newsletter></Newsletter>
        </div>
    );
};

export default Home;