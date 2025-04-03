import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import IconBack from '../assets/images/iconback.png';
import { FormContent } from './FormContent';
import BackGround from "../assets/images/background.svg";
const Mattermost = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(FormContent);

  const criteriaOptions = [
    "Budget",
    "Ranking",
    "Safety",
    "ROI & Placement",
    "Location & LifeStyle",
    "Diversity",
    "Research",
    "Networking",
    "Startup",
    "Other"
  ];

  // Allow multiple selections using an array
  const [selectedCriteria, setSelectedCriteria] = useState(formData.mainCriteria || []);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button

  const handleCriteriaSelect = (criteria) => {
    setSelectedCriteria((prevSelected) => {
      if (prevSelected.includes(criteria)) {
        return prevSelected.filter((item) => item !== criteria); // Remove if already selected
      } else {
        return [...prevSelected, criteria]; // Add new selection
      }
    });
    setError('');
  };

  const handleFinishClick = async () => {
    if (selectedCriteria.length === 0) {
      setError('Please select at least one main criteria.');
      return;
    }

    // Update the context with the selected criteria
    updateFormData({ mainCriteria: selectedCriteria });

    // Prepare the final data object to send to backend
    const userData = { ...formData, mainCriteria: selectedCriteria };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/savedetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Your data has been saved successfully!");
        navigate('/'); // Navigate after successful save
      } else {
        throw new Error(data.message || "Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
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
        <div className="relative bg-white max-w-3xl w-full p-6 rounded-3xl shadow-lg border border-gray-200 mx-4 md:mx-auto">
          {/* Back Icon */}
          <button className="absolute top-6 left-6" onClick={() => navigate('/proficiency')}>
            <img src={IconBack} alt="Back" className="w-8 h-8" />
          </button>

          {/* Heading */}
          <h2 className="text-center text-[#2B7CD6] text-2xl font-semibold mb-6">
            What matters to you the most?
          </h2>

          {/* Criteria Options */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {criteriaOptions.map((criteria) => (
              <button
                key={criteria}
                onClick={() => handleCriteriaSelect(criteria)}
                className={`w-full p-4 rounded-xl transition text-lg font-medium text-center ${
                  selectedCriteria.includes(criteria) 
                    ? 'bg-[#30589f] text-white shadow-md'
                    : 'bg-gray-100 text-[#003171] border border-[#30589f]'
                }`}
              >
                {criteria}
              </button>
            ))}
          </div>

          {error && <div className="text-red-500 text-center mt-4">{error}</div>}

          {/* Continue Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleFinishClick}
              className="mt-6 w-auto px-6 py-3 bg-[#2563eb] text-white text-rg font-medium rounded-[69px] shadow-md hover:bg-[#0f172a] transition disabled:bg-gray-400"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
 
  );
};

export default Mattermost;
