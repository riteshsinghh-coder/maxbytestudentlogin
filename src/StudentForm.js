import React from 'react';

const StudentForm = ({ studentFormData, handleStudentFormChange, handleAddStudent, handleUpdateStudent, isEditing }) => {
  return (
    <div style={styles.formGroup}>
      <input
        type="text"
        name="name"
        value={studentFormData.name}
        onChange={handleStudentFormChange}
        placeholder="Student Name"
        style={styles.input}
      />
      <input
        type="text"
        name="uid"
        value={studentFormData.uid}
        onChange={handleStudentFormChange}
        placeholder="Student UID"
        style={styles.input}
      />
      <input
        type="text"
        name="group"
        value={studentFormData.group}
        onChange={handleStudentFormChange}
        placeholder="Group (Comma Separated)"
        style={styles.input}
      />
      <input
        type="text"
        name="courses"
        value={studentFormData.courses}
        onChange={handleStudentFormChange}
        placeholder="Courses (Comma Separated)"
        style={styles.input}
      />

      {isEditing ? (
        <button onClick={handleUpdateStudent} style={styles.button}>Update Student</button>
      ) : (
        <button onClick={handleAddStudent} style={styles.button}>Add New Student</button>
      )}
    </div>
  );
};

const styles = {
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#7F00FF',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
};

export default StudentForm;
