import React, { useState } from 'react';
import leftarrow from '../assets/images/backswitch.svg'

const Mba = ({onOpenWorkExperience}) => {

    const [selectedEducation, setSelectedEducation] = useState('');
  const [percentage, setPercentage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectEducation = (education) => {
    setSelectedEducation(education);
    setErrorMessage(''); // Clear error message when a selection is made
  };

  const handleContinue = () => {
    if (!percentage) {
      setErrorMessage('Please enter the percentage');
      return;
    }
    onOpenWorkExperience();
  };

  return (

      <div className='bg-white max-md:w-[80%] max-md:p-7 py-10 px-16 rounded-[40px]'>
        <button className='mb-7 max-md:mb-5'>
          <img src={leftarrow} width={22} alt='arrow' />
        </button>

        <div className='text-center font-dela text-[#2B7CD6] max-md:text-[0.9rem]'>Highest education level</div>
        <div className='gap-4 grid grid-cols-2 max-lg:gap-2 justify-center max-md:grid-cols-1 mt-8 max-md:mt-5 text-[#2B7CD6] font-dela'>
          {['UG Degree', 'PG Degree', 'UG Diploma', 'PG Diploma'].map((education) => (
            <div
              key={education}
              className={` active:scale-95 transition transform duration-150 hover:shadow-lightshad max-md:text-[0.8rem] max-lg:text-[0.9rem] text-center border-black border-[1px] mr-6 max-lg:mr-0 py-5 px-9 max-md:py-3 rounded-[18px] cursor-pointer ${
                selectedEducation === education ? 'bg-[#30589f] text-white shadow-lightshad' : 'hover:shadow-black hover:bg-[#30589f] hover:text-white'
              }`}
              onClick={() => handleSelectEducation(education)}
            >
              {education}
            </div>
          ))}
        </div>
        <div className='text-center font-dela text-[#2B7CD6] mt-10 max-md:text-[0.8rem] max-md:mt-5'>Expected or gained percentage</div>
        <div className='flex justify-center mt-5'>
          <input
            type='text'
            placeholder='in %'
            className='focus:outline-none w-[4rem] text-center max-md:text-[0.8rem] active:outline-none border-b-[1px] border-[#BFBFBF] border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm'
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className='text-[red] text-[0.8rem] font-urban tracking-wide text-center mt-2'>{errorMessage}</div>
        )}
        <div className='flex justify-end mt-10 max-md:mt-5'>
          

          <button
            onClick={handleContinue}
            className={`px-8 py-2 border max-md:text-[0.8rem] font-bold rounded-full border-black transition transform duration-150 ${
              selectedEducation && percentage ? 'shadow-lightshad bg-[#2b7cd6] font-bold text-white hover:scale-95 hover:transition transform duration-150' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
  )
}

export default Mba