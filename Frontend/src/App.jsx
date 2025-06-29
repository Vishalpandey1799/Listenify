import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "./Apicalls/Auth.api.js";
import { useEffect } from "react";
import Loader from "./component/Loader/Loader.jsx";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer.jsx";
import { Toaster } from "react-hot-toast";

// Pages
import HomePage from "./component/HomePage";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import UploadPage from "./Pages/UploadPage/UploadPage";
import AboutPage from "./Pages/Aboutme/AboutPage";

import NotFoundPage from "./Pages/NofoundPage/NotFoundPage.jsx";
import AboutPages from "./Pages/AboutPages.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import CouponClaimBox from "./component/Coupen/CouponClaimBox.jsx";
import { useCoupenStore } from "./Apicalls/coupen.api.js";

import VoiceInterface from "./component/TalkWithAI/VoiceInterface.jsx";

const App = () => {
  const { isAuthenticated, loading, checkingAuth } = useAuthStore();
  const { isClaimed } = useCoupenStore();
  const location = useLocation();

  useEffect(() => {
    checkingAuth();
  }, [isClaimed]);

  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPages />} />
        <Route path="/about-dev" element={<AboutPage />} />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
        />

        <Route
          path="/create"
          element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/live-talk"
          element={
            isAuthenticated ? <VoiceInterface /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/live"
          element={
            isAuthenticated ? <CouponClaimBox /> : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideNavbar && <Footer />}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
