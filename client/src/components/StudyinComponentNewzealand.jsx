import React, { useState } from 'react'
import grid from '../assets/images/image/grid.svg'
// import whystudy1 from '../assets/images/image/whystudy1.svg'
// import whystudy2 from '../assets/images/image/whystudy2.svg'
// import whystudy3 from '../assets/images/image/whystudy3.svg'
import coins from '../assets/images/image/coins.svg'
import twinkle from '../assets/images/image/twinkle.svg'
import fee from '../assets/images/image/fee.svg'
import accomodation from '../assets/images/image/accomodation.svg'
import airfare from '../assets/images/image/airfare.svg'
import visa from '../assets/images/image/visa.svg'
import harvard from '../assets/images/image/harvard.svg'
import down from '../assets/images/image/down.svg'
import WhyStudySliderNewzealand from './WhyStudySliderNewzealand'
import Topcourse from "../components/Topcourse"
import Domain from "../components/Domain"
import ScholarshipNewzealand from '../components/ScholarshipNewzealand'
import Intake from '../components/Intake'
import FaqsNewzealand from "../pages/FaqsNewzealand"

const StudyinComponent = () => {
    const [drop1, setDrop1] = useState(false)
    const [drop2, setDrop2] = useState(false)
    const [drop3, setDrop3] = useState(false)
    const [drop4, setDrop4] = useState(false)
    const [drop5, setDrop5] = useState(false)

    const universities = [{
        id: 1,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    }, {
        id: 2,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    },
    {
        id: 3,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    },
    {
        id: 4,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    },
    {
        id: 5,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    }, {
        id: 6,
        image: harvard,
        university: "Harvard University",
        place: "Cambridge, Massachusetts",
        rank: "#4"
    }]

    const handleDrop1 = () => {
        setDrop1(!drop1)
        // if (drop2) {
        //     setDrop2(false)
        // }
    }
    const handleDrop2 = () => {
        setDrop2(!drop2)
        // if (drop1) {
        //     setDrop1(false)
        // }
    }
    const handleDrop3 = () => {
        setDrop3(!drop3)
    }
    const handleDrop4 = () => {
        setDrop4(!drop4)
    }
    const handleDrop5 = () => {
        setDrop5(!drop5)
    }
    return (
        <div>
            <div className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>



                {/*---------------------------- why study  in USA---------------------- */}
                <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] max-md:pl-4 pl-10 '>Why study in New Zealand?</div>

                <WhyStudySliderNewzealand />




                {/*----------------------------------------------- Quick facts--------------------------------------------- */}
                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] max-md:pl-4  pl-10 mb-8 '>Quick facts</div>
                    <div className=' flex'>
                        <div className="hidden md:flex items-center justify-center  w-12 ">
                            <div className="text-[#BFBFBF]  font-lato text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                                Quick facts
                            </div>
                        </div>
                        <div className='bg-[#30589F]  rounded-[38px] px-8 pt-16 max-md:px-3 max-md:pt-3 text-[15px] max-md:text-[10px] text-[#0E1B2C] p-10 w-full h-fit'>
                            <div className='flex  '>
                                <div className='bg-white  py-[1.8rem] w-[50%] px-16 max-xl:px-7 max-md:px-4  text-center mr-6 mb-6 max-md:mr-3 max-md:mb-3 font-lato rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                                <div className='bg-white py-[1.8rem] w-[50%] px-16 max-xl:px-7 max-md:px-4 mb-6 max-md:mb-3 text-center  font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                            </div>

                            <div className='flex '>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[4rem] max-md:px-4 max-md:w-[50%] mb-6 mr-6 max-md:mr-3 max-md:mb-3 font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[5.2rem] max-md:px-4 max-md:w-[50%] max-xl:px-[2.5rem] mb-6 max-md:mb-3 font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                            </div>

                            <div className='flex'>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[3.5rem] max-md:px-4 max-md:w-[50%] mb-6 mr-6 max-md:mr-3 max-md:mb-3 font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[4.2rem] max-md:px-4 max-md:w-[50%] mb-6 max-md:mb-3 font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                            </div>

                            <div className='flex'>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[3.2rem] max-md:px-4 max-md:w-[50%] mr-6 mb-6 max-md:mr-3 max-md:mb-3  font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                                <div className='bg-white py-[1.8rem]  w-[50%] text-center px-[3.2rem] max-md:px-4 max-md:w-[50%] mb-6 max-md:mb-3 font-lato  rounded-[30px] max-lg:px-[3.5rem]'>{/* */}</div>
                            </div>
                        </div>
                    </div>

                </div>
                {/*---------------------------------- Cost of studying ---------------------------------------*/}
                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8'>Cost of studying</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                            <div className="text-[#BFBFBF]  font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                                Cost of studying
                            </div>
                        </div>
                        <div className=' relative border-[1px] h-[300px] border-black rounded-[38px] shadow-right-bottom bg-white w-screen'>
                            <img src={coins} width={130} alt='coins' className=' absolute bottom-0 rounded-bl-[38px] max-xl:w-[6rem] max-md:w-[4rem]' />
                            <img src={twinkle} width={50} alt='twinkle' className=' absolute right-5 mt-6 max-xl:w-[2.5rem]' />

                            <div className='flex justify-between max-lg:flex-col items-center h-[300px] px-28 max-lg:py-10'>

                                <div className='flex max-lg:-ml-5 max-md:-ml-0'>
                                    <img src={fee} alt='fee' className=' max-xl:w-[2rem]'></img>
                                    <div className='ml-3'>
                                        <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Tuition fees</div>
                                        <div className='text-[#30589F] font-urban text-[20px] max-xl:text-[15px]'>$25000</div>
                                    </div>
                                </div>

                                <div className='flex items-center max-md:-ml-0'>
                                    <img src={accomodation} alt='accomodation' width={50} className=' max-xl:w-[2rem]'></img>
                                    <div className='ml-3'>
                                        <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Living & Accomodation</div>
                                        <div className='text-[#30589F] font-urban text-[20px] max-xl:text-[15px]'>$15000</div>
                                    </div>
                                </div>

                                <div className='flex max-lg:-ml-10 max-md:-ml-2'>
                                    <img src={airfare} alt='airfare' className=' max-xl:w-[2rem]'></img>
                                    <div className='ml-3'>
                                        <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Airfare</div>
                                        <div className='text-[#30589F] font-urban text-[20px] max-xl:text-[15px]'>$1000</div>
                                    </div>
                                </div>

                                <div className='flex max-lg:-ml-12 max-md:-ml-2'>
                                    <img src={visa} alt='visa' className=' max-xl:w-[2rem]'></img>
                                    <div className='ml-3'>
                                        <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Visa</div>
                                        <div className='text-[#30589F] font-urban text-[20px] max-xl:text-[15px]'>$510</div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                {/*--------------------------------------- Top universities------------------------- */}
                <div>

                    <div className='text-[#2B7CD6] font-lato text-[2rem]  max-lg:text-[1.4rem]  pl-10 mt-16 mb-8'>Top universities</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-28 ">
                            <div className="text-[#BFBFBF] font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                            Top universities  
                            </div>
                        </div>
                    <div className='flex flex-wrap justify-between '>
                        {universities.map((u) => (
                            <div className=' border-[1px] w-[32%] max-xl:w-[49%] max-md:w-[98%] border-black rounded-[38px] hover:shadow-right-bottom bg-white p-6 mb-3'>
                                <div className=' border-[1px] py-10 border-black rounded-[30px] bg-white flex justify-center'>
                                    <img src={u.image} alt='harward' width={300} className=' max-lg:w-[13rem]' />
                                </div>
                                <div className='flex justify-between mt-6 items-center'>
                                    <div>
                                        <div className=' font-lato max-lg:text-[13px]'>{u.university}</div>
                                        <div className='  text-[#898C9A] font-urban text-[14px] max-lg:text-[11px]'>{u.place}</div>
                                    </div>
                                    <div className='font-urban  max-lg:text-[13px]'>QS Rank: {u.rank}</div>
                                </div>
                            </div>))}

                    </div>
                </div>
</div>
                {/*---------------------------------- FAQs------------------------------- */}
                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>Pros and Cons </div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                            <div className="text-[#BFBFBF]  font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                            Pros and Cons  
                            </div>
                        </div>
                    <FaqsNewzealand />
                    </div>
                </div>

                <div>
                    
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>Top Courses</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                            <div className="text-[#BFBFBF] font-urban  text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                            Top Courses
                            </div>
                        </div>
                       
                    <Topcourse />
                 </div>
                </div>
                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>Top Scholarships</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                            <div className="text-[#BFBFBF] font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-36 " >
                            Top Scholarships
                            </div>
                        </div>
                    <ScholarshipNewzealand />
                    </div>
                </div>

                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>Top Domains</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                            <div className="text-[#BFBFBF] font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-28  " >
                            Top Domains
                            </div>
                        </div>
                    <Domain />
                    </div>
                </div>
                <div>
                    <div className='text-[#2B7CD6] font-lato text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>Intake Schedule</div>
                    <div className='flex'>
                        <div className="hidden md:flex items-center justify-center  w-20 ">
                        <div className="text-[#BFBFBF] font-urban text-lg writing-mode-vertical-rl transform rotate-90 w text-[28px] -ml-40 " >
                            Intake Schedule
                            </div>
                        </div>
                    <Intake />
                    </div>
                </div>

            </div>
            {/* Image and Call to Action */}
            <section className='px-4 md:px-0'>
                <div className="bg-[#5BC7F1] rounded-[80px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto md:h-[510px] -mt-[100px]">
                    {/* Left Image */}
                    <div className="flex-shrink-0 relative w-full h-[403px] md:w-[571px] md:h-[403px] mx-auto md:mx-0 rounded-[20px] overflow-hidden">
                        <img
                            src="/images/dummy.png" // Replace with your actual image path
                            alt="Support Agent"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Text */}
                    <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-lato text-[#001f3f]">
                            Ready to flight your dreams?
                        </h2>
                        <p
                            className="text-[#001f3f] text-sm md:text-base leading-relaxed"
                            style={{
                                fontFamily: "'lato', sans-serif",
                                fontWeight: "400",
                                lineHeight: "1.75",
                                marginBottom: "1.5rem",
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
                            placerat gravida aliquet at. Nisi urna quam massa pellentesque
                            lectus odio sagittis. Tortor massa in rhoncus purus nunc
                            scelerisque nullam. Consequat rhoncus nam ac enim leo. Feugiat
                            eget urna varius eu nibh in sed est.
                        </p>

                        <button className="bg-[#2B7CD6] text-white border border-[#2B7CD6] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#2B7CD6] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0 shadow-[3px_3px_0px_0px_#001426]">
                            Book a call →
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default StudyinComponent