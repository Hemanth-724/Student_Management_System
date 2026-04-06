import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { Users, GraduationCap, TrendingUp } from 'lucide-react';
import { studentService } from '../services/api';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    }
  };

  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim() === '') {
        fetchStudents();
      } else {
        try {
          const data = await studentService.searchStudents(searchQuery);
          setStudents(data);
        } catch (error) {
          console.error('Failed to search students', error);
        }
      }
    };
    
    // Simple debounce
    const timeoutId = setTimeout(() => search(), 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleCreate = () => {
    setStudentToEdit(null);
    setIsFormOpen(true);
  };

  const handleEdit = (student) => {
    setStudentToEdit(student);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error('Failed to delete student', error);
      }
    }
  };

  const handleSave = () => {
    setIsFormOpen(false);
    fetchStudents();
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar onSearch={setSearchQuery} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <StatCard title="Total Students" value={students.length} icon={<Users size={24} />} color="var(--primary-color)" />
          <StatCard title="Avg. CGPA" value={students.length > 0 ? (students.reduce((a, b) => a + (b.cgpa || 0), 0) / students.length).toFixed(1) : 0} icon={<TrendingUp size={24} />} color="var(--success-color)" />
          <StatCard title="Departments" value={[...new Set(students.map(s => s.department))].filter(Boolean).length} icon={<GraduationCap size={24} />} color="var(--secondary-color)" />
        </div>

        <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '16px' }}>
          <div className="flex-between" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px' }}>Student Roster</h3>
            <button className="btn btn-primary" onClick={handleCreate}>
              + Add New Student
            </button>
          </div>
          
          <StudentList 
            students={students} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        </div>
      </div>

      {isFormOpen && (
        <StudentForm 
          student={studentToEdit} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderRadius: '16px' }}>
    <div style={{ background: `${color}20`, color: color, padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px', fontWeight: '500' }}>{title}</p>
      <h2 style={{ margin: 0, fontSize: '28px', color: 'var(--text-primary)' }}>{value}</h2>
    </div>
  </div>
);

export default Dashboard;
