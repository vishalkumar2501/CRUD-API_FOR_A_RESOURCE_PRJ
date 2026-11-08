import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('admin');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      password: loginPassword,
      ...(loginIdentifier.includes('@') ? { email: loginIdentifier } : { username: loginIdentifier })
    };
    await onLogin(payload);
    setIsSubmitting(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onRegister({
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: regRole
    });
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register Admin
            </button>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Username or Email</label>
                <input
                  type="text"
                  placeholder="Enter username or email"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-right-to-bracket'}`}></i>
                {isSubmitting ? 'Authenticating...' : 'Login Securely'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Choose Username</label>
                <input
                  type="text"
                  placeholder="e.g. vishalkumar"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  placeholder="e.g. admin@school.com"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Create Password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select value={regRole} onChange={(e) => setRegRole(e.target.value)}>
                  <option value="admin">Administrator (Full Access)</option>
                  <option value="user">Regular User</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-user-shield'}`}></i>
                {isSubmitting ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
