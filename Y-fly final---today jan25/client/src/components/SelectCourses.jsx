import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IconBack from '../assets/images/iconback.png';
import Navbar from './Navbar';
import { FormContent } from './FormContent';
import BackGround from "../assets/images/background.svg";
const fields = [
  "Agriculture & Forestry", "Architecture & Building", "Arts", "Automobile Engineering",
  "Business", "Commerce", "Computer & Data Science", "Cosmetics & Hair",
  "Design", "Education", "Engineering", "Environmental Science", "Fashion",
  "Finance & Banking", "Fisheries", "Health", "Hospitality & Tourism",
  "Humanities", "Humanities & Social Sciences", "Journalism & Information",
  "Law", "Management", "Manufacturing & Processing", "Mathematics & Statistics",
  "Media & Journalism", "Medicine & Pharma", "Music", "Performing & Creative Arts",
  "Personal Service", "Physical Science", "Sciences", "Social & Behavioural Science",
  "Social Service", "Sports & Nutrition"
];

export default function FieldSelection() {
  const { formData, updateFormData } = useContext(FormContent);
  const [selectedFields, setSelectedFields] = useState(formData.selectedFields || []);
  const navigate = useNavigate();

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ selectedFields });
    navigate("/academics");
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
    
        <div className="relative bg-white rounded-xl shadow-lg w-full md:w-[60%] mx-4 p-10">
          {/* Back Icon */}
          <button className="absolute top-4 left-4" onClick={() => navigate("/experience")}>
            <img src={IconBack} alt="Back" className="w-8 h-8" />
          </button>
          <h2 className="text-2xl font-bold text-[#2B7CD6] text-center mb-6">
            Select Your Fields
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => toggleField(field)}
                className={`px-6 py-3 rounded-xl text-lg font-medium outline outline-1 outline-gray-900 
                  ${selectedFields.includes(field) ? "bg-[#30589f] text-white" : "bg-white text-gray-900"}`}
              >
                {field}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#2563eb] text-white rounded-lg"
            >
              Continue
            </button>
            <button
              onClick={() => setSelectedFields([])}
              className="px-6 py-3 bg-white rounded-lg border border-gray-900 text-gray-900"
            >
              No Preference
            </button>
          </div>
        </div>
      </div>

  );
}
