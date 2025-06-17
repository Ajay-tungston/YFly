// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { FormContent } from "./FormContent";
// import IconBack from "../assets/images/iconback.png";
// import down from "../assets/images/down.svg";
// import Navbar from "./Navbar";

// const Bachelors = () => {
//   const navigate = useNavigate();
//   const { formData, updateFormData } = useContext(FormContent);
//   const [selectedBoard, setSelectedBoard] = useState(
//     formData.selectedBoard || ""
//   );
//   const [selectedEducation, setSelectedEducation] = useState(
//     formData.selectedEducation || ""
//   );
//   const [percentage, setPercentage] = useState(formData.percentage || "");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [boardDropdown, setBoardDropdown] = useState(false);

//   const handleSelectBoard = (boardOption) => {
//     setSelectedBoard(boardOption);
//     setBoardDropdown(false);
//     setErrorMessage("");
//   };

//   const handleSelectEducation = (education) => {
//     setSelectedEducation(education);
//     setErrorMessage("");
//   };

//   const handleContinue = () => {
//     if (!percentage || !selectedBoard) {
//       setErrorMessage("Please enter the percentage and select the board");
//       return;
//     }
//     updateFormData({ selectedBoard, selectedEducation, percentage });
//     navigate("/education");
//   };

//   return (
//     <div className="bg-blue">
//       <div className="min-h-screen flex flex-col items-center justify-center bg-bluegradient">
//         <Navbar />
//         <div className="relative bg-white max-w-lg w-full p-6 rounded-xl shadow-md border mx-4 md:mx-auto">
//           <button
//             className="absolute top-4 left-4"
//             onClick={() => navigate("/degree")}
//           >
//             <img src={IconBack} alt="Back" className="w-6 h-6" />
//           </button>

//           <h2 className="text-center text-[#2B7CD6] text-xl font-semibold mb-6">
//             Highest Education Level
//           </h2>

//           <div className="grid grid-cols-2 gap-4">
//             {["Grade 12", "Equivalent"].map((level) => (
//               <button
//                 key={level}
//                 onClick={() => handleSelectEducation(level)}
//                 className={`w-full p-4 rounded-lg transition duration-300 ease-in-out text-lg font-medium border border-blue-500 
//         ${
//           selectedEducation === level
//             ? "bg-[#2B7CD6] text-white shadow-md"
//             : "bg-white text-[#003171]"
//         }`}
//               >
//                 {level}
//               </button>
//             ))}
//           </div>
//           <div className="mt-6 flex justify-between gap-4">
//             {/* Board Selection on the Left */}
//             <div className="w-1/2 relative">
//               <button
//                 className="w-full p-3 text-lg border border-gray-300 rounded-lg bg-gray-200 text-black flex justify-between items-center"
//                 onClick={() => setBoardDropdown(!boardDropdown)}
//               >
//                 {selectedBoard || "Select Board"}
//                 <img
//                   src={down}
//                   alt="dropdown"
//                   className={`w-4 h-4 ${boardDropdown ? "rotate-180" : ""}`}
//                 />
//               </button>
//               {boardDropdown && (
//                 <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
//                   {["Board","IB", "ICSE", "CBSE", "State"].map((board) => (
//                     <button
//                       key={board}
//                       className="w-full p-2 text-left text-black hover:bg-gray-200"
//                       onClick={() => handleSelectBoard(board)}
//                     >
//                       {board}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Percentage Input on the Right */}
//             <div className="w-1/2 text-center">
//               <label className="text-[#2B7CD6] text-lg font-medium block mb-2">
//                 Expected or Gained Percentage
//               </label>
//               <input
//                 type="text"
//                 value={percentage}
//                 onChange={(e) => setPercentage(e.target.value)}
//                 className="w-full p-3 text-center text-lg border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
//                 placeholder="%"
//               />
//             </div>
//           </div>

//           {errorMessage && (
//             <div className="text-[#f13131] text-sm text-center mt-2">
//               {errorMessage}
//             </div>
//           )}
//           <div className="flex justify-end">
//             <button
//               onClick={handleContinue}
//               className="mt-6 w-md px-6 py-3 bg-[#2563eb] text-white text-rg font-medium rounded-[69px] shadow-md hover:bg-[#0f172a] transition"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bachelors;
