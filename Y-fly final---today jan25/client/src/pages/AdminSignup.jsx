// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// const AdminSignup = () => {
   
//   return (
//     <div className='bg-blue'>
//         <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
//         {/* Navbar

//         {/* Signup Form */}
//         <div className="bg-white p-8 max-md:px-6 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
//             <h2 className="text-[2rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] font-lato mb-6 max-md:mb-2 text-center text-[#30589f]">Create Account</h2>
//             <form className='font-urban'>

//             {/* *********** name ************** */}
//             <div className="mb-5 max-md:mb-2 flex gap-4">

//                 <div className="w-full">
//                 <input type="text" id="first-name" placeholder='First Name' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"/>
//                 </div>

//             </div>

//             {/* *************** email ************** */}
//             <div className="mb-5 max-md:mb-2">
//                 <input type="email" id="email" placeholder='E-mail' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm" />
//             </div>

//             {/* *************** password ************** */}
//             <div className="mb-5 max-md:mb-2">
//                 <input type="password" id="password" placeholder='Password' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm" />
//             </div>

//             {/* *************** confirm password ************** */}
//             <div className="mb-5 max-md:mb-2">
//                 <input type="password" id="confirm-password" placeholder='Confirm Password' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm" />
//             </div>

//             {/* *************** signup button ************** */}
//             <button type="submit" className="w-full py-3 max-md:py-2 px-4 mt-5  rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none">
//                 Sign Up
//             </button>

//             </form>

//             <p className="mt-5 text-center text-sm max-md:text-[0.73rem] text-[#a9a9a9] tracking-wide">
//             Already have an account ? <Link to="/admin-login" className="text-[#30589f] font-bold hover:underline">Log in</Link>
//             </p>
//         </div>
//     </div>
//     </div>
    
//   );
// };

// export default AdminSignup;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message, {
        position: 'top-center',
        autoClose: 2000,
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      });
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      navigate('/admin-login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred', {
        position: 'top-center',
        autoClose: 2000,
        style: {
          backgroundColor: 'black',
          color: 'white',
        },
      });
    }
  };

  return (
    <div className="bg-blue">
      <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
        <div className="bg-white p-8 max-md:px-6 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
          <h2 className="text-[2rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] font-lato mb-6 max-md:mb-2 text-center text-[#30589f]">
            Create Account
          </h2>

          <form className="font-urban" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="text"
                id="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
              {errors.name && <p className="text-[#d61f1f] text-[0.7rem] font-normal">*{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
              {errors.email && <p className="text-[#d61f1f] text-[0.7rem] font-normal">*{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
              {errors.password && <p className="text-[#d61f1f] text-[0.7rem] font-normal">*{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
              {errors.confirmPassword && <p className="text-[#d61f1f] text-[0.7rem] font-normal">*{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 max-md:py-2 px-4 mt-5 rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-sm max-md:text-[0.73rem] text-[#a9a9a9] tracking-wide">
            Already have an account?{' '}
            <Link to="/admin-login" className="text-[#30589f] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AdminSignup;


