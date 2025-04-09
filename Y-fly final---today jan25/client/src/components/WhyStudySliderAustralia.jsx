import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import whystudy1 from '../assets/images/image/whystudy1.svg';
import whystudy2 from '../assets/images/image/whystudy2.svg';
import whystudy3 from '../assets/images/image/whystudy3.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import '../assets/styles/styles.css';

const WhyStudySlider = () => {
    return (
        <div className="flex ">
            <div className="hidden md:flex items-center h-[650px] -mt-40 -ml-48 ">
                <div className="text-[#BFBFBF] font-urban text-lg writing-mode-vertical-rl transform rotate-90 w-72 text-[28px]">
                    Why study in USA
                </div>
            </div>
            <Swiper
                breakpoints={{
                    1440: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                    },
                    1024: {
                        spaceBetween: 20,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 10,
                        slidesPerView: 2,
                    },
                    425: {
                        spaceBetween: 10,
                        slidesPerView: 1,
                    },
                    320: {
                        spaceBetween: 5,
                        slidesPerView: 1,
                    },
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                scrollbar={{ draggable: true }}
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="swiper-custom"
            >
                <SwiperSlide>
                     <div className="w-full h-[400px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                            <div className="flex justify-center">
                                                <img src={whystudy1} width={250} alt="why study" className="rounded-t-[38px]" />
                                            </div>
                                            <div className="px-5">
                                                <div className="text-[#30589F] font-lato text-[14px] mt-3">
                            High Quality of Life 
                            </div>

                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                            Australia offers a safe and clean living environment with cities ranked consistently among the best in the world for student living standards. 
                            </div>

                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                     <div className="w-full h-[400px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                             <div className="flex justify-center">
                                                 <img src={whystudy2} width={250} alt="why study" className="rounded-t-[38px]" />
                                             </div>
                                             <div className="px-5">
                                                 <div className="text-[#30589F] font-lato text-[14px] mt-3">
                            Diverse Student Community 
                            </div>
                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">

                            Australia is home to a multicultural student body, offering an enriching international experience. Studying in Australia means you’ll interact with people from all corners of the globe.
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                     <div className="w-full h-[400px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                            <div className="flex justify-center">
                                                <img src={whystudy3} width={250} alt="why study" className="rounded-t-[38px]" />
                                            </div>
                                            <div className="px-5">
                                                <div className="text-[#30589F] font-lato text-[14px] mt-3">
                            Research Opportunities
                            </div>

                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                            Australia is at the forefront of global research and innovation, providing students with opportunities to engage in cutting-edge research in various fields .
                            </div>

                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide>

                     <div className="w-full h-[400px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                            <div className="flex justify-center">
                                                <img src={whystudy3} width={250} alt="why study" className="rounded-t-[38px]" />
                                            </div>
                                            <div className="px-5">
                                                <div className="text-[#30589F] font-lato text-[14px] mt-3">
                            Strong Job Market
                            </div>

                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                            Australia's thriving economy presents numerous opportunities for graduates. Sectors like healthcare, IT, engineering, and education continue to experience strong demand for skilled professionals. 
                            </div>

                        </div>


                    </div>
                </SwiperSlide>
            </Swiper>
          
    </div >
   
  )
}

export default WhyStudySlider