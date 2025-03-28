import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaPen, FaSave } from "react-icons/fa";
import Footer from "../components/Footer";
import { FormContent } from "../components/FormContent"; // Adjust the import path as needed
import axios from "axios";

const Profile = () => {
  const { formData, updateFormData } = useContext(FormContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state for editing
  const [localFormData, setLocalFormData] = useState(formData);
  const [editMode, setEditMode] = useState({
    name: false,
    educationLevel: false,
    workExperience: false,
  });

  // When formData changes (after fetching), update localFormData
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Fetch user details on mount using the email stored in localStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) throw new Error("Email not found in localStorage");
        const res = await axios.get(`http://localhost:5000/user/profile/${email}`);
        if (res.data && res.data.user) {
          updateFormData(res.data.user);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [updateFormData]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );


  // Handlers for saving individual fields
  const saveName = () => {
    updateFormData({
      first_name: localFormData.first_name,
      last_name: localFormData.last_name,
    });
    setEditMode({ ...editMode, name: false });
  };

  const saveEducationLevel = () => {
    updateFormData({
      education_details: {
        ...formData.education_details,
        education_level: localFormData.education_details.education_level,
      },
    });
    setEditMode({ ...editMode, educationLevel: false });
  };

  const saveWorkExperience = () => {
    updateFormData({
      work_experience: {
        ...formData.work_experience,
        months_of_experience: localFormData.work_experience.months_of_experience,
      },
    });
    setEditMode({ ...editMode, workExperience: false });
  };

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
            <div className="bg-white p-4 rounded-xl shadow flex flex-col space-y-4 border border-[#E7E7E7]">
              {/* Profile Header */}
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-18 h-12 rounded-full"
                  />
                  {editMode.name ? (
                    <>
                      <input
                        type="text"
                        value={localFormData.first_name}
                        onChange={(e) =>
                          setLocalFormData({
                            ...localFormData,
                            first_name: e.target.value,
                          })
                        }
                        className="text-lg font-lato border border-gray-300 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        value={localFormData.last_name}
                        onChange={(e) =>
                          setLocalFormData({
                            ...localFormData,
                            last_name: e.target.value,
                          })
                        }
                        className="text-lg font-lato border border-gray-300 rounded px-2 py-1"
                      />
                    </>
                  ) : (
                    <span className="text-lg font-lato ">
                      {formData.first_name || formData.last_name
                        ? `${formData.first_name} ${formData.last_name}`
                        : "No Name"}
                    </span>
                  )}
                </div>
                {editMode.name ? (
                  <FaSave
                    onClick={saveName}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaPen
                    onClick={() => setEditMode({ ...editMode, name: true })}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
              <hr />
              {/* Test Score & Qualifications */}
              <div className="flex justify-between text-sm text-gray-700 p-4 border border-[#E7E7E7]">
                <span>📖 Test Score</span>
                <span>📜 Qualifications</span>
              </div>
            </div>

            {/* Education & Work Experience */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow flex justify-between border border-[#E7E7E7]">
                <span>
                  Highest education level:{" "}
                  {editMode.educationLevel ? (
                    <input
                      type="text"
                      value={localFormData.education_details.education_level}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          education_details: {
                            ...localFormData.education_details,
                            education_level: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    formData.education_details.education_level || "N/A"
                  )}
                </span>
                {editMode.educationLevel ? (
                  <FaSave
                    onClick={saveEducationLevel}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaPen
                    onClick={() =>
                      setEditMode({ ...editMode, educationLevel: true })
                    }
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow flex justify-between border border-[#E7E7E7]">
                <span>
                  Work experience:{" "}
                  {editMode.workExperience ? (
                    <input
                      type="text"
                      value={localFormData.work_experience.months_of_experience}
                      onChange={(e) =>
                        setLocalFormData({
                          ...localFormData,
                          work_experience: {
                            ...localFormData.work_experience,
                            months_of_experience: e.target.value,
                          },
                        })
                      }
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : formData.work_experience.has_experience ? (
                    `${formData.work_experience.months_of_experience || "N/A"} months`
                  ) : (
                    "No"
                  )}
                </span>
                {editMode.workExperience ? (
                  <FaSave
                    onClick={saveWorkExperience}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaPen
                    onClick={() =>
                      setEditMode({ ...editMode, workExperience: true })
                    }
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Preferences */}
          <div className="w-full md:w-3/5 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-lg font-lato mb-4">Preferences</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">
                  {/* Replaced "Preferred Programs" with a field from your schema */}
                  Your Ideal Study Destination (Country)
                </p>
                <input
                  type="text"
                  placeholder="Search for Countries"
                  defaultValue={
                    formData.countries && formData.countries.length
                      ? formData.countries.join(", ")
                      : "N/A"
                  }
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  {/* Replaced Preferred Majors with "Area of Study" if available */}
                  Your Preferred majors
                </p>
                <input
                  type="text"
                  placeholder="Search for Major/Area"
                  defaultValue={
                    formData.majors && formData.majors.length
                      ? formData.majors.join(", ")
                      : "N/A"
                  }
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
            <h2 className="text-2xl md:text-3xl font-lato text-[#001f3f]">
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
