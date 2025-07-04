import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddMultipleCourse = ({ setShowCsvUpload, fetchCourses }) => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return Swal.fire({
        icon: "warning",
        title: "Missing File",
        text: "Please select a CSV/Excel file.",
      });
    }

    if (images.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Images",
        text: "Please select at least one recruiter logo.",
      });
    }

    const formData = new FormData();
    formData.append("excel", file);
    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
        setUploading(true);
      
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/courses/bulk-upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const { coursesAdded, coursesUpdated, errorCount, errors } = res.data;
      
        // If there were errors, show as warning, else success
        Swal.fire({
          icon: errorCount > 0 ? "warning" : "success",
          title: errorCount > 0 ? "Upload Completed with Some Issues" : "Upload Successful",
          html: `
            <p><strong>Courses Added:</strong> ${coursesAdded}</p>
            <p><strong>Courses Updated:</strong> ${coursesUpdated}</p>
            <p><strong>Errors:</strong> ${errorCount}</p>
            ${
              errors.length > 0
                ? `<details style="text-align:left; margin-top:10px;">
                    <summary style="cursor:pointer;">View Error Details</summary>
                    <ul style="max-height:150px; overflow-y:auto;">
                      ${errors.map((e) => `<li>${e}</li>`).join("")}
                    </ul>
                  </details>`
                : ""
            }
          `,
          width: 600,
        });
      
        fetchCourses();
        setShowCsvUpload(false);
      } catch (err) {
        console.error(err);
      
        const coursesAdded = err?.response?.data?.coursesAdded ?? 0;
        const coursesUpdated = err?.response?.data?.coursesUpdated ?? 0;
        const errorCount = err?.response?.data?.errorCount ?? null;
        const errors = err?.response?.data?.errors ?? [];
      
        const errorMessage =
          errorCount !== null
            ? `Upload completed with some issues:<br>
               <strong>Courses Added:</strong> ${coursesAdded}<br>
               <strong>Courses Updated:</strong> ${coursesUpdated}<br>
               <strong>Errors:</strong> ${errorCount}`
            : "Something went wrong during the upload. Please try again.";
      
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          html: `
            <p>${errorMessage}</p>
            ${
              errors.length > 0
                ? `<details style="text-align:left; margin-top:10px;">
                    <summary style="cursor:pointer;">View Error Details</summary>
                    <ul style="max-height:150px; overflow-y:auto;">
                      ${errors.map((e) => `<li>${e}</li>`).join("")}
                    </ul>
                  </details>`
                : ""
            }
          `,
          width: 600,
        });
      }
       finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={() => setShowCsvUpload(false)}
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Bulk Course Upload</h2>

        <label className="block mb-2 font-medium">Upload Excel File</label>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 block w-full"
        />

        <label className="block mb-2 font-medium">Upload Recruiter Logos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="mb-4 block w-full"
        />

        <button
          onClick={handleUpload}
          className="bg-[#33517F] text-white px-4 py-2 rounded hover:bg-[#274069] w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default AddMultipleCourse;
