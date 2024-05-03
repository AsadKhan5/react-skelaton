import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/login";
import Auth from "./auth/Auth";
import App from "./App";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./portal/home/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Query from "./portal/Query/Query";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={"/"}>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
        </Route>
        {/* home  */}
        <Route path="/" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* query next */}
        <Route path="/query" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Query />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
