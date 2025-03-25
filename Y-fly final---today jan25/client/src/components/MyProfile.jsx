import React, { useEffect, useState, useContext } from "react";
import { FormContent } from "./FormContent";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const { formData } = useContext(FormContent);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("formData.email:", formData.email);
   
    if (formData.email) {
      axios.get(`http://localhost:5000/user/profile/${formData.email}`)
        .then((response) => {
          console.log("Profile fetched:", response.data.user);
          setProfile(response.data.user);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [formData.email]);

  return (
    <div className="bg-blue">
    <div className="min-h-screen flex flex-col items-center justify-center bg-bluegradient px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-[#2B7CD6] mb-6">My Profile</h1>
        {profile ? (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Personal Details */}
            <h2 className="text-xl font-semibold text-[#30589f] mb-2">Personal Details</h2>
            <p><strong>First Name:</strong> {profile.first_name}</p>
            <p><strong>Last Name:</strong> {profile.last_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone Number:</strong> {profile.phone_number}</p>
            <p><strong>Degree:</strong> {profile.degree}</p>
            <hr className="my-4" />
            {/* Education Details */}
            <h2 className="text-xl font-semibold text-[#30589f] mb-2">Education Details</h2>
            <p>
              <strong>Education Level:</strong> {profile.education_details?.education_level || "N/A"}
            </p>
            <p>
              <strong>Percentage:</strong> {profile.education_details?.percentage !== undefined
                ? `${profile.education_details.percentage}%`
                : "N/A"}
            </p>
            <p>
              <strong>University / Board:</strong> {profile.education_details?.board || "N/A"}
            </p>
            <hr className="my-4" />
            {/* Work Experience */}
            <h2 className="text-xl font-semibold text-[#30589f] mb-2">Work Experience</h2>
            <p>
              <strong>Has Experience:</strong> {profile.work_experience?.has_experience ? "Yes" : "No"}
            </p>
            {profile.work_experience?.has_experience && (
              <p>
                <strong>Months of Experience:</strong> {profile.work_experience?.months_of_experience || "N/A"}
              </p>
            )}
            <hr className="my-4" />
            {/* Proficiency Exam */}
            <h2 className="text-xl font-semibold text-[#30589f] mb-2">Proficiency Exam</h2>
            <p className="nil  text-[#30589f]" >
              <strong>Exam:</strong> {profile.proficiency_exam?.exam_name || "N/A"}
            </p  >
            {profile.proficiency_exam?.exam_name && profile.proficiency_exam.exam_name !== "Haven’t taken" && (
              <p>
                <strong>Score:</strong> {profile.proficiency_exam?.score || "N/A"}
              </p>
            )}
            
           
          </div>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
        <div className="mt-6 text-center">
          <button
            className="px-6 py-3 bg-[#2563eb] text-white rounded-full shadow-md hover:bg-[#0f172a] transition"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};


export default MyProfile;
