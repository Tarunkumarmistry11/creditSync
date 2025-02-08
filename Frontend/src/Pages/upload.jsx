import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../Components/uploadForm'; // Import UploadForm

const Upload = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleUploadSuccess = () => {
    // Optional: Refresh reports or display a success message
    alert('Upload successful! Refreshing reports...');
    navigate('/reports'); // Redirect to reports after successful upload
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <UploadForm onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default Upload;
