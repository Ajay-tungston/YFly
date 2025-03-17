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
import WhyStudySlider from './WhyStudySlider'


const StudyinComponent = () => {
    const [drop1, setDrop1] = useState(false)
    const [drop2, setDrop2] = useState(false)
    const [drop3, setDrop3] = useState(false)
    const [drop4, setDrop4] = useState(false)
    const [drop5, setDrop5] = useState(false)

    const universities=[{
        id:1,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
    },{
        id:2,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
    },
    {
        id:3,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
    },
    {
        id:4,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
    },
    {
        id:5,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
    },{
        id:6,
        image:harvard,
        university:"Harvard University",
        place:"Cambridge, Massachusetts",
        rank:"#4"
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
            <div  className=" bg-white bg-cover bg-center rounded-[200px] max-md:rounded-[80px] pt-16 px-24 pb-32 mt-10 max-xl:px-16 max-lg:px-10 max-md:px-5"
                style={{ backgroundImage: `url(${grid})` }}>
                    
               


                    {/*---------------------------- why study  in USA---------------------- */}
                    <div className='text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] max-md:pl-4 pl-10'>Why study in USA?</div>
                    <WhyStudySlider/>

                    {/*----------------------------------------------- Quick facts--------------------------------------------- */}
                    <div className='text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem] max-md:text-[1.1rem] max-md:pl-4  pl-10 mt-16 mb-8'>Quick facts</div>

                    <div className='bg-[#30589F] rounded-[38px] px-6 pt-6 max-md:px-3 max-md:pt-3 text-[15px] max-md:text-[10px] text-[#0E1B2C]'>
                        <div className='flex '>
                            <div className='bg-white  py-[1.8rem] w-[50%] px-16 max-xl:px-7 max-md:px-4  text-center mr-6 mb-6 max-md:mr-3 max-md:mb-3 font-dela rounded-[30px] max-lg:px-[3.5rem]'>USA hosts more than a million international students</div>
                            <div className='bg-white py-[1.8rem] w-[50%] px-16 max-xl:px-7 max-md:px-4 mb-6 max-md:mb-3 text-center  font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Internships (CPT) up to 12 months while studying</div>
                        </div>

                        <div className='flex '>
                            <div className='bg-white py-[1.8rem]  w-[60%] text-center px-[4rem] max-md:px-4 max-md:w-[50%] mb-6 mr-6 max-md:mr-3 max-md:mb-3 font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Opportunities for Research, Teaching and Graduate Assistantships</div>
                            <div className='bg-white py-[1.8rem]  w-[40%] text-center px-[5.2rem] max-md:px-4 max-md:w-[50%] max-xl:px-[2.5rem] mb-6 max-md:mb-3 font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Best of 12 Student Cities (QS 2023)</div>
                        </div>

                        <div className='flex'>
                            <div className='bg-white py-[1.8rem]  w-[40%] text-center px-[3.5rem] max-md:px-4 max-md:w-[50%] mb-6 mr-6 max-md:mr-3 max-md:mb-3 font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Merit based and Need based scholarships</div>
                            <div className='bg-white py-[1.8rem]  w-[60%] text-center px-[4.2rem] max-md:px-4 max-md:w-[50%] mb-6 max-md:mb-3 font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Post-study stay back visas (OPT) up to 3 years for STEM programs</div>
                        </div>

                        <div className='flex'>
                            <div className='bg-white py-[1.8rem]  w-[55%] text-center px-[3.2rem] max-md:px-4 max-md:w-[50%] mr-6 mb-6 max-md:mr-3 max-md:mb-3  font-dela  rounded-[30px] max-lg:px-[3.5rem]'>Over 4500 accredited universities & institutions to choose from</div>
                            <div className='bg-white py-[1.8rem]  w-[45%] text-center px-[3.2rem] max-md:px-4 max-md:w-[50%] mb-6 max-md:mb-3 font-dela  rounded-[30px] max-lg:px-[3.5rem]'>25% of world’s top 100 universities are in the USA</div>
                        </div>
                    </div>


                    {/*---------------------------------- Cost of studying ---------------------------------------*/}
                    <div className='text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8'>Cost of studying</div>

                    <div className=' relative border-[1px] h-[300px] border-black rounded-[38px] shadow-right-bottom bg-white'>
                        <img src={coins} width={130} alt='coins' className=' absolute bottom-0 rounded-bl-[38px] max-xl:w-[6rem] max-md:w-[4rem]' />
                        <img src={twinkle} width={50} alt='twinkle' className=' absolute right-5 mt-6 max-xl:w-[2.5rem]' />

                        <div className='flex justify-between max-lg:flex-col items-center h-[300px] px-28 max-lg:py-10'>

                            <div className='flex max-lg:-ml-5 max-md:-ml-0'>
                                <img src={fee} alt='fee' className=' max-xl:w-[2rem]'></img>
                                <div className='ml-3'>
                                    <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Tuition fees</div>
                                    <div className='text-[#30589F] font-dela text-[20px] max-xl:text-[15px]'>$25000</div>
                                </div>
                            </div>

                            <div className='flex items-center max-md:-ml-0'>
                                <img src={accomodation} alt='accomodation' width={50} className=' max-xl:w-[2rem]'></img>
                                <div className='ml-3'>
                                    <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Living & Accomodation</div>
                                    <div className='text-[#30589F] font-dela text-[20px] max-xl:text-[15px]'>$15000</div>
                                </div>
                            </div>

                            <div className='flex max-lg:-ml-10 max-md:-ml-2'>
                                <img src={airfare} alt='airfare' className=' max-xl:w-[2rem]'></img>
                                <div className='ml-3'>
                                    <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Airfare</div>
                                    <div className='text-[#30589F] font-dela text-[20px] max-xl:text-[15px]'>$1000</div>
                                </div>
                            </div>

                            <div className='flex max-lg:-ml-12 max-md:-ml-2'>
                                <img src={visa} alt='visa' className=' max-xl:w-[2rem]'></img>
                                <div className='ml-3'>
                                    <div className='text-[13px] max-xl:text-[10px] font-bold font-urban text-[#898C9A]'>Visa</div>
                                    <div className='text-[#30589F] font-dela text-[20px] max-xl:text-[15px]'>$510</div>
                                </div>
                            </div>
                        </div>


                    </div>


                    {/*--------------------------------------- Top universities------------------------- */}
                    <div className='text-[#2B7CD6] font-dela text-[2rem]  max-lg:text-[1.4rem]  pl-10 mt-16 mb-8'>Top universities</div>

                    <div className='flex flex-wrap justify-between '>
                        {universities.map((u)=>( 
                            <div className=' border-[1px] w-[32%] max-xl:w-[49%] max-md:w-[98%] border-black rounded-[38px] hover:shadow-right-bottom bg-white p-6 mb-3'>
                            <div className=' border-[1px] py-10 border-black rounded-[30px] bg-white flex justify-center'>
                                <img src={u.image} alt='harward' width={300} className=' max-lg:w-[13rem]' />
                            </div>
                            <div className='flex justify-between mt-6 items-center'>
                                <div>
                                    <div className=' font-dela max-lg:text-[13px]'>{u.university}</div>
                                    <div className=' font-urban text-[#898C9A] font-bold text-[14px] max-lg:text-[11px]'>{u.place}</div>
                                </div>
                                <div className='font-urban font-bold max-lg:text-[13px]'>QS Rank: {u.rank}</div>
                            </div>
                        </div>))}
                        
                    </div>
                   

                    {/*---------------------------------- FAQs------------------------------- */}
                    <div>
                        <div className='text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem]  pl-10 mt-16 mb-8 '>FAQs</div>

                        {/* ----------------Can you work while studying in USA?---------- */}
                        <div className='border-[1px] border-black rounded-[38px] bg-white p-6 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div className='font-dela text-[14px] '>Can you work while studying in USA?</div>
                                <button onClick={handleDrop1}>
                                    <img src={down} alt='down' width={15} className={drop1 ? 'rotate-180' : ''}></img>
                                </button>

                            </div>
                            {drop1 &&
                                <div>
                                    <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                    <div className='font-urban text-[13px]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                </div>

                            }

                        </div>

                        {/* -------------What are the English language proficiency in USA?------------- */}
                        <div className='border-[1px] border-black rounded-[38px] bg-white p-6 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div className='font-dela text-[14px] '>What are the English language proficiency in USA?</div>
                                <button onClick={handleDrop2}>
                                    <img src={down} alt='down' width={15} className={drop2 ? 'rotate-180' : ''}></img>
                                </button>

                            </div>
                            {drop2 &&
                                <div>
                                    <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                    <div className='font-urban text-[13px]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                </div>

                            }

                        </div>

                        {/* -------------What are other standardized tests in USA?------------- */}
                        <div className='border-[1px] border-black rounded-[38px] bg-white p-6 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div className='font-dela text-[14px] '>What are other standardized tests in USA?</div>
                                <button onClick={handleDrop3}>
                                    <img src={down} alt='down' width={15} className={drop3 ? 'rotate-180' : ''}></img>
                                </button>

                            </div>
                            {drop3 &&
                                <div>
                                    <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                    <div className='font-urban text-[13px]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                </div>

                            }

                        </div>

                        {/* ------------What are the popular courses in USA?------------- */}
                        <div className='border-[1px] border-black rounded-[38px] bg-white p-6 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div className='font-dela text-[14px] '>What are the popular courses in USA?</div>
                                <button onClick={handleDrop4}>
                                    <img src={down} alt='down' width={15} className={drop4 ? 'rotate-180' : ''}></img>
                                </button>

                            </div>
                            {drop4 &&
                                <div>
                                    <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                    <div className='font-urban text-[13px]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                </div>

                            }

                        </div>

                        {/* -------------Are there any scholarships available in USA?------------- */}
                        <div className='border-[1px] border-black rounded-[38px] bg-white p-6 mb-3'>
                            <div className='flex justify-between items-center'>
                                <div className='font-dela text-[14px] '>Are there any scholarships available in USA?</div>
                                <button onClick={handleDrop5}>
                                    <img src={down} alt='down' width={15} className={drop5 ? 'rotate-180' : ''}></img>
                                </button>

                            </div>
                            {drop5 &&
                                <div>
                                    <div className='border-t-[0.5px] border-[#898c9a78] my-3'></div>
                                    <div className='font-urban text-[13px]'>Lorem ipsum dolor sit amet consectetur. Semper quisque nunc luctus nibh fames nullam velit cras est. Id facilisis arcu nunc id placerat mauris. Morbi in in facilisi cursus viverra donec. Congue ullamcorper neque lobortis malesuada facilisi. Quam nulla a a ut. Purus faucibus proin morbi suspendisse elit sed. Luctus vel lobortis a semper. Vel quam diam accumsan ac interdum elit commodo. Elit dictum interdum vulputate amet. Et curabitur quisque duis rhoncus risus etiam. Sed tellus viverra et in arcu quisque odio aliquet.</div>
                                </div>

                            }

                        </div>

                    </div>
                    {/*---------------------------------------- contact us section------------------------------ */}
                    {/* <Contactus /> */}


            </div>


        </div>
    )
}

export default StudyinComponent