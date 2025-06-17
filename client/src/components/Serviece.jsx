import { useState } from "react";
import {
  FaPlaneDeparture,
  FaUserGraduate,
  FaUniversity,
  FaFileAlt,
  FaStethoscope,
  FaClipboardCheck,
  FaPencilAlt,
  FaCreditCard,
  FaUmbrellaBeach,
  FaFileContract,
  FaBriefcase,
  FaGraduationCap,
  FaChartLine,
  FaFolderOpen,
  FaSuitcase,
  FaExchangeAlt,
  FaChalkboardTeacher,
  FaCalculator,
  FaFileInvoiceDollar,
  FaBook,
  FaUsers,
  FaUserCircle,
  FaCalendarCheck,
  FaBusAlt,
  FaMoneyBillWave,
  FaFileSignature,
  FaSearch,
  FaCogs,
  FaClipboardList,
  FaComments,
  FaFileMedicalAlt,
  FaTools,
  FaFileCode,
  FaPaperPlane,
  FaUserEdit,
  FaClipboard,
  FaTruck,
  FaCoins
} from "react-icons/fa";

const services = [
  "Document Translation",
  "Attestation Service",
  "Content Write Expert Consultation",
  "Profile Evaluation",
  "Scholarship Essay Writing",
  "University Shortlisting",
  "Education Loan",
  "Detailed Personal Consultation",
  "LinkedIn Portfolio",
  "Project Quality Analysis",
  "LOM for Student Visa",
  "Alumni Consultant",
  "Interview Preparation",
  "University Shortlisting",
  "Aptitude Test",
  "School Selection",
  "Health Insurance",
  "Industrial Experts Guidance",
  "SOP Writing",
  "Scholarship Finding Analysis",
  "Scholarship Essay Writing",
  "CV Preparation",
  "LOR Writing",
  "Financial Solutions",
  "Test Preparation",
  "Fee Payment",
  "Visa Appointment",
  "Technical Essay Writing",
  "Document Preparation Bundle",
  "German GPA Grade Calculator",
  "Travel Insurance",
  "Blocked Account",
  "Travel Card",
  "DHL Express",
  "Accommodation Assistance",
  "ECTS Form Filling",
  "Travelling Kit",
  "Money Transfer",
  "Flight Ticket",
  "Currency Notes",
  "Pre-Departure Guidance",
  "CV Customisation",
  "Post-Arrival Guidance",
  "LOR Review",
  "Part-Time Assistance",
  "CV Review"
];

export default function Service() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.slice(0, expanded ? services.length : 12).map((service, index) => (
          <button
            key={index}
            className="flex items-center justify-between border border-blue-400 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 shadow-sm transition-all"
          >
            <span>{service}</span>
            <FaClipboardCheck />
          </button>
        ))}
      </div>

      <div className="text-right mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 font-medium hover:underline"
        >
          {expanded ? "View less" : "View more"}
        </button>
      </div>
    </div>
  );
}
