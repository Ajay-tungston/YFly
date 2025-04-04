import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import dropdown from "../assets/images/nav-dropdown.svg";
import menu from "../assets/images/menu.svg";
import usa from "../assets/images/usa.svg";
import uk from "../assets/images/uk.svg";
import canada from "../assets/images/canada.svg";
import germany from "../assets/images/german.svg";
import newzealand from "../assets/images/newzealand.svg";
import australia from "../assets/images/australia.svg";
import ireland from "../assets/images/ireland.svg";
import course from "../assets/images/bluesearch.svg";
import scholarship from "../assets/images/teacher.svg";
import ai from "../assets/images/aiblink.svg";
import { useDispatch, useSelector } from "react-redux";
import Countries from "./Countries";
import { token } from "../Redux/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();
  const location = useLocation();

  const hideLoginPaths = [
    "/experience",
    "/selectcourses",
    "/education",
    "/matters",
    "/degree",
    "/countries",
    "/academics",
    "/proficiency",
  ];

  const shouldShowButton = !hideLoginPaths.includes(location.pathname);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      const getToken = localStorage.getItem("authToken");
      if (getToken) {
        dispatch(
          token({
            getToken,
          })
        );
      }
    }
  }, [isAuthenticated, dispatch]);

  // Dropdown states for desktop
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isMajorProductOpen, setIsMajorProductOpen] = useState(false);

  // Refs for dropdown containers and mobile menu container
  const destinationRef = useRef(null);
  const productRef = useRef(null);
  const mobileRef = useRef(null);

  // Handlers for toggling dropdowns
  const handleDestination = () => setIsDestinationOpen((prev) => !prev);
  const handleMajorProduct = () => setIsMajorProductOpen((prev) => !prev);

  // Click outside handler to close all dropdowns (desktop and mobile)
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       destinationRef.current &&
  //       !destinationRef.current.contains(event.target)
  //     ) {
  //       setIsDestinationOpen(false);
  //     }
  //     if (productRef.current && !productRef.current.contains(event.target)) {
  //       setIsMajorProductOpen(false);
  //     }
  //     if (mobileRef.current && !mobileRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was on an interactive element
      if (event.target.closest('button, a, [role="button"]')) {
        return; // Don't close menus if clicking interactive elements
      }
  
      // Normal outside click handling
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setIsDestinationOpen(false);
      }
      if (productRef.current && !productRef.current.contains(event.target)) {
        setIsMajorProductOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    // Use click instead of mousedown and proper event phase
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);
  return (
    <nav className="w-11/12 top-0 absolute max-sm:h-[4vh] tracking-wider mt-4 font-urban px-7 py-4 bg-white rounded-full flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-9 max-sm:h-5" />
      </div>
      <div></div>
      <div className="hidden lg:flex space-x-8 text-black">
        {/* Study Destinations Dropdown */}
        <div ref={destinationRef}>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={handleDestination}
          >
            Study Destinations
            <img
              src={dropdown}
              alt="dropdown"
              width={16}
              className={
                isDestinationOpen ? "rotate-180 transition-transform" : ""
              }
            />
          </div>
          {isDestinationOpen && (
            <div
              className="absolute px-10 w-[35vw] py-5 z-10 space-x-4 rounded-[20px] shadow-lightshad bg-white mt-[1rem] border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div>
                <div className="flex items-center justify-around">
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={usa}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      USA
                    </p>
                  </div>
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={uk}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      UK
                    </p>
                  </div>
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={canada}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      Canada
                    </p>
                  </div>
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={germany}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      Germany
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-evenly mt-[1rem]">
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={newzealand}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      New Zealand
                    </p>
                  </div>
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={australia}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      Australia
                    </p>
                  </div>
                  <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                    <img
                      src={ireland}
                      alt="flag"
                      width={80}
                      className="rounded-[13px] mx-auto px-2 py-1"
                    />
                    <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                      Ireland
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Major Products Dropdown */}
        <div ref={productRef}>
          <div
            className="flex gap-2 cursor-pointer"
            onClick={handleMajorProduct}
          >
            Major Products
            <img
              src={dropdown}
              alt="dropdown"
              width={16}
              className={
                isMajorProductOpen ? "rotate-180 transition-transform" : ""
              }
            />
          </div>
          {isMajorProductOpen && (
            <div
              className="absolute left-[40%] z-50 px-2 py-2 rounded-[20px] shadow-lightshad bg-white mt-[1rem] border focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="flex gap-1 ">
                <button
                  onClick={() => navigate("/coursefinder")}
                  className="flex items-center gap-2 px-3 justify-center w-[12vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={course} alt="icons" />
                  Course Finder
                </button>

                <button
                  onClick={() => navigate("/scholarship")}
                  className="flex items-center gap-2 px-3 justify-center w-[12vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                >
                  <img src={scholarship} alt="icons" />
                  Scholarship Finder
                </button>

                <button
                  className="flex items-center gap-2 px-3 justify-center w-[12vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem]"
                  onClick={() => navigate("/profilematcher")}
                >
                  <img src={ai} alt="icons" />
                  AI Profile Matcher
                </button>
              </div>
            </div>
          )}
        </div>

        <div>Services</div>
        <div>Contact Us</div>
      </div>

      {/* My Profile Button */}
      {/* <button
        className="hidden lg:inline-block py-2 px-8 text-[#30589f] border-[2px] border-[#30589f] font-urban font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-bluegradient before:to-bluegradient before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        onClick={() => navigate("/login")}
      >
        Login
      </button> */}
      <>
        {shouldShowButton &&
          (isAuthenticated ? (
            <button
              className="hidden lg:inline-block py-2 px-8 text-[#30589f] border-[2px] border-[#30589f] font-urban font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-bluegradient before:to-bluegradient before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </button>
          ) : (
            <button
              className="hidden lg:inline-block py-2 px-8 text-[#30589f] border-[2px] border-[#30589f] font-urban font-bold overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-bluegradient before:to-bluegradient before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ))}
      </>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden" ref={mobileRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={menu} alt="Menu" className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          ref={mobileRef}
          className="absolute z-50 bg-white top-[70px] left-0 w-full text-black flex flex-col items-center rounded-[80px] space-y-4 p-4 lg:hidden"
        >
          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={handleDestination}
          >
            Study Destinations
            <img
              src={dropdown}
              alt="dropdown"
              className={
                isDestinationOpen
                  ? "rotate-180 transition-transform w-4"
                  : "w-4"
              }
            />
          </div>
          {isDestinationOpen && (
            <div className="flex flex-col items-center px-4 py-2 space-y-2 bg-white border rounded-[20px] shadow-lightshad focus:outline-none">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={usa}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    USA
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={uk}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    UK
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={canada}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    Canada
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={germany}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    Germany
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={newzealand}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    New Zealand
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={australia}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    Australia
                  </p>
                </div>
                <div className="px-5 py-4 border rounded-[15px] hover:shadow-lightshad focus:outline-none active:scale-95 transition-transform duration-150">
                  <img
                    src={ireland}
                    alt="flag"
                    width={80}
                    className="rounded-[13px] mx-auto px-2 py-1"
                  />
                  <p className="text-[#2b7cd6] font-dela text-[0.7rem] text-center">
                    Ireland
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={handleMajorProduct}
          >
            Major Products
            <img
              src={dropdown}
              alt="dropdown"
              className={
                isMajorProductOpen
                  ? "rotate-180 transition-transform w-4"
                  : "w-4"
              }
            />
          </div>
          {isMajorProductOpen && ( 
            <div className="flex  flex-col items-center px-4 py-2 space-y-2 bg-white border rounded-[20px] shadow-lightshad focus:outline-none">
              <button
               onClick={() => navigate("/coursefinder")}
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
              >
                <img src={course} alt="icons" />
                Course Finder
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/scholarship")}
              >
                <img src={scholarship} alt="icons" />
                Scholarship Finder
              </button>
              <button
                className="flex gap-2 px-3 justify-center w-[90vw] rounded-[10px] border text-[#2b7cd6] border-black hover:shadow-lightshad active:scale-95 transition-transform duration-150 py-4 font-dela text-[0.8rem] items-center"
                onClick={() => navigate("/profilematcher")}
              >
                <img src={ai} alt="icons" />
                AI Profile Matcher
              </button>
            </div>
          )}

          <div>Services</div>
          <div>Contact Us</div>
          <button
            className="border-[#30589F] border-[2px] text-[#30589F] px-4 py-2 rounded-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}




    </nav>
  );
};

export default Navbar;
