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
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="w-full h-[390px] flex flex-col justify-between border-[1px] mb-6 md:mb-0 py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                        <div className="flex justify-center">
                            <img src={whystudy1} width={250} alt="why study" className="rounded-t-[38px]" />
                        </div>
                        <div className="px-5">
                            <div className="text-[#30589F] font-lato text-[14px] mt-3"></div>
                            <div className="text-[#30589F] font-lato text-[15px] mt-7">
                                High-Quality Education
                            </div>
                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                                One of the most compelling reasons to study abroad is the access to world-class education.
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                   <div className="w-full h-[390px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                           <div className="flex justify-center">
                                               <img src={whystudy2} width={250} alt="why study img" className="rounded-t-[38px]" />
                                           </div>
                                           <div className="px-5">
                                               <div className="text-[#30589F] font-lato text-[14px] mt-3">
                                Work Opportunities
                            </div>
                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                                Studying abroad also opens the door to valuable work experiences.
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                   <div className="w-full [400px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                           <div className="flex justify-center">
                                               <img src={whystudy3} width={250} alt="why study" className="rounded-t-[38px]" />
                                           </div>
                                           <div className="px-5">
                                               <div className="text-[#30589F] font-lato text-[14px] mt-3">
                                Visa & PR Pathways

                            </div>
                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                                One of the long-term advantages of studying abroad is the potential pathway to permanent residency (PR).
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <div className="w-full h-[390px] flex flex-col justify-between border-[1px] py-6 border-black rounded-[38px] hover:shadow-right-bottom bg-white">
                                            <div className="flex justify-center">
                                                <img src={whystudy3} width={250} alt="why study" className="rounded-t-[38px]" />
                                            </div>
                                            <div className="px-5">
                                                <div className="text-[#30589F] font-lato text-[14px] mt-3">
                                Welcoming Environment
                            </div>
                            <div className="border-t-[0.5px] border-[#898C9A] my-5 max-lg:my-3"></div>
                            <div className="font-lato max-lg:text-[0.9rem]">
                                A significant factor influencing students' choice of study destination is the overall safety and inclusiveness of the country.
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default WhyStudySlider;
