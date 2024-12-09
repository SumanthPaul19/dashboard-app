import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null); 
    navigate('/login', { replace: true }); 
  };

  return (
    <div className="header">
      <div className="left">
        <Link to="/">Home</Link>
      </div>
      <div className="right">
        {user ? (
          <>
            <span className="welcome-message">{`Welcome, ${user.firstName || user.email}`}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
