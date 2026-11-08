import React from 'react';

export default function Navbar({ currentUser, onOpenAuth, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <div>
          <h1>EduManage<span className="brand-dot">.</span></h1>
          <p className="brand-sub">React + Node.js CRUD Portal</p>
        </div>
      </div>

      <div className="nav-actions">
        <div className="status-indicator">
          <span className="status-dot"></span> Backend: Online (Port 5000)
        </div>

        {currentUser ? (
          <div className="user-badge">
            <div className="user-avatar">
              {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{currentUser.username}</span>
              <span className="user-role">{currentUser.role || 'Admin'}</span>
            </div>
            <button
              onClick={onLogout}
              className="btn btn-outline-danger btn-sm"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn btn-primary btn-sm">
            <i className="fa-solid fa-user-lock"></i> Login / Register
          </button>
        )}
      </div>
    </header>
  );
}
