import React from 'react'
import Navbar from '../components/Navbar'
import downarrow from '../assets/images/downarrowblack.svg'
import grid from '../assets/images/image/grid.svg'
import Footer from '../components/Footer';
import arrowright from '../assets/images/arrow-right.svg'
import search from '../assets/images/search.svg';
import coin from '../assets/images/coin.svg'
import ScholarshipLeftbar from '../components/ScholarshipLeftbar';
import Contactus from '../components/ContactUs';
import ResponsiveSearchBar2 from '../components/ResponsiveSearchBar2';
const ScholarshipFinder = () => {
    const scholarships=[{
        id:1,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:2,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:3,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:4,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:5,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:6,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },{
        id:7,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    },
    {
        id:8,
        scholarship:"Graduate Incentive Award MS Applied Economics",
        description:"Lorem ipsum dolor sit amet consectetur. Pellentesque faucibus elementum euismod sed odio pellentesque egestas habitant. Accumsan quis a morbi aenean tincidunt purus malesuada. Scelerisque id dolor scelerisque faucibus. Sem sit fames vestibulum ullamcorper at lectus dignissim. Eget risus non non facilisis vitae. Commodo in ullamcorper.",
        deadline:"05 Dec 2024",
        totalCost:71977
    }]
    return (
        <>
            <div className='bg-[#0E1B2C] pb-10'>

                {/* first section */}
                <div className='bg-white h-[75vh] max-xl:h-[65vh] max-md:h-[50vh] rounded-b-[300px] max-md:rounded-b-[80px] max-xl:rounded-b-[180px] relative'>

                    {/* <div className="flex justify-center"> */}
                        <Navbar />
                    {/* </div> */}

                    <div className='flex justify-center'>
                        <button className='absolute top-[10rem] text-[#0F62AF] border-[2px] max-md:hidden border-[#0F62AF] px-5 py-2 rounded-full font-bold font-urban'>
                        SCHOLARSHIP FINDER
                        </button>
                        <div className='absolute top-[13.5rem] max-md:top-[10rem] max-md:px-5 font-dela text-[5.4rem] text-center leading-[6.5rem] max-xl:text-[3.5rem] max-xl:leading-[4.8rem] max-md:text-[1.9rem] max-md:leading-[3rem]'>Scholarships<br/> made easy.</div>
                        <div className='absolute top-[29rem] font-urban font-bold text-[18px] max-xl:top-[25rem] max-md:text-[15px] max-md:top-[20rem]'>Don’t let finances stop your dream.</div>
                    </div>

                </div>
                <ResponsiveSearchBar2/>
                {/* second section */}
                <div className='flex items-center font-semibold bg-bluegradient w-10/12 my-10 mx-auto gap-x-3 px-10 rounded-full py-14 max-lg:hidden'>
                    <button className='px-6 py-2 w-[25%] max-lg:w-[35%] flex justify-between bg-white text-black rounded-full'>Sort by<img src={downarrow} alt='down-arrow' width={20} /></button>
                    <button className='px-6 py-2 w-[25%] max-lg:w-[35%] flex justify-between bg-white text-black rounded-full'>Country<img src={downarrow} alt='down-arrow' width={20} /></button>
                </div>

                {/* third section */}
                <div  className=" bg-white bg-cover bg-center rounded-[200px] max-xl:rounded-[180px] max-md:rounded-[80px] pt-20 px-24 pb-32 mt-10 max-xl:px-14 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>

                        <div className='flex justify-between'>
                        
                            {/* left-side */}
                        <ScholarshipLeftbar />

                        {/* right-side */}
                        <div className='w-[73%] max-xl:w-[71%] max-lg:w-[100%]'>

                            {/* top section - seach bar */}
                            <div className='flex justify-between max-md:flex-col max-md:gap-y-2'>
                                <div className='border-[1px] border-[#0E1B2C]  bg-white rounded-full flex  items-center gap-4 font-urban font-bold py-2 px-5 '>
                                    <img src={coin} alt='coin' width={25} />
                                    123 scholarships found
                                </div>

                                <div className=' relative  rounded-[40px]'>
                                    <input
                                        type='text'
                                        placeholder='Search for scholarships'
                                        className='pl-12 py-3 pr-4  border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                                    <div className='absolute inset-y-4 left-6'>
                                        <img src={search} width={18} alt='search' />
                                    </div>
                                </div>
                            </div>

                            {/* ....................................................................................................... */}
                            {/* scholarships */}
                            <div className=' flex flex-wrap justify-between'>
                           
                                {/* card1 */}
                                {scholarships.map((s)=>(<div className='border mt-10 border-black w-[49%]  max-md:w-[100%] rounded-[40px] p-8 max-xl:p-6  bg-white hover:shadow-lightshad'>
                                    <div className='font-dela mb-3 text-[20px] max-xl:text-[16px]'>{s.scholarship}</div>
                                    <div className='font-urban max-xl:text-[15px]'>{s.description}</div>

                                    <div className='border-t-[0.5px] border-[#bfc0c5] my-4 max-xl:my-3'></div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <div className='text-[#898C9A] font-urban font-bold '>Deadline</div>
                                            <div className='font-dela text-[15px] max-xl:text-[12px]'>{s.deadline}</div>
                                        </div>
                                        <div className=''>
                                            <div className='text-[#898C9A] font-urban font-bold '>Total cost</div>
                                            <div className='font-dela text-[15px] max-xl:text-[12px]'>${s.totalCost}</div>
                                        </div>
                                    </div>
                                </div>))}
                                
                               
                            </div>
                            
                            {/* ....................................................................................................... */}
                        


                        </div>

                        </div>

                        {/* pagination buttons */}
                        {/* <div className='px-[40rem] font-urban text-[1.2rem] space-x-7 mt-[1rem] mb-[4rem] inline'>
                            <button className='rounded-full border px-5 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>1</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>2</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>3</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>4</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>5</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>6</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>7</button>
                            <button className='rounded-full border px-4 py-2
                                transition-all hover:bg-[#2b7cd6] cursor-pointer 
                                active:border-b-[4px] active:brightness-90 active:translate-y-[2px]
                                 active:bg-[#2b7cd6] hover:brightness-110
                                    border-[#0E1B2C]'>8</button>
                        </div> */}

                    
                    
                     
                    

                </div>
               <Contactus/>
                {/* FOOTER SECTION */}
                <Footer />
            </div>
        </>
    )
}

export default ScholarshipFinder



// {/* pagination buttons */}
// <div className='font-urban text-[1.2rem] flex'>
// <button className='rounded-full border px-4 py-2'>1</button>
// <button className='rounded-full border px-4 py-2'>2</button>
// <button className='rounded-full border px-4 py-2'>3</button>
// <button className='rounded-full border px-4 py-2'>4</button>
// <button className='rounded-full border px-4 py-2'>5</button>

// </div>