import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegistrationPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import "./index.css";
import MainPage from "./pages/main/MainPage";
import MoviePage from "./pages/movie/MoviePage";
import ProfilePage from "./pages/profile/ProfilePage";
import RatedMoviesPage from "./pages/movieLists/RatedMoviesPage";
import WatchlistPage from "./pages/watchlistPage/WatchlistPage"; // Import the WatchlistPage component
import ChangeProfilePage from "./pages/changeProfilePage/changeProfilePage";
import FavouriteMoviePage from "./pages/bookmarkPage/FavouriteMoviePage";

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
          <Route path="profile/me" element={<ProfilePage />} />
          <Route path="profile/me/ratedMovies" element={<RatedMoviesPage />} />
          <Route path="profile/me/watchlist" element={<WatchlistPage />} />
          <Route
            path="profile/me/favouriteMovies"
            element={<FavouriteMoviePage />}
          />
          <Route
            path="profile/me/editProfile"
            element={
              <ChangeProfilePage token={""} initialProfile={undefined} />
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
