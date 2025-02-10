import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append('file', file); 
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return alert("You are not authenticated. Please login first.");
      }

      await axios.post('http://localhost:5000/api/upload/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        },
      });

      setUploadStatus("File uploaded successfully!");
      if (onUploadSuccess) {
        onUploadSuccess(); 
      }
    } catch (error) {
      setUploadStatus("Upload failed!");
      console.error(error);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-white">Upload XML File</h2>
      <label className="flex flex-col items-center justify-center w-full p-5 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <input type="file" accept=".xml" className="hidden" onChange={handleFileChange} />
        <p className="text-gray-400">Drag & Drop or Click to Select a File</p>
      </label>
      {file && <p className="mt-3 text-sm text-blue-400">{file.name}</p>}
      <button onClick={handleUpload} className="mt-4 w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-white">Upload</button>
      {uploadStatus && <p className="mt-3 text-green-400">{uploadStatus}</p>}
    </div>
  );
};

UploadForm.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,  
};

export default UploadForm;