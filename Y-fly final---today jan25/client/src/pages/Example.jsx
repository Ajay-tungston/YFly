import React from "react";

function Example() {
  return (
    <div>

<div className="w-full relative bg-white rounded-[200px] overflow-hidden p-6 sm:p-12">
  {/* Background Section */}
  <div className="w-full h-[2551px] bg-gray-100 absolute inset-0 rounded-[200px]"></div>

  {/* Course Details Title */}
  <div className="relative text-blue-600 text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px] mb-8">
    Course Details
  </div>

  {/* Course Name and Duration */}
  <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-black text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist'] mb-12">
    <div>Bachelor of Science in Engineering Sciences</div>
    <div className="text-slate-900 text-right">
      Course Duration: 4 years
    </div>
  </div>

  {/* Intakes and Deadline Section */}
  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Intakes Box */}
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-6 gap-4">
      <div className="p-3 bg-blue-800 rounded-lg flex items-center">
        {/* Placeholder for icon or graphic */}
      </div>
      <div>
        <div className="text-zinc-400 text-lg font-bold font-['Urbanist'] mb-2">
          Intakes
        </div>
        <div className="text-blue-800 text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
          Fall (August), 2024
          <br />
          Spring (January), 2025
        </div>
      </div>
    </div>

 {/* Deadline Box */}
<div className="flex flex-col sm:flex-row items-center bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-6 gap-4">
      <div className="p-3 bg-blue-800 rounded-lg flex items-center">
        {/* Placeholder for icon or graphic */}
      </div>
      <div>
        <div className="text-zinc-400 text-lg font-bold font-['Urbanist'] mb-2">
        Deadline
        </div>
        <div className="text-blue-800 text-lg sm:text-2xl font-normal font-['Dela_Gothic_One'] leading-6 sm:leading-9">
        Dec 15, 2024

        </div>
      </div>
    </div>
    
  </div>
</div>


<div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-6">
  {/* Title Section */}
  <div className="text-blue-600 text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
    Overview
  </div>

  {/* Content Section */}
  <div className="w-full max-w-5xl mx-auto bg-white rounded-xl p-4 sm:p-8 text-black text-base sm:text-lg md:text-2xl font-normal font-['Urbanist'] leading-6 sm:leading-8">
    A member of the elite US group of Ivy League Schools, Harvard University is the oldest American University that was established in 1636. The university's original name was "New College," and its primary mission was to educate clerics. The school was renamed Harvard University in 1639, after the Rev. John Harvard. Today, the University is considered to be the world’s most coveted and most competitive school to attend. Harvard has nearly 4 centuries of history of academic and intellectual excellence, in which it has produced Nobel Prize winners, Rhodes Scholars, Pulitzer prize-winners, Academy award recipients and so on. Being at Harvard, a student will have access to world-renowned Professors and unparalleled academic learning - the world is your opportunity at Harvard. Academically affiliated with the National Association of Independent Colleges and Universities (NAICU), the Association of Independent Colleges and Universities in Massachusetts (AICUM) and the Association of American Universities (AAU). Harvard is also one of the space-grant universities in the USA.
  </div>
</div>

<div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-8">
  {/* Title Section */}
  <div className="text-blue-600 text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
    Eligibility Requirements
  </div>

  {/* Cards Section */}
  <div className="flex flex-col lg:flex-row gap-8 justify-center">
    {/* Requirements Card */}
    <div className="w-full max-w-md p-6 sm:p-12 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col gap-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-400">
        <div className="text-blue-800 text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
          Requirements
        </div>
      </div>
      {/* Content */}
      <div className="flex justify-between items-center">
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          GPA (Min. required %)
        </div>
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          70%
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          Backlogs
        </div>
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          NA
        </div>
      </div>
    </div>

    {/* Test Requirements Card */}
    <div className="w-full max-w-md p-6 sm:p-12 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col gap-6">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-400">
        <div className="text-blue-800 text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
          Test Requirements
        </div>
      </div>
      {/* Content */}
      <div className="flex justify-between items-center">
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          TOEFL Overall
        </div>
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          100
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          IELTS Overall
        </div>
        <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']">
          7
        </div>
      </div>
    </div>
  </div>
</div>


<div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-8">
  {/* Title Section */}
  <div className="text-blue-600 text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
    Application Requirements
  </div>

  {/* Card Section */}
  <div className="w-full max-w-4xl mx-auto bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 p-6 sm:p-12 flex flex-col gap-6">
    {/* Header */}
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-blue-800 text-xl sm:text-2xl font-normal font-['Dela_Gothic_One']">
          Requirements
        </div>
      </div>
      <div className="border-t border-zinc-400"></div>
    </div>

    {/* Requirement Items */}
    {[
      "Online Application",
      "Resume",
      "Transcripts",
      "Official Language Proficiency",
      "Statement of Purpose",
      "Academic LOR",
      "Three LORs",
      "Application Fee",
    ].map((item) => (
      <div
        key={item}
        className="flex justify-between items-center w-full text-lg sm:text-xl md:text-2xl font-bold font-['Urbanist']"
      >
        <div className="text-slate-900">{item}</div>
        <div className="text-slate-900">Required</div>
      </div>
    ))}
  </div>
</div>



<div className="px-4 sm:px-8 md:px-16 pt-8 flex flex-col gap-4">
  <div className="text-blue-600 text-2xl sm:text-4xl md:text-5xl font-normal font-['Dela_Gothic_One'] leading-[36px] sm:leading-[62.40px]">
    Career Outcomes
  </div>
  <div className="text-blue-800 text-base sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-6 sm:leading-10">
    Job Roles Guaranteed
  </div>
</div>


        
        <div className="p-8 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-wrap justify-start gap-6">
  {[
    "Product Manager",
    "Software Engineer",
    "Machine Learning Engineer",
    "Research Scientist",
    "Entrepreneur",
    "Researcher",
    "Teacher",
    "Writer",
    "Data Scientist",
    "Consultant",
  ].map((role, index) => (
    <div
      key={index}
      className="px-8 py-3.5 bg-white rounded-[48px] outline outline-1 outline-slate-900 flex justify-center items-center gap-3"
    >
      <div className="text-slate-900 text-lg sm:text-xl md:text-2xl font-normal font-['Urbanist'] leading-loose">
        {role}
      </div>
    </div>
  ))}
</div>


        <div className="mt-12 text-blue-800 text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 sm:leading-10">
  Top Recruiters
</div>
<div className="mt-8 bg-white rounded-[48px] shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 p-8 flex flex-col gap-8">
  <div className="flex flex-wrap justify-center gap-6">
    {/* Recruiter Items */}
    {[
      { name: "IBM", img: "https://placehold.co/159x64", imgWidth: "w-40", imgHeight: "h-16" },
      { name: "Google", img: "https://placehold.co/64x64", imgWidth: "w-16", imgHeight: "h-16" },
      { name: "Amazon", img: "https://placehold.co/57x64", imgWidth: "w-14", imgHeight: "h-16" },
      { name: "Microsoft", img: "https://placehold.co/64x64", imgWidth: "w-16", imgHeight: "h-16" },
      { name: "JP Morgan Chase & Co.", img: "https://placehold.co/81x64", imgWidth: "w-20", imgHeight: "h-16" },
      { name: "Goldman Sachs", img: "https://placehold.co/64x64", imgWidth: "w-16", imgHeight: "h-16" },
    ].map((recruiter, index) => (
      <div
        key={index}
        className="px-8 py-6 bg-white rounded-3xl shadow-[3px_3px_0px_0px_rgba(0,20,38,1.00)] outline outline-1 outline-slate-900 flex flex-col justify-center items-center gap-4"
      >
        <img className={`${recruiter.imgWidth} ${recruiter.imgHeight}`} src={recruiter.img} alt={recruiter.name} />
        <div className="text-slate-900 text-2xl font-normal font-['Urbanist'] leading-loose">{recruiter.name}</div>
      </div>
    ))}
  </div>
</div>




        <div className="justify-start text-blue-600 text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
        Fees & Scholarships
        </div>

      <div className="px-4 sm:px-8">
        {/* Funding Options Section */}
        <div className="text-blue-800 text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 sm:leading-10 mt-12">
          Funding Options
        </div>

        {/* Funding Options Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Scholarships */}
          <div className="px-8 py-6 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-2">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-center text-blue-800 text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                  Scholarships
                </div>
              </div>
            </div>
          </div>

          {/* Department Funding */}
          <div className="px-8 py-6 bg-white rounded-3xl outline outline-1 outline-slate-900 flex justify-center items-center gap-3">
            <div className="text-blue-800 text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
              Department Funding
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-6 text-black text-2xl font-normal font-['Urbanist'] leading-9">
          To apply, submit a complete application for admission within a few
          weeks of the priority deadline for best results.
        </div>

        {/* Scholarships Section */}
        <div className="text-blue-800 text-lg sm:text-2xl md:text-3xl font-black font-['Urbanist'] leading-8 sm:leading-10 mt-12">
          Scholarships
        </div>

        {/* Scholarship Details */}
        <div className="mt-6 bg-white p-6 rounded-3xl shadow-md">
          <div className="text-black text-2xl font-normal font-['Urbanist'] leading-9">
            Harvard University offers a variety of scholarships for students.
            These scholarships are based on merit and financial need, and they
            can provide up to full tuition and fees. The application deadline
            for these scholarships is typically in January of each year.
          </div>
        </div>

        {/* View Scholarships Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-3 bg-white rounded-[48px] outline outline-2 outline-blue-800 text-blue-800 text-xl font-normal font-['Urbanist'] leading-loose">
            View Scholarships
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        {/* FAQs Section */}
        <div className="justify-start text-blue-600 text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
          FAQs
        </div>
        <div className="w-full mt-8 grid gap-6">
          {/* FAQ Items */}
          {[
            "Can you work while studying in USA?",
            "What are the English language proficiency in USA?",
            "What are other standardized tests in USA?",
            "What are the popular courses in USA?",
            "Are there any scholarships available in USA?",
          ].map((faq, index) => (
            <div
              key={index}
              className={`h-32 px-6 py-8 rounded-3xl outline outline-1 outline-slate-900 flex items-center gap-2.5 overflow-hidden ${
                index === 0 ? "bg-black text-white" : "bg-white text-slate-900"
              }`}
            >
              <div className="flex-1 text-justify text-2xl font-normal font-['Dela_Gothic_One'] leading-loose">
                {faq}
              </div>
              <div className="w-10 h-10 relative flex justify-center items-center">
                <div className="w-5 h-2.5 outline outline-[3.17px] outline-sky-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Similar Courses Section */}
        <div className="justify-start text-blue-600 text-4xl sm:text-5xl font-normal font-['Dela_Gothic_One'] leading-tight sm:leading-[62.40px] mt-12">
          Similar Courses
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((course) => (
            <div
              key={course}
              className="bg-white rounded-[48px] shadow-md outline outline-1 outline-slate-900 p-6 flex flex-col gap-6"
            >
              <img
                className="w-full h-60 rounded-3xl border border-slate-900"
                src="https://placehold.co/728x240"
                alt="Course Thumbnail"
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="px-4 py-1 bg-sky-100 rounded-3xl text-blue-800 text-base font-['Urbanist']">
                    Stanford University
                  </div>
                  <div className="text-slate-900 text-lg font-black font-['Urbanist']">
                    QS Rank: #6
                  </div>
                </div>
                <div className="text-slate-900 text-xl font-normal font-['Dela_Gothic_One']">
                  Bachelor of Science in Computer Science
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-400 flex justify-between items-center">
                <div className="text-slate-900 text-lg font-normal font-['Dela_Gothic_One']">
                  03 Dec 2024
                </div>
                <div className="text-zinc-400 text-lg font-bold font-['Urbanist']">
                  Deadline
                </div>
                <div className="text-slate-900 text-lg font-normal font-['Dela_Gothic_One']">
                  $71,977
                </div>
                <div className="text-zinc-400 text-lg font-bold font-['Urbanist']">
                  Total cost
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Example;
