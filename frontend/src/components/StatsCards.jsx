import React from 'react';

export default function StatsCards({ students }) {
  const total = students.length;
  const uniqueCourses = new Set(students.map(s => s.course).filter(Boolean)).size;
  const avgAge = total > 0
    ? (students.reduce((sum, s) => sum + (Number(s.age) || 0), 0) / total).toFixed(1)
    : 0;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon icon-blue">
          <i className="fa-solid fa-users"></i>
        </div>
        <div className="stat-details">
          <span className="stat-label">Total Students</span>
          <h3 className="stat-value">{total}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-purple">
          <i className="fa-solid fa-book-open"></i>
        </div>
        <div className="stat-details">
          <span className="stat-label">Active Courses</span>
          <h3 className="stat-value">{uniqueCourses}</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-emerald">
          <i className="fa-solid fa-chart-line"></i>
        </div>
        <div className="stat-details">
          <span className="stat-label">Avg. Age</span>
          <h3 className="stat-value">{avgAge} yrs</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-amber">
          <i className="fa-solid fa-database"></i>
        </div>
        <div className="stat-details">
          <span className="stat-label">Database</span>
          <h3 className="stat-value text-emerald">MongoDB Atlas</h3>
        </div>
      </div>
    </section>
  );
}
