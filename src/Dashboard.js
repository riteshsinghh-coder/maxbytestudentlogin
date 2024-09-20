import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Dashboard = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {user.username}!</h2>
      <h3>Your Courses:</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {user.courses.map((course, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '20px', width: '400px' }}>
            <strong>{course.courseName}</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {/* PDF 1 */}
              <div style={{ width: '180px', height: '250px', border: '1px solid black' }}>
                <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                  <Viewer fileUrl={course.notesUrl0} />
                </Worker>
                <a href={course.notesUrl0} target="_blank" rel="noopener noreferrer">
                  View Full PDF 1
                </a>
              </div>
              
              {/* PDF 2 */}
              <div style={{ width: '180px', height: '250px', border: '1px solid black' }}>
                <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                  <Viewer fileUrl={course.notesUrl1} />
                </Worker>
                <a href={course.notesUrl1} target="_blank" rel="noopener noreferrer">
                  View Full PDF 2
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
