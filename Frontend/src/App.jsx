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
import { connecttoSokketayyo } from "./utils/Socket.io.client.js";
import NotFoundPage from "./Pages/NofoundPage/NotFoundPage.jsx";
import AboutPages from "./Pages/AboutPages.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import CouponClaimBox from "./component/Coupen/CouponClaimBox.jsx";
import { useCoupenStore } from "./Apicalls/coupen.api.js";
import { useConnectionStore } from "./Apicalls/ConnectionRequest.js";

import VoiceInterface from "./component/TalkWithAI/VoiceInterface.jsx";

import FileUploader from "./Pages/PDF_Generator/FileUploader.jsx";
import Sidebar from "./Pages/Chat/Sidebar/Sidebar.jsx";
import ChatfullCompo from "./Pages/ChatFull/ChatfullCompo.jsx";
import OnboardingFlow from "./Pages/Onboarding/OnboardingFlow.jsx";
import SidebarMain from "./component/Sidebar/SidebarMain.jsx";
import Maincomp from "./component/Maincomp/Maincomp.jsx";
import ConnectionsPage from "./Pages/Friends/ConnectionsPage.jsx";
import ToolsPage from "./Pages/Aitools/ToolsPage.jsx";
import ChatPage from "./Pages/Chat/ChatSection/ChatPage.jsx";
 

const App = () => {
  const { isAuthenticated, loading, checkingAuth, user } = useAuthStore();
  const { isClaimed } = useCoupenStore();
  const location = useLocation();

  useEffect(() => {
    checkingAuth();
  }, [isClaimed]);

  useEffect(() => {
    let socket = connecttoSokketayyo();

    if (user?._id) {
      socket.emit("onlineUsers", user?._id);
    }

    socket.on("updated-onlineUsers", (onlineUserIds) => {
      useConnectionStore.getState().setOnlineUserIds(onlineUserIds);
    });

    function offlineHojare() {
      socket.disconnect();
    }

    window.addEventListener("beforeunload", offlineHojare);

    return () => {
      socket.disconnect();
      window.addEventListener("beforeunload", offlineHojare);
    };
  }, [user?._id]);

  const showNavbar = ["/"].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 flex ">
      {showNavbar && <Navbar />}

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
          path="/listenify"
          element={isAuthenticated ? <Maincomp /> : <Navigate to="/login" />}
        >
          <Route index element={<UploadPage />} />
          <Route path="ai-tools" element={<ToolsPage />} />
          <Route path="voice-conversion" element={<UploadPage />} />
          <Route path="pdfgenerator" element={<FileUploader />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="live-talk" element={<VoiceInterface />} />
          <Route
            path="onboarding"
            element={
              !user?.completed ? (
                <OnboardingFlow />
              ) : (
                <Navigate to="/listenify/chat" />
              )
            }
          />
          <Route
            path="connections"
            element={
              !user?.completed ? <OnboardingFlow /> : <ConnectionsPage />
            }
          />
          

          

          <Route
            path="chat"
            element={
              user?.completed ? (
                <ChatPage />
              ) : (
                <Navigate to="/listenify/onboarding" />
              )
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {showNavbar && <Footer />}
      <Toaster position="bottom-center" />

    </div>
  );
};

export default App;
