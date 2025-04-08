import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaPen, FaSave } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";

const Profile = () => {
  // Initialize formData as an empty object to avoid undefined errors.
  const [formData, setUpdateFormData] = useState({});
  console.log("formData=",formData)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state for each editable field
  const [editMode, setEditMode] = useState({
    name: false,
    educationLevel: false,
    workExperience: false,
    proficiencyExam: false,
    academicTest: false,
  });

  // Local input state for inline editing
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    education_level: "",
    months_of_experience: "",
    exam_name: "",
    exam_score: "",
    test_name: "",
    verbal_score: "",
    quant_score: "",
  });

  // Update inputValues when formData is fetched or updated
  useEffect(() => {
    setInputValues({
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      education_level: formData.education_details?.education_level || "",
      months_of_experience:
        formData.work_experience?.months_of_experience || "",
      exam_name: formData.proficiency_exam?.exam_name || "",
      exam_score: formData.proficiency_exam?.score || "",
      test_name: formData.academic_test?.test_name || "",
      verbal_score: formData.academic_test?.verbal_score || "",
      quant_score: formData.academic_test?.quant_score || "",
    });
  }, [formData]);

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch user details on mount using the email stored in localStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) throw new Error("Email not found in localStorage");
      
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile/${email}`);

       

        if (res.data && res.data.user) {
          setUpdateFormData(res.data.user);
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
  }, []);

  // API call to update the user details on the backend.
  // We now use axios.put and pass the user_id in the URL.
  const persistUpdate = async (updateData) => {
    try {
      // Ensure formData.user_id exists; it should be returned from your backend.
      if (!formData.user_id) {
        throw new Error("User ID not found in the profile data.");
      }
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update/${formData.user_id}`,
        updateData
      );
      if (res.data && res.data.user) {
        setUpdateFormData(res.data.user);
      }
    } catch (err) {
      console.error("Error updating user details:", err);
      setError(err.message);
    }
  };

  // Handlers for saving each editable field using the inputValues state.
  const saveName = async () => {
    const updateData = {
      first_name: inputValues.first_name,
      last_name: inputValues.last_name,
    };
    await persistUpdate(updateData);
    setEditMode((prev) => ({ ...prev, name: false }));
  };

  const saveEducationLevel = async () => {
    const updateData = {
      education_details: {
        education_level: inputValues.education_level,
      },
    };
    await persistUpdate(updateData);
    setEditMode((prev) => ({ ...prev, educationLevel: false }));
  };
  const saveWorkExperience = async () => {
    const updateData = {
      work_experience: {
        ...formData.work_experience,
        months_of_experience: inputValues.months_of_experience,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/user/update/${formData.user_id}`,
        updateData
      );

      if (res.data && res.data.user) {
        setUpdateFormData(res.data.user);
      }

      setEditMode((prev) => ({ ...prev, workExperience: false }));
    } catch (err) {
      console.error("Error updating work experience:", err);
    }
  };

  const saveProficiencyExam = async () => {
    const updateData = {
      proficiency_exam: {
        exam_name: inputValues.exam_name,
        score: inputValues.exam_score,
      },
    };
    await persistUpdate(updateData);
    setEditMode((prev) => ({ ...prev, proficiencyExam: false }));
  };
  const saveAcademicTest = async () => {
    const updateData = {
      academic_test: {
        test_name: inputValues.test_name,
        verbal_score: inputValues.verbal_score,
        quant_score: inputValues.quant_score,
      },
    };
    await persistUpdate(updateData);
    setEditMode((prev) => ({ ...prev, academicTest: false }));
  };
  console.log();
  // Convert array fields to comma-separated strings for display
  const displayCountries =
    formData.countries && formData.countries.length
      ? formData.countries.join(", ")
      : "N/A";
  const displayMajors =
    formData.majors && formData.majors.length
      ? formData.majors.join(", ")
      : "N/A";
  const displayMainCriteria =
    formData.mainCriteria && formData.mainCriteria.length
      ? formData.mainCriteria.join(", ")
      : "N/A";

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
                  {editMode.name ? (
                    <>
                      <input
                        type="text"
                        name="first_name"
                        value={inputValues.first_name}
                        onChange={handleInputChange}
                        className="text-lg font-lato border border-gray-300 rounded px-2 py-1"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={inputValues.last_name}
                        onChange={handleInputChange}
                        className="text-lg font-lato border border-gray-300 rounded px-2 py-1"
                      />
                    </>
                  ) : (
                    <span className="text-lg font-lato">
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
                {/* 📖 Test Score Section */}
                <div>
                  <span>📖 Test Score</span>
                  <p className="text-gray-600">
                    {inputValues.exam_name
                      ? `${inputValues.exam_name} - ${inputValues.exam_score}`
                      : "No test score available"}
                  </p>

                  {/* Academic Test Scores */}
                </div>

                {/* 📜 Qualifications Section */}
                <div>
                  <span>📜 Qualifications</span>

                  {/* Only show academic tests instead of education details */}
                  {inputValues.test_name &&
                  inputValues.test_name !== "Haven’t taken" ? (
                    <p className="text-gray-600">
                      {inputValues.test_name} - Verbal:{" "}
                      {inputValues.verbal_score || "N/A"}, Quant:{" "}
                      {inputValues.quant_score || "N/A"}
                    </p>
                  ) : (
                    <p className="text-gray-600">No academic test available</p>
                  )}
                </div>
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
                      name="education_level"
                      value={inputValues.education_level}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    formData.education_details?.education_level || "N/A"
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
                      name="months_of_experience"
                      value={inputValues.months_of_experience}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : formData.work_experience?.months_of_experience ? (
                    `${formData.work_experience.months_of_experience} months` 
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
                <p className="text-gray-500 text-sm">Your Preferred majors</p>
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

            {/* English Test & Proficiency Exam Section */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Have you taken an English test?</p>
                {editMode.proficiencyExam ? (
                  <FaSave
                    onClick={saveProficiencyExam}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaPen
                    onClick={() =>
                      setEditMode({ ...editMode, proficiencyExam: true })
                    }
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
              <div className="mt-4">
                {editMode.proficiencyExam ? (
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      name="exam_name"
                      value={inputValues.exam_name}
                      onChange={handleInputChange}
                      placeholder="Exam Name (e.g., IELTS)"
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      name="exam_score"
                      value={inputValues.exam_score}
                      onChange={handleInputChange}
                      placeholder="Score"
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                ) : formData.proficiency_exam?.exam_name ? (
                  <p className="mt-2 text-gray-700">
                    {formData.proficiency_exam.exam_name} (
                    {formData.proficiency_exam.score})
                  </p>
                ) : (
                  <p className="mt-2 text-gray-700">N/A</p>
                )}
              </div>
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
