import { useState } from "react";
import Swal from "sweetalert2";
import { loginUser } from "../service/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(form);
      Swal.fire("Success", response.message, "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="bg-green-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
