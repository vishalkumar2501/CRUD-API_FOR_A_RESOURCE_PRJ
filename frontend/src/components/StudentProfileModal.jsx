import React from 'react';

const AVATAR_COLORS = [
  '#4f46e5', '#7c3aed', '#059669', '#d97706',
  '#dc2626', '#2563eb', '#0891b2', '#db2777'
];

function getInitials(name) {
  if (!name) return 'S';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function StudentProfileModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  const initials = getInitials(student.name);
  const color = getAvatarColor(student.name);
  const formattedDate = new Date(student.createdAt || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <i className="fa-solid fa-id-card text-purple"></i>
            <h2>Student Identity Card</h2>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body text-center">
          <div className="profile-avatar" style={{ backgroundColor: color }}>
            {initials}
          </div>
          <h3 className="mt-2 mb-1">{student.name}</h3>
          <span className="badge badge-course">{student.course}</span>

          <div className="profile-details-card mt-4">
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-envelope"></i> Email:</span>
              <span className="detail-val">{student.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-cake-candles"></i> Age:</span>
              <span className="detail-val">{student.age} Years</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-fingerprint"></i> ID:</span>
              <span className="detail-val text-muted text-xs">{student._id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-calendar"></i> Enrolled:</span>
              <span className="detail-val">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline w-100" onClick={onClose}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
