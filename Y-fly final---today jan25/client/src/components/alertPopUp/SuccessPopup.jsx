import { useEffect } from "react";

const SuccessPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-close after 5 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center border border-[#D1D5DB] z-50">
        <h2 className="text-lg font-bold">Confirmation</h2>
        <img
          src="/images/success.png"
          alt="Success"
          className="w-56 mx-auto my-3"
        />
        <p className="text-blue-600 font-semibold text-xl">Success</p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#2B7CD6] text-white px-6 py-2 rounded-full shadow-md border border-black"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
