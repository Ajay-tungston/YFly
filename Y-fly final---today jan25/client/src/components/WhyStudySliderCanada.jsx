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
        <div className='flex '>
             <div className="hidden  md:flex items-center  h-screen -mt-40 -ml-48 ">
      <div className="text-[#BFBFBF]  font-urban text-lg writing-mode-vertical-rl transform rotate-90 w-72 text-[28px]">
        Why study in Canada
      </div>
    </div>
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
                modules={[Navigation, Pagination, Scrollbar, A11y,]}
                // navigation

                scrollbar={{ draggable: true }}

                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}

                className='h-[60vh] max-md:h-[65vh]'

            >

                <SwiperSlide>
                    <div className='  w-[90%] max-md:w-[100%]  border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white hidden sm:block'>
                        <div className='flex justify-center '>
                            <img src={whystudy1} width={280} alt='why study' className='rounded-t-[38px]' />
                        </div>

                        <div className='px-7'>
                            <div className='text-[#30589F] font-lato text-[15px] mt-3'>
                            High-Quality Education
                            </div>

                            <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                            <div className='font-lato max-lg:text-[0.9rem]'>
                            Students have access to globally recognized academic programs, advanced research opportunities, and innovative teaching methodologies, ensuring a world-class educational experience.
                            </div>

                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='  w-[90%] max-md:w-[100%] border-[1px] py-6 border-blac rounded-[38px] hover:shadow-right-bottom bg-white'>
                        <div className='flex justify-center'>
                            <img src={whystudy2} width={280} alt='why study img' className='rounded-t-[38px]' />
                        </div>
                        <div className='px-7'>
                            <div className='text-[#30589F] font-lato text-[15px] mt-3 '>
                            Abundant Work Opportunities
                            </div>

                            <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                            <div className='font-lato max-lg:text-[0.9rem]'>
                            Graduates benefit from various work prospects, including eligibility for post-graduation work permits, allowing them to gain valuable international work experience in their field of study.
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
                            <div className='text-[#30589F] font-lato text-[15px]  mt-3'>
                            Pathways to Permanent Residency
                            </div>

                            <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                            <div className='font-lato max-lg:text-[0.9rem]' >
                            Studying abroad can open doors to long-term immigration pathways, including options for permanent residency, especially for graduates who contribute to the local economy and workforce.

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
                            <div className='text-[#30589F] font-lato text-[15px]  mt-3'>
                            Diverse and Inclusive Environment
                            </div>

                            <div className='border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3'></div>

                            <div className='font-lato  max-lg:text-[0.9rem]' >
                            International destinations often foster a multicultural and inclusive society that welcomes students from all backgrounds, promoting cross-cultural understanding and global citizenship.


                            </div>

                        </div>


                    </div>
                </SwiperSlide>
            </Swiper>
          
    </div >
   
  )
}

export default WhyStudySlider