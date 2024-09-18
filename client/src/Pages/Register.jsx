import { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(form);
      Swal.fire("Success", response.message, "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white p-2 rounded mb-2"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
