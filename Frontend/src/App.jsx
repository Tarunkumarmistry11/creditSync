import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Upload from "./Pages/upload";
import Reports from "./Pages/Reports";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import './App.css';

const removeAuthToken = () => {
    localStorage.removeItem('authToken');
};


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navigation />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">CreditSync</Link>
        <div>
          <Link to="/upload" className="px-4">Upload</Link>
          <Link to="/reports" className="px-4">Reports</Link>
          <Link to="/login" className="px-4">Login</Link>
          <button onClick={handleLogout} className="px-4">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default App;