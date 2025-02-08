// src/Pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // Storing the token directly in localStorage
      localStorage.setItem('authToken', data.token);
      navigate('/upload');
    } catch (error) {
      alert('Login Failed');
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="w-96 bg-gray-900 p-8 rounded-lg shadow-xl text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
