import React from 'react';
import { Edit2, Trash2, Mail, Hash } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        No students found. Add a new student to get started.
      </div>
    );
  }

  return (
    <div className="table-container fade-in">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Contact Details</th>
            <th>Department</th>
            <th>CGPA</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', 
                    background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold', color: 'var(--primary-color)'
                  }}>
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: '#fff' }}>{student.firstName} {student.lastName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Hash size={12} /> ID: {student.id}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <Mail size={14} /> {student.email}
                </div>
              </td>
              <td>
                <span style={{ 
                  background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', 
                  padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' 
                }}>
                  {student.department || 'Unassigned'}
                </span>
              </td>
              <td>
                <div style={{ fontWeight: '600', color: student.cgpa >= 7.5 ? 'var(--success-color)' : student.cgpa < 4.0 ? 'var(--danger-color)' : '#fff' }}>
                  {student.cgpa ? student.cgpa.toFixed(1) : 'N/A'}
                </div>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => onEdit(student)} className="btn btn-outline" style={{ padding: '6px 10px', marginRight: '8px' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => onDelete(student.id)} className="btn btn-danger" style={{ padding: '6px 10px' }}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
