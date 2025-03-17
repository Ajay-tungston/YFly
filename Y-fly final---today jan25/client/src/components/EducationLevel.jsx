import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContent } from "./FormContent";
import IconBack from "../assets/images/iconback.png";
import Navbar from "./Navbar";
import BackGround from "../assets/images/background.svg";
const EducationLevel = () => {
  const { formData, updateFormData } = useContext(FormContent);
  // Initialize from nested education_details if available
  const [educationLevel, setEducationLevel] = useState(
    formData.education_details?.education_level || ""
  );
  const [customEducation, setCustomEducation] = useState(
    formData.education_details?.education_level &&
      ![
        "UG Degree",
        "PG Degree",
        "UG Diploma",
        "PG Diploma",
        "Plus Two",
      ].includes(formData.education_details.education_level)
      ? formData.education_details.education_level
      : ""
  );
  const [percentage, setPercentage] = useState(
    formData.education_details?.percentage !== undefined
      ? String(formData.education_details.percentage)
      : ""
  );
  const [board, setBoard] = useState(formData.education_details?.board || "");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Options including the "Other" option
  const options = [
    "UG Degree",
    "PG Degree",
    "UG Diploma",
    "PG Diploma",
    "Plus Two",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that all mandatory fields are provided
    if (
      !educationLevel ||
      !percentage ||
      !board ||
      (educationLevel === "Other" && !customEducation)
    ) {
      setErrorMessage(
        'Please fill in Education Level, Percentage, and University/Board. For "Other", please enter your education details.'
      );
      return;
    }
    setErrorMessage("");

    // If "Other" is selected, use customEducation as the final value; otherwise, use educationLevel.
    const finalEducationLevel =
      educationLevel === "Other" ? customEducation : educationLevel;

    updateFormData({
      education_details: {
        ...formData.education_details,
        education_level: finalEducationLevel,
        percentage: Number(percentage),
        board: board,
      },
    });
    navigate("/experience");
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
        <div className="relative bg-white w-full max-w-lg p-6 md:p-8 rounded-3xl shadow-lg border border-gray-200 mx-4">
          {/* Back Icon */}
          <button
            className="absolute top-6 left-6"
            onClick={() => navigate("/degree")}
          >
            <img src={IconBack} alt="Back" className="w-8 h-8" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-[#2B7CD6] text-2xl md:text-3xl font-semibold mb-6">
            Highest Education Level
          </h2>

          {/* Education Level Selection */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => setEducationLevel(option)}
                className={`w-full p-4 rounded-xl transition text-center text-lg font-medium ${
                  educationLevel === option
                    ? "bg-[#2B7CD6] text-white shadow-md"
                    : "bg-gray-100 text-[#003171] border border-[#2B7CD6]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Conditional Custom Education Input */}
          {educationLevel === "Other" && (
            <div className="mt-6 text-center">
              <label className="text-[#2B7CD6] text-xl font-semibold block mb-2">
                Enter Education Details
              </label>
              <input
                type="text"
                value={customEducation}
                onChange={(e) => setCustomEducation(e.target.value)}
                className="w-full p-3 text-center text-lg border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Enter your education details"
              />
            </div>
          )}

          {/* Combined Percentage & University/Board Row */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Percentage Field */}
            <div className="flex-1 text-center">
              <label className="text-[#2B7CD6] text-xl font-semibold block mb-2">
                Percentage
              </label>
              <input
                type="text"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full p-3 text-center text-lg border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Enter %"
              />
            </div>
            {/* University / Board Field */}
            <div className="flex-1 text-center">
              <label className="text-[#2B7CD6] text-xl font-semibold block mb-2">
                University / Board
              </label>
              <input
                type="text"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full p-3 text-center text-lg border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                placeholder="Enter University/Board"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-[#fc2e2e] text-center mt-4 text-lg">
              {errorMessage}
            </div>
          )}

          {/* Continue Button (Right Aligned) */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#2563eb] text-white text-lg font-medium rounded-[69px] shadow-md hover:bg-[#0f172a] transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default EducationLevel;
