import { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      setMsg(res.data.message);
      setSuccess(true); // ✅ Successful registration
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
      setSuccess(false); // ❌ Mark as failure
    }
  };

  // ✅ Clear form and message after success
  useEffect(() => {
    if (success) {
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        setMsg('');
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />

      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Register
      </button>

      {/* ✅ Conditionally styled message */}
      {msg && (
        <p
          className={`text-sm text-center mt-2 ${
            success ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
};

export default Register;
