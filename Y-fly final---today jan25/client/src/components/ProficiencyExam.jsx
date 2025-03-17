import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBack from '../assets/images/iconback.png';
import Navbar from './Navbar';
import { FormContent } from './FormContent';
import BackGround from "../assets/images/background.svg";
const ProficiencyExam = () => {
  const [selectedExam, setSelectedExam] = useState(''); // Track the selected exam
  const [score, setScore] = useState(''); // Track the entered score (for taken exam)
  const [errorMessage, setErrorMessage] = useState(''); // Track any error messages

  const navigate = useNavigate();
  const { updateFormData } = useContext(FormContent);

  // When an exam option is clicked
  const handleExamClick = (exam) => {
    setSelectedExam(exam);
    setErrorMessage('');
    // Reset score when changing selection
    setScore('');
  };

  // Continue button logic
  const handleContinueClick = () => {
    if (!selectedExam) {
      setErrorMessage('Please select an exam option.');
      return;
    }

    // For exams already taken, require a score input
    if (selectedExam !== "Haven’t taken") {
      if (!score) {
        setErrorMessage('Please enter your score for the selected exam.');
        return;
      }
    }
    setErrorMessage('');
    
    // Save exam details in context under the "proficiency_exam" field
    updateFormData({
      proficiency_exam: {
        exam_name: selectedExam,
        score: selectedExam !== "Haven’t taken" && !isNaN(Number(score)) ? Number(score) : 0,
      },
    });
    
    // Navigate to the matters page
    navigate('/matters');
  };

  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center"
    style={{
      backgroundImage: `url(${BackGround})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh", // Ensures it covers full screen
      width: "100vw",
      position: "absolute",
      top: 0,
      left: 0,
      overflow: "hidden",
    }}
  >
        <Navbar />
        <div className="relative flex flex-col w-full max-w-3xl items-center mt-6 rounded-[72px] justify-center bg-white px-14 py-7 max-md:px-5 max-md:py-5">
          {/* Back Button */}
          <button className="absolute top-6 left-6" onClick={() => navigate('/academics')}>
            <img src={IconBack} alt="Back" className="w-8 h-8" />
          </button>
          <div className="w-full">
            <h2 className="text-[1.2rem] max-xl:text-[1.1rem] max-lg:text-[1rem] max-md:text-[0.9rem] font-dela text-center text-[#2b7cd6]">
              Have you taken or planning to take any English proficiency exam?
            </h2>
            <div className="flex flex-wrap justify-around my-8 max-md:my-6 font-dela text-[#2b7cd6] text-[1.1rem] max-xl:text-[1rem] max-lg:text-[0.9rem] max-md:text-[0.8rem]">
              {["TOEFL", "IELTS", "PTE", "Haven’t taken"].map((exam) => (
                <button
                  key={exam}
                  onClick={() => handleExamClick(exam)}
                  className={`px-10 py-4 max-md:py-3 max-md:mb-2 max-lg:px-6 rounded-[24px] border border-black ${
                    selectedExam === exam 
                      ? 'bg-[#30589f] text-white shadow-lightshad' 
                      : 'active:text-white active:shadow-lightshad active:bg-[#30589f]'
                  }`}
                >
                  {exam === "Haven’t taken" ? (
                    <>
                      <div className="max-md:hidden">Haven’t<br /> taken</div>
                      <div className="md:hidden">Haven’t taken</div>
                    </>
                  ) : (
                    exam
                  )}
                </button>
              ))}
            </div>

            {/* If an exam is already taken, show the score input */}
            {selectedExam && selectedExam !== "Haven’t taken" && (
              <div className="text-center mb-12 max-md:mb-6">
                <label className="block text-[1.1rem] max-xl:text-[1rem] max-lg:text-[0.9rem] max-md:text-[0.8rem] tracking-wider text-[#2b7cd6] font-dela font-bold mb-2">
                  Your score
                </label>
                <input
                  type="text"
                  value={score}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (!isNaN(input) && input !== " ") {
                      setScore(input);
                    }
                  }}
                  
                  className="focus:outline-none w-[8vw] max-md:w-[20vw] text-center active:outline-none border-b border-[#a9a9a9] focus:ring-0 focus:border-b-[#30589f] sm:text-sm"
                />
              </div>
            )}

            {errorMessage && (
              <div className="text-red-500 text-[0.8rem] font-urban tracking-wide text-center mt-2">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-4 text-[1rem] font-urban">
              <button
                className={`px-8 py-2 border max-md:text-[0.9rem] border-black font-bold rounded-full ${
                  ((selectedExam && selectedExam !== "Haven’t taken" && score) ||
                  (selectedExam === "Haven’t taken"))
                    ? 'bg-[#2b7cd6] text-white shadow-lightshad'
                    : 'bg-white'
                }`}
                onClick={handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default ProficiencyExam;
