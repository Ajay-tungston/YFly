import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import whystudy1 from '../assets/images/image/whystudy1.svg'
import whystudy2 from '../assets/images/image/whystudy2.svg'
import whystudy3 from '../assets/images/image/whystudy3.svg'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import '../assets/styles/styles.css'
const WhyStudySlider = () => {
  return (
    <div className='flex mt-10'>
         <Swiper
        breakpoints={{
            1440: {
                spaceBetween: 0,
                slidesPerView: 3,
            },
            1024: {
                spaceBetween: 0,
                slidesPerView: 2,
            },
            768: {
                spaceBetween: 0,
                slidesPerView: 2,
            },
            425: {
                spaceBetween: 0,
                slidesPerView: 1,
            },
            320: {
                spaceBetween: 0,
                slidesPerView: 1,
            },
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Configure autoplay
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}

        className='h-[70vh] max-md:h-[65vh]'

    >
    <SwiperSlide>
            <div className='  w-[90%] max-md:w-[100%]  border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white'>
                    <div className='flex justify-center '>
                        <img src={whystudy1} width={300} alt='why study' className='rounded-t-[38px]' />
                    </div>

                    <div className='px-6'>
                        <div className='text-[#30589F] font-dela text-[15px] mt-3'>
                            World-Class Education Awaits
                        </div>

                        <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                        <div className='font-urban max-lg:text-[0.9rem]'>
                            The USA offers access to some of the world's most respected universities, renowned for their cutting-edge research and innovative programs. Earning a degree from a US institution will equip you with valuable skills and a globally recognized credential.
                        </div>

                    </div>

                </div>
</SwiperSlide>
<SwiperSlide>
                    <div className='  w-[90%] max-md:w-[100%] border-[1px] py-6 border-blac rounded-[38px] hover:shadow-right-bottom bg-white'>
                            <div className='flex justify-center'>
                                <img src={whystudy2} width={300} alt='why study img' className='rounded-t-[38px]' />
                            </div>
                            <div className='px-6'>
                                <div className='text-[#30589F] font-dela text-[15px] mt-3 '>
                                    Diverse Learning Environment
                                </div>

                                <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                                <div className='font-urban max-lg:text-[0.9rem]'>
                                    Immerse yourself in a diverse learning environment with students from around the world, expanding your worldview and building a valuable global network. US universities offer a wide range of programs to match your academic and career goals.
                                </div>

                            </div>
                        </div>
</SwiperSlide>
<SwiperSlide>

                        <div className='  w-[90%] max-md:w-[100%] border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white max-xl:pb-12 '>
                            <div className='flex justify-center '>
                                <img src={whystudy3} width={300} alt='why study' className='rounded-t-[38px]' />
                            </div>

                            <div className='px-7'>
                                <div className='text-[#30589F] font-dela text-[15px]  mt-3'>
                                    Experience American Life, Build Skills
                                </div>

                                <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                                <div className='font-urban max-lg:text-[0.9rem]' >
                                    Explore beyond the classroom in the USA. Immerse yourself in American culture, from stunning landscapes to bustling cities. Gain independence and develop lifelong skills that empower your future.
                                </div>

                            </div>


                        </div>
</SwiperSlide>
    </Swiper>
    </div>
   
  )
}

export default WhyStudySlider