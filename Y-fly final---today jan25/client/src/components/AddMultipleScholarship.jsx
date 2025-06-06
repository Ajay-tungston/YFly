import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddMultipleScholarship = ({ setShowCsvUpload,fetchScholarships }) => {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return Swal.fire({
        icon: "warning",
        title: "Missing File",
        text: "Please select a CSV/Excel file.",
      });
    }

    if (pdfs.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Missing PDFs",
        text: "Please upload at least one brochure PDF.",
      });
    }

    const formData = new FormData();
    formData.append("excel", file);
    pdfs.forEach((pdf) => formData.append("brochures", pdf));

    try {
      setUploading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/scholarships/bulk-upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { createdCount, updatedCount, errorCount, errors } = res.data;

      Swal.fire({
        icon: "success",
        title: "Upload Completed",
        html: `
          <p><strong>New Scholarships Added:</strong> ${createdCount}</p>
          <p><strong>Existing Scholarships Updated:</strong> ${updatedCount}</p>
          <p><strong>Errors:</strong> ${errorCount}</p>
          ${
            errors?.length
              ? `<details style="text-align:left; margin-top:10px;">
                  <summary style="cursor:pointer;">View Error Details</summary>
                  <ul style="max-height:150px; overflow-y:auto;">
                    ${errors.map((e) => `<li>${e}</li>`).join("")}
                  </ul>
                </details>`
              : ""
          }
        `,
      });

      fetchScholarships();
      setShowCsvUpload(false);
    } catch (err) {
      console.error(err);

      const createdCount = err?.response?.data?.createdCount ?? 0;
      const updatedCount = err?.response?.data?.updatedCount ?? 0;
      const errorCount = err?.response?.data?.errorCount ?? null;
      const errors = err?.response?.data?.errors ?? [];

      const errorMessage =
        errorCount !== null
          ? `Upload completed with some issues:<br>
             <strong>Scholarships Added:</strong> ${createdCount}<br>
             <strong>Scholarships Updated:</strong> ${updatedCount}<br>
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
      });
    } finally {
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
        <h2 className="text-xl font-semibold mb-4">Bulk Scholarship Upload</h2>

        <label className="block mb-2 font-medium">Upload Excel File</label>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 block w-full"
        />

        <label className="block mb-2 font-medium">Upload Brochure PDFs</label>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setPdfs(Array.from(e.target.files))}
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

export default AddMultipleScholarship;
