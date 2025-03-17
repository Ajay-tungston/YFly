import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import usa from '../assets/images/flags/flagone.svg';
import uk from '../assets/images/flags/flagtwo.svg';
import canada from '../assets/images/flags/flagthree.svg';
import germany from '../assets/images/flags/flagfour.svg';
import newzealand from '../assets/images/flags/flagfive.svg';
import australia from '../assets/images/flags/flagsix.svg';
import ireland from '../assets/images/flags/flagseven.svg';
import Navbar from './Navbar';
import BackGround from "../assets/images/background.svg";
import { FormContent } from './FormContent';

const Countries = ({ onOpenDegree }) => {
  const { formData, updateFormData } = useContext(FormContent);
  const navigate = useNavigate(); // Initialize useNavigate

  const countries = [
    { name: 'USA', flag: usa },
    { name: 'UK', flag: uk },
    { name: 'Canada', flag: canada },
    { name: 'Germany', flag: germany },
    { name: 'New Zealand', flag: newzealand },
    { name: 'Australia', flag: australia },
    { name: 'Ireland', flag: ireland },
  ];

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [openToAllSelected, setOpenToAllSelected] = useState(false);

  const toggleCountrySelection = (country) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.includes(country)
        ? prevSelected.filter((c) => c !== country)
        : [...prevSelected, country]
    );
    setOpenToAllSelected(false);
  };

  const toggleOpenToAllSelection = () => {
    if (selectedCountries.length > 0) {
      // Save the selected countries to form content and navigate
      updateFormData({ countries: selectedCountries });
      navigate('/degree');
    } else {
      // Toggle "Open to all" selection
      setSelectedCountries([]);
      setOpenToAllSelected((prevSelected) => !prevSelected);
      // Here we update form data to denote "Open to all"
      updateFormData({ countries: 'All' });
      if (onOpenDegree) {
        onOpenDegree(); // Optional: if provided by parent component
      }
      // Navigate to the degree page
      navigate('/degree');
      updateFormData({ countries: selectedCountries });

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
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="bg-white py-14 max-md:py-7 px-12 max-lg:px-10 max-md:px-5 rounded-[72px] shadow-lightshad w-[60%] max-xl:w-[75%] max-md:w-[85%]">
            <h2 className="max-md:text-[0.8rem] max-xl:text-[1.1rem] max-lg:text-[0.9rem] text-[1.3rem] font-dela text-center text-[#2b7cd6] mb-8 max-md:mb-4">
              Which country do you wish to pursue your education in?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-lg:gap-3 max-md:gap-2">
              {countries.map((country, index) => (
                <button
                  key={index}
                  onClick={() => toggleCountrySelection(country.name)}
                  className={`${
                    selectedCountries.includes(country.name)
                      ? 'bg-[#30589f] text-white shadow-btn'
                      : 'bg-white text-[#2b7cd6]'
                  } border border-[#0e1b2c] active:scale-95 transition transform duration-150 hover:shadow-lightshad max-md:text-[0.7rem] max-lg:text-[0.8rem] font-dela py-6 max-lg:py-3 px-2 rounded-3xl`}
                >
                  {country.flag && (
                    <img src={country.flag} alt={`${country.name} flag`} width={80} className="mx-auto rounded-[8px] mb-1 max-md:w-[4rem]"/>
                  )}
                  {country.name}
                </button>
              ))}

              <button
                onClick={toggleOpenToAllSelection}
                className={`${
                  openToAllSelected || selectedCountries.length > 0
                    ? 'bg-[#2b7cd6] text-white shadow-btn'
                    : 'bg-white text-[#2b7cd6]'
                } border border-[#0e1b2c] shadow-lightshad sm:text-[0.4rem] max-md:text-[0.7rem] lg:text-[1rem] font-dela active:scale-95 transition transform duration-150 py-6 px-2 rounded-3xl`}
              >
                {selectedCountries.length > 0 ? 'Continue' : 'Open to all'}
              </button>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Countries;
