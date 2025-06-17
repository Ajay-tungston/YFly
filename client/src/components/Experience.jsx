import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContent } from "./FormContent";
import Navbar from "./Navbar";
import IconBack from '../assets/images/iconback.png';
import BackGround from "../assets/images/background.svg";
const Experience = () => {
  const { formData, updateFormData } = useContext(FormContent);
  const [hasExperience, setHasExperience] = useState(
    formData.work_experience?.has_experience || false
  );
  const [experienceMonths, setExperienceMonths] = useState(
    formData.work_experience?.months_of_experience || 0
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ 
      work_experience: { 
        has_experience: hasExperience, 
        months_of_experience: hasExperience ? experienceMonths : 0 
      }
    });
    navigate("/selectcourses");
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
        <div className="w-md max-w-2xl relative bg-slate-900 overflow-hidden p-4">
          {/* Experience Selection Box */}
          <div className="bg-white rounded-3xl shadow-lg outline outline-1 outline-slate-900 overflow-hidden p-8 md:p-12">
            {/* Back Icon */}
            <button 
              className="absolute top-4 left-4 md:top-6 md:left-6" 
              onClick={() => navigate('/education')}
            >
              <img src={IconBack} alt="Back" className="w-8 h-8" />
            </button>
   
            {/* Heading */}
            <h2 className="text-center text-2xl md:text-3xl font-bold text-[#2B7CD6] mt-12">
              Do you have any work experience?
            </h2>

            {/* Yes/No Buttons */}
            <div className="flex justify-center gap-8 mt-8">
              <button
                onClick={() => setHasExperience(true)}
                className={`w-32 p-4 rounded-xl shadow-md border ${
                  hasExperience ? "bg-[#2B7CD6] text-white" : "bg-white text-[#1e40af]"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setHasExperience(false)}
                className={`w-32 p-4 rounded-xl shadow-md border ${
                  !hasExperience ? "bg-[#2B7CD6] text-white" : "bg-white text-[#1e40af]"
                }`}
              >
                No
              </button>
            </div>

            {/* Experience Slider */}
            {hasExperience && (
              <div className="mt-8 px-4">
                <h3 className="text-center text-xl text-[#3b77f8] font-semibold">
                  Your experience
                </h3>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={experienceMonths}
                  onChange={(e) => setExperienceMonths(e.target.value)}
                  className="w-full accent-blue-600 mt-4"
                />
                <div className="flex justify-between mt-2 text-sm font-bold text-black">
                  <span>No experience</span>
                  <span>60 months+</span>
                </div>
                <div className="mt-2 text-center text-lg font-semibold">
                  {experienceMonths} months
                </div>
              </div>
            )}

            {/* Navigation Button */}
            <div className="flex justify-end mt-12">
              <button
                onClick={handleSubmit}
                className="bg-[#2563eb] text-white text-xl font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Continue
              </button>
              </div>
          </div>
        </div>
      </div>

  );
};

export default Experience;
