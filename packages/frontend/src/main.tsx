import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegistrationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route
            path="/resetPassword/:signResetPasswordToken"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
