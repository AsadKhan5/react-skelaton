import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginAPI = "http://localhost:8085/ene/sim/auth/login/";

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(loginAPI, { email, password });
      console.log("Login response : ", response);
      const data = response.data;
      const token = data.token;
      if (!token) {
        alert("Unable to login. Please try after some time.");
        return;
      }
      localStorage.clear();
      localStorage.setItem("user-token", token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      alert("Oops! Some error occurred.");
    }
  };

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-xl font-medium mb-5">Login To React Auth Demo</h2>
      <div className="md:flex md:justify-center">
        <form onSubmit={submitLoginForm} className="md:w-1/2">
          <div className="mb-3">
            <label htmlFor="login-email" className="block mb-1">
              email
            </label>
            <input
              type="text"
              id="login-email"
              name="email"
              required
              className="form-control input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              required
              className="form-control input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn-primary btn-success mt-2"
            id="login-btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
