import axios from 'axios';
import React, { useState } from 'react'

const AddNewUniversity = () => {
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
  console.log(response)
      alert("University created successfully!");
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create University</h2>
      {message && <p className="text-[#d7420c] mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">University Name</label>
          <input
            type="text"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.university_name && <p className="text-[#d7420c] text-sm">{errors.university_name}</p>}
        </div>

        <div>
          <label className="block font-medium">University Ranking</label>
          <input
            type="number"
            name="university_ranking"
            value={formData.university_ranking}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.university_ranking && <p className="text-[#d7420c] text-sm">{errors.university_ranking}</p>}
        </div>

        <div>
          <label className="block font-medium">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.state && <p className="text-[#d7420c] text-sm">{errors.state}</p>}
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.country && <p className="text-[#d7420c] text-sm">{errors.country}</p>}
        </div>

        <div>
          <label className="block font-medium">University Type</label>
          <select
            name="university_type"
            value={formData.university_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          {errors.university_type && <p className="text-[#d7420c] text-sm">{errors.university_type}</p>}
        </div>

        <div>
          <label className="block font-medium">University Logo</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.university_logo && <p className="text-[#d7420c] text-sm">{errors.university_logo}</p>}
        </div>

        <button type="submit" className="w-full bg-[#4b7bd5]  text-white rounded-lg p-2">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddNewUniversity;
