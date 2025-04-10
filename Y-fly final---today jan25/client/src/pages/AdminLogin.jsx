// import React from 'react';
// import { Link } from 'react-router-dom'
// // import Navbar from '../components/Navbar';
// const AdminLogin = () => {
//   return (
//     <div className='bg-blue'>
//         <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
//         {/* Navbar */}
//         {/* <Navbar/> */}

//         {/* Login Form */}
//         <div className="bg-white p-14 max-md:px-7 max-md:py-10 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
//             <h2 className="text-[2rem] max-lg:text-[1.5rem]  font-lato mb-6 text-center text-[#30589f]">Login</h2>

//             <form className='font-urban'>


//             {/* *************** mail id ************** */}
//             <div className="mb-5">
//                 <input type="text" id="mail-id" placeholder='Email' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm" />
//             </div>

//             {/* *************** password ************** */}
//             <div className="mb-5">
//                 <input type="password" id="password" placeholder='Password' className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem]placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm" />
//             </div>

            
//             {/* *************** signup button ************** */}
//             <button type="submit" className="w-full py-3 px-4 mt-5 max-md:py-2 rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none">
//                 Log In
//             </button>

//             </form>

//             <p className="mt-5 text-center text-sm max-md:text-[0.72rem] text-[#a9a9a9] tracking-wide">
//             Don't have an account ? <Link to="/admin-signup" className="text-[#2b7cd6] font-bold hover:underline">Sign up</Link>
//             </p>
//         </div>
//     </div>
//     </div>
    
//   );
// };

// export default AdminLogin;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { email, password } = formData;

//       // Validate input
//       if (!email || !password) {
//         toast.error('All fields are required', {
//           position: 'top-center',
//           autoClose: 2000,
//           style: { backgroundColor: 'black', color: 'white' },
//         });
//         return;
//       }

//       // Send login request to backend
//       const response = await axios.post('http://localhost:5000/admin/login', { email, password });

//       // Handle success
//       toast.success(response.data.message, {
//         position: 'top-center',
//         autoClose: 2000,
//         style: { backgroundColor: 'black', color: 'white' },
//       });

//       // Reset form fields
//       setFormData({ email: '', password: '' });

//       // Perform further actions (e.g., save token, redirect)
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       // Handle error response
//       toast.error(err.response?.data?.message || 'An error occurred', {
//         position: 'top-center',
//         autoClose: 2000,
//         style: { backgroundColor: 'black', color: 'white' },
//       });
//     }
//   };

//   return (
//     <div className="bg-blue">
//       <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
//         <div className="bg-white p-14 max-md:px-7 max-md:py-10 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
//           <h2 className="text-[2rem] max-lg:text-[1.5rem] font-lato mb-6 text-center text-[#30589f]">Login</h2>

//           <form className="font-urban" onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="mb-5">
//               <input
//                 type="text"
//                 id="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-5">
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem]placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
//               />
//             </div>

//             {/* <div className="text-center text-sm text-[#a9a9a9] tracking-wide">
//               <Link to="/forgotpassword" className="text-[#2b7cd6] font-bold hover:underline">
//                 Forgot Password
//               </Link>
//             </div> */}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 px-4 mt-5 max-md:py-2 rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none"
//             >
//               Log In
//             </button>
//           </form>

//           <p className="mt-5 text-center text-sm max-md:text-[0.72rem] text-[#a9a9a9] tracking-wide">
//             Don't have an account?{' '}
//             <Link to="/admin-signup" className="text-[#2b7cd6] font-bold hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { login } from '../Redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      // Validate input
      if (!email || !password) {
        toast.error('All fields are required', {
          position: 'top-center',
          autoClose: 2000,
        });
        return;
      }

      // Send login request to backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, { email, password });

      // Decode token and save to Redux
      const { token } = response.data;
      const decodedToken = jwtDecode(token);
      const { role, personname } = decodedToken;

      toast.success(response.data.message, { position: 'top-center', autoClose: 2000 });

      // Save to Redux and localStorage
      dispatch(login({ token, role, personname }));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-blue">
      <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
        {/* Login Form */}
        <div className="bg-white p-14 max-md:px-7 max-md:py-10 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
          <h2 className="text-[2rem] max-lg:text-[1.5rem] font-lato mb-6 text-center text-[#30589f]">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="font-urban">
            {/* Email Field */}
            <div className="mb-5">
              <input
                type="text"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem] placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] placeholder:max-md:text-[0.8rem]placeholder:tracking-wide w-full px-3 py-2 border-r-0 border-l-0 border-t-0 border-b-[#a9a9a9] focus:outline-none focus:ring-0 focus:border-t-0 focus:border-l-0 focus:border-r-0 focus:border-b-[#30589f] sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 mt-5 max-md:py-2 rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none"
            >
              Log In
            </button>
          </form>

          <p className="mt-5 text-center text-sm max-md:text-[0.72rem] text-[#a9a9a9] tracking-wide">
            Don't have an account?{' '}
            <Link to="/admin-signup" className="text-[#2b7cd6] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
