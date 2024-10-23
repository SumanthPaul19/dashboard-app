import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from './pages/LandingPage'; 
import Header from "./components/Header";
import Footer from "./components/Footer";

// Helper function to safely retrieve user data from localStorage
function getUserFromLocalStorage() {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  }
  return null;
}

function App() {
  const [user, setUser] = useState(null); // Initially null, prevent re-renders

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser); // Update the user state with the user from localStorage
    }
  }, []); // Run only once on component mount

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} />
        <Routes>
          {/* Landing Page Route: Redirects to Home if user is logged in */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" replace /> : <LandingPage />} 
          />
          
          {/* Home Route: Only accessible if user is logged in */}
          <Route 
            path="/home" 
            element={user ? <Home /> : <Navigate to="/login" replace />} 
          />
          
          {/* Login Route: Redirects to Home if user is already logged in */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/home" replace /> : <Login setUser={setUser} />} 
          />
          
          {/* Register Route: Redirects to Home if user is already logged in */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/home" replace /> : <Register setUser={setUser} />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
