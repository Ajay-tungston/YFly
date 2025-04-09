import React, { useState } from 'react';
import axios from 'axios';

const AddNewService = ({ setAddingService }) => {
  const [formData, setFormData] = useState({
    service_name: "",
    price: "",
    overview: "",
    benefits: [""],
    procedure: "",
    workflow: "",
    service_image: null,
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const addBenefitField = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };

  const removeBenefitField = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancel = () => {
    setAddingService(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsSubmitting(true);
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('service_name', formData.service_name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('overview', formData.overview);
      formData.benefits.forEach(benefit => formDataToSend.append('benefits', benefit));
      formDataToSend.append('procedure', formData.procedure);
      formDataToSend.append('workflow', formData.workflow);
      if (image) formDataToSend.append('service_image', image);
  
      await axios.post(`${process.env.REACT_APP_API_URL}/service/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setSuccessMessage('Service created successfully!');
      
      // Reset form
      setFormData({
        service_name: '',
        price: '',
        overview: '',
        benefits: [''],
        procedure: '',
        workflow: '',
        service_image: null
      });
      setImage(null);
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        setAddingService(false); // This will close the form and go back to service list
      }, 1000);
      
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message });
        }
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-10 py-10 w-[94%] max-w-[90%] bg-white z-50 max-h-screen overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-[#BFBFBF] my-5"></div>
        <div className="flex justify-between items-center font-urban">
          <div>
            <div className="text-[#0E1B2C] font-bold">Add New Service</div>
            <div className="text-[#898C9A] text-[0.8rem]">
              Add new service details here.
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
            <button 
              type="submit" 
              className="bg-[#30589F] px-3 py-1 rounded text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-[#2ee23d] rounded">
            {successMessage}
          </div>
        )}
        {errors.general && (
          <div className="mb-4 p-4 bg-red-100 text-[#e02c2c] rounded">
            {errors.general}
          </div>
        )}
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
                <p className="text-[#e02c2c] text-sm">{errors.service_name}</p>
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
                <p className="text-[#e02c2c] text-sm">{errors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Service Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="service_image"
                  name="service_image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="service_image" className="cursor-pointer block">
                  {image ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="h-32 object-contain mb-2"
                      />
                      <span className="text-blue-600">Change Image</span>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.service_image && (
                <p className="text-[#e02c2c] text-sm mt-1">{errors.service_image}</p>
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
                <p className="text-[#e02c2c] text-sm">{errors.overview}</p>
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
                      className="px-3 bg-red-100 text-[#e02c2c] rounded"
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
                <p className="text-[#e02c2c] text-sm mt-1">{errors.benefits}</p>
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
              <p className="text-[#e02c2c] text-sm">{errors.procedure}</p>
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
              <p className="text-[#e02c2c]
               text-sm">{errors.workflow}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewService;