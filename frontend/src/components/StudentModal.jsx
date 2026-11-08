import React, { useState, useEffect } from 'react';

export default function StudentModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age || '',
        course: initialData.course || ''
      });
    } else {
      setFormData({ name: '', email: '', age: '', course: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const isEdit = Boolean(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      ...formData,
      age: Number(formData.age)
    });
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <i className={`fa-solid ${isEdit ? 'fa-user-pen text-amber' : 'fa-user-plus text-primary'}`}></i>
            <h2>{isEdit ? 'Edit Student Details' : 'Add New Student'}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="e.g. Vishal Kumar"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email Address <span className="required">*</span></label>
              <input
                type="email"
                placeholder="e.g. vishal@gmail.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-6">
                <label>Age <span className="required">*</span></label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="e.g. 21"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>

              <div className="form-group col-6">
                <label>Course Name <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech / BCA"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : isEdit ? 'fa-floppy-disk' : 'fa-check'}`}></i>
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Student' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
