import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/login/login";
import Auth from "./auth/Auth";
import App from "./App";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./portal/home/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AddSim from "./portal/SIM/AddSim";
import AddIndustry from "./portal/Industry/AddIndustry";
import AddUser from "./portal/user/AddUser";
import ExcelFileUpload from "./portal/SIM/ExcelFileUpload";

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
        {/* add new sim */}
        <Route path="/add-new-sim" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <AddSim />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/add-new-insudtry" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <AddIndustry />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/add-new-user" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* excel file upload ..  */}
        <Route path="/excel-bulk-upload" element={<App />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <ExcelFileUpload />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
