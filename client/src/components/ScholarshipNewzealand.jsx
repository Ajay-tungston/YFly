
export default function Scholarships() {
    const scholarships = [
      {
        title: "New Zealand Government Scholarships",
        description: "Provided by the government with specific quotas for different social and economic groups",
        image: "/images/Nzg.png", // Replaced 'logo' with 'image'
      },
    
      {
        title: "University of Otago Scholarships",
        description: "Empower emerging global leaders through innovative academic funding, promoting cultural exchange and research excellence.",
        image: "/images/otago.png", // Replaced 'logo' with 'image'
      },
      {
        title: "NZ-India Scholarship",
        description: "Designed to empower and support female students in their academic pursuits.",
        image: "/images/nz-i.png", // Replaced 'logo' with 'image'
      },
      {
        title: "Victoria University of Wellington Scholarships",
        description: "Empower international students with fully-funded postgraduate opportunities in Scotland, fostering academic excellence.",
        image: "/images/victoria.jpeg", // Replaced 'logo' with 'image'
      },
     
    ];
  
    return (
      <div>
        {/* <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-full p-6 border-2 border-gray-400 hover:shadow-xl transition max-w-3xl mx-auto m-10"> */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-full p-6 
    border-t-2 border-r-4 border-b-4 border-l- border-gray-300 border-b-gray-700 border-l-gray-700
    hover:shadow-xl transition max-w-3xl mx-auto m-10">
          <div className="text-center md:text-left md:flex-1">
            <h3 className="text-lg font-Urbanist text-gray-900">Auckland University of Technology Scholarships</h3>
            <hr />
            <p className="text-sm text-gray-700 mt-1 font-Urbanist">
              Scholarships for specific subjects like medicine, business, or engineering, targeting students pursuing particular careers.
            </p>
          </div>
          <img
            src="/images/AUT.png"
            alt="Auckland University of Technology Scholarships"
            className="w-40 h-20 object-contain ml-4 md:ml-6 "
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-full p-6 
              border-t-2 border-r-4 border-b-4 border-l-2 border-gray-400 border-b-gray-700 border-l-gray-700 
              hover:shadow-xl transition">
  
              <div className="text-center md:text-left md:flex-1">
                <h3 className="text-lg font-Urbanist text-gray-900">{scholarship.title}</h3>
                <hr />
                <p className="text-sm text-gray-700 mt-1 font-Urbanist">{scholarship.description}</p>
              </div>
              {/* Displaying image instead of logo */}
              <img
                src={scholarship.image}
                alt={scholarship.title}
                className="w-20 h-20 object-contain ml-4 md:ml-6 b "
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  