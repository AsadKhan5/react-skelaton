import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import Logo from "/Hr-logo.png"; // Adjusted import path for the image
import { login } from "../../utils/APIs";

const Login = () => {
  const navigate = useNavigate();

  // State for email, password, and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitLoginForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await login({ userId: email, password });
    const data = await response.json();
    setIsLoading(false);

    if (response.status !== 200) {
      alert(data.msg);
      return;
    }

    const token = data.token;
    if (!token) {
      alert("Unable to login. Please try again later.");
      return;
    }

    localStorage.clear();
    localStorage.setItem("zYp3qCT8zehpy0qb0s2MXsRZtwFw9Y8z", token);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={submitLoginForm}
        className="flex flex-col md:shadow-lg gap-6 w-full p-8 rounded-lg lg:max-w-md bg-white lg:border-primary"
      >
        <div className="flex justify-center">
          <img src={Logo} className="w-40" alt="Ene Logo" />
        </div>
        <div>
          <h1 className="font-bold text-3xl text-primary">Login</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Welcome back! Please login to your account.
          </p>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold text-gray-700">
              Email or EmployeeId
            </span>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-semibold text-gray-700">
              Password
            </span>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary w-full rounded-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className="text-xs font-semibold text-gray-400 text-center mt-4">
          Powered By Engineering and Environmental Solutions Pvt Ltd
        </p>
      </form>
    </div>
  );
};

export default Login;
