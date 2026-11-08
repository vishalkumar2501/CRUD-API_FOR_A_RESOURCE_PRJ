import React from 'react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = 'fa-circle-check';
        if (toast.type === 'danger') icon = 'fa-circle-exclamation';
        if (toast.type === 'warning') icon = 'fa-triangle-exclamation';

        return (
          <div key={toast.id} className={`toast toast-${toast.type || 'success'}`}>
            <i className={`fa-solid ${icon}`}></i>
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
