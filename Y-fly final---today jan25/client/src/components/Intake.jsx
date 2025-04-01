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
    <div className="p-8 ml-0 md:ml-44">
      {/* First Row - 4 Columns for Larger Screens */}
      <div className="grid grid-cols-4 gap-10 place-items-center max-w-5xl mx-auto hidden md:grid">
        {scheduleSteps.slice(0, 4).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-48 h-48 text-center"
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" />
            )}
            <h3 className="font-lato text-[#002F6C]">{step.title}</h3>
            <p className="font-urban text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>

      {/* First Row - Horizontal Scroll for Small Screens */}
      <div className="md:hidden flex overflow-x-auto space-x-6 pb-4 w-screen">
        {scheduleSteps.slice(0, 4).map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-48 h-48 text-center"
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" />
            )}
            <h3 className="font-lato text-[#002F6C]">{step.title}</h3>
            <p className="font-urban text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Second Row - 3 Columns for Larger Screens */}
      <div className="grid grid-cols-3 gap-32 place-items-center mt-8 mx-auto w-[60%] hidden md:grid">
        {scheduleSteps.slice(4).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-48 h-48 text-center"
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" />
            )}
            <h3 className="font-lato text-[#002F6C]">{step.title}</h3>
            <p className="font-urban text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Second Row - Horizontal Scroll for Small Screens */}
      <div className="md:hidden flex overflow-x-auto space-x-6 pb-4 mt-8 w-screen">
        {scheduleSteps.slice(4).map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-48 h-48 text-center"
          >
            {step.image ? (
              <img
                src={step.image}
                alt={step.title}
                className="mb-3 w-16 h-16 object-contain"
              />
            ) : (
              <div className="mb-3 w-16 h-16 bg-gray-200" />
            )}
            <h3 className="font-lato text-[#002F6C]">{step.title}</h3>
            <p className="font-urban text-blue-600">{step.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intake;
