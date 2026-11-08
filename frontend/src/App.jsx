import React, { useState, useEffect } from 'react';
import api from './services/api';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import StudentProfileModal from './components/StudentProfileModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

export default function App() {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Modals State
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast Notifications Helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Fetch Initial Data
  useEffect(() => {
    fetchStudents();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/auth/me');
      if (res.data?.user) {
        setCurrentUser(res.data.user);
      }
    } catch {
      setCurrentUser(null);
    }
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/students');
      setStudents(res.data?.students || []);
    } catch (err) {
      addToast(err.response?.data?.message || 'Error fetching students from server', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD Handlers
  const handleSaveStudent = async (formData) => {
    try {
      if (editingStudent) {
        const res = await api.put(`/students/${editingStudent._id}`, formData);
        addToast('Student details updated successfully!', 'success');
        setStudents((prev) =>
          prev.map((s) => (s._id === editingStudent._id ? res.data.student : s))
        );
      } else {
        const res = await api.post('/students', formData);
        addToast('New student enrolled successfully!', 'success');
        setStudents((prev) => [res.data.student, ...prev]);
      }
      setIsStudentModalOpen(false);
      setEditingStudent(null);
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'danger');
    }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from MongoDB database?`)) {
      return;
    }

    try {
      await api.delete(`/students/${id}`);
      addToast(`"${name}" was deleted successfully.`, 'success');
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete student', 'danger');
    }
  };

  // Auth Handlers
  const handleLogin = async (payload) => {
    try {
      const res = await api.post('/auth/login', payload);
      setCurrentUser(res.data.user);
      setIsAuthModalOpen(false);
      addToast(`Welcome back, ${res.data.user.username}!`, 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Login failed', 'danger');
    }
  };

  const handleRegister = async (payload) => {
    try {
      const res = await api.post('/auth/register', payload);
      setCurrentUser(res.data.user);
      setIsAuthModalOpen(false);
      addToast(`Account created for ${res.data.user.username}!`, 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Registration failed', 'danger');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setCurrentUser(null);
      addToast('Logged out safely.', 'success');
    } catch {
      addToast('Logout failed', 'danger');
    }
  };

  // Filtering Logic
  const courses = [...new Set(students.map((s) => s.course).filter(Boolean))].sort();

  const filteredStudents = students.filter((st) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      st.name?.toLowerCase().includes(q) ||
      st.email?.toLowerCase().includes(q) ||
      st.course?.toLowerCase().includes(q);

    const matchesCourse = !selectedCourse || st.course === selectedCourse;

    return matchesQuery && matchesCourse;
  });

  return (
    <div className="app-container">
      {/* Toast Alerts */}
      <Toast toasts={toasts} />

      {/* Header */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="main-content">
        <StatsCards students={students} />

        <StudentTable
          students={students}
          filteredStudents={filteredStudents}
          courses={courses}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCourse={selectedCourse}
          onCourseChange={setSelectedCourse}
          onRefresh={fetchStudents}
          onOpenCreate={() => {
            setEditingStudent(null);
            setIsStudentModalOpen(true);
          }}
          onOpenEdit={(student) => {
            setEditingStudent(student);
            setIsStudentModalOpen(true);
          }}
          onOpenView={(student) => setViewingStudent(student)}
          onDelete={handleDeleteStudent}
          isLoading={isLoading}
        />
      </main>

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleSaveStudent}
        initialData={editingStudent}
      />

      {/* View Student Identity Card Modal */}
      <StudentProfileModal
        isOpen={Boolean(viewingStudent)}
        onClose={() => setViewingStudent(null)}
        student={viewingStudent}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
