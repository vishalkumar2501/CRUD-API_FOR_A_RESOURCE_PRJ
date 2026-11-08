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

export default function StudentTable({
  students,
  filteredStudents,
  courses,
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  onRefresh,
  onOpenCreate,
  onOpenEdit,
  onOpenView,
  onDelete,
  isLoading
}) {
  return (
    <section className="table-card">
      <div className="table-header">
        <div className="search-filter-wrapper">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, email, or course..."
            />
          </div>

          <div className="filter-box">
            <select
              value={selectedCourse}
              onChange={(e) => onCourseChange(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={onRefresh} className="btn btn-outline" title="Refresh Table">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <button onClick={onOpenCreate} className="btn btn-primary">
            <i className="fa-solid fa-plus"></i> Add New Student
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Contact Email</th>
              <th>Age</th>
              <th>Enrolled Course</th>
              <th>Admission Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <i className="fa-solid fa-spinner fa-spin fa-2x text-primary"></i>
                  <p className="mt-2 text-muted">Loading students from MongoDB...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <div className="empty-icon">
                      <i className="fa-solid fa-user-graduate"></i>
                    </div>
                    <h3>No Students Found</h3>
                    <p>
                      {searchQuery || selectedCourse
                        ? 'No students match your filter criteria.'
                        : 'Database mein koi student nahi hai. Pehla student add karo!'}
                    </p>
                    <button onClick={onOpenCreate} className="btn btn-primary mt-3">
                      <i className="fa-solid fa-plus"></i> Add First Student
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((st) => {
                const initials = getInitials(st.name);
                const color = getAvatarColor(st.name);
                const date = new Date(st.createdAt || Date.now()).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <tr key={st._id}>
                    <td>
                      <div className="cell-student">
                        <div className="student-avatar" style={{ backgroundColor: color }}>
                          {initials}
                        </div>
                        <div className="student-name-box">
                          <span className="student-full-name">{st.name}</span>
                          <span className="student-sub-id">ID: {st._id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-main font-medium">{st.email}</span>
                    </td>
                    <td>
                      <span className="font-bold">{st.age}</span> yrs
                    </td>
                    <td>
                      <span className="badge badge-course">{st.course}</span>
                    </td>
                    <td>
                      <span className="text-muted">{date}</span>
                    </td>
                    <td className="text-right">
                      <div className="table-actions">
                        <button
                          onClick={() => onOpenView(st)}
                          className="btn-action action-view"
                          title="View Profile"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          onClick={() => onOpenEdit(st)}
                          className="btn-action action-edit"
                          title="Edit Student"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => onDelete(st._id, st.name)}
                          className="btn-action action-delete"
                          title="Delete Student"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
