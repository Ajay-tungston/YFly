import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FormContent } from "../components/FormContent";

const Signup = () => {
  const navigate = useNavigate();
  const { updateFormData } = useContext(FormContent);

  // State for form data (local)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  // State for errors or success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Update global form context with the signup details
      updateFormData({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
      });

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-blue">
      <div className="min-h-screen rounded-b-[300px] flex flex-col items-center justify-center bg-bluegradient">
        {/* Navbar */}
        <Navbar />

        {/* Signup Form */}
        <div className="bg-white p-8 max-md:px-6 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
          <h2 className="text-[2rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] font-lato mb-6 max-md:mb-2 text-center text-[#30589f]">
            Create Account
          </h2>

          {/* Show error or success messages */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <form className="font-urban" onSubmit={handleSubmit}>
            {/* *********** Name Fields ************** */}
            <div className="mb-5 max-md:mb-2 flex gap-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
            </div>

            {/* *************** Email ************** */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] w-full px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
            </div>

            {/* *************** Phone Number ************** */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] w-full px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
            </div>

            {/* *************** Password ************** */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] w-full px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
            </div>

            {/* *************** Confirm Password ************** */}
            <div className="mb-5 max-md:mb-2">
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="mt-1 block placeholder:text-[#a9a9a9] placeholder:text-[0.9rem] w-full px-3 py-2 border-b-[#a9a9a9] focus:outline-none focus:border-b-[#30589f]"
                required
              />
            </div>

            {/* *************** Signup Button ************** */}
            <button
              type="submit"
              className="w-full py-3 max-md:py-2 px-4 mt-5 rounded-full shadow-btn text-[1rem] font-bold text-white bg-[#30589f] active:scale-95 transition transform duration-150 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-5 text-center text-sm max-md:text-[0.73rem] text-[#a9a9a9] tracking-wide">
            Already have an account?{" "}
            <Link to="/login" className="text-[#30589f] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
