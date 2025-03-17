import React from 'react'
import Navbar from '../components/Navbar'
import Contactus from '../components/ContactUs'
import Footer from '../components/Footer'
import grid from '../assets/images/image/grid.svg'
import download from '../assets/images/document_download.svg'
import university from '../assets/images/university.svg'
import merit from '../assets/images/merit.svg'
import fund from '../assets/images/fund.svg'
import intake from '../assets/images/intake.svg'
import deadline from '../assets/images/deadline.svg'
const ScholarshipOverview = () => {
  return (
    <div className='bg-[#0E1B2C] pb-10'>

            {/* ----------------------------------1st section----------------------------- */}
            <div className='bg-white h-[70vh] rounded-b-[200px] max-md:rounded-b-[80px] relative max-md:h-[55vh]'>

                <div className='flex justify-center'>
                    <Navbar />
                </div>


                <div className='flex justify-center'>
                    <button className='absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban'>
                    SCHOLARSHIP FINDER
                    </button>
                    <div className='absolute top-[13.5rem] max-md:top-[10rem] max-md:px-5 font-dela text-[5.4rem] text-center leading-[6.5rem] max-xl:text-[3.5rem] max-xl:leading-[4.8rem] max-md:text-[1.9rem] max-md:leading-[3rem]'>Graduate Incentive<br/> Award</div>
                    <div className='absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[20rem]'>Master of Science in Applied Economics</div>
                </div>
            </div>

            <div  className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>
                
              <div className='flex justify-between items-center max-lg:mt-[2rem] max-md:mt-[1rem] max-md:flex-col max-md:items-start'>
                <div className='text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem] max-md:mb-4 max-md:text-[1.1rem]'>Scholarship Details</div>
                <button className='flex border-[2px] border-[#30589F] font-urban px-7 text-[#30589F] py-2 items-center max-md:text-[0.8rem] text-[#30589F rounded-[20px]'>
                  <img src={download} alt='download' width={18} className='mr-2'/>
                  Download Brochure
                </button>
              </div>

              <div className='font-urban font-bold mt-7 max-md:text-[0.8rem]'>Graduate Incentive Award Master of Science in Applied Economics</div>

              {/* Overview */}
              <div>
                <div className='text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] mt-12 max-md:text-[1.1rem]'>Overview</div>

                <div className='flex flex-wrap'>
                  {/* Applicable university */}
                  <div className='w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0'>
                    <img src={university} alt="" width={45} className='mr-3 w-[2rem]'/>

                    <div>
                      <div className='text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]'>Scholarship Type</div>
                      <div className='font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]'>University of Cincinnati, USA</div>
                    </div>

                  </div>
                  {/* Scholarship Type */}
                  <div className='w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0'>
                    <img src={merit} alt="" width={45} className='mr-3 w-[2rem]'/>

                    <div>
                      <div className='text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]'>Scholarship Type</div>
                      <div className='font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]'>Merit</div>
                    </div>

                  </div>
                  {/* Scholarship Amount */}
                  <div className='w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0'>
                    <img src={fund} alt="" width={45} className='mr-3 w-[2rem]'/>

                    <div>
                      <div className='text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]'>Scholarship Amount</div>
                      <div className='font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]' >Variable Funding</div>
                    </div>

                  </div>
                  {/* intake year */}
                  <div className='w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom mr-3 max-md:mr-0'>
                    <img src={intake} alt="" width={45} className='mr-3 w-[2rem]'/>

                    <div>
                      <div className='text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]'>Intake year</div>
                      <div className='font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]' >Jan 2025</div>
                    </div>

                  </div>

                  {/* Deadline */}
                  <div className='w-[32%] max-xl:w-[48%] max-md:w-[100%] mt-4 flex border bg-white border-black py-6 px-7 rounded-[27px] shadow-right-bottom'>
                    <img src={deadline} alt="" width={45} className='mr-3 w-[2rem]'/>

                    <div>
                      <div className='text-[#898C9A] font-bold font-urban max-lg:text-[0.8rem] max-md:text-[0.7rem]'>Deadline</div>
                      <div className='font-dela text-[#30589F] max-lg:text-[0.9rem] max-md:text-[0.8rem]' >Dec 05, 2024</div>
                    </div>

                  </div>


                </div>

                <div className='font-urban mt-12 max-md:text-[0.8rem]'>
                The university pays for all or part of a full-time position.Scholarship awards are offered in writing by the appointing programme, which includes information on the amount and duration of the award, as well as the terms of the offer.Because it is for people who are not graduate assistants, no service is required in exchange for the award.
                </div>

              </div>

              {/* Eligibility Criteria */}
              <div>
                <div className='text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] mt-12 max-md:text-[1.1rem]'>Eligibility Criteria</div>
                <div className='font-urban mt-6 max-md:text-[0.8rem]'>
                Applicants must have a bachelor's degree in any discipline that is equal to a four-year degree and a minimum grade point average of B (3.0/4.0 system). Microeconomic theory at the introductory level A course on macroeconomic theory at the introductory level College-level mathematics for one semester or two quarters One college-level statistics course
                </div>
              </div>
              
              {/* Application Process */}
              <div className='mb-6'>
                <div className='text-[#2B7CD6] mb-5 font-dela text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] mt-12'>Application Process</div>
                <div className='font-urban mt-6 max-md:text-[0.8rem]'>
                Students applying to the course will be automatically considered by the University.
                </div>
              </div>


            </div>

            <Contactus />
            <Footer />
    </div>
  )
}

export default ScholarshipOverview