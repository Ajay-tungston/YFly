import { FaCheck, FaGlobe, FaUserGraduate, FaDollarSign, FaUser, FaClipboardList } from "react-icons/fa";
import sampleImage from "../assets/images/static.png";

const highlights = [
  { number: 1, icon: <FaCheck />, text: "99% Success Rate", color: "bg-yellow-500" },
  { number: 2, icon: <FaUserGraduate />, text: "25 Cr + Scholarship", color: "bg-cyan-400" },
  { number: 3, icon: <FaGlobe />, text: "30+ Countries", color: "bg-rose-400" },
  { number: 4, icon: <FaDollarSign />, text: "Stem & School", color: "bg-green-500" },
  { number: 5, icon: <FaUser />, text: "1000+ Students Assisted", color: "bg-amber-500" },
  { number: 6, icon: <FaClipboardList />, text: "Expertise Application", color: "bg-purple-500" },
];

const HighlightsSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-10 px-6 md:px-16 py-10">
      {/* Left image */}
      <div className="hidden md:block">
        <img src={sampleImage} alt="Highlight visual" className="w-[600px] h-[600px] " />
      </div>

      {/* Middle vertical features */}
      

      {/* Right text content */}
      <div className="w-full md:w-2/5 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Global Success, One Student at a Time
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          Empowering students to explore, learn, and thrive across borders.
          We are dedicated to transforming study abroad dreams into reality.
          Our proven expertise and personalized support ensure that every step
          of your journey is smooth, successful, and rewarding.
        </p>
      </div>
    </div>
  );
};

export default HighlightsSection;
