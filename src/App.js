import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Components
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import Spaces from "./components/Spaces";
import HowItWorks from "./components/HowItWorks";
import Offerings from "./components/Offerings";
import Cities from "./components/Cities";
import OurHomes from "./components/OurHomes";
import Career from "./components/Career";
import ReferAFriend from "./components/ReferAFriend";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // 'signin' or 'signup'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthSuccess = (message) => {
    toast.success(message);
    setShowAuthModal(false);
  };

  const handleAuthError = (error) => {
    toast.error(error.message);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!currentUser) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar
          currentUser={currentUser}
          openAuthModal={openAuthModal}
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
          authMode={authMode}
          setAuthMode={setAuthMode}
          handleAuthSuccess={handleAuthSuccess}
          handleAuthError={handleAuthError}
        />

        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/our-homes" element={<OurHomes />} />
          <Route path="/career" element={<Career />} />
          <Route path="/refer-a-friend" element={<ReferAFriend />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard user={currentUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
