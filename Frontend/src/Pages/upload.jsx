import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../Components/uploadForm'; 

const Upload = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleUploadSuccess = () => {
    alert('Upload successful! Refreshing reports...');
    navigate('/reports'); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <UploadForm onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default Upload;
