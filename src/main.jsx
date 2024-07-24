import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/login";
import Auth from "./auth/Auth";
import App from "./App";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./portal/home/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AddSim from "./portal/SIM/AddSim";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-new-sim"
            element={
              <ProtectedRoute>
                <AddSim />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
