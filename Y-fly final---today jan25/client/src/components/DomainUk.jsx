import React from "react";

const industries = [
  { name: "Hospital & health care", image: "/images/domain1.png",opportunities: "870,000 opportunities" },
  { name: "Accounting & Financial Services", image: "/images/domain2.png", opportunities: "851,000 opportunities" },
  { name: "Construction", image: "/images/domain3.png", opportunities: "708,000 opportunities" },
  { name: "Information Technology", image: "/images/domain5.png",opportunities: "803,000 opportunities" },
  { name: "Government Administration", image: "/images/domain6.png",opportunities: "414,000 opportunities" },
  { name: "Education Management", image: "/images/domain7.png", opportunities: "505,000 opportunities" },
  { name: "Retail, Marketing & Advertising", image: "/images/domain6.png", opportunities: "736,000 opportunities" },
  { name: "Health Wellness & Fitness", image: "/images/domain8.png",opportunities: "396,000 opportunities" },
];

const IndustryCard = ({ industry }) => (
  <div className="relative border rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start justify-between w-80 bg-white text-center md:text-left">
    {industry.opportunities && (
      <span className="absolute top-0 right-0 bg-blue-600 text-blue text-xs px-3 py-1 rounded-full border-2 border-black transform bg-[#9DC7FB] ">
        {industry.opportunities}
      </span>
    )}
    
    {/* Left side image */}
    <img src={industry.image} alt={industry.name} className="w-16 h-16 object-contain mb-4 md:mb-0 md:mr-4" />

    {/* Right side content */}
    <div className="flex-1">
      <h3 className="font-urban text-lg">{industry.name}</h3>
    </div>
  </div>
);

const IndustriesGrid = () => {
  return (
    <div className="p-5  ">
      {/* Wrapper for horizontal scrolling on small screens */}
      <div className="overflow-x-scroll md:overflow-hidden w-screen">
        <div className="flex flex-nowrap gap-4 md:grid md:grid-cols-4 md:gap-4"> {/* Reduced gap to 4 */}
          {industries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesGrid;
