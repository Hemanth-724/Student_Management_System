import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { studentService } from '../services/api';

const StudentForm = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    cgpa: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = !!student;

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        department: student.department || '',
        cgpa: student.cgpa || ''
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        cgpa: formData.cgpa ? parseFloat(formData.cgpa) : null
      };

      if (isEditMode) {
        await studentService.updateStudent(student.id, payload);
      } else {
        await studentService.createStudent(payload);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel animate-fade-in" style={{ width: '500px', padding: '30px', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '24px' }}>{isEditMode ? 'Edit Student' : 'Add New Student'}</h2>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label className="input-label">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-field" required />
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-field" required />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label className="input-label">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <label className="input-label">Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} className="input-field" placeholder="e.g., Computer Science" />
            </div>
            <div style={{ flex: 1 }}>
              <label className="input-label">CGPA</label>
              <input type="number" step="0.1" name="cgpa" value={formData.cgpa} onChange={handleChange} className="input-field" placeholder="0.0 - 10.0" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
