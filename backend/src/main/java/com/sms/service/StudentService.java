package com.sms.service;

import com.sms.dto.StudentDTO;
import com.sms.model.Student;
import com.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = mapToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);
        return mapToDTO(savedStudent);
    }

    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student existing = studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        existing.setFirstName(studentDTO.getFirstName());
        existing.setLastName(studentDTO.getLastName());
        existing.setEmail(studentDTO.getEmail());
        existing.setDepartment(studentDTO.getDepartment());
        existing.setCgpa(studentDTO.getCgpa());
        Student updated = studentRepository.save(existing);
        return mapToDTO(updated);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public List<StudentDTO> searchStudents(String query) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(query, query)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private StudentDTO mapToDTO(Student student) {
        return StudentDTO.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .department(student.getDepartment())
                .cgpa(student.getCgpa())
                .createdAt(student.getCreatedAt())
                .build();
    }

    private Student mapToEntity(StudentDTO dto) {
        return Student.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .department(dto.getDepartment())
                .cgpa(dto.getCgpa())
                .build();
    }
}
