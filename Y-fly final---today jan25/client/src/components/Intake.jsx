import React from "react";



const scheduleSteps = [
  { title: "IELTS Exam", subtitle: "March Beginning", image: "/images/intake5.png" },
  { title: "IELTS Results", subtitle: "March Ending", image: "/images/intake4.png" },
  { title: "Applications", subtitle: "Jan - April", image: "/images/intake2.png" },
  { title: "Prepare & Apply for Visa", subtitle: "July - Aug", image: "/images/intake3.png" },
  { title: "CAS Request", subtitle: "April Onwards", image: "/images/intake1.png" },
  { title: "Offer Letters", subtitle: "Feb - June", image: "/images/intake6.png" },
  { title: "Fly to UK", subtitle: "September", image: "/images/intake7.png" },
];

const Intake = () => {
  return (
    <div className="p-8">
      
      {/* First Row - 4 Columns */}
      <div className="grid grid-cols-4 gap-8 place-items-center max-w-5xl mx-auto">
        {scheduleSteps.slice(0, 4).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:shadow-lg transition duration-200 w-48 h-48 text-center"
          >
            {/* Ensure image URL exists and falls back to a default image if not */}
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" /> // Fallback element if no image exists
            )}
            <h3 className="font-bold text-[#002F6C]">{step.title}</h3>
            <p className="italic text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Second Row - 3 Columns, Centered */}
      <div className="grid grid-cols-3 gap-8 place-items-center mt-8 mx-auto w-[60%]">
        {scheduleSteps.slice(4).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:shadow-lg transition duration-200 w-48 h-48 text-center"
          >
            {/* Ensure image URL exists and falls back to a default image if not */}
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" /> // Fallback element if no image exists
            )}
            <h3 className="font-bold text-[#002F6C]">{step.title}</h3>
            <p className="italic text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intake;
