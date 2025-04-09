import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-blue min-h-screen flex flex-col font-lato">
      <nav className="bg-white shadow-md p-6 md:p-10 flex justify-between items-center rounded-b-[40px] h-40 ">
        <Navbar />
      </nav>

      <div className="flex-grow flex items-center justify-center p-6 bg-white mt-12 rounded-t-[72px] rounded-b-[72px]">
        <div className="w-full max-w-6xl p-16 md:p-10 rounded-2xl bg-white ">
          <h2 className="text-[34px] md:text-3xl font-lato text-center mb-8">Get in Touch with Us!</h2>
          <p className="text-center text-gray-600 mb-6 font-lato">Need assistance? Reach out to us via email, and we’ll respond as soon as possible.</p>
          <h2 className="text-2xl md:text-3xl font-lato text-center ">Contact us!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full  ">
              <iframe
                className="w-full h-82 md:h-[500px] rounded-lg mt-10"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.476456861654!2d76.579452!3d9.9782539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d3e5e92c7c3%3A0x3f3c3a8b8e8f3c77!2sYFly%20International!5e0!3m2!1sen!2sin!4v1614578568576!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className=" mt-10">
              <div className="text-gray-700 mb-4 font-lato">
                <p><strong>Email:</strong> info@yflyinternational.com</p>
                <p><strong>Phone:</strong> +91 9947 788222</p>
                <p><strong>Address:</strong> PVM Heights, One Way Junction, Muvattupuzha, Kerala</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 font-lato">
                <input type="text" name="name" placeholder="Name" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                <input type="email" name="email" placeholder="E-mail" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                <input type="text" name="subject" placeholder="Subject" className="w-full p-3 border rounded-lg" onChange={handleChange} required />
                <textarea name="message" placeholder="Message" className="w-full p-3 border rounded-lg" rows="4" onChange={handleChange} required></textarea>
                <button type="submit" className="w-full bg-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      
    </div>
  );
}