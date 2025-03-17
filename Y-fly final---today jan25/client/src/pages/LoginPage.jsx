import React, { useEffect, useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../Redux/store";
import { FormContent } from "../components/FormContent";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [message, setMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // 30-second timer for resend OTP
    const { formData, updateFormData } = useContext(FormContent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, resendTimer]);

  // Send OTP to email
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", { email });
      setOtpSent(true);
      setMessage(response.data.message);
      setResendDisabled(true); // Disable resend button
      setResendTimer(30); // Reset timer to 30 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/user/sendotp", { email });
      setMessage(response.data.message);
      setResendDisabled(true); // Disable resend button
      setResendTimer(30); // Reset timer to 30 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  // Verify OTP
const verifyOTP = async (e) => {
  e.preventDefault();
  setVerificationInProgress(true);
  setMessage("");

  try {
    const response = await axios.post("http://localhost:5000/user/verifyotp", { email, otp });
    console.log("Backend response:", response.data);
    setMessage(response.data.message);

    // Update the form context with the email so that it is available for later pages
    updateFormData({ email });

    // Dispatch login action to Redux
    dispatch(
      login({
        token: response.data.token,
        role: "User",
      })
    );

    // Store token in localStorage
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("email", response.data.email);
console.log(response)
    // Redirect based on firstLogin flag
    if (response.data.firstLogin) {
      navigate("/countries"); // Redirect to selection pages for first-time login
    } else {
      navigate("/", { replace: true }); // Redirect to home for subsequent logins
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "OTP verification failed.");
  } finally {
    setVerificationInProgress(false);
  }
};


  return (
    <div className="bg-blue">
      <div className="min-h-screen flex flex-col items-center justify-center bg-bluegradient">
        <Navbar />

        <div className="bg-white p-14 max-md:px-7 max-md:py-10 rounded-[48px] shadow-btn max-w-md w-full max-lg:w-[80%] mt-8">
          <h2 className="text-[2rem] max-lg:text-[1.5rem] font-dela mb-6 text-center text-[#30589f]">
            Login with OTP
          </h2>

          {message && <p className="text-center text-sm mb-3 text-blue-600">{message}</p>}

          {!otpSent ? (
            <form className="font-urban" onSubmit={sendOTP}>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block placeholder:text-[#a9a9a9] w-full px-3 py-2 border-b-[#a9a9a9] focus:border-b-[#30589f] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 mt-5 rounded-full shadow-btn text-white bg-[#30589f] active:scale-95 transition duration-150"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form className="font-urban" onSubmit={verifyOTP}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block placeholder:text-[#a9a9a9] w-full px-3 py-2 border-b-[#a9a9a9] focus:border-b-[#30589f] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 mt-5 rounded-full shadow-btn text-white bg-[#30589f] active:scale-95 transition duration-150"
                disabled={verificationInProgress}
              >
                {verificationInProgress ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={resendDisabled}
                  className="text-sm text-[#30589f] hover:underline"
                >
                  {resendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-5 text-center text-sm text-[#a9a9a9]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#2563eb] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;