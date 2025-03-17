
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Countries from '../components/Countries';
import Degree from '../components/Degree';
import Bachelors from '../components/Bachelors';
import Masters from '../components/Masters';
import Mba from '../components/Mba';
import WorkExperience from '../components/WorkExperience';
import ProficiencyExam from '../components/ProficiencyExam';
import Academic from '../components/Academic';
// import bgimg from '../assets/images/image/countries.svg'
const SignupPageOne = () => {

  // State to manage the current step
  const [currentStep, setCurrentStep] = useState('countries');

  return (
    <div className="bg-blue"> {/* Background color for the page */}
      <div className="flex flex-col items-center justify-center min-h-screen rounded-b-[300px] relative bg-bluegradient"> 
        {/* Center the content and set minimum height */}
        <Navbar /> {/* Navigation signup component */}
        
        {/* conditional rendering based on the current step */}

        {currentStep === 'countries' && ( 
          <Countries onOpenDegree={() => setCurrentStep('degree')}/> 
        )}

        {currentStep === 'degree' && ( 
          <Degree 
              onOpenBachelors = {() => setCurrentStep('bachelors')}
              onOpenMasters = {() => setCurrentStep('masters')}
              onOpenMba = {() => setCurrentStep('mba')}/>
        )}
 {currentStep === 'bachelors' && (
          <Bachelors onOpenMajorSelection={() => setCurrentStep('bachelorsMajorSelection')} />
        )}

     

        {currentStep === 'bachelorsProficiencyExam' && (
          <ProficiencyExam onContinue={() => setCurrentStep('bachelorsAcademic')} />
        )}

        {currentStep === 'bachelorsAcademic' && (
          <Academic />
        )}

        {currentStep === 'masters' && (
          <Masters onOpenMajorSelection={() => setCurrentStep('mastersMajorSelection')} />
        )}

      

        {currentStep === 'mastersProficiencyExam' && (
          <ProficiencyExam onContinue={() => setCurrentStep('mastersAcademic')} />
        )}

        {currentStep === 'mastersAcademic' && (
          <Academic />
        )}

        {currentStep === 'mba' && (
          <Mba onOpenWorkExperience={() => setCurrentStep('mbaWorkExperience')} />
        )}

      

        {currentStep === 'mbaProficiencyExam' && (
          <ProficiencyExam onContinue={() => setCurrentStep('mbaAcademic')} />
        )}

        {currentStep === 'mbaAcademic' && (
          <Academic />
        )}



      </div>
    </div>
  );
};

export default SignupPageOne;
