import React from 'react'
import whatsapp from '../assets/images/whatsapp.svg'
import linkedin from '../assets/images/linkedin.svg'
import insta from '../assets/images/insta.svg'
import facebook from '../assets/images/facebook.svg'

const Footer = () => {
    return (
        <div className='mt-[21rem] max-md:mt-[30rem] px-24 mb-12  max-xl:px-16 max-lg:px-10 max-md:px-8'>


            <div className=' text-white flex justify-between max-md:flex-wrap '>
                {/*-------------------------------- Student Services----------------------------- */}
                <div className='max-md:mt-3'>
                    <div className=' font-dela text-[1.5rem] mb-3 max-xl:text-[1.1rem] max-lg:text-[1rem] max-md:text-[0.9rem] '>Student Services</div>
                    <div className=' font-urban text-[1rem] leading-7 max-xl:text-[0.9rem] max-lg:text-[0.8rem] max-md:text-[0.7rem] max-md:leading-[25px]'>
                        <div>Applicaiton & Admission Process</div>
                        <div>Visa Guidance</div>
                        <div>Student Accommodation</div>
                        <div>Flight Booking</div>
                        <div>Counselling</div>
                        <div>Test Preparation</div>
                        <div>Course, College & University Selection</div>
                        <div>Scholarships</div>
                        <div>Internships</div>
                        <div>Education Loan</div>
                        <div>Forex Transaction</div>
                        <div>SOP/LOR Preparation</div>
                        <div>University</div>
                    </div>

                </div>

                {/* ---------------------Study Destinations------------------- */}
                <div className='max-md:mt-3'>
                    <div className=' font-dela text-[1.5rem] mb-3 max-xl:text-[1.1rem] max-lg:text-[1rem] max-md:text-[0.9rem] '>Study Destinations</div>
                    <div className=' font-urban text-[1rem] leading-7 max-xl:text-[0.9rem] max-lg:text-[0.8rem] max-md:text-[0.7rem] max-md:leading-[25px]'>
                        <div>USA</div>
                        <div>Canada</div>
                        <div>United Kingdom</div>
                        <div>New Zealand</div>
                        <div>Australia</div>
                        <div>Germany</div>

                    </div>

                </div>

                {/* Company */}
                <div className='max-md:mt-3'>
                    <div className=' font-dela text-[1.5rem] mb-3 max-xl:text-[1.1rem] max-lg:text-[1rem] max-md:text-[0.9rem]'>Company</div>
                    <div className=' font-urban text-[1rem] leading-7 max-xl:text-[0.9rem] max-lg:text-[0.8rem] max-md:text-[0.7rem] max-md:leading-[25px]'>
                        <div>About Us</div>
                        <div>Contact US</div>

                    </div>
                </div>

                {/* Address */}
                <div className='max-md:w-[50%] max-md:mt-3'>
                    <div className=' font-dela text-[1.5rem] mb-3 max-xl:text-[1.1rem] max-lg:text-[1rem] max-md:text-[0.9rem]'>Address</div>
                    <div className=' font-urban text-[1rem] leading-7 max-xl:text-[0.9rem] max-lg:text-[0.8rem] max-md:text-[0.7rem] max-md:leading-[25px]'>
                        <div>
                            PVM Heights,<br /> One Way Junction,<br /> Muvattupuzha Kerala
                        </div>


                    </div>
                </div>
            </div>

            {/* ----------------------social media buttons----------- */}
            <div className='flex justify-end max-md:flex-col max-md:items-end max-md:-mt-[10rem]'>
                <button className='mr-5 max-md:mb-2 max-md:mr-0'>
                    <img src={whatsapp} alt='whatsapp' width={40} className='max-lg:w-[2rem]'/>
                </button>

                <button className='mr-5 max-md:mb-2 max-md:mr-0'>
                    <img src={linkedin} alt='linkedin' width={40} className='max-lg:w-[2rem]'/>
                </button>

                <button className='mr-5 max-md:mb-2 max-md:mr-0'>
                    <img src={facebook} alt='facebook' width={40} className='max-lg:w-[2rem]'/>
                </button>

                <button className='mr-5 max-md:mr-0'>
                    <img src={insta} alt='instagram' width={40} className='max-lg:w-[2rem]'/>
                </button>
            </div>

            {/* -----------------------FEEL THE FREEDOM---------------- */}
            <div className='text-[#1B2C69] flex justify-center my-10 text-[6rem] font-dela max-xl:text-[4rem] max-lg:text-[3rem] max-md:hidden'>
                FEEL THE FREEDOM
            </div>

            <div className='bg-[#002140] py-6 rounded-full px-16 flex items-center justify-between text-[18px] max-xl:text-[13px] max-md:hidden max-lg:text-[11px] max-lg:px-8'>
                <div className='text-[#233F7B]  font-dela'>© Copyright 2024, YFLY International. Designed by Tungston Labs .</div>

                <div className='flex text-[#233F7B] font-dela'>
                    <div className='mr-5'>Terms of Use</div>
                    <div>Privacy Policy</div>
                </div>
            </div>

        </div>
    )
}

export default Footer