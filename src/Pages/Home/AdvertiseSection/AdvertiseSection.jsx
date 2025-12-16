import React from 'react';
import Container from '../../../Components/Shared/Container';
import TicketCard from '../../../Components/Shared/TicketCard/TicketCard';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const AdvertiseSection = () => {
    const axiosSecure = useAxiosSecure();
    //    const { user } = useAuth();


    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['tickets', 'advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets/advertise?advertiseStatus=advertise');
            return res.data;
        }
    })


    return (
        <Container>
            <div className='my-20'>

                <h2 className='text-dark-blue pb-12 text-center'>Featured Tickets</h2>

                <Swiper
                    loop={true}
                    slidesPerView={3}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    speed={3000}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    freeMode={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {
                        tickets.map((ticket, index) => <SwiperSlide key={index}>
                            <TicketCard ticket={ticket}></TicketCard>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </Container>
    );
};

export default AdvertiseSection;