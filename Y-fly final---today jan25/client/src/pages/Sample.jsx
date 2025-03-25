

import React, { useState } from "react";

const down = "path_to_down_icon"; // Add the path to your down icon

const FAQs = () => {
  // State for toggling the FAQ answers
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop5, setDrop5] = useState(false);

  // State for toggling between Pros and Cons
  const [showPros, setShowPros] = useState(true); // Default to show Pros

  const handleDrop1 = () => setDrop1(!drop1);
  const handleDrop2 = () => setDrop2(!drop2);
  const handleDrop3 = () => setDrop3(!drop3);
  const handleDrop4 = () => setDrop4(!drop4);
  const handleDrop5 = () => setDrop5(!drop5);

  return (
    <div>
      <div className="text-[#2B7CD6] font-dela text-[2rem] max-lg:text-[1.4rem] pl-10 mt-16 mb-8">
        FAQs
      </div>

      {/* Pros and Cons Toggle Buttons */}
      <div className="flex space-x-4 mb-6 pl-10">
        <button
          onClick={() => setShowPros(true)}
          className={`py-2 px-4 rounded-full ${showPros ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Pros
        </button>
        <button
          onClick={() => setShowPros(false)}
          className={`py-2 px-4 rounded-full ${!showPros ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Cons
        </button>
      </div>

      {/* FAQ 1: Can you work while studying in USA? */}
      <div className="border-[1px] border-black rounded-[38px] bg-white p-6 mb-3">
        <div className="flex justify-between items-center">
          <div className="font-dela text-[14px]">Can you work while studying in USA?</div>
          <button onClick={handleDrop1}>
            <img src={down} alt="down" width={15} className={drop1 ? "rotate-180" : ""} />
          </button>
        </div>
        {drop1 && (
          <div>
            <div className="border-t-[0.5px] border-[#898c9a78] my-3"></div>
            <div className="font-urban text-[13px]">
              {/* Conditionally display pros or cons */}
              {showPros ? (
                <div>Pros content for working while studying in USA...</div>
              ) : (
                <div>Cons content for working while studying in USA...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FAQ 2: What are the English language proficiency in USA? */}
      <div className="border-[1px] border-black rounded-[38px] bg-white p-6 mb-3">
        <div className="flex justify-between items-center">
          <div className="font-dela text-[14px]">What are the English language proficiency in USA?</div>
          <button onClick={handleDrop2}>
            <img src={down} alt="down" width={15} className={drop2 ? "rotate-180" : ""} />
          </button>
        </div>
        {drop2 && (
          <div>
            <div className="border-t-[0.5px] border-[#898c9a78] my-3"></div>
            <div className="font-urban text-[13px]">
              {/* Conditionally display pros or cons */}
              {showPros ? (
                <div>Pros content for English language proficiency in USA...</div>
              ) : (
                <div>Cons content for English language proficiency in USA...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FAQ 3: What are other standardized tests in USA? */}
      <div className="border-[1px] border-black rounded-[38px] bg-white p-6 mb-3">
        <div className="flex justify-between items-center">
          <div className="font-dela text-[14px]">What are other standardized tests in USA?</div>
          <button onClick={handleDrop3}>
            <img src={down} alt="down" width={15} className={drop3 ? "rotate-180" : ""} />
          </button>
        </div>
        {drop3 && (
          <div>
            <div className="border-t-[0.5px] border-[#898c9a78] my-3"></div>
            <div className="font-urban text-[13px]">
              {/* Conditionally display pros or cons */}
              {showPros ? (
                <div>Pros content for standardized tests in USA...</div>
              ) : (
                <div>Cons content for standardized tests in USA...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FAQ 4: What are the popular courses in USA? */}
      <div className="border-[1px] border-black rounded-[38px] bg-white p-6 mb-3">
        <div className="flex justify-between items-center">
          <div className="font-dela text-[14px]">What are the popular courses in USA?</div>
          <button onClick={handleDrop4}>
            <img src={down} alt="down" width={15} className={drop4 ? "rotate-180" : ""} />
          </button>
        </div>
        {drop4 && (
          <div>
            <div className="border-t-[0.5px] border-[#898c9a78] my-3"></div>
            <div className="font-urban text-[13px]">
              {/* Conditionally display pros or cons */}
              {showPros ? (
                <div>Pros content for popular courses in USA...</div>
              ) : (
                <div>Cons content for popular courses in USA...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FAQ 5: Are there any scholarships available in USA? */}
      <div className="border-[1px] border-black rounded-[38px] bg-white p-6 mb-3">
        <div className="flex justify-between items-center">
          <div className="font-dela text-[14px]">Are there any scholarships available in USA?</div>
          <button onClick={handleDrop5}>
            <img src={down} alt="down" width={15} className={drop5 ? "rotate-180" : ""} />
          </button>
        </div>
        {drop5 && (
          <div>
            <div className="border-t-[0.5px] border-[#898c9a78] my-3"></div>
            <div className="font-urban text-[13px]">
              {/* Conditionally display pros or cons */}
              {showPros ? (
                <div>Pros content for scholarships in USA...</div>
              ) : (
                <div>Cons content for scholarships in USA...</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQs;
