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
    // {
    //   title: "World-Class Education",
    //   content:
    //     "US universities are globally recognized for their academic excellence, advanced research opportunities, and cutting-edge programs.",
    // },
    // {
    //   title: "Diverse Learning Environment",
    //   content:
    //     "American universities offer a wide variety of courses and majors, allowing you to customize your education according to your interests.",
    // },
    // {
    //   title: "Flexible Academic Programs",
    //   content:
    //     "American universities offer a wide variety of courses and majors, allowing you to customize your education according to your interests.",
    // },
    // {
    //   title: "Career Opportunities",
    //   content:
    //     "The US job market is filled with opportunities, especially for STEM graduates. Optional Practical Training (OPT) and Curricular Practical Training (CPT) programs allow students to work during and after their studies.",
    // },
    // {
    //   title: "Cultural Experience",
    //   content:
    //     "From vibrant cities to picturesque landscapes, living in the US offers an immersive cultural experience that shapes both your personality and perspective.",
    // },
    // {
    //   title: "Diverse Learning Environment (Duplicate)",
    //   content:
    //     "American universities offer a wide variety of courses and majors, allowing you to customize your education according to your interests.",
    // },
  ];

  // Sample data for Cons
  const consList = [
    // { title: "Complex Visa Process", content: "Obtaining an F-1 student visa involves multiple steps, including interviews and proof of financial stability." },
    // { title: "Competitive Admissions", content: "Top universities have rigorous entry requirements, including standardized tests (like SAT, GRE, or GMAT) and strong academic records." },
    // { title: "Work Restrictions", content: "While part-time work is allowed (up to 20 hours per week during school), options are often limited to on-campus jobs and require special authorization." },
    // { title: "High Cost of Education", content: "Tuition fees and living expenses can be steep, especially at private universities. However, scholarships and financial aid options exist." },
    // { title: "Cultural Adjustment", content: "Adapting to a new culture, lifestyle, and academic environment can be challenging at first — but many universities offer support for international students." },
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
