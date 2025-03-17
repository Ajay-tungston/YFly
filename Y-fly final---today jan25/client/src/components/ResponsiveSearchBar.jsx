import React, { useState } from 'react'
import dropdown from '../assets/images/image/down.svg'
import PercentageSlider from './PercentageSlider'
import bluesearch from '../assets/images/image/bluesearch.svg'
import FeeBudgetSlider from './FeeBudgetSlider'
import CourseDurationSlider from './CourseDuration'
import ScoreSlider from './ScoreSlider'


const ResponsiveSearchBar = () => {
    // COURSE LEVEL
    const [isOneOpen, setIsOneOpen] = useState(false);
    const courseLevelDropdown = () => { setIsOneOpen(!isOneOpen) };

     //country
     const [isTwoOpen, setIsTwoOpen] = useState(false);
     const countryDropdown = () => { setIsTwoOpen(!isTwoOpen) }
     //Area of study
    const [isThreeOpen, setIsThreeOpen] = useState(false);
    const AreaStudyDropdown = () => { setIsThreeOpen(!isThreeOpen) }

    //intake year
    const [isFourOpen, setIsFourOpen] = useState(false);
    const IntakeYearDropdown = () => { setIsFourOpen(!isFourOpen) }

    //special restrictions
    const [isSixOpen, setIsSixOpen] = useState(false);
    const SpecialRestrictionDropdown = () => { setIsSixOpen(!isSixOpen) }

    //Tuition Fee Budget
    const [isSevenOpen, setIsSevenOpen] = useState(false);
    const FeeBudgetDropdown = () => { setIsSevenOpen(!isSevenOpen) }

    //Course Duration
    const [isEightOpen, setIsEightOpen] = useState(false);
    const CourseDurationDropdown = () => { setIsEightOpen(!isEightOpen) }

    //English Proficiency Exam
    const [isNineOpen, setIsNineOpen] = useState(false);
    const EnglishExamDropdown = () => { setIsNineOpen(!isNineOpen) }

    //Academic Exam
    const [isTenOpen, setIsTenOpen] = useState(false);
    const AcademicExamDropdown = () => { setIsTenOpen(!isTenOpen) }
  return (
    
    <div className='flex justify-center mt-10 lg:hidden'>
    <div className='bg-bluegradient w-[90%] rounded-[50px] py-8 px-12 max-md:px-4 flex gap-y-3 max-md:gap-y-2 flex-wrap items-start justify-between'>
        {/* ------------course level-------------------  */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
                <button className='flex justify-between items-center py-4 max-md:py-3 gap-x-4 max-md:gap-x-2 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={courseLevelDropdown}>
                    Course Level 
                    <img src={dropdown} alt='dropdown' width={14} className={isOneOpen ? 'rotate-180' : ''} />
                </button>
                {isOneOpen && (
                    <div className=' flex flex-col mb-6 h-[15vh]  overflow-y-auto w-[19vw] max-lg:w-full'>

                        {/* CHECHBOX1 */}
                        <div className="inline-flex items-center px-5">
                            <label data-ripple-dark="true" htmlFor="checkbox1" className="relative flex cursor-pointer items-center rounded-full p-3"> <input id="checkbox1"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                type="checkbox"
                            />
                                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                    </svg>
                                </span>
                            </label>

                            <label htmlFor="checkbox1" className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                Masters
                            </label>
                        </div>
                        {/* CHECKBOX2 */}
                        <div className="inline-flex items-center px-5">
                            <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                <input
                                    id="checkbox2"
                                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                        before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                        before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                    type="checkbox"
                                />
                                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                    </svg>
                                </span>
                            </label>


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                MBA
                            </label>
                        </div>
                        {/* CHECKBOX3 */}
                        <div className="inline-flex items-center px-5">
                            <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                <input
                                    id="checkbox3"
                                    className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                        before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                        before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                    type="checkbox"
                                />
                                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                    </svg>
                                </span>
                            </label>


                            <label htmlFor="checkbox3" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                Bachelors
                            </label>
                        </div>


                        <div className='font-urban text-[18px] max-xl:text-[0.9rem] font-bold pl-8 py-4'>Percentage scored</div>
                        <PercentageSlider />

                    </div>
                )}

        </div>
        {/* ------------------------Country----------------------------- */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
                    <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-5' onClick={countryDropdown}>
                        Country<img src={dropdown} alt='dropdown' width={14} className={isTwoOpen ? 'rotate-180' : ''} />
                    </button>
                    {isTwoOpen && (
                        <div className=' flex flex-col mb-6'>
                            {/* search bar */}
                            <div className=' relative  rounded-[40px] mx-7'>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className='py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                                <div className='absolute inset-y-2 left-[1.5rem]'>
                                    <img src={bluesearch} width={18} alt='search' />
                                </div>
                            </div>
                            {/* chleckboxes */}
                            <div className='flex flex-col mt-3 h-[10vh]  overflow-y-auto  max-lg:w-full px-1'>
                                {/* CHECHBOX 1 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox4" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input id="checkbox4"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>

                                    <label htmlFor="checkbox1" className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        USA
                                    </label>
                                </div>



                                {/* CHECKBOX 2*/}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox5" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox5"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                        Canada
                                    </label>
                                </div>

                                {/* CHECKBOX 3 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox6" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox6"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        United Kingdom
                                    </label>
                                </div>

                                {/* CHECKBOX 4 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox7" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox7"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Ireland
                                    </label>
                                </div>

                                {/* CHECKBOX 5 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        New Zealand
                                    </label>
                                </div>

                                {/* CHECKBOX 6 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Australia
                                    </label>
                                </div>

                                {/* CHECKBOX 7 */}
                                <div className="inline-flex items-center px-5">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                                before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Germany
                                    </label>
                                </div>

                            </div>
                        </div>
                    )}

                    

        </div>
        {/* =----------------------Area of study----------------------- */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
                    <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={AreaStudyDropdown}>
                        Area of study <img src={dropdown} alt='dropdown' width={14} className={isThreeOpen ? 'rotate-180' : ''} />
                    </button>
                    {isThreeOpen && (
                        <div className=' flex flex-col mb-6'>

                            {/* search bar */}
                            <div className=' relative  rounded-[40px] mx-7 max-xl:mx-5'>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className='py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                                <div className='absolute inset-y-2 left-[1.5rem]'>
                                    <img src={bluesearch} width={18} alt='search' />
                                </div>
                            </div>

                            {/* chleckboxes */}
                            <div className='flex flex-col mt-5 px-0 h-[10vh]  overflow-y-auto w-[19vw] max-lg:w-full'>
                                {/* CHECHBOX 1 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox1" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input id="checkbox1"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                    before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                    before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>

                                    <label htmlFor="checkbox1" className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Agriculture, Forestry & Fishery
                                    </label>
                                </div>

                                {/* CHECKBOX 2 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Architecture & Building
                                    </label>
                                </div>

                                {/* CHECKBOX 3 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Arts
                                    </label>
                                </div>

                                {/* CHECKBOX 4 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Commerce, Business & Administration
                                    </label>
                                </div>

                                {/* CHECKBOX 5*/}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Computer Science & IT
                                    </label>
                                </div>

                                {/* CHECKBOX 6 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Education
                                    </label>
                                </div>

                                {/* CHECKBOX 7 */}
                                <div className="inline-flex items-center px-5 max-xl:px-3 mt-2">
                                    <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                        <input
                                            id="checkbox2"
                                            className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                            type="checkbox"
                                        />
                                        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                                <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                            </svg>
                                        </span>
                                    </label>


                                    <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                        Engineering & Engineering Trades
                                    </label>
                                </div>
                            </div>
                        </div>



                    )}
        </div>
        {/* Intake year */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
                <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={IntakeYearDropdown}>
                    Intake year <img src={dropdown} alt='dropdown' width={14} className={isFourOpen ? 'rotate-180' : ''} />
                </button>
                {isFourOpen && (
                    <div className=' flex flex-col mb-6'>
                        {/* search bar */}
                        <div className=' relative  rounded-[40px] mx-7'>
                            <input
                                type='text'
                                placeholder='Search'
                                className='py-1 px-12 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                            <div className='absolute inset-y-2 left-[1.5rem]'>
                                <img src={bluesearch} width={18} alt='search' />
                            </div>
                        </div>
                        {/* chleckboxes */}
                        <div className='flex flex-col h-[10vh]  overflow-y-auto max-lg:w-full mt-3 px-1'>
                            {/* CHECHBOX 1 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox1" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input id="checkbox1"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                                before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>

                                <label htmlFor="checkbox1" className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Aug - Nov 2024
                                </label>
                            </div>

                            {/* CHECKBOX 2 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                        before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                        before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Dec - March 2025
                                </label>
                            </div>

                            {/* CHECKBOX 3*/}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                        before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                        before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Apr - July 2025
                                </label>
                            </div>

                            {/* CHECKBOX 4 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Aug - Nov 2025
                                </label>
                            </div>

                            {/* CHECKBOX 5 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Dec - March 2026
                                </label>
                            </div>

                            {/* CHECKBOX 6 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Spring
                                </label>
                            </div>

                            {/* CHECKBOX 7 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Summer
                                </label>
                            </div>


                            {/* CHECKBOX 8 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Fall
                                </label>
                            </div>
                            {/* CHECKBOX 9 */}
                            <div className="inline-flex items-center px-5">
                                <label data-ripple-dark="true" htmlFor="checkbox2" className="relative flex cursor-pointer items-center rounded-full p-3">
                                    <input
                                        id="checkbox2"
                                        className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute before:top-2/4
                                            before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                        type="checkbox"
                                    />
                                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                        </svg>
                                    </span>
                                </label>


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                                    Winter
                                </label>
                            </div>
                        </div>


                    </div>

                )}
                
            </div>
          {/* Scholarship */}
          <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={SpecialRestrictionDropdown}>
                Scholarship <img src={dropdown} alt='dropdown' width={14} className={isSixOpen ? 'rotate-180' : ''} />
            </button>
            {isSixOpen && (
                <div className='flex flex-col mb-6'>
                    {/* CHECHBOX 1 */}
                    <div className="inline-flex items-center px-5">
                        <label data-ripple-dark="true" htmlFor="checkbox1" className="relative flex cursor-pointer items-center rounded-full p-3">
                            <input id="checkbox1"
                                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-md border border-blue transition-all before:absolute                  
                            before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#2b7cd6] before:opacity-0
                            before:transition-opacity checked:border-[#2b7cd6] checked:bg-[#2b7cd6] checked:before:bg-[#2b7cd6] hover:before:opacity-10"
                                type="checkbox"
                            />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg strokeWidth="1" stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" ></path>
                                </svg>
                            </span>
                        </label>

                        <label htmlFor="checkbox1" className=" cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem]">
                            Scholarship Available
                        </label>
                    </div>

                </div>
            )}

        </div>

           {/* Tuition Fee Budget */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={FeeBudgetDropdown}>
                Tuition Fee Budget <img src={dropdown} alt='dropdown' width={14} className={isSevenOpen ? 'rotate-180' : ''} />
            </button>
            {isSevenOpen && (
                <div className='flex flex-col mb-6'>

                    <div className='my-4'>

                        {/* tution fee range */}
                        <FeeBudgetSlider />

                    </div>


                </div>
            )}

            
        </div>

        {/* Course Duration */}
        <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between gap-x-4 max-md:gap-x-2  items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={CourseDurationDropdown}>
                Course Duration <img src={dropdown} alt='dropdown' width={14} className={isEightOpen ? 'rotate-180' : ''} />
            </button>
            {isEightOpen && (
                <div className='flex flex-col mb-6'>

                    <div className='my-4'>

                        {/* Course Duration  */}
                        <CourseDurationSlider />

                    </div>


                </div>
            )}

        </div>
         {/* Academic Exam*/}
         <div className='flex flex-col w-[49%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between  gap-x-4 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={AcademicExamDropdown}>
                Academic Exam <img src={dropdown} alt='dropdown' width={14} className={isTenOpen ? 'rotate-180' : ''} />
            </button>
            {isTenOpen && (
                <div className='flex flex-col mb-6'>

                    <div className='mx-8 max-xl:mx-6 '>

                        <select className='w-full rounded-full text-[0.9rem]'>
                            <option value="GRE">GRE</option>
                            <option value="GMAT">GMAT</option>
                        </select>

                    </div>


                </div>
            )}

        </div>
        {/* English Proficiency Exam*/}
        <div className='flex flex-col w-[70%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between gap-x-4  items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={EnglishExamDropdown}>
                English Proficiency Exam <img src={dropdown} alt='dropdown' width={14} className={isNineOpen ? 'rotate-180' : ''} />
            </button>
            {isNineOpen && (
                <div className='flex flex-col mb-6'>
                    <div className='mx-8 max-xl:mx-6'>
                        <select className='w-full rounded-full text-[0.9rem]'>
                            <option value="ILETS">IELTS Exam Score</option>
                            <option value="TOEFL">TOEFL Exam Score</option>
                            <option value="PTE">PTE Exam Score</option>
                        </select>
                    </div>
                    <div className='my-4'>

                        {/* tution fee range */}
                        <ScoreSlider />

                    </div>


                </div>
            )}

        </div>
        <button className='bg-[#2B7CD6] w-[26%] max-md:w-[100%] px-8 max-md:px-2 py-3 rounded-full font-urban text-white'>Done</button>

    </div>
    </div>
  )
}

export default ResponsiveSearchBar