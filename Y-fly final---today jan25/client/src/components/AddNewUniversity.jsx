// 
import axios from 'axios';
import React, { useState, useRef } from 'react';

const AddNewUniversity = ({ setAddingNewUniversity, setEditOpen }) => {
  const fileInputRef = useRef(null); // Create a reference for the file input
  const [formData, setFormData] = useState({
    university_name: "",
    university_ranking: "",
    state: "",
    country: "",
    university_type: "Public",
    university_logo: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleCancel = () => {
    setAddingNewUniversity(false);

    // Reset the form data
    setFormData({
      university_name: "",
      university_ranking: "",
      state: "",
      country: "",
      university_type: "Public",
      university_logo: null,
    });

    // Clear the file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Clear any previous messages or errors
    setMessage("");
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, university_logo: e.target.files[0] });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.university_name.trim()) errors.university_name = "University name is required";
    if (!formData.university_ranking || isNaN(formData.university_ranking) || formData.university_ranking <= 0) {
      errors.university_ranking = "Ranking must be a positive number";
    }
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!["Public", "Private"].includes(formData.university_type)) {
      errors.university_type = "Invalid university type";
    }
    if (!formData.university_logo) {
      errors.university_logo = "University logo is required";
    } else {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.university_logo.type)) {
        errors.university_logo = "Logo must be a JPEG or PNG file";
      }
      if (formData.university_logo.size > 5000000) {
        errors.university_logo = "Logo size must be less than 5MB";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/university/add", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("University created successfully!");

        // Set the university ID or details to be edited
    setAddingNewUniversity(false);  // Close the AddNewUniversity page
    setEditOpen(response.data._id); // Assuming the response contains the university ID or data
     // Close the AddNewUniversity page and open the EditUniversity page
     setAddingNewUniversity(false);  // Close AddNewUniversity
     setEditOpen(response.data._id);  // Set the university ID to be edited
      setFormData({
        university_name: "",
        university_ranking: "",
        state: "",
        country: "",
        university_type: "Public",
        university_logo: null,
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.error || "Server error, please try again later");
    }
  };

  return (
    <div className='h-screen'>
      <form className='px-10 py-10' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <input placeholder='Search' className='bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none' />
          <div className='flex items-center'>
            <div className='font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]'>Hi, User</div>
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
        
        {/* Add new scholarship section */}
        <div className='flex justify-between items-center font-urban'>
          <div>
            <div className='text-[#0E1B2C] font-bold'>Add New University</div>
            <div className='text-[#898C9A] text-[0.8rem]'>Upload University details here.</div>
          </div>
          <div className='flex text-[0.8rem] font-bold'>
            <button type="button" className='border-[#BFBFBF] border-[1px] mr-3 px-3 py-1 rounded-[9px] text-[#BFBFBF]' onClick={handleCancel}>Cancel</button>
            <button className='bg-[#30589F] px-3 py-1 rounded-[9px] text-white'>Save</button>
          </div>
        </div>

        {message && <p className="text-[#d7420c] mb-4">{message}</p>}
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>University Name</div>
            <input
              type='text'
              name='university_name'
              value={formData.university_name}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
            <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>University Ranking</div>
            <input
              type='number'
              name='university_ranking'
              value={formData.university_ranking}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>State</div>
            <input
              type='text'
              name='state'
              value={formData.state}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
            <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Country</div>
            <input
              type='text'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>University Type</div>
            <select
              name='university_type'
              value={formData.university_type}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md text-[0.9rem]'
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>University Logo</div>
            <input
              type='file'
              accept='image/png, image/jpeg'
              onChange={handleFileChange}
              ref={fileInputRef}  // Reference added here to clear the file input
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
            />
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
      </form>
    </div>
  );
};

export default AddNewUniversity;