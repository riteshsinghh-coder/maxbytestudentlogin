import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Dashboard = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {user.username}!</h2>
      <h3>Your Courses:</h3>
      
      {user.courses.map((course, index) => (
        <div key={index} style={{ marginBottom: '50px' }}>
          <h4>{course.courseName}</h4>

          {/* Independent PDF Container 1 */}
          <div style={{ 
              width: '500px', 
              height: '600px', 
              border: '2px solid #333', 
              margin: '20px auto', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
              <Viewer fileUrl={course.notesUrl0} />
            </Worker>
            <a href={course.notesUrl0} target="_blank" rel="noopener noreferrer" style={{ marginTop: '15px', fontWeight: 'bold' }}>
              View Full PDF (CSS)
            </a>
          </div>
          
          {/* Independent PDF Container 2 */}
          <div style={{ 
              width: '500px', 
              height: '600px', 
              border: '2px solid #333', 
              margin: '20px auto', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}>
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
              <Viewer fileUrl={course.notesUrl1} />
            </Worker>
            <a href={course.notesUrl1} target="_blank" rel="noopener noreferrer" style={{ marginTop: '15px', fontWeight: 'bold' }}>
              View Full PDF (HTML)
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
