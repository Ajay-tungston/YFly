import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import bachelor from "../assets/images/bachelors.svg";
import master from "../assets/images/masters.svg";
import { FormContent } from "./FormContent";
import Navbar from "./Navbar";
import PropTypes from "prop-types";
import BackGround from "../assets/images/background.svg";
const Degree = ({ onOpenBachelors, onOpenMasters, onOpenMba }) => {
  const { formData, updateFormData } = useContext(FormContent);
  const [selectedDegree, setSelectedDegree] = useState(formData.degree);
  const navigate = useNavigate();

  const handleSelectDegree = (degree) => {
    console.log("Selected Degree:", degree); // Debug: Check the degree value
    setSelectedDegree(degree);
    updateFormData({
      ...formData,
      degree: degree,
    });
  
    (degree === "Bachelors" && onOpenBachelors()) ||
      (degree === "Masters" && onOpenMasters()) ||
      (degree === "MBA" && onOpenMba());
  
    navigate("/education", { state: { selectedDegree: degree } });
  };
  
  console.log(formData);

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
      <div className="w-[50%] max-xl:w-[70%] max-lg:w-[80%] bg-white rounded-[3rem] border-black border-[1px] p-16 max-lg:p-10 max-md:p-7">
        <div className="text-center font-lato text-[#2B7CD6] text-[1.2rem] max-md:text-[0.9rem]">
          What degree do you wish to pursue?
        </div>

        <div className="mt-10 max-md:mt-4 flex justify-between max-md:flex-col max-md:items-center">
          {/* Bachelors */}
          <button
            onClick={() => handleSelectDegree("Bachelors")}
            className={`w-[30%] max-md:w-[90%] max-md:mb-2 ${
              selectedDegree === "Bachelors"
                ? "bg-[#30589f] text-white shadow-lightshad"
                : "bg-white text-[#2b7cd6]"
            } border hover:bg-[#30589f] hover:text-white hover:shadow-lightshad border-[#0e1b2c] active:scale-95 transition transform duration-150 text-[1rem] font-lato py-6 max-md:py-4 px-2 rounded-3xl`}
          >
            <div className="flex justify-center">
              <img
                src={bachelor}
                width={80}
                alt="bachelor"
                className=" max-md:w-[4rem]"
              />
            </div>
            <div className="text-center font-lato mt-3 text-[18px] max-md:text-[0.8rem]">
              Bachelors
            </div>
          </button>

          {/* Masters */}
          <button
            onClick={() => handleSelectDegree("Masters")}
            className={`w-[30%] max-md:w-[90%] max-md:mb-2 ${
              selectedDegree === "Masters"
                ? "bg-[#30589f] text-white shadow-lightshad"
                : "bg-white text-[#2b7cd6]"
            } border hover:bg-[#30589f] hover:text-white hover:shadow-lightshad border-[#0e1b2c] active:scale-95 transition transform duration-150 text-[1rem] font-lato py-6 max-md:py-4 px-2 rounded-3xl`}
          >
            <div className="flex justify-center">
              <img
                src={master}
                width={80}
                alt="masters"
                className=" max-md:w-[4rem]"
              />
            </div>
            <div className="text-center font-lato mt-3 text-[18px] max-md:text-[0.8rem]">
              Masters
            </div>
          </button>

          {/* MBA */}
          <button
            onClick={() => handleSelectDegree("MBA")}
            className={`w-[30%] max-md:w-[90%] ${
              selectedDegree === "MBA"
                ? "bg-[#30589f] text-white shadow-lightshad"
                : "bg-white text-[#2b7cd6]"
            } border hover:bg-[#30589f] hover:text-white hover:shadow-lightshad border-[#0e1b2c] active:scale-95 transition transform duration-150 text-[1rem] font-lato py-6 max-md:py-4 px-2 rounded-3xl`}
          >
            <div className="flex justify-center">
              <img
                src={master}
                width={80}
                alt="mba"
                className=" max-md:w-[4rem]"
              />
            </div>
            <div className="text-center font-lato mt-3 text-[18px] max-md:text-[0.8rem]">
              MBA
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Default props
Degree.defaultProps = {
  onOpenBachelors: () => console.log("Bachelors selected"),
  onOpenMasters: () => console.log("Masters selected"),
  onOpenMba: () => console.log("MBA selected"),
};

// PropTypes validation
Degree.propTypes = {
  onOpenBachelors: PropTypes.func,
  onOpenMasters: PropTypes.func,
  onOpenMba: PropTypes.func,
};

export default Degree;
