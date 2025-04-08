import React, { useState } from 'react';
import axios from 'axios';

const AddNewService = () => {
  const [formData, setFormData] = useState({
    service_name: '',
    price: '',
    overview: '',
    benefits: [''],
    procedure: '',
    workflow: ''
  });
  console.log(formData)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('service_name', formData.service_name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('overview', formData.overview);
    //   formDataToSend.benefits.forEach(benefit => {
    //     formData.append('benefits', benefit); // Same key, multiple values
    //   });
    formDataToSend.append('benefits', formData.benefits);
      formDataToSend.append('procedure', formData.procedure);
      formDataToSend.append('workflow', formData.workflow);
      formDataToSend.append('service_image', image);

      const response = await axios.post( `${process.env.REACT_APP_API_URL}/service/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
console.log(response)
      setSuccessMessage('Service created successfully!');
      // Reset form
      setFormData({
        service_name: '',
        price: '',
        overview: '',
        benefits: [''],
        procedure: '',
        workflow: ''
      });
      setImage(null);
    } catch (error) {
        console.log(error)
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Service</h2>
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="mb-4 p-4 bg-red-100 text-[#EF4444] rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="service_name">
                Service Name*
              </label>
              <input
                type="text"
                id="service_name"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.service_name ? 'border-[#EF4444]' : 'border-gray-300'}`}
              />
              {errors.service_name && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.service_name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.price ? 'border-[#EF4444]' : 'border-gray-300'}`}
              />
              {errors.price && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="service_image">
                Service Image*
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="service_image"
                  name="service_image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="service_image" className="cursor-pointer">
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
                    <div className="py-8">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.service_image && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.service_image}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="overview">
                Overview*
              </label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                rows="3"
                className={`w-full p-2 border rounded ${errors.overview ? 'border-[#EF4444]' : 'border-gray-300'}`}
              ></textarea>
              {errors.overview && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.overview}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Benefits*</label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className={`flex-1 p-2 border rounded ${errors.benefits ? 'border-[#EF4444]' : 'border-gray-300'}`}
                      placeholder={`Benefit ${index + 1}`}
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefitField(index)}
                        className="px-3 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefitField}
                  className="mt-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100"
                >
                  + Add Benefit
                </button>
              </div>
              {errors.benefits && (
                <p className="text-[#EF4444] text-sm mt-1">{errors.benefits}</p>
              )}
            </div>
          </div>
        </div>

        {/* Full-width fields at bottom */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="procedure">
              Procedure*
            </label>
            <textarea
              id="procedure"
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 border rounded ${errors.procedure ? 'border-[#EF4444]' : 'border-gray-300'}`}
            ></textarea>
            {errors.procedure && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.procedure}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="workflow">
              Workflow*
            </label>
            <textarea
              id="workflow"
              name="workflow"
              value={formData.workflow}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 border rounded ${errors.workflow ? 'border-[#EF4444]' : 'border-gray-300'}`}
            ></textarea>
            {errors.workflow && (
              <p className="text-[#EF4444] text-sm mt-1">{errors.workflow}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded text-white font-medium ${isSubmitting ? 'bg-[#376095] cursor-not-allowed' : 'bg-[#0f57b5] hover:bg-blue-700'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Service...
              </span>
            ) : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewService;