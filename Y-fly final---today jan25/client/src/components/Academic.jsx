import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Correct navigation import
import Navbar from "./Navbar";
import IconBack from "../assets/images/iconback.png";
import { FormContent } from "./FormContent"; // Import Form Context
import BackGround from "../assets/images/background.svg";
const Academic = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { formData, updateFormData } = useContext(FormContent); // Using context

  // Initialize values from global state if available
  const initialTest = formData.academic_test?.test_name || "";
  const initialVerbal = formData.academic_test?.verbal_score || "";
  const initialQuant = formData.academic_test?.quant_score || "";

  const [selectedTest, setSelectedTest] = useState(initialTest);
  const [verbalScore, setVerbalScore] = useState(initialVerbal);
  const [quantScore, setQuantScore] = useState(initialQuant);
  const [error, setError] = useState("");

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    setError("");
    // Update the academic_test field in global context immediately
    updateFormData({
      academic_test: { ...formData.academic_test, test_name: test },
    });
    if (test === "Haven’t taken") {
      setVerbalScore("");
      setQuantScore("");
    }
  };

  const handleContinue = () => {
    // If a test is not selected or if it's not "Haven’t taken" and the scores are missing, show an error
    if (
      !selectedTest ||
      (selectedTest !== "Haven’t taken" &&
        (verbalScore === "" || quantScore === ""))
    ) {
      setError("Enter the test details");
    } else {
      setError("");
      // Update the global context with the academic test details using the proper structure
      updateFormData({
        academic_test: {
          test_name: selectedTest,
          verbal_score: verbalScore,
          quant_score: quantScore,
        },
      });
      // Navigate to the next page (e.g., the proficiency page)
      navigate("/proficiency");
    }
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
        {/* Card Container with relative positioning */}
        <div className="relative bg-white max-md:w-[80%] py-10 px-16 max-lg:px-8 max-md:py-6 rounded-[40px] bg-[#9b9b9be8]">
          {/* Back Icon positioned at the top left of the card */}
          <button
            className="absolute top-6 left-6"
            onClick={() => navigate("/selectcourses")}
          >
            <img src={IconBack} alt="Back" className="w-8 h-8" />
          </button>
          <div className="px-10 max-md:px-0">
            <div className="text-center font-dela text-[#2B7CD6] max-md:text-[0.9rem]">
              Have you taken or planning to take any academic test?
            </div>
            <div className="flex gap-4 max-md:gap-2 max-md:flex-col justify-center mt-8 max-md:mt-5 text-[#2B7CD6] font-dela">
              {["GRE", "GMAT", "Haven’t taken"].map((test) => (
                <button
                  key={test}
                  onClick={() => handleTestSelection(test)}
                  className={`border border-black px-9 py-6 max-md:py-3 max-md:text-[0.7rem] rounded-[18px] hover:shadow-lightshad hover:bg-[#30589F] hover:text-white ${
                    selectedTest === test ? "bg-[#30589F] text-white" : "bg-white"
                  }`}
                >
                  {test}
                </button>
              ))}
            </div>

            {selectedTest !== "Haven’t taken" && (
              <>
                <div className="text-center font-dela text-[#2B7CD6] mt-10 max-md:mt-5 max-md:text-[0.8rem]">
                  Your score
                </div>
                <div className="flex max-md:flex-col items-center justify-center gap-4 max-md:gap-2 mt-5 max-md:mt-3">
                  <input
                    type="text"
                    placeholder="Verbal Score"
                    className="w-[7rem] text-center border-b border-[#BFBFBF] focus:outline-none focus:border-b-[#30589f] max-md:text-[0.7rem]"
                    value={verbalScore}
                    onChange={(e) => setVerbalScore(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Quant Score"
                    className="w-[7rem] text-center border-b border-[#BFBFBF] focus:outline-none focus:border-b-[#30589f] max-md:text-[0.7rem]"
                    value={quantScore}
                    onChange={(e) => setQuantScore(e.target.value)}
                  />
                </div>
              </>
            )}

            {error && (
              <div className="text-center text-red-500 mt-3">{error}</div>
            )}

            <div className="flex justify-end mt-10">
              <button
                onClick={handleContinue}
                className={`bg-[#2B7CD6] text-white font-urban px-5 py-2 rounded-full border border-black shadow-right-bottom active:scale-95 transition transform duration-150 ${
                  !selectedTest ||
                  (selectedTest !== "Haven’t taken" &&
                    (verbalScore === "" || quantScore === ""))
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Academic;
