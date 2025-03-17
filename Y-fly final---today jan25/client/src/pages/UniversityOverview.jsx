import React, { useState } from 'react'
import harvard from '../assets/images/Harvard.png'
import Navbar from '../components/Navbar'
import ibm from '../assets/images/ibm.svg'
import google from '../assets/images/google.svg'
import amazon from '../assets/images/amazon.svg'
import microsoft from '../assets/images/ms.svg'
import morgan from '../assets/images/jp.svg'
import arrowright from '../assets/images/arrow-right.svg'
import goldman from '../assets/images/goldman.svg'
import dollarcoin from '../assets/images/dollarcoin.svg'
import down from '../assets/images/nav-dropdown.svg';
import Footer from '../components/Footer';
import blueright from '../assets/images/arrow-right-blue.svg'
import grid from '../assets/images/image/grid.svg'
import Contactus from '../components/ContactUs'
import intake from '../assets/images/intake.svg'
import deadline from '../assets/images/deadline.svg'
import stanford from '../assets/images/stanford.svg'

const UniversityOverview = () => {
    const recruiters = [
        { id:1, name:"IBM", image:ibm },
        { id:2, name:"Google", image:google },
        { id:3, name:"Amazon", image:amazon },
        { id:4, name:"Microsoft", image:microsoft },
        { id:5, name:"JP Morgan Chase & Co.", image:morgan },
        { id:6, name:"Goldman Sachs", image:goldman }
    ]
    const universities=[{
        id:1,
        image:stanford,
        university:"Stanford University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:2,
        image:stanford,
        university:"Stanford University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    
    ]



    const [drop1, setDrop1] = useState(false);
    const [drop2, setDrop2] = useState(false);
    const [drop3, setDrop3] = useState(false);
    const [drop4, setDrop4] = useState(false);
    const [drop5, setDrop5] = useState(false);

    const handleDrop1 = () => { setDrop1(!drop1)}
    const handleDrop2 = () => { setDrop2(!drop2)}
    const handleDrop3 = () => { setDrop3(!drop3)}
    const handleDrop4 = () => { setDrop4(!drop4)}
    const handleDrop5 = () => { setDrop5(!drop5)}
  return (


        <div className="bg-[#0E1B2C] pb-10">
            {/* *********************************************** first-section ********************************************************* */}
            <div className='relative '>
                <img src={harvard} height={10} alt='' className=''/>
 
                <div className="flex justify-center">
                    <Navbar/>   
                </div>            
 
                <div className='flex justify-center'>
                    <div className="text-white absolute text-[5.5rem] max-xl:text-[4.9rem] max-lg:text-[3.9rem] max-md:text-[1.5rem] leading-[5.2rem] max-lg:leading-[4rem] max-md:leading-[2rem] top-[18rem] max-xl:top-[12rem] max-lg:top-[9rem] max-md:top-[4rem] font-dela tracking-wide  text-center">
                        <p>Harvard</p>
                        <p>University</p>
                    </div>
                </div>
 
                <div className=' flex justify-center'>
                    <div className='text-white font-urban text-[25px] max-xl:text-[20px] max-md:text-[12px] font-bold absolute top-[30rem] max-xl:top-[24rem] max-lg:top-[18rem] max-md:top-[8rem] tracking-wide'>Massachusetts, United States</div>
                </div>
            </div>

            {/* *********************************************** second-section ********************************************************* */}
            <div  className=" bg-white bg-cover bg-center rounded-[200px] max-lg:rounded-[120px] max-md:rounded-[80px] pt-24 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>
                {/* ************************************ Course Details ********************************************** */}
                    <div>
                        <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem]'>Course Details</div>
                        <div className='flex max-md:flex-col justify-between my-5 font-urban font-bold max-md:text-[0.8rem]'>
                            <div className=''>Bachelor of Science in Engineering Sciences</div>
                            <div>Course Duration: 4 years</div>
                        </div>

                        <div className='flex max-md:flex-col mt-8 '>
                            <div className='flex items-center border w-[28%] max-xl:w-[33%] max-lg:w-[40%] max-md:w-[90%] max-md:mb-3 mr-8 bg-white border-black max-md:px-3 shadow-lightshad px-6 py-5 rounded-[30px]'>
                                <img src={intake} alt="" width={45} className='mr-3 '/>
                                <div>
                                    <div className='font-urban text-[#898C9A] font-bold max-md:text-[0.8rem]'>Intakes</div>
                                    <div className='font-dela text-[#0F62AF] text-[0.9rem] max-md:text-[0.7rem]'>Fall (August), 2024 Spring (January), 2025</div>
                                </div>

                            </div>
                            <div className='flex items-center border w-[28%] max-xl:w-[33%] max-lg:w-[40%] max-md:w-[90%] bg-white border-black shadow-lightshad px-6 max-md:px-3 py-5 rounded-[30px]'>
                                <img src={deadline} alt="" width={45} className='mr-3 '/>
                                <div>
                                    <div className='font-urban text-[#898C9A] font-bold max-md:text-[0.8rem]'>Deadline</div>
                                    <div className='font-dela text-[#0F62AF] text-[0.9rem] max-md:text-[0.7rem]'>Dec 15, 2024</div> 
                                </div>
                            </div>
                        </div>

                    </div>
                    
                  
                    {/* ******************************* OVERVIEW ******************************** */}
                        <div className='mt-10'>
                            
                            <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem]'>Overview</div>

                            <div className='font-urban text-[1rem] max-md:text-[0.8rem] tracking-wide pt-4'>
                                A member of the elite US group of Ivy League Schools. Harvard University is the oldest American University that was established in 1636. The university's 
                                original name was "New College", and its primary mission was to educate clerics. The school was renamed Harvard University in 1639. after the Rev. John Harvard.
                                Today, the University is considered to be the world's most coveted and most competitive school to attend. Harvard has nearly 4 centuries of 
                                history of academic and intellectual excellence, in which it has produced Nobel Prize winners, Rhodes Scholars, Pulitzer prize-winners, Academy Award
                                recipients and so on. Being at Harvard, a student will have access to world-renowned Professors and unparalleled academic learning - the world is your
                                opportunity at Harvard. Academically affiliated with the National Association of Independent Colleges and Universities (NAICU), the Association of
                                Independent Colleges and Universities in Massachusetts (AICUM) and the Association of American Universities (AAU). Harvard is also one of the space-grant universities in the USA.
                            </div>
                        </div>
                    {/* ********************************Eligibility Requirements******************** */}
                    <div className='mt-8'>
                        <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem] mb-7'>Eligibility Requirements</div>
                        <div className='flex max-md:flex-col justify-center'>
                            <div className='border w-[28%] max-xl:w-[35%] max-lg:w-[45%] max-md:w-[100%] max-md:mb-3 mr-10 bg-white border-black shadow-lightshad px-12 max-md:px-6 py-8 rounded-[30px]'>
                                <div className='font-dela text-[#30589F]'>Requirements</div>
                                <hr className='my-2 border-b-0'/> 
                                <div className='flex justify-between max-md:text-[0.8rem] font-urban font-bold mb-2'>
                                    <div>GPA (Min. required %)</div>
                                    <div>70%</div>
                                </div>

                                <div className='flex justify-between max-md:text-[0.8rem] font-urban font-bold'> 
                                    <div>Backlogs</div>
                                    <div>NA</div>
                                </div>
                            </div>
                            <div className='border w-[28%] max-xl:w-[35%] max-lg:w-[45%] max-md:w-[100%] bg-white border-black shadow-lightshad px-12 max-md:px-6 py-8 rounded-[30px]'>
                                <div className='font-dela text-[#30589F]'>Test Requirements</div>
                                <hr className='my-2 border-b-0'/> 
                                <div className='flex justify-between max-md:text-[0.8rem] font-urban font-bold mb-2'>
                                    <div>TOEFL Overall</div>
                                    <div>100</div>
                                </div>

                                <div className='flex justify-between max-md:text-[0.8rem] font-urban font-bold'> 
                                    <div>IELTS Overall</div>
                                    <div>7</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* ******************************* DEADLINES ******************************** */}
                        {/* <div className=' mt-8'>
                            <div className='text-[#0F62AF] font-dela text-[2rem] '>Deadlines </div>

                            <div className='flex justify-center pt-8'>
                                <div className='border w-[75%] border-black shadow-lightshad px-10 py-5 rounded-[45px]'>
                                    <div className="flex justify-between ">
                                        <div className='text-[#30589F] font-dela text-[1.6rem]'>Round</div>
                                        <div className='text-[#30589F] font-dela text-[1.6rem]'>Deadline</div>
                                    </div>
                                    <hr className='mt-[0.5rem] border-b-0'/>
                                    <div className="flex justify-between mt-4 font-urban font-bold text-[1.2rem]">
                                        <div>Final Deadline</div>
                                        <div>Dec 15</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    {/* ******************************* APPLICATION REQUIREMENTS ******************************** */}
                        <div className=' mt-10'>
                            <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem] '>Application Requirements </div>
                            <div className="flex justify-center pt-8">
                                <div className="border w-[55%] max-lg:w-[70%] max-md:w-[100%] bg-white border-black shadow-lightshad px-12 max-md:px-5 py-8 rounded-[48px]">
                                    <div className='text-[#30589F] font-dela text-[1.2rem] max-md:text-[1rem]'>Requirements</div>
                                    <hr className='mt-[0.5rem] border-b-0'/>       
                                    <div className='mt-4 space-y-1 font-urban font-bold text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>
                                                                        
                                    {/* ************************** Online Application  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Online Application</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Resume  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Resume</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Transcripts  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Transcripts</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Official Language Proficiency  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Official Language Proficiency</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Statement of Purpose  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Statement of Purpose</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Academic LOR  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Academic LOR</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Three LORs  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Three LORs</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    {/* ************************** Application Fee  **************************** */}
                                    <div className="flex justify-between ">
                                        <div>Application Fee</div>
                                        <div>Required</div>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* ******************************* CAREER OUTCOMES ******************************** */}
                        <div className=' mt-10'>
                            <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem]'>Career Outcomes </div>
                            <div className='text-[#30589F] mt-[1rem]  font-urban font-extrabold text-[1.5rem] max-md:text-[1rem]'>Job Roles Guaranteed</div>
                            <div className='mx-auto rounded-[48px] mt-[1rem] flex flex-wrap w-[95%] max-xl:text-[15px] max-lg:text-[13px] border-black border-[1px] bg-white py-5 px-10 max-xl:px-6 gap-x-3 max-lg:gap-x-1 gap-y-3 max-xl:gap-y-2 shadow-lightshad'>
                                
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full'>Product Manager</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Software Engineer</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Machine Learning Engineer</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Research Scientist</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Entrepreneur</div>
                                
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Researcher</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Teacher</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Writer</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Data Scientist</div>
                                    <div className='border border-black rounded-full px-8 max-md:px-4 text-center py-2 max-md:w-full '>Consultant</div>
                                
                            </div>
                            <div className='text-[#30589F] mt-[1.8rem] font-urban font-extrabold text-[1.5rem]'>Top Recruiters</div>
                            <div className='rounded-[48px] mt-[1rem] w-full justify-between flex flex-wrap max-md:justify-evenly items-center border-black border-[1px]  bg-white px-10 max-xl:px-6 max-md:px-0 pt-9 max-xl:pt-6 pb-7 max-xl:pb-4 shadow-lightshad'>
                                {recruiters.map(recruiter => (
                                    <div className='px-6 py-5 border space-y-2 shadow-lightshad border-black max-xl:mb-3 rounded-[24px]'>
                                    <img src={recruiter.image} alt='company' className='mx-auto max-xl:w-[3rem] max-lg:w-[2.2rem] max-md:w-[3.2rem]'/>
                                    <p className='font-urban text-center max-xl:text-[15px]'>{recruiter.name}</p>
                                </div>
                                ))}
                                
                            </div>
                        </div>
                    {/* ******************************* FEES & SCHOLARSHIPS ******************************** */}
                        <div className=' mt-10'>
                            <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem]'>Fees & Scholarships </div>
                            <div className="flex py-4 gap-3 w-80 max-md:w-72 px-5 items-center mt-[1.6rem] rounded-[24px] border border-black">
                                <img src={dollarcoin} alt='dollarcoin' />
                                <div>
                                    <p className='font-urban text-[#898C9A] font-bold text-[1.1rem] max-md:text-[1rem]'>Tuition fees</p>
                                    <p className='font-dela text-[#30589F] text-[1.1rem] max-md:text-[1rem]'>$39,517 / year</p>
                                </div>
                            </div>
                            {/* ******************** Funding Options ***************** */}
                            <div className='text-[#30589F] mt-[1.8rem] font-urban font-extrabold text-[1.4rem] max-md:text-[1.1rem]'>Funding Options</div>
                            <div className='flex max-md:flex-col  mt-[1.6rem] text-[0.9rem] space-x-8 max-md:space-x-0'>
                                <div className=' py-4 px-6 text-[#30589F] max-md:mb-3 font-dela  rounded-[20px] border border-black'>Scholarships</div>
                                <div className=' py-4 px-6 text-[#30589F] font-dela  rounded-[20px] border border-black'>Department funding</div>
                            </div>

                            <div className='font-urban text-[1rem] tracking-wide pt-4 max-md:text-[0.8rem]'>
                                To apply, submit a complete application for admission within a few weeks of the priority deadline for best results.
                            </div>

                            {/* ************************* Scholarships ******************** */}
                            <div className='text-[#30589F] mt-[1.8rem] font-urban font-extrabold text-[1.4rem] max-md:text-[1.1rem]'>Scholarships</div>
                            <div className="font-urban  text-[1rem] max-md:text-[0.8rem] tracking-wide pt-4">
                                The Harvard University offers a variety of scholarships for students. 
                                These scholarships are based on merit and financial need, and they can provide up to full tuition and fees. 
                                The application deadline for these scholarships is typically in January of each year.
                            </div>
                            <div className='flex justify-end mt-[1rem]'>
                                <button className='text-[#30589f] font-urban border-[1px] border-[#30589f] flex rounded-full px-5 gap-2 py-2'>View scholarships <img src={blueright} alt='arrow'/></button>
                            </div>
                        </div>
                    {/* ******************************* FAQS ******************************** */}
                        <div className=' mt-10'>
                            <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem]'>FAQs </div>
                            
                            <div className='mt-[1.5rem]'>
                                {/* ----------------Can you work while studying in USA?---------- */}
                                <div className='border-[1px] border-black rounded-[28px] bg-white p-8 max-md:p-5 mb-3'>
                                    <div className='flex justify-between items-center'>
                                            <div className='font-dela text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>Can you work while studying in USA?</div>
                                            <button onClick={handleDrop1}>
                                                <img src={down} alt='down' width={15} className={drop1 ? 'rotate-180' : ''}></img>
                                            </button>
            
                                        </div>
                                        {drop1 &&
                                            <div>
                                                <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                                <div className='font-urban text-[1rem] max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                            </div>
            
                                        }
                                </div>
                                {/* -------------What are the English language proficiency in USA?------------- */}
                                <div className='border-[1px] border-black rounded-[28px] bg-white p-8 max-md:p-5 mb-3'>
                                    <div className='flex justify-between items-center'>
                                            <div className='font-dela text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>What are the English language proficiency in USA?</div>
                                            <button onClick={handleDrop2}>
                                                <img src={down} alt='down' width={15} className={drop2 ? 'rotate-180' : ''}></img>
                                            </button>
            
                                        </div>
                                        {drop2 &&
                                            <div>
                                                <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                                <div className='font-urban text-[1rem] max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                            </div>
            
                                        }
                                </div>
                                {/* -------------What are other standardized tests in USA?------------- */}
                                <div className='border-[1px] border-black rounded-[28px] bg-white p-8 max-md:p-5 mb-3'>
                                    <div className='flex justify-between items-center'>
                                            <div className='font-dela text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>What are other standardized tests in USA?</div>
                                            <button onClick={handleDrop3}>
                                                <img src={down} alt='down' width={15} className={drop3 ? 'rotate-180' : ''}></img>
                                            </button>
            
                                        </div>
                                        {drop3 &&
                                            <div>
                                                <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                                <div className='font-urban text-[1rem] max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                            </div>
            
                                        }
                                </div>
                                  {/* ------------What are the popular courses in USA?------------- */}
                                <div className='border-[1px] border-black rounded-[28px] bg-white p-8 max-md:p-5 mb-3'>
                                    <div className='flex justify-between items-center'>
                                            <div className='font-dela text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>What are the popular courses in USA?</div>
                                            <button onClick={handleDrop4}>
                                                <img src={down} alt='down' width={15} className={drop4 ? 'rotate-180' : ''}></img>
                                            </button>
            
                                        </div>
                                        {drop4 &&
                                            <div>
                                                <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                                <div className='font-urban text-[1rem] max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                            </div>
            
                                        }
                                </div>
                                {/* -------------Are there any scholarships available in USA?------------- */}
                                <div className='border-[1px] border-black rounded-[28px] bg-white p-8 max-md:p-5 mb-3'>
                                    <div className='flex justify-between items-center'>
                                            <div className='font-dela text-[1.2rem] max-lg:text-[1rem] max-md:text-[0.8rem]'>Are there any scholarships available in USA?</div>
                                            <button onClick={handleDrop5}>
                                                <img src={down} alt='down' width={15} className={drop5 ? 'rotate-180' : ''}></img>
                                            </button>
            
                                        </div>
                                        {drop5 &&
                                            <div>
                                                <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                                <div className='font-urban text-[1rem] max-md:text-[0.8rem]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                            </div>
            
                                        }
                                </div>
                            </div>
 
                        </div>
                    {/* ***********************************Similar Courses******************** */}
                    <div className='mt-10'>
                        <div className='text-[#0F62AF] font-dela text-[2rem] max-lg:text-[1.6rem] max-md:text-[1.1rem] mb-6'>Similar Courses</div>
                        <div className='flex flex-wrap justify-between'>   
                        {universities.map((u)=>(
                                <div className=' border-[1px] w-[48%] max-xl:w-[49%] max-md:w-[98%] border-black rounded-[38px] shadow-right-bottom bg-white p-6 mb-5'>
                                    <div className=' border-[1px] py-10 border-black rounded-[30px] bg-white flex justify-center'>
                                        <img src={u.image} alt='harward' width={500} className='  max-xl:w-[11rem]' />
                                    </div>
                                    <div className='flex justify-between mt-6 items-center'>
                                        <div className='text-[#30589F] bg-[#E5F1FF] rounded-full font-urban text-[13px] px-3 py-1'>{u.university}</div>
                                        <div className='font-urban font-bold max-xl:text-[12px]'>QS Rank: {u.rank}</div>
                                    </div>
                                    <div className='mt-2 font-dela text-[15px] max-xl:text-[13px]'>{u.course}</div>

                                    <div className='border-t-[0.5px] border-[#bfc0c5] my-4'></div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <div className='text-[#898C9A] font-urban font-bold max-xl:text-[14px]'>Deadline</div>
                                            <div className='font-dela text-[15px] max-xl:text-[13px]'>{u.deadline}</div>
                                        </div>
                                        <div>
                                            <div className='text-[#898C9A] font-urban font-bold  max-xl:text-[14px]'>Total cost</div>
                                            <div className='font-dela text-[15px] max-xl:text-[13px]'>${u.totalCost}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                   
                

            </div>
            
            

            {/* *************************************************** Footer ***************************************************************** */}
            <Contactus/>
            <Footer/>
        </div>

  )
}

export default UniversityOverview




        // 'absolute top-10  w-full flex flex-col