import React from 'react'
import Navbar from '../components/Navbar'
import downdark from '../assets/images/image/down_black.svg'
import grid from '../assets/images/image/grid.svg'
import hat from '../assets/images/image/hat.svg'
import search from '../assets/images/image/search.svg'
import harvard from '../assets/images/image/harvard.svg'
import Contactus from '../components/ContactUs'
import Footer from '../components/Footer'
import CourseFinderBar from '../components/CourseFinderBar'


const Coursefinder = () => {
  
    const universities=[{
        id:1,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:2,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:3,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:4,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:5,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:5,
        image:harvard,
        university:"Harvard University",
        course:"Master of Science in Computer Science",
        rank:"#4",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    ]
    return (
        <div className='bg-[#0E1B2C] pb-10'>

            {/* ----------------------------------1st section----------------------------- */}
            <div className='bg-white h-[72vh] rounded-b-[200px] max-md:rounded-b-[80px] relative max-md:h-[60vh]'>

                {/* <div className='flex justify-center'> */}
                    <Navbar />
                {/* </div> */}


                <div className='flex justify-center'>
                    <button className='absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban'>
                        COURSE FINDER
                    </button>
                    <div className='absolute top-[13.5rem] font-dela text-[5.4rem] leading-[6.5rem] max-xl:text-[4rem] max-xl:leading-[4.8rem] max-md:text-[2rem] max-md:leading-[3rem]'>Discover your<br /> dream career.</div>
                    <div className='absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[21.5rem]'>Unlock Your Future with the Perfect Course</div>
                </div>
            </div>

          <CourseFinderBar/>

            <div  className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 max-md:pt-8 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>

                {/* ---------------------searchbar and courses found-------------------------- */}
                <div className='px-2'>
                    <div className='flex justify-between max-md:flex-col max-md:mt-10'>
                        <div className='border-[1px] border-[#0E1B2C] rounded-full flex justify-center items-center w-[18%] py-2 max-xl:w-[24%] max-lg:w-[30%] max-md:w-[70%] max-lg:py-1 max-md:mb-3'>
                            <img src={hat} alt='hat' width={25} className='' />
                            <div className='font-urban font-bold'>12345 courses found</div>
                        </div>

                        <div className=' relative'>
                            <input
                                type='text'
                                placeholder='Search for scholarships'
                                className='pl-12 py-3 pr-4 max-md:pr-6  border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban max-lg:py-2 max-lg:pr-0 '  />
                            <div className='absolute inset-y-4 max-lg:inset-y-3  left-6'>
                                <img src={search} width={18} alt='search' />
                            </div>
                        </div>
                    </div>


                    {/* -----------------------------------search display----------------------------------------------- */}
                    <div className='mt-16 flex flex-wrap justify-between'>
                        {universities.map((u)=>(
                            <div className=' border-[1px] w-[32%] max-xl:w-[49%] max-md:w-[98%] border-black rounded-[38px] shadow-right-bottom bg-white p-6 mb-5'>
                                <div className=' border-[1px] py-10 border-black rounded-[30px] bg-white flex justify-center'>
                                    <img src={u.image} alt='harward' width={300} className='  max-xl:w-[11rem]' />
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

            
            <Contactus />
            {/* ---------------------------footer------------------------------------ */}
            <Footer />
        </div>
    )
}

export default Coursefinder