import React from 'react'
import Navbar from '../components/Navbar'

import grid from '../assets/images/image/grid.svg'

import Contactus from '../components/ContactUs'
import Footer from '../components/Footer'
const SopWriting = () => {
  return (
    <div className='bg-[#0E1B2C] pb-10'>
      <div className='bg-white h-[82vh] max-xl:h-[70vh] rounded-b-[200px] max-lg:rounded-b-[120px] max-md:rounded-b-[80px] relative max-md:h-[50vh]'>

        <div className='flex justify-center'>
            <Navbar />
        </div>


        <div className='flex justify-center'>
                        <div className=" absolute top-[15rem] max-md:top-[9rem] text-center  tracking-wide leading-tight ">
                            <p className='text-black font-dela  text-[5.4rem] max-xl:text-[3.8rem] max-md:text-[2rem] max-lg:text-[3rem]'>SOP Writing</p>
                            <p className='text-black py-4 font-pop font-bold  text-[2rem] max-md:text-[1.2rem] max-lg:text-[1.5rem]'>₹ 7 999</p>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                      <button className='absolute px-10 top-[27rem] max-xl:top-[24rem] max-md:top-[15rem] max-lg:top-[23rem] py-2 max-md:py-1 bg-[#2B7CD6] text-[1.3rem] max-lg:text-[1rem] shadow-ip font-extrabold
                                      text-white transition-all cursor-pointer
                                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
                                        hover:border-b-[6px] rounded-full border-[1px] border-[#0E1B2C] 
                                        font-urban '>
                                        Apply
                      </button>
                    </div>
      </div>

      <div  className=" bg-white bg-cover bg-center rounded-[200px] max-lg:rounded-[120px] max-md:rounded-[80px] pt-24 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>

            <div className='text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]'>Overview</div>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0  py-3'>A Statement of Purpose (SOP) is a crucial document that narrates
                  your motivation for the course while highlighting your academic 
                  and professional accomplishments and your goals after completion 
                  of the program. Also called a Letter of Motivation, this document 
                  carries up to 30% weightage in determining the success of your university application.
              </p>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0 py-3'>
                The SOP is specific to the university/course, 
                where you have to talk about the motivation for the program you are applying for.
              </p>

              {/* BENEFITS */}
              <div className='text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]'>Benefits</div>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-10 max-lg:px-5 max-md:px-0 py-3'>
                The SOP writing service will benefit you in several ways:
              </p>
              <ul className='text-black list-decimal text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3'>
                <li>It will help you save valuable time and effort and let you focus on other application-related tasks.</li>
                <li>A professionally written Statement of Purpose can place you at an advantage over other international students applying for the same program.</li>
                <li>A personalized Statement of Purpose written effectively improves your chances of admission.</li> 
              </ul>

              {/* procedure */}
              <div className='text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]'>Procedure</div>
              <ul className='text-black list-decimal text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3'>
                <li>Analyzing SOP Preferences</li>
                <li>SOP Draft Preparation & Delivery</li>
                <li>Student Review</li> 
                <li>SOP Finalization & Final Draft Delivery</li> 
              </ul>

              {/* workflow */}
              <div className='text-[#2b7cd6] font-dela text-[2rem] max-xl:text-[1.6rem] max-md:text-[1.2rem]'>Workflow</div>
              {/* apply online */}
              <div className='font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 pb-2 pt-5 text-[#30589f] tracking-wide'>Apply Online</div>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 '>
                Place the order using the link on this page.
              </p>
              <br />
              {/* submit your details */}
              <div className='font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide'>Submit Your Details</div>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5'>
                Submit your details via an online preferences form.
              </p>
              <br />
              {/* workflow */}
              <div className='font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide'>Workflow</div>
              <p className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5'>
                Order Creation & Timeline: The SOP order willl be created once you fill in the preferences and submit the form.
              </p>
              <br />
              {/* dirst draft delivery */}
              <div className='font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide'>First Draft Delivery</div>
              <ul className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] list-disc font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3'>
                <li>Once the order is recieved, we will prepare the first draft and send the Google Doc file link through email.</li>
                <li>There will be two rounds of review after the first draft is delivered.</li>
              </ul>

              <br />
              {/* student reviews and order completion */}
              <div className='font-urban font-extrabold text-[1.5rem] max-xl:text-[1.3rem] max-md:text-[1rem] px-[3rem] max-lg:px-5 max-md:px-0 py-2 text-[#30589f] tracking-wide'>Student Reviews and Order Completion</div>
              <ul className='text-black text-[1.1rem] max-xl:text-[1rem] max-md:text-[0.8rem] list-disc font-urban tracking-wide px-[4rem] max-lg:px-10 max-md:px-5 py-3'>
                <li>In the first review, any major changes you request will be accomodated.</li>
                <li>In the second review, only minor changes will be made.</li>
                <li>Please leave comments in the Google Doc file for any chnages required.</li>
                <li>The order will be completed after we recieve confirmation that you are satisfied with the changes made during the Student Review phase.</li>
              </ul>
                

      </div>

       
      <Contactus />
            {/* ---------------------------footer------------------------------------ */}
            <Footer />
    </div>
    // <>
    //   <div className="flex flex-col bg-blue">
    //     {/* first section */}
    //         <div className='bg-white h-[96vh]  rounded-b-[300px] relative'>

    //             <div className="flex justify-center">
    //                 <Navbar />
    //             </div>

    //             <div className='flex justify-center'>
    //                 <div className=" absolute top-[15rem] text-center  tracking-wide leading-tight ">
    //                     <p className='text-black font-dela  text-[5.4rem]'>SOP Writing</p>
    //                     <p className='text-black py-4 font-pop font-bold  text-[2rem]'>₹ 7 999</p>
    //                 </div>
    //             </div>

    //             <div className="flex justify-center ">
    //               <button className='absolute px-10 top-[27rem] py-2 bg-[#2B7CD6] text-[1.3rem] shadow-ip font-extrabold
    //                                text-white transition-all cursor-pointer
    //                                 active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
    //                                 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] 
    //                                 hover:border-b-[6px] rounded-full border-[1px] border-[#0E1B2C] 
    //                                 font-urban '>
    //                                 Apply
    //               </button>
    //             </div>
    //         </div>

    //     {/* second section */}
    //         <div className='bg-[#ffffff] rounded-[200px] h-[200vh] mt-[6rem] relative' >
    //           <img src={grid} alt='grid' className='rounded-[200px] mx-auto w-[100%] h-[100%] object-cover overflow-hidden' />
    //           <div className='absolute top-24  w-full flex flex-col'>
    //             <div className="px-40 mb-12  py-4">
    //                 {/* overview */}
    //                 <div className='text-[#2b7cd6] font-dela text-[2.5rem]'>Overview</div>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-14 leading-8 py-3'>A Statement of Purpose (SOP) is a crucial document that narrates
    //                    your motivation for the course while highlighting your academic 
    //                    and professional accomplishments and your goals after completion 
    //                    of the program. Also called a Letter of Motivation, this document 
    //                    carries up to 30% weightage in determining the success of your university application.
    //                 </p>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-14 leading-8 py-3'>
    //                   The SOP is specific to the university/course, 
    //                   where you have to talk about the motivation for the program you are applying for.
    //                 </p>

    //                 {/* BENEFITS */}
    //                 <div className='text-[#2b7cd6] font-dela text-[2.5rem]'>Benefits</div>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-12 leading-8 py-3'>
    //                   The SOP writing service will benefit you in several ways:
    //                 </p>
    //                 <ul className='text-black list-decimal text-[1.1rem] font-urban tracking-wide px-[4rem] leading-8 py-3'>
    //                   <li>It will help you save valuable time and effort and let you focus on other application-related tasks.</li>
    //                   <li>A professionally written Statement of Purpose can place you at an advantage over other international students applying for the same program.</li>
    //                   <li>A personalized Statement of Purpose written effectively improves your chances of admission.</li> 
    //                 </ul>

    //                 {/* procedure */}
    //                 <div className='text-[#2b7cd6] font-dela text-[2.5rem]'>Procedure</div>
    //                 <ul className='text-black list-decimal text-[1.1rem] font-urban tracking-wide px-[4rem] leading-8 py-3'>
    //                   <li>Analyzing SOP Preferences</li>
    //                   <li>SOP Draft Preparation & Delivery</li>
    //                   <li>Student Review</li> 
    //                   <li>SOP Finalization & Final Draft Delivery</li> 
    //                 </ul>

    //                 {/* workflow */}
    //                 <div className='text-[#2b7cd6] font-dela text-[2.5rem]'>Workflow</div>
    //                 {/* apply online */}
    //                 <div className='font-urban font-extrabold text-[1.5rem] px-[3rem] pb-2 pt-5 text-[#30589f] tracking-wide'>Apply Online</div>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-[4rem] leading-8 '>
    //                   Place the order using the link on this page.
    //                 </p>
    //                 <br />
    //                 {/* submit your details */}
    //                 <div className='font-urban font-extrabold text-[1.5rem] px-[3rem] py-2 text-[#30589f] tracking-wide'>Submit Your Details</div>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-[4rem] leading-8 '>
    //                   Submit your details via an online preferences form.
    //                 </p>
    //                 <br />
    //                 {/* workflow */}
    //                 <div className='font-urban font-extrabold text-[1.5rem] px-[3rem] py-2 text-[#30589f] tracking-wide'>Workflow</div>
    //                 <p className='text-black text-[1.1rem] font-urban tracking-wide px-[4rem] leading-8 '>
    //                   Order Creation & Timeline: The SOP order willl be created once you fill in the preferences and submit the form.
    //                 </p>
    //                 <br />
    //                 {/* dirst draft delivery */}
    //                 <div className='font-urban font-extrabold text-[1.5rem] px-[3rem] py-2 text-[#30589f] tracking-wide'>First Draft Delivery</div>
    //                 <ul className='text-black text-[1.1rem] list-disc font-urban tracking-wide px-[4rem] leading-8 py-3'>
    //                   <li>Once the order is recieved, we will prepare the first draft and send the Google Doc file link through email.</li>
    //                   <li>There will be two rounds of review after the first draft is delivered.</li>
    //                 </ul>

    //                 <br />
    //                 {/* student reviews and order completion */}
    //                 <div className='font-urban font-extrabold text-[1.5rem] px-[3rem] py-2 text-[#30589f] tracking-wide'>Student Reviews and Order Completion</div>
    //                 <ul className='text-black text-[1.1rem] list-disc font-urban tracking-wide px-[4rem] leading-8 py-3'>
    //                   <li>In the first review, any major changes you request will be accomodated.</li>
    //                   <li>In the second review, only minor changes will be made.</li>
    //                   <li>Please leave comments in the Google Doc file for any chnages required.</li>
    //                   <li>The order will be completed after we recieve confirmation that you are satisfied with the changes made during the Student Review phase.</li>
    //                 </ul>
    //             </div>

    //             {/* <Contactus /> */}
    //           </div>

           
    //         </div>

    //      {/* FOOTER SECTION */}
    //      {/* <Footer/> */}
    //      <div className='mt-[16rem] px-24 mb-12'>
 
 
    //         <div className=' text-white flex justify-between'>
    //             {/*-------------------------------- Student Services----------------------------- */}
    //             <div>
    //                 <div className=' font-dela text-[1.5rem] mb-3'>Student Services</div>
    //                 <div className=' font-urban text-[1rem] leading-7'>
    //                     <div>Applicaiton & Admission Process</div>
    //                     <div>Visa Guidance</div>
    //                     <div>Student Accommodation</div>
    //                     <div>Flight Booking</div>
    //                     <div>Counselling</div>
    //                     <div>Test Preparation</div>
    //                     <div>Course, College & University Selection</div>
    //                     <div>Scholarships</div>
    //                     <div>Internships</div>
    //                     <div>Education Loan</div>
    //                     <div>Forex Transaction</div>
    //                     <div>SOP/LOR Preparation</div>
    //                     <div>University</div>
    //                 </div>
 
    //             </div>
 
    //             {/* ---------------------Study Destinations------------------- */}
    //             <div>
    //                 <div className=' font-dela text-[1.5rem] mb-3'>Study Destinations</div>
    //                 <div className=' font-urban text-[1rem] leading-7'>
    //                     <div>USA</div>
    //                     <div>Canada</div>
    //                     <div>United Kingdom</div>
    //                     <div>New Zealand</div>
    //                     <div>Australia</div>
    //                     <div>Germany</div>
 
    //                 </div>
 
    //             </div>
 
    //             {/* Company */}
    //             <div>
    //                 <div className=' font-dela text-[1.5rem] mb-3'>Company</div>
    //                 <div className=' font-urban text-[1rem] leading-7'>
    //                     <div>About Us</div>
    //                     <div>Contact US</div>
 
    //                 </div>
    //             </div>
 
    //             {/* Address */}
    //             <div>
    //                 <div className=' font-dela text-[1.5rem] mb-3'>Address</div>
    //                 <div className=' font-urban text-[1rem] leading-7'>
    //                     <div>
    //                         PVM Heights,<br /> One Way Junction,<br /> Muvattupuzha Kerala
    //                     </div>
 
 
    //                 </div>
    //             </div>
    //         </div>
 
    //         {/* ----------------------social media buttons----------- */}
    //         <div className='flex justify-end'>
    //             <button className='mr-5'>
    //                 <img src={whatsapp} alt='whatsapp' width={40} />
    //             </button>
 
    //             <button className='mr-5'>
    //                 <img src={linkedin} alt='linkedin' width={40} />
    //             </button>
 
    //             <button className='mr-5'>
    //                 <img src={facebook} alt='facebook' width={40} />
    //             </button>
 
    //             <button className='mr-5'>
    //                 <img src={insta} alt='instagram' width={40} />
    //             </button>
    //         </div>
 
    //         {/* -----------------------FEEL THE FREEDOM---------------- */}
    //         <div className='text-[#1B2C69] flex justify-center my-10 text-[6.1rem] font-dela'>
    //             FEEL THE FREEDOM
    //         </div>
 
    //         <div className='bg-[#002140] h-[10vh] rounded-full px-16 flex items-center justify-between'>
    //             <div className='text-[#233F7B] text-[18px] font-dela'>© Copyright 2024, YFLY International. Designed by Tungston Labs .</div>
 
    //             <div className='flex text-[#233F7B] text-[18px] font-dela'>
    //                 <div className='mr-5'>Terms of Use</div>
    //                 <div>Privacy Policy</div>
    //             </div>
    //         </div>
 
    //     </div>
    //   </div>
    // </>
  )
}

export default SopWriting