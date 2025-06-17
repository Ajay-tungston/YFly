import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Pros = () => {
  // Track which tab is active: "pros" or "cons"
  const [activeTab, setActiveTab] = useState("pros");

  // Track expanded items for Pros and Cons
  const [expandedPros, setExpandedPros] = useState(null);
  const [expandedCons, setExpandedCons] = useState(null);

  // Sample data for Pros
  const prosList = [
    {
      title: " High Quality Education",
      content:
        "Globally recognized degrees and research.",
    },
    {
      title: "Diverse & Inclusive Society ",
      content:
        "A welcoming ,mulicultural society.",
    },
    {
      title: " Work Opportunities",
      content:
        "Gain experience with a post-Graduation work permit.",
    },
    {
      title: "Safe & Beautiful Environment",
      content:
        "High living standards and stunning nature.",
    },
    {
      title: " PR Pathways",
      content:  "Opportunities for permanent residency after graduation.",
    },
    
  ];

  // Sample data for Cons
  const consList = [
    { title: "High Tuition Fees", content: "Tution costs for international students can be expensive." },
    { title: "Harsh Winters", content: "Extremely cold in some regions." },
    { title: " Tough Admissions", content: "Competitive entry for top universities." },
    { title: "Expensive Living", content: "High costs in major cities." },
    { title: "Work Limitations", content: "Restrictions on work hours for students." },
  ];

  // Toggle handlers
  const handleTogglePros = (index) => {
    setExpandedPros(expandedPros === index ? null : index);
  };

  const handleToggleCons = (index) => {
    setExpandedCons(expandedCons === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Button container: Center the buttons */}
      <div className="flex flex-wrap justify-center mb-4 gap-8">
        <button
          onClick={() => setActiveTab("pros")}
          className={`px-6 py-2 border rounded-[20px] w-32 transition-all duration-300 font-lato${
            activeTab === "pros"
              ? "bg-blue-600 text-black width-[278px] height-[78px] rounded-[26px] border-[5px] border-solid border-[#30589F] py-[21px] px-[111px] gap-[10px]"
              : "border-gray-400 text-gray-700"
          }`}
        >
          Pros
        </button>
        <button
          onClick={() => setActiveTab("cons")}
          className={`px-6 py-2 border rounded-[20px] w-32 transition-all duration-300 font-lato ${
            activeTab === "cons"
              ? "bg-gray-400 text-black width-[278px] height-[78px] rounded-[26px] border-[5px] border-solid border-[#30589F] py-[21px] px-[111px] gap-[10px]"
              : "border-gray-400 text-gray-700"
          }`}
        >
          Cons
        </button>
      </div>

      {/* Content container */}
      <div className="bg-[#30589F] rounded-[38px] px-6 pt-16 max-md:px-3 max-md:pt-3 text-[25px] max-md:text-[10px] text-[#0E1B2C] p-10 w-2/3 justify-center mt-10 mx-auto">
        {/* Pros Section */}
        {activeTab === "pros" && (
          <div className="space-y-4">
            {prosList.map((item, index) => {
              const isExpanded = expandedPros === index;
              return (
                <div
                  key={index}
                  className="border-3 border-blue-600 rounded-[30px] shadow bg-white"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => handleTogglePros(index)}
                  >
                    <h3 className="font-lato text-blue-600">{item.title}</h3>
                    <div className="text-blue-600">
                      {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <hr />
                      <p className="text-[18px] text-gray-700 font-urban">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Cons Section */}
        {activeTab === "cons" && (
          <div className="space-y-4">
            {consList.map((item, index) => {
              const isExpanded = expandedCons === index;
              return (
                <div
                  key={index}
                  className="border-3 border-red-600 rounded-[30px] shadow bg-white"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => handleToggleCons(index)}
                  >
                    <h3 className="font-lato text-red-600">{item.title}</h3>
                    <div className="text-red-600">
                      {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <hr />
                      <p className="font-urban text-[18px] text-gray-700">{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pros;
