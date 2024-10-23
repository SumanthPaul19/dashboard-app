import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // If the user is already logged in, redirect to home
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="landing-container">
      <h1>Welcome to Dashboard App</h1>
      <p>Your space to save notes and documents securely.</p>
      <div className="landing-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
    </div>
  );
}

export default LandingPage;
