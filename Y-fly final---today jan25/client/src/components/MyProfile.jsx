import React from "react";
import Navbar from "./Navbar";

const Profile = () => {
  return (
    <div className="bg-[#0D1224] min-h-screen text-white font-sans relative text-black">
      {/* Header */}
      <header className="bg-white p-16 flex justify-between items-center shadow-md rounded-b-[52px] text-black">
        <Navbar />
      </header>

      {/* Profile Section */}
      <main className="relative">
        <div className="bg-white w-full rounded-[100px] shadow-md p-10 mt-8 mx-auto overflow-hidden min-h-[600px] text-gray-900">
          <div className="grid grid-cols-2 gap-6">
            <div className="border-2 border-gray-300 p-4 rounded-xl bg-amber-950 text-black w-3/4">

              <div className="flex items-center space-x-4">
                <img
                  src="/profile.png"
                  alt="User Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold text-black">
                    Ajay M.A
                  </h2>
                </div>
              </div>
              <div className="text-gray-500 mt-2 ">
                <span className="mr-4 text-black ">Test Score</span> |{" "}
                <span className="ml-4 text-black">Qualifications</span>
              </div>
            </div>

            {/* Right: Preferences (with 3 mini boxes) */}
            <div className="border-2 border-gray-300 p-4 rounded-xl bg-red-700 text-black">
              <div className="text-gray-700 font-semibold mb-2 bg-amber-300">Preferences</div>
              Select the degree you wish to purse
              <div className="border border-gray-300 rounded p-2 mb-2 bg-amber-800">
                Search for Degree
              </div>
              Your Ideal Study Destination
              <div className="border border-gray-300 rounded p-2 mb-2">
                Search for Countries
              </div>
              Desired Job Roles
              <div className="border border-gray-300 rounded p-2">
                Search for Job Roles
              </div>
            </div>

            {/* Row 2 */}
            {/* Left: Highest education level + pen icon */}
            <div className="border-2 border-gray-300 p-4 rounded-xl flex justify-between items-center text-black ">
              <span>Highest education level</span>
              <img
                src="/pen-icon.png"
                alt="Edit"
                className="h-4 w-4 cursor-pointer"
              />
            </div>

            {/* Row 3 */}
            {/* Left: Work experience + pen icon */}
            <div className="border-2 border-gray-300 p-4 rounded-xl flex justify-between items-center text-black">
              <span>Work experience</span>
              <img
                src="/pen-icon.png"
                alt="Edit"
                className="h-4 w-4 cursor-pointer"
              />
            </div>

            {/* Right: Have you taken an English test? + pen icon */}
            <div className="border-2 border-gray-300 p-4 rounded-xl flex justify-between items-center text-black">
              <span>Have you taken an English test?</span>
              <img
                src="/pen-icon.png"
                alt="Edit"
                className="h-4 w-4 cursor-pointer"
              />
            </div>
          </div>
        </div>

       
      </main>

     
    </div>
  );
};

export default Profile;