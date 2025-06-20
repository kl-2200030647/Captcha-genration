import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', captcha: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // 🔁 Fetch CAPTCHA on mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    const res = await axios.get('http://localhost:5000/api/captcha', {
      withCredentials: true,
      responseType: 'text',
    });
    setCaptchaSvg(res.data);
  };

  // ✅ Clear form after successful login
  useEffect(() => {
    if (success) {
      setFormData({ email: '', password: '', captcha: '' });
      fetchCaptcha(); // refresh captcha
      setTimeout(() => {
        setMessage('');
        setSuccess(false); // reset flag
      }, 3000);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setSuccess(true); 
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
      setSuccess(false); 
      fetchCaptcha(); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        value={formData.email}
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <div className="bg-gray-100 p-2 rounded" dangerouslySetInnerHTML={{ __html: captchaSvg }} />

      <div className="flex gap-2">
        <input
          type="text"
          value={formData.captcha}
          placeholder="Enter CAPTCHA"
          onChange={(e) => setFormData({ ...formData, captcha: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="button" onClick={fetchCaptcha} className="px-3 text-blue-600 font-semibold">
          ↻
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

      {message && (
        <p
          className={`text-center text-sm mt-2 ${
            success ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default Login;
