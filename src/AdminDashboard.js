import React, { useState } from 'react';
import NavigationButtons from './NavigationButtons';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import FileUpload from './FileUpload';
import students from './data/students'; // Ensure the correct path

const AdminDashboard = ({ user }) => {
  const [activeSection, setActiveSection] = useState('studentManagement');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFormData, setStudentFormData] = useState({
    name: '',
    uid: '',
    group: '',
    courses: [],
  });

  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);

  const [target, setTarget] = useState({ type: 'group', value: '' });

  const groups = Array.from(
    new Set(
      students.flatMap((student) =>
        student.group.split(',').map((g) => g.trim())
      )
    )
  );

  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    if (!studentFormData.name || !studentFormData.uid) {
      alert('Please fill all fields');
      return;
    }
    students.push(studentFormData);
    setStudentFormData({ name: '', uid: '', group: '', courses: [] });
    setIsEditing(false);
  };

  const handleUpdateStudent = () => {
    const studentIndex = students.findIndex((s) => s.uid === selectedStudent.uid);
    students[studentIndex] = studentFormData;
    setStudentFormData({ name: '', uid: '', group: '', courses: [] });
    setIsEditing(false);
  };

  const handleYoutubeVideoUrlChange = (e) => {
    setYoutubeVideoUrl(e.target.value);
  };

  const handleAssignmentChange = (e) => {
    const file = e.target.files[0];
    setAssignmentFile(file);
  };

  const handleUpload = () => {
    if (!assignmentFile || !target.value) {
      alert('Please select all files and a target group/student before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('assignment', assignmentFile);
   
    formData.append('targetType', target.type);
    formData.append('targetValue', target.value);

    alert(`Files ready to be uploaded for ${target.type}: ${target.value}`);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setStudentFormData({
      name: student.name,
      uid: student.uid,
      group: student.group,
      courses: student.courses,
    });
    setIsEditing(true);
  };

  const renderVideoEmbed = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return (
      <iframe
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      ></iframe>
    );
  };

  if (user.role !== 'admin') return <h2>Access Denied: Admins only</h2>;

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <NavigationButtons setActiveSection={setActiveSection} />

      {/* Dynamic Section Rendering */}
      {activeSection === 'studentManagement' && (
        <div style={styles.section}>
          <StudentForm
            studentFormData={studentFormData}
            handleStudentFormChange={handleStudentFormChange}
            handleAddStudent={handleAddStudent}
            handleUpdateStudent={handleUpdateStudent}
            isEditing={isEditing}
          />
          <StudentList students={students} handleEditStudent={handleEditStudent} />
        </div>
      )}

      {activeSection === 'fileUpload' && (
        <FileUpload
          assignmentFile={assignmentFile}
          
          handleAssignmentChange={handleAssignmentChange}
          handleUpload={handleUpload}
          target={target}
          groups={groups}
          setTarget={setTarget}
        />
      )}

      {activeSection === 'videoEmbed' && (
        <div style={styles.section}>
          <h3>Embed YouTube Video</h3>
          <input
            type="text"
            placeholder="Enter YouTube Video URL"
            value={youtubeVideoUrl}
            onChange={handleYoutubeVideoUrlChange}
            style={styles.input}
          />
          {youtubeVideoUrl && renderVideoEmbed(youtubeVideoUrl)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    width: '100%',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
};

export default AdminDashboard;
