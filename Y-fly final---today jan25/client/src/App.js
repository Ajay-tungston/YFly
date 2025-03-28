import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ScholarshipFinder from './pages/ScholarshipFinder';
import SopWriting from './pages/SopWriting';
import UniversityOverview from './pages/UniversityOverview';
import SignupPageMain from './pages/SignupPageMain';
import LoginPage from './pages/LoginPage';
import SignupPageOne from './pages/SignupPageOne';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/PasswordReset';
import Coursefinder from './pages/CourseFinder';
import Profilematcher from './pages/ProfileMatcher';
import Studyin from './pages/Studyin';
import ContactUs from './components/ContactUs';
import Dashboard from './pages/Dashboard';
import ScholarshipOverview from './pages/ScholarshipOverview';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import Countries from './components/Countries';
import Degree from './components/Degree';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import EducationLevel from './components/EducationLevel';
import Experience from './components/Experience';
// import Bachelors from './components/Bachelors'
import FieldSelection from './components/SelectCourses';
import AcademicTest from './components/Academic';
import ProficiencyExam from './components/ProficiencyExam';
import Mattermost from './components/MattersTheMost';
import MyProfile from './components/MyProfile';
import EnquiryList from './components/EnquiryList';
import CourseOverview from './pages/CourseOverview';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};
const App = () => {
  return (
    <>
   
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignupPageMain/>}/>
        <Route path='/admin-signup' element={<AdminSignup/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/signup2' element={<SignupPageOne/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/studydestination' element={<Studyin/>}/>
        <Route path='/coursefinder' element={<Coursefinder/>}/>
        <Route path='/profilematcher' element={<Profilematcher/>}/>
        <Route path='/scholarship' element={<ScholarshipFinder/>}/>
        <Route path='/sop' element={<SopWriting/>}/>
        <Route path='/university' element={<UniversityOverview/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/scholarshipoverview/:id' element={<ScholarshipOverview/>} />
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/degree' element={<Degree/>}/>
        <Route path='/education' element={<EducationLevel/>}/>
        <Route path='/experience' element={<Experience/>}/>
        {/* <Route path='/bachelors' element={<Bachelors/>}/> */}
        <Route path='/selectcourses' element={<FieldSelection/>}/>
        <Route path='/academics' element={<AcademicTest/>}/>
        <Route path='/proficiency' element={<ProficiencyExam/>}/>
        <Route path ='/matters' element={<Mattermost/>}/>
        <Route path='/myprofile' element={<MyProfile/>}/>
        <Route path='/enquiry' element={<EnquiryList/>}/>
        <Route path='/courseoverview/:id' element={<CourseOverview/>}/>
        
        
      </Routes>
      
    </>
  )
}

export default App