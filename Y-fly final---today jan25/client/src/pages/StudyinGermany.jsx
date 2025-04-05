import React from 'react'
import countries from '../assets/images/image/countries.svg'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'
import StudyinComponentGermany from '../components/StudyinComponentGermany'



const Studyin = () => {

    return (
        <div className=' bg-[#0E1B2C] pb-10'>
            {/* -------------------------------------------first section-------------------------------------- */}
            <div className='relative '>
                <img src={countries} height={10} alt='' />

                <div className="flex justify-center">
                <Navbar />
                </div>
                

                <div className='flex justify-center'>
                    <button className='text-white font-semibold max-xl:text-[0.8rem] max-lg:text-[9px] border-white border-[2px] px-6 py-[6px] rounded-full absolute top-[12rem] max-lg:top-[10rem] max-md:hidden font-urban'>DESTINATION</button>
                </div>

                <div className='flex justify-center'>
                    <div className=' text-center text-white text-[5.5rem] max-xl:text-[4rem] max-lg:text-[3rem] max-md:text-[1rem] max-lg:leading-[55px] max-md:leading-[25px]  max-xl:leading-[70px] leading-[100px] font-dela absolute top-[17rem] max-xl:top-[15rem] max-lg:top-[12rem] max-md:top-[5rem]'>Study in<br /> Germany</div>
                </div>

                <div className=' flex justify-center'>
                    <div className='text-white font-urban text-[25px] max-xl:text-[20px] max-lg:text-[17px] max-md:text-[12px]  font-bold absolute top-[33rem] max-xl:top-[25rem] max-lg:top-[20rem]  max-md:top-[8rem]'>Your gateway to world-class education.</div>
                </div>
            </div>


            {/* ------------------------------------------------second section-------------------------------------------------------- */}
            <StudyinComponentGermany />

            <div>
               
                <Footer />
            </div>

        </div >
    )
}

export default Studyin