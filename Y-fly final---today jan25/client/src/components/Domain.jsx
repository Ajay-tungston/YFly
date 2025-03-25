import React from "react";

const industries = [
  { name: "Hospital & health care", image: "/images/domain1.png" },
  { name: "Accounting & Financial Services", image: "/images/domain2.png", opportunities: "700,000 opportunities" },
  { name: "Construction", image: "/images/domain3.png", opportunities: "611,000 opportunities" },
  { name: "Information Technology", image: "/images/domain5.png" },
  { name: "Government Administration", image: "/images/domain6.png" },
  { name: "Education Management", image: "/images/domain7.png", opportunities: "905,000 opportunities" },
  { name: "Retail, Marketing & Advertising", image: "/images/domain6.png", opportunities: "730,000 opportunities" },
  { name: "Health Wellness & Fitness", image: "/images/domain8.png" },
];

const IndustryCard = ({ industry }) => (
  <div className="relative border rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start justify-between w-80 bg-white text-center md:text-left">
    {industry.opportunities && (
      <span className="absolute top-0 right-0 bg-blue-600 text-black text-xs px-3 py-1 rounded-full border-2 border-black transform">
        {industry.opportunities}
      </span>
    )}
    
    {/* Left side image */}
    <img src={industry.image} alt={industry.name} className="w-16 h-16 object-contain mb-4 md:mb-0 md:mr-4" />

    {/* Right side content */}
    <div className="flex-1">
      <h3 className="font-semibold text-lg">{industry.name}</h3>
    </div>
  </div>
);

const IndustriesGrid = () => {
  return (
    <div className="p-8 bg-gray-100">
      {/* Wrapper for horizontal scrolling on small screens */}
      <div className="overflow-x-auto md:overflow-hidden">
        <div className="flex flex-nowrap gap-8 md:grid md:grid-cols-4 md:gap-8">
          {industries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesGrid;
