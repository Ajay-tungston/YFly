import axios from "axios";
import React, { useEffect, useState } from "react";
const EditUniversity = ({ id, setEditOpen }) => {
  const [university, setUniversity] = useState({});
  const [formData, setFormData] = useState({
    university_name: "",
    university_ranking: "",
    state: "",
    country: "",
    university_type: "Public",
    university_logo: null,
  });
  const [existingLogo, setExistingLogo] = useState(null);
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/university/get/${id}`
        );
        setUniversity(response.data.university);
        setFormData({
          university_name: response?.data?.university?.university_name || "",
          university_ranking:
            response?.data?.university?.university_ranking || "",
          state: response?.data?.university?.state || "",
          country: response?.data?.university?.country || "",
          university_type:
            response?.data?.university?.university_type || "Public",
        });
        setExistingLogo(response?.data?.university?.university_logo || null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUniversity();
  }, [id]);

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
    if (!formData.university_name.trim())
      errors.university_name = "University name is required";
    if (
      !formData.university_ranking ||
      isNaN(formData.university_ranking) ||
      formData.university_ranking <= 0
    ) {
      errors.university_ranking = "Ranking must be a positive number";
    }
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!["Public", "Private"].includes(formData.university_type)) {
      errors.university_type = "Invalid university type";
    }
    if (!existingLogo) {
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
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleCancel = () => {
    setEditOpen(false);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
   

    if (!validateForm()) return;

    const updatedData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== university[key] && formData[key] !== null) {
        updatedData.append(key, formData[key]);
      }
    });

    if (formData.university_logo) {
      updatedData.append("university_logo", formData.university_logo);
    }
    if ([...updatedData.entries()].length === 0) {
      alert("No changes detected!");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/university/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("University Updated successfully!");
      setFormData({
        university_name: "",
        university_ranking: "",
        state: "",
        country: "",
        university_type: "Public",
        university_logo: null,
      });
      setEditOpen("");
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.error || "Server error, please try again later"
      );
    }
  };

  return (
    <div>
      <form className='px-10 py-10  w-[94%] max-w-[90%] bg-white z-50 max-h-screen overflow-y-auto' onSubmit={handleSubmit} >
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        <div className='flex justify-between items-center font-urban'>
          <div>
            <div className='text-[#0E1B2C] font-bold'>Edit University</div>
            <div className='text-[#898C9A] text-[0.8rem]'>Upload University details here.</div>
          </div>
          <div className='flex text-[0.8rem] font-bold'>
            <button type="button" className='border-[#BFBFBF] border-[1px] mr-3 px-3 py-1 rounded-[9px] text-[#BFBFBF]' onClick={handleCancel}>Cancel</button>
            <button className='bg-[#30589F] px-3 py-1 rounded-[9px] text-white ' >Save</button>
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
            {errors.university_name && (
              <p className="text-[#d7420c] text-sm">{errors.university_name}</p>
            )}

<div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>University Ranking</div>
            <input
              type='number'
              name='university_ranking'
              value={formData.university_ranking}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
 {errors.university_ranking && (
              <p className="text-[#d7420c] text-sm">
                {errors.university_ranking}
              </p>
            )}
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
            {errors.state && (
              <p className="text-[#d7420c] text-sm">{errors.state}</p>
            )}

<div className='w-[25%] max-xl:w-[25%] flex items-center justify-center'>Country</div>
            <input
              type='text'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
            {errors.country && (
              <p className="text-[#d7420c] text-sm">{errors.country}</p>
            )}
          </div>
           </div>

        
          <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

<div className='font-urban mr-10 max-xl:mr-0'>
  <div className='flex items-center text-[0.9rem]'>

  <div className='w-[20%] max-xl:w-[15%] -ml-3'>University Type</div>
            <select
              name='university_type'
              value={formData.university_type}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md text-[0.9rem]'
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            

            {errors.university_type && (
              <p className="text-[#d7420c] text-sm">{errors.university_type}</p>
            )}

    <div className="w-[25%] max-xl:w-[25%] flex items-center justify-center">University Logo</div>
    
    {/* Check if an existing logo is available */}
    {existingLogo ? (
      <div className="flex items-center space-x-3">
        <img
          src={`data:${existingLogo.contentType};base64,${btoa(
            String.fromCharCode(...existingLogo.data.data)
          )}`}
          alt="University Logo"
          className="w-[50%] h-[54px] object-cover rounded-md border" 
        />
        <button
          className="px-3 h-10 rounded-xl bg-[#4b7bd5] text-white"
          onClick={() => setExistingLogo(null)}
        >
          Add New Logo
        </button>
      </div>
    ) : (
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        className="w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]"
      />
    )}
  

  {/* Display error message if there is one */}
  {errors.university_logo && (
    <p className="text-[#d7420c] text-sm mt-2">{errors.university_logo}</p>
  )}
</div>

</div>
          {/* <button
            type="submit"
            className="w-full bg-[#4b7bd5]  text-white rounded-lg p-2"
          >
            Submit
          </button> */}
      </form>
    </div>

  );
};

export default EditUniversity;