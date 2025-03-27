import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaPen } from "react-icons/fa";
import Footer from "../components/Footer";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Ajay M.A",
    education: "",
    experience: "",
    englishTest: "",
    degree: "",
    country: "",
    jobRole: "",
  });

  return (
    <div className="bg-[#0D1224] min-h-screen text-black font-lato relative">
      {/* Navbar */}
      <nav className="bg-white p-6 md:p-10 flex justify-between items-center rounded-b-[70px] h-40">
        <Navbar />
      </nav>

      {/* Profile Container */}
      <div className="bg-white w-full rounded-[100px] p-6 md:p-10 mt-8 mx-auto min-h-[1000px] md:min-h-[800px] text-gray-900">

 
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Section - Profile Details */}
          <div className="w-full md:w-2/5 p-4 space-y-4">
            {/* Profile Card */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-col space-y-4 border: 3px solid #E7E7E7">
              {/* Profile Header */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-18 h-12 rounded-full"
                  />
                  <span className="text-lg font-lato ">{formData.name}</span>
                </div>
                <FaPen className="text-gray-500 cursor-pointer" />
              </div>
              <hr />
              {/* Test Score & Qualifications */}
              <div className="flex justify-between text-sm text-gray-700 p-4 border: 3px solid #E7E7E7">
                <span>📖 Test Score</span>
                <span>📜 Qualifications</span>
              </div>
            </div>

            {/* Education & Work Experience */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow flex justify-between border: 3px solid #E7E7E7">
                <span>Highest education level</span>
                <FaPen className="text-gray-500 cursor-pointer" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex justify-between border: 3px solid #E7E7E7">
                <span>Work experience</span>
                <FaPen className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Right Section - Preferences */}
          <div className="w-full md:w-3/5 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-lg font-lato  mb-4">Preferences</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Preferred Programs for Your Application</p>
                <input
                  type="text"
                  placeholder="Search for program"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Your Ideal Study Destination</p>
                <input
                  type="text"
                  placeholder="Search for Countries"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Desired Job Roles</p>
                <input
                  type="text"
                  placeholder="Search for Job Roles"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            {/* English Test */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow flex justify-between">
              <p className="text-gray-600">Have you taken an English test?</p>
              <FaPen className="text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

     {/* Call to Action Section */}
<section>
<div className="bg-[#5cc7f1] rounded-[20px] md:rounded-[500px] flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 w-full max-w-[1637px] mx-auto h-auto -mt-32 md:-mt-[150px]">
    {/* Left Image */}
    <div className="flex-shrink-0 w-full h-[250px] md:w-[571px] md:h-[403px] rounded-[20px] overflow-hidden">
      <img
        src="/images/dummy.png"
        alt="Support Agent"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Text */}
    <div className="flex flex-col space-y-4 max-w-xl w-full px-4 md:px-0 text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-lato  text-[#001f3f]">
        Ready to flight your dreams?
      </h2>
      <p
        className="text-[#001f3f] text-sm md:text-base leading-relaxed"
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: "400",
          lineHeight: "1.75",
          marginBottom: "1.5rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Id donec facilisis duis
        placerat gravida aliquet at. Nisi urna quam massa pellentesque
        lectus odio sagittis. Tortor massa in rhoncus purus nunc
        scelerisque nullam. Consequat rhoncus nam ac enim leo. Feugiat
        eget urna varius eu nibh in sed est.
      </p>

      <button className="bg-white text-[#001f3f] border border-[#001f3f] px-4 py-2 rounded-full text-sm md:text-base hover:bg-[#001f3f] hover:text-white transition-all duration-300 w-max mx-auto md:mx-0">
        Book a call →
      </button>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default Profile;
