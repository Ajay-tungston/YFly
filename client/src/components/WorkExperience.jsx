import React, {useState} from 'react'
import leftarrow from '../assets/images/backswitch.svg'

 
const WorkExperience = ({ onOpenMajorSelection }) => {
    const [noExperience, setNoExperience] = useState(false)
    const [months, setMonths] = useState('')
    const [showWarning, setShowWarning] = useState(false)
 
    const handleNoExperience = () => {
        setNoExperience(true)
        setMonths('')
        setShowWarning(false)
    }
 
    const handleYesExperience = () => {
        setNoExperience(false)
        setShowWarning(false)
    }
 
    const handleMonthsChange = (event) => {
        setMonths(event.target.value)
        setShowWarning(false)
    }
 
    const handleContinue = () => {
        if (noExperience || months === '') {
            setShowWarning(true)
        } else {
            onOpenMajorSelection()
        }
    }
 
    return (
        
            <div className={`py-10 px-20 max-md:w-[80%] max-md:px-10 max-lg:px-16 rounded-[40px] ${noExperience ? 'bg-[#9b9b9be8]' : 'bg-white'}`}>
                <button className='mb-7'>
                    <img src={leftarrow} width={22} alt='arrow' />
                </button>
 
                <div className='text-center font-dela text-[#2B7CD6] max-md:text-[0.9rem]'>Do you have any work experience?</div>
                <div className='flex justify-center mt-8 text-[#2B7CD6] font-dela'>
                    <div
                        onClick={handleYesExperience}
                        className={`border-black border-[1px] max-md:text-[0.8rem] mr-6 max-md:mr-2 max-md:px-5 max-lg:px-7 max-md:py-3 max-lg:py-4 py-5 px-9 rounded-[18px] ${!noExperience ? 'shadow-black shadow-right-bottom bg-[#30589F] text-white' : 'bg-white text-[#2B7CD6] hover:shadow-black hover:shadow-right-bottom hover:bg-[#30589F] hover:text-white'}`}
                    >
                        Yes
                    </div>
                    <button
                        onClick={handleNoExperience}
                        className={`border-black border-[1px] max-md:text-[0.8rem] py-5 px-9 max-md:px-5 max-lg:px-7 max-md:py-3 max-lg:py-4 rounded-[18px] hover:shadow-black hover:shadow-right-bottom hover:bg-[#30589F] hover:text-white ${noExperience ? 'bg-[#30589F] text-white' : ''}`}
                    >
                        No
                    </button>
                </div>
 
                <div className='text-center font-dela text-[#2B7CD6] mt-10 max-md:text-[0.8rem]'>Your experience</div>
 
                <div className='flex justify-center mt-5'>
                    <input
                        type='text'
                        disabled={noExperience}
                        placeholder='in months'
                        value={months}
                        onChange={handleMonthsChange}
                        className='border-[#BFBFBF] border-b-[1px] border-r-0 border-l-0 border-t-0 text-center max-md:text-[0.8rem]  w-[7rem] focus:outline-none active:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f]'
                    />
                </div>
                {showWarning && (
                    <div className='text-center text-red-500 mt-2'>
                        Please enter your experience details.
                    </div>
                )}
 
                <div className='flex justify-end mt-10'>
                    <button
                        onClick={handleContinue}
                        className={`bg-[#2B7CD6] text-[16px] max-md:text-[0.8rem] font-urban text-white flex items-center px-5 py-2 rounded-full shadow-right-bottom border-[1px] shadow-black border-black ${!noExperience && months !== '' ? '' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        Continue
                    </button>
                </div>

                {noExperience && (
                <div className='flex justify-center'>
                    <div className='w-[49%] max-xl:w-[70%] max-lg:w-[85%] py-10 px-16 max-md:px-7 max-md:py-7 bg-white absolute top-[37%] max-md:top-[30%] rounded-[40px]'>
                        <div className='text-center font-dela text-[#2B7CD6] pb-8 max-md:pb-4'>Oh No!</div>
                        <div className='font-urban text-[#2B7CD6] max-md:text-[0.8rem]'>
                            Your current resume might benefit from additional work experience to strengthen your application for MBA programs. There may be a wider range of programs available if you consider exploring other master's degrees.
                        </div>
                        <div className='flex justify-end mt-6'>
                            <button className='bg-[#2B7CD6] text-[16px] max-md:text-[0.8rem] font-urban text-white flex items-center px-5 py-2 rounded-full shadow-right-bottom border-[1px] shadow-black border-black'>
                                Explore master’s programs
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
 
           
       
    )
}
 
export default WorkExperience



