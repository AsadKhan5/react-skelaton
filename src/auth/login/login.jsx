import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import eneLogo from "/images.png"; // Adjusted import path for the image
import { login } from "../../utils/APIs";

const Login = () => {
  const navigate = useNavigate();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = async (event) => {
    event.preventDefault();
    const response = await login({ email, password });
    const data = await response.json();
    if (response.status != 200) {
      alert(data.msg);
      return;
    }
    const token = data.token;
    if (!token) {
      alert("Unable to login. Please try again later.");
      return;
    }

    localStorage.clear();
    localStorage.setItem("user-token", token);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-200">
      <form
        onSubmit={submitLoginForm}
        className="flex flex-col gap-3 w-full md:shadow-lg md:rounded-lg md:w-1/3 lg:1/3 p-4 bg-white"
      >
        <div className="flex justify-center mb-2">
          <img src={eneLogo} className="w-24" alt="Ene Logo" />
        </div>
        <div className="flex gap-2 justify-center">
          <h1 className="font-semibold text-md">Login </h1>
          <FaUserLock className="text-2xl" />
        </div>
        <p className="font-semibold text-sm">Welcome to sim Sphere</p>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Email</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold">Password</span>
          </div>
          <input
            type="password" // Change to password type
            placeholder="Type here"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-secondary w-full mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
