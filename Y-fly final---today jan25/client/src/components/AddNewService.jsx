import React, { useState } from 'react';
import axios from 'axios';


const AddNewService = ({ setAddingService, setEditOpen }) => {
  const [formData, setFormData] = useState({
    service_name: "",
    price: "",
    overview: "",
    benefits: [""],
    procedure: "",
    workflow: "",
    service_image: null,
  });
  // const [addingNewServices, setAddingNewServices] = useState(false);

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
 // Cancel editing
 const handleCancel = () => {
  setAddingService(false); // Close the form and go back to the service list
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
      formDataToSend.append('benefits', formData.benefits);
      formDataToSend.append('procedure', formData.procedure);
      formDataToSend.append('workflow', formData.workflow);
      formDataToSend.append('service_image', image);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/service/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Service created successfully!');
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
    <div className='px-10 py-10 h-[100vh]'>
      <form className='px-10 py-10' onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className='flex justify-between'>
          <input
            placeholder='Search'
            className='bg-[#F2F4F7] py-3 w-[30%] pl-5 border-none placeholder:font-urban text-[1rem] rounded-[4px] outline-none'
          />
          <div className='flex items-center'>
            <div className='font-urban text-[#33517F] font-bold pr-2 text-[1.2rem]'>Hi, User</div>
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Add New Service Section */}
        <div className='flex justify-between items-center font-urban'>
          <div>
            <div className='text-[#0E1B2C] font-bold'>Add New Service</div>
            <div className='text-[#898C9A] text-[0.8rem]'>Upload your service details here.</div>
          </div>
          <div className='flex text-[0.8rem] font-bold'>
            <button
              type='button'
              onClick={handleCancel}
              className='border-[#BFBFBF] border-[1px] mr-3 px-3 py-1 rounded-[9px] text-[#BFBFBF]'
            >
              Cancel
            </button>
            <button 
              type='submit'
              className='bg-[#30589F] px-3 py-1 rounded-[9px] text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>

        {successMessage && (
          <div className='mb-4 p-4 bg-green-100 text-green-700 rounded'>
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className='mb-4 p-4 bg-red-100 text-[#EF4444] rounded'>
            {errors.general}
          </div>
        )}
    
        {/* Service Details Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Service Name</div>
            <input
              type='text'
              name='service_name'
              value={formData.service_name}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter here'
            />
          </div>
          {errors.service_name && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.service_name}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Price Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Price</div>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
              placeholder='Enter price'
            />
          </div>
          {errors.price && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.price}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Service Image Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Service Image</div>
            <div className='w-[30%]'>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
                <input
                  type='file'
                  id='service_image'
                  name='service_image'
                  onChange={handleImageChange}
                  accept='image/*'
                  className='hidden'
                />
                <label htmlFor='service_image' className='cursor-pointer'>
                  {image ? (
                    <div className='flex flex-col items-center'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt='Preview'
                        className='h-32 object-contain mb-2'
                      />
                      <span className='text-blue-600'>Change Image</span>
                    </div>
                  ) : (
                    <div className='py-8'>
                      <svg
                        className='mx-auto h-12 w-12 text-gray-400'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      <p className='mt-1 text-sm text-gray-600'>Click to upload an image</p>
                      <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
          {errors.service_image && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.service_image}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Overview Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Overview</div>
            <textarea
              id='overview'
              name='overview'
              value={formData.overview}
              onChange={handleChange}
              rows='3'
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
            ></textarea>
          </div>
          {errors.overview && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.overview}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Benefits Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Benefits</div>
            <div className='w-[30%]'>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    className='flex-1 p-2 border rounded placeholder:text-[0.9rem]'
                    placeholder={`Benefit ${index + 1}`}
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeBenefitField(index)}
                      className='px-3 bg-red-100 text-red-600 rounded hover:bg-red-200'
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                onClick={addBenefitField}
                className='mt-1 px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100'
              >
                + Add Benefit
              </button>
            </div>
          </div>
          {errors.benefits && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.benefits}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Procedure Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Procedure</div>
            <textarea
              name='procedure'
              value={formData.procedure}
              onChange={handleChange}
              rows='3'
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
            ></textarea>
          </div>
          {errors.procedure && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.procedure}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Workflow Section */}
        <div className='font-urban mr-10 max-xl:mr-0'>
          <div className='flex items-center text-[0.9rem]'>
            <div className='w-[20%] max-xl:w-[15%]'>Workflow</div>
            <textarea
              name='workflow'
              value={formData.workflow}
              onChange={handleChange}
              rows='3'
              className='w-[30%] bg-[#F9F9F9] border border-[#898C9A] rounded-md placeholder:text-[0.9rem]'
            ></textarea>
          </div>
          {errors.workflow && (
            <p className='text-[#EF4444] text-sm mt-1'>{errors.workflow}</p>
          )}
        </div>
        <div className='border-[#BFBFBF] border-b-[1px] my-5'></div>
    
        {/* Submit Button */}
        <div className='mt-8'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded text-white font-medium ${
              isSubmitting
                ? 'bg-[#376095] cursor-not-allowed'
                : 'bg-[#0f57b5] hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-black'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Creating Service...
              </span>
            ) : (
              'Create Service'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewService;