import React,{useState,useEffect,useRef} from 'react'
import dropdown from '../assets/images/image/down.svg'
import bluesearch from '../assets/images/image/bluesearch.svg'
import search from '../assets/images/image/search.svg'
import PercentageSlider from './PercentageSlider'
const CourseFinderBar = () => {
     // COURSE LEVEL
     const [isCourseLevelOpen, setIsCourseLevelOpen] = useState(false);
     const courseLevelDropdown = () => { setIsCourseLevelOpen(!isCourseLevelOpen) };
     const courseLevelRef=useRef(null);
    //country
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const countryDropdown = () => { setIsCountryOpen(!isCountryOpen) }
    const countryRef = useRef(null);
    //intake year
    const [isIntakeOpen, setIsIntakeOpen] = useState(false);
    const IntakeYearDropdown = () => { setIsIntakeOpen(!isIntakeOpen) }
    const IntakeRef = useRef(null);

     //Area of study
     const [isAreaOfStudyOpen, setIsAreaOfStudyOpen] = useState(false);
     const [selectedArea, setSelectedArea]=useState(null)
     const AreaStudyDropdown = () => { setIsAreaOfStudyOpen(!isAreaOfStudyOpen) }
     const AreaRef = useRef(null);

     // for Duration
     const [isDisciplineOpen, setIsDisciplineOpen] = useState(false);
     const disciplineDropdown = () => { setIsDisciplineOpen(!isDisciplineOpen) };
     const [selectedDiscipline, setSelectedDiscipline]=useState(null)
     const DisciplineRef=useRef(null);

     // for Duration
     const [isDurationOpen, setIsDurationOpen] = useState(false);
     const durationDropdown = () => { setIsDurationOpen(!isDurationOpen) };
     const [selectedDuration, setSelectedDuration]=useState(null)
     const DurationRef=useRef(null);

     // Backlogs
     const [isBacklogsOpen, setIsBacklogsOpen] = useState(false);
     const backlogsDropdown = () => { setIsBacklogsOpen(!isBacklogsOpen) };
     const [selectedBacklogs, setSelectedBacklogs]=useState(null)
     const BacklogsRef = useRef(null);

    // Tuition Fee
    const [isTuitionFeeOpen, setIsTuitionFeeOpen] = useState(false);
    const tuitionFeeDropdown = () => { setIsTuitionFeeOpen(!isTuitionFeeOpen) };
    const [selectedTuition, setSelectedTuition]=useState(null)
    const tuitionRef = useRef(null);
    //scholarship applicability
    const [isApplicabilityOpen, setIsApplicabilityOpen] = useState(false);
    const ScholarshipApplicabilityDropdown = () => { setIsApplicabilityOpen(!isApplicabilityOpen) }
    const [selectedApplicability, setSelectedApplicability]=useState(null)
    const applicabilityRef=useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryRef.current && !countryRef.current.contains(event.target)) {
                setIsCountryOpen(false);
                setIsIntakeOpen(false)
                setIsAreaOfStudyOpen(false)
                setIsDisciplineOpen(false)
                setIsDurationOpen(false)
                setIsBacklogsOpen(false)
                setIsApplicabilityOpen(false)
                setIsTuitionFeeOpen(false)
                setIsCourseLevelOpen(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsCountryOpen(false);
    }
        // Close dropdown on selection
    
    // const handleAreaOfStudy = (area) => {
    //     setSelectedArea(area);
    //    setIsAreaOfStudyOpen(false); // Close dropdown on selection
    // };
    // const handleCourseLevel = (courselevel) => {
    //     setSelectedArea(courselevel);
    //    setIsCourseLevelOpen(false); // Close dropdown on selection
    // };
    // const handleApplicability = (applicability) => {
    //     setSelectedArea(applicability);
    //    setIsApplicabilityOpen(false); // Close dropdown on selection
    // };
    // const handleDiscipline = (discipline) => {
    //     setSelectedDiscipline(discipline);
    //     setIsDisciplineOpen(false); // Close dropdown on selection
    //     };
    //     const handleDuration = (duration) => {
    //         setSelectedDuration(duration);
    //         setIsDurationOpen(false); // Close dropdown on selection
    //         };
    //         const handleBacklogs = (backlogs) => {
    //             setSelectedBacklogs(backlogs);
    //             setIsBacklogsOpen(false); // Close dropdown on selection
    //         };
    //         const handleTuitionFee = (tuitionfee) => {
    //             setIsTuitionFeeOpen(tuitionfee)
    //             setIsTuitionFeeOpen(false)
  return (
    <div className='flex  justify-center  mt-10'>
    <div className='bg-bluegradient w-[90%] rounded-[5rem] gap-y-2 max-md:rounded-[30px] max-lg:rounded-[80px] py-12 px-20 max-md:px-5 max-lg:px-10 flex flex-wrap justify-between items-start max-xl:px-16'>
        <div className=' relative max-md:w-full'>
            <input
                type='text'
                placeholder='Search for courses'
                className='px-4 py-4 max-md:py-3 Search w-[22rem] max-xl:w-[25rem] max-lg:w-[23rem] max-md:w-[100%] border-black border rounded-[40px] placeholder-[#BFBFBF] font-urban max-md:text-[0.8rem]' />
            <div className='absolute inset-y-4 right-6'>
                <img src={search} width={18} alt='search' />
            </div>
        </div>
         {/* ------------------------Country----------------------------- */}
        <div ref={countryRef} className='flex flex-col w-[15%] max-xl:w-[23%] max-lg:w-[38%] max-md:w-[100%] rounded-[30px] bg-white'>
            <button className='flex justify-between gap-x-4 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-5' onClick={countryDropdown}>
            {selectedCountry || 'Country'}<img src={dropdown} alt='dropdown' width={14}  className={isCountryOpen ? 'rotate-180' : ''} />
            </button>
            {isCountryOpen && (
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
                                    onChange={() => handleCountrySelect('USA')}
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
                                    onChange={() => handleCountrySelect('Canada')}
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
                                    onChange={() => handleCountrySelect('United Kingdom')}
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
                                    onChange={() => handleCountrySelect('Ireland')}

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
                                    onChange={() => handleCountrySelect('New Zealand')}
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
                                    onChange={() => handleCountrySelect('Australia')}
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
                                    onChange={() => handleCountrySelect('Germany')}
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
         {/* Intake year */}
        <div ref={IntakeRef} className='flex flex-col max-md:w-[100%] w-[15%] max-xl:w-[23%] max-lg:w-[28%] rounded-[30px] bg-white'>
            <button className='flex justify-between items-center py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-8' onClick={IntakeYearDropdown}>
                Intake <img src={dropdown} alt='dropdown' width={14} className={isIntakeOpen ? 'rotate-180' : ''}/>
            </button>
            {isIntakeOpen && (
                <div className=' flex flex-col mb-6'>
                    {/* search bar */}
                    <div className=' relative  rounded-[40px] mx-5 px-1'>
                        <input
                            type='text'
                            placeholder='Search'
                            className='py-1 pl-10 w-full border-[#bfbfbf] border rounded-[40px] placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                        <div className='absolute inset-y-2 left-[1.5rem]'>
                            <img src={bluesearch} width={18} alt='search' />
                        </div>
                    </div>
                    {/* chleckboxes */}
                    <div className='flex flex-col mt-3 px-1 h-[10vh]  overflow-y-auto'>
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
                                2024
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                2025
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                2026
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                Spring
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                Summer
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                Fall
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                Winter
                            </label>
                        </div>
                    </div>
                </div>
            )}

        </div>
          {/* ------------course level-------------------  */}
          <div className='flex flex-col max-xl:w-[26%] w-[18%] max-md:w-[100%] max-lg:w-[35%] rounded-[30px] bg-white' ref={courseLevelRef}>
                <button className='flex justify-between items-center py-4 max-md:py-3 gap-x-4 max-md:gap-x-2 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={courseLevelDropdown}>
                    Course Level 
                    <img src={dropdown} alt='dropdown' width={14} className={isCourseLevelOpen ? 'rotate-180' : ''} />
                </button>
                {isCourseLevelOpen && (
                    <div className=' flex flex-col mb-6 h-[15vh]  overflow-y-auto w-full max-lg:w-full'>

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

         {/* =----------------------Area of study----------------------- */}
         <div className=  'flex flex-col w-[20%] max-xl:w-[26%] max-md:w-[100%] max-lg:w-[35%] rounded-[30px] bg-white'>
                    <button className='flex justify-between gap-x-4 max-md:gap-x-2 items-center py-4 max-md:py-3 font-bold text-black text-[1.1rem] max-md:text-[0.9rem] px-8 max-md:px-4' onClick={AreaStudyDropdown}>
                        Area of study <img src={dropdown} alt='dropdown' width={14} className={isAreaOfStudyOpen? 'rotate-180' : ''} />
                    </button>
                    {isAreaOfStudyOpen && (
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
                            <div className='flex flex-col mt-5 px-0 h-[10vh]  overflow-y-auto w-full max-lg:w-full'  ref={AreaRef}>
                                {/* CHECHBOX 1 */}
                                <div className="inline-flex items-center px-4 max-xl:px-3 mt-2">
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

         {/* desired course */}
         <div className='flex flex-col w-[18%] max-xl:w-[23%] max-lg:w-[34%] max-md:w-[100%] rounded-[30px] bg-white' useRef={DisciplineRef}>
            <button className='flex justify-between items-center  py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-8 ' onClick={disciplineDropdown}>
                Discipline <img src={dropdown} alt='dropdown' width={14} className={isDisciplineOpen ? 'rotate-180' : ''}/>
            </button>
            {isDisciplineOpen && (
                <div className=' flex flex-col mb-6'>

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
                            discipline 1
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


                        <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                        discipline 1
                        </label>
                    </div>
                </div>
            )}
        </div>

         {/*Duration */}
         <div className='flex flex-col w-[18%] max-xl:w-[23%] max-lg:w-[34%] max-md:w-[100%] rounded-[30px] bg-white' ref={DurationRef}>
            <button className='flex justify-between items-center  py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-8 ' onClick={durationDropdown}>
            Duration <img src={dropdown} alt='dropdown' width={14} className={isDurationOpen ? 'rotate-180' : ''}/>
            </button>
            {isDurationOpen && (
                <div className=' flex flex-col mb-6'>

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
                            Duration 1
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


                        <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                        Duration 2
                        </label>
                    </div>
                </div>
            )}
        </div>

         {/*Backlogs */}
         <div className='flex flex-col w-[18%] max-xl:w-[27%] max-lg:w-[30%] max-md:w-[100%] rounded-[30px] bg-white' ref={BacklogsRef}>
            <button className='flex justify-between items-center  py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-8 ' onClick={backlogsDropdown}>
            Backlogs <img src={dropdown} alt='dropdown' width={14} className={isTuitionFeeOpen ? 'rotate-180' : ''}/>
            </button>
            {isBacklogsOpen && (
                <div className=' flex flex-col mb-6'>

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
                        Backlogs 1
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


                        <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                        Backlogs 2
                        </label>
                    </div>
                </div>
            )}
        </div>

        {/*Tuition Fee */}
        <div className='flex flex-col w-[18%] max-xl:w-[30%] max-md:w-[100%] max-lg:w-[35%] rounded-[30px] bg-white' ref={tuitionRef}>
            <button className='flex justify-between items-center  py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-8 ' onClick={tuitionFeeDropdown}>
            Tuition Fee <img src={dropdown} alt='dropdown' width={14} className={isTuitionFeeOpen ? 'rotate-180' : ''}/>
            </button>
            {isTuitionFeeOpen && (
                <div className=' flex flex-col mb-6'>

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
                        Tuition Fee 1
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


                        <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                        Tuition Fee 2
                        </label>
                    </div>
                </div>
            )}
        </div>

        {/* Scholarship Applicability*/}
        <div className='flex flex-col w-[25%] max-xl:w-[41%] max-md:w-[100%] max-lg:w-[64%] rounded-[30px] bg-white' ref={applicabilityRef}>
            <button className='flex justify-between items-center py-4 max-md:py-3 max-md:px-5 max-md:text-[0.9rem] font-bold text-black text-[1.1rem] px-3 max-xl:px-4 max-xl:text-[1rem]' onClick={ScholarshipApplicabilityDropdown}>
                Scholarship Applicability<img src={dropdown} alt='dropdown' width={14} className={isApplicabilityOpen ? 'rotate-180' : ''}/>
            </button>
            {isApplicabilityOpen && (
                <div className='flex flex-col mb-4'>
                    <div>
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
                                Not specific to college
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


                            <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                College specific
                            </label>
                        </div>
                    </div>
                    <div>
                        {/* search bar */}
                        <div className=' relative  rounded-[40px] px-10 mt-2'>
                            <input
                                type='text'
                                placeholder='Search'
                                className='py-1 px-7 w-full border-[#bfbfbf] border rounded-[40px] placeholder:pl-3 placeholder-[#BFBFBF] font-urban focus:outline-none active:outline-none' />
                            <div className='absolute inset-y-2 left-[3.7rem]'>
                                <img src={bluesearch} width={18} alt='search' />
                            </div>
                        </div>
                        <div className='flex flex-col mt-2 px-3  h-[7.5vh]  overflow-y-auto w-full '>
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
                                    University of Houston
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


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                    California State University
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


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                    Harward University
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


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                    Columbia University
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


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                    Yale University
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


                                <label htmlFor="checkbox2" className="mt-px cursor-pointer select-none font-normal text-[#0e1b2c] tracking-wider text-[1rem] max-xl:text-[0.9rem] ">
                                    Cornell University
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>

        
            
        <div className='w-full flex justify-end'>
        <button className='flex items-center justify-center  max-md:ml-20 mb-2 py-3 px-8 bg-[#2B7CD6] text-white rounded-full  max-xl:text-[14px] max-xl:h-[5vh]'>Done</button>
        </div>
        

    </div>



















   
    </div>
  )
}

export default CourseFinderBar;