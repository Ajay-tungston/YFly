import axios from "axios";
import React, { useEffect, useState } from "react";

const EditService = ({ id, setEditOpen,fetchService }) => {
  const [service, setService] = useState({});
  const [formData, setFormData] = useState({
    service_name: "",
    price: "",
    overview: "",
    benefits: [""],
    procedure: "",
    workflow: "",
    service_image: null,
  });
  const [existingImage, setExistingImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch the existing service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/get/${id}`
        );
   

        // Safely access the service data
        const serviceData = response.data?.service;
        if (!serviceData) {
          console.error("No service data found for the provided ID.");
          return; // Optionally, set an error state here
        }

        setService(serviceData);
        setFormData({
          service_name: serviceData.service_name || "",
          price: serviceData.price || "",
          overview: serviceData.overview || "",
          benefits:
            serviceData.benefits && serviceData.benefits.length > 0
              ? serviceData.benefits
              : [""],
          procedure: serviceData.procedure || "",
          workflow: serviceData.workflow || "",
          service_image: null,
        });
        setExistingImage(serviceData.service_image || null);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };
    fetchService();
  }, [id]);

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dynamic benefits field changes
  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefitField = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ""] });
  };

  const removeBenefitField = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits });
  };

  // Handle file/image input changes
  const handleImageChange = (e) => {
    setFormData({ ...formData, service_image: e.target.files[0] });
  };

  // Validate the form before submission
  // const validateForm = () => {
  //   let errors = {};

  //   // Validate only if the user has modified the field.
  //   if (formData.service_name.trim() === "" && service.service_name === "") {
  //     errors.service_name = "Service name is required";
  //   }

  //   if ((!formData.price && service.price === "") || (formData.price && (isNaN(formData.price) || formData.price <= 0))) {
  //     errors.price = "Price must be a positive number";
  //   }

  //   if (formData.overview.trim() === "" && service.overview === "") {
  //     errors.overview = "Overview is required";
  //   }

  //   // Similar validation for procedure, workflow, and benefits if needed.

  //   // Image: if there is no existing image and no new image is provided.
  //   if (!existingImage && !formData.service_image) {
  //     errors.service_image = "Service image is required";
  //   } else if (formData.service_image) {
  //     const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  //     if (!allowedTypes.includes(formData.service_image.type)) {
  //       errors.service_image = "Image must be JPEG, PNG, or GIF";
  //     }
  //     if (formData.service_image.size > 5000000) {
  //       errors.service_image = "Image size must be less than 5MB";
  //     }
  //   }

  //   setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  // Cancel editing
  const handleCancel = () => {
    setEditOpen(false);
  };

  // Submit updated service details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // if (!validateForm()) return;

    const updatedData = new FormData();

    // Check which fields have changed and append them
    if (formData.service_name !== service.service_name) {
      updatedData.append("service_name", formData.service_name);
    }
    if (formData.price !== service.price) {
      updatedData.append("price", formData.price);
    }
    if (formData.overview !== service.overview) {
      updatedData.append("overview", formData.overview);
    }
    // Compare arrays by JSON stringification
    if (
      JSON.stringify(formData.benefits) !==
      JSON.stringify(service.benefits || [])
    ) {
      formData.benefits.forEach((benefit) =>
        updatedData.append("benefits", benefit)
      );
    }
    if (formData.procedure !== service.procedure) {
      updatedData.append("procedure", formData.procedure);
    }
    if (formData.workflow !== service.workflow) {
      updatedData.append("workflow", formData.workflow);
    }
    if (formData.service_image) {
      updatedData.append("service_image", formData.service_image);
    }

    // If no changes were made, alert the user
    if ([...updatedData.entries()].length === 0) {
      alert("No changes detected!");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/service/update/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Service updated successfully!");
      fetchService()
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating service", error);
      setMessage(
        error.response?.data?.error || "Server error, please try again later"
      );
    }
  };

  return (
    <div className="px-10 py-10 w-[94%] max-w-[90%] bg-white z-50 max-h-screen overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-[#BFBFBF] my-5"></div>
        <div className="flex justify-between items-center font-urban">
          <div>
            <div className="text-[#0E1B2C] font-bold">Edit Service</div>
            <div className="text-[#898C9A] text-[0.8rem]">
              Edit service details here.
            </div>
          </div>
          <div className="flex text-[0.8rem] font-bold">
            <button
              type="button"
              onClick={handleCancel}
              className="border border-[#BFBFBF] mr-3 px-3 py-1 rounded text-[#BFBFBF]"
            >
              Cancel
            </button>
            <button className="bg-[#30589F] px-3 py-1 rounded text-white">
              Save
            </button>
          </div>
        </div>
        {message && <p className="text-[#d7420c] mb-4">{message}</p>}
        <div className="border-b border-[#BFBFBF] my-5"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                placeholder="Enter service name"
                className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]"
              />
              {errors.service_name && (
                <p className="text-[#d7420c] text-sm">{errors.service_name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]"
              />
              {errors.price && (
                <p className="text-[#d7420c] text-sm">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Service Image</label>
              {existingImage ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={`data:${existingImage.contentType};base64,${btoa(
                      String.fromCharCode(...existingImage.data.data)
                    )}`}
                    alt="Service"
                    className="w-[50%] h-[54px] object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => setExistingImage(null)}
                    className="px-3 h-10 rounded-xl bg-[#4b7bd5] text-white"
                  >
                    Add New Image
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageChange}
                  className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md"
                />
              )}
              {errors.service_image && (
                <p className="text-[#d7420c] text-sm mt-1">
                  {errors.service_image}
                </p>
              )}
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Overview</label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                rows="3"
                placeholder="Enter overview"
                className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md"
              ></textarea>
              {errors.overview && (
                <p className="text-[#d7420c] text-sm">{errors.overview}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Benefits</label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder={`Benefit ${index + 1}`}
                    className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefitField(index)}
                      className="px-3 bg-red-100 text-red-600 rounded"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefitField}
                className="mt-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm"
              >
                + Add Benefit
              </button>
              {errors.benefits && (
                <p className="text-[#d7420c] text-sm mt-1">{errors.benefits}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-[#BFBFBF] my-5"></div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Procedure</label>
            <textarea
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              rows="3"
              placeholder="Enter procedure"
              className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md"
            ></textarea>
            {errors.procedure && (
              <p className="text-[#d7420c] text-sm">{errors.procedure}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Workflow</label>
            <textarea
              name="workflow"
              value={formData.workflow}
              onChange={handleChange}
              rows="3"
              placeholder="Enter workflow"
              className="w-full p-2 bg-[#F9F9F9] border border-[#898C9A] rounded-md"
            ></textarea>
            {errors.workflow && (
              <p className="text-[#d7420c] text-sm">{errors.workflow}</p>
            )}
          </div>
        </div>
      </form>

    
    </div>
  );
};

export default EditService;
