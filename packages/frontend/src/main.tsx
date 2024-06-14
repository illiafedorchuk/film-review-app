import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegistrationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import "./index.css";
import MainPage from "./pages/main/MainPage";
import MoviePage from "./pages/movie/MoviePage"; // Import the MoviePage component

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route
            path="/resetPassword/:signResetPasswordToken"
            element={<ResetPasswordPage />}
          />
          <Route path="/movie/:movieId" element={<MoviePage />} />{" "}
          {/* Add this route */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
