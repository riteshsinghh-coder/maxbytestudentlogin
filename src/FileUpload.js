import React from 'react';

const FileUpload = ({
  videoURL,
  assignmentFile,
  thumbnailFile,
  preview,
  handleVideoChange,
  handleThumbnailChange,
  handleAssignmentChange,
  handleUpload,
  target,
  groups,
  students,
  setTarget,
}) => {
  return (
    <div style={styles.section}>
      <h3>Upload Video, Assignment, and Thumbnail</h3>
      <div style={styles.formGroup}>
        <label>Upload Target:</label>
        <select
          value={target.type}
          onChange={(e) => setTarget({ type: e.target.value, value: '' })}
          style={styles.input}
        >
          <option value="group">Group</option>
          <option value="student">Student</option>
        </select>

        {target.type === 'group' ? (
          <select
            value={target.value}
            onChange={(e) => setTarget((prev) => ({ ...prev, value: e.target.value }))}
            style={styles.input}
          >
            <option value="">Select Group</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={target.value}
            onChange={(e) => setTarget((prev) => ({ ...prev, value: e.target.value }))}
            style={styles.input}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.uid} value={student.uid}>
                {student.name} ({student.uid})
              </option>
            ))}
          </select>
        )}
      </div>

      <div style={styles.formGroup}>
        <label>Upload YouTube Video URL:</label>
        <input
          type="text"
          value={videoURL}
          onChange={(e) => handleVideoChange(e.target.value)}
          placeholder="Enter YouTube unlisted video URL"
          style={styles.input}
        />
        {videoURL && (
          <iframe
            width="400"
            height="225"
            src={`https://www.youtube.com/embed/${extractVideoID(videoURL)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video Preview"
            style={styles.preview}
          />
        )}
      </div>

      <div style={styles.formGroup}>
        <label>Upload Assignment (PDF/DOC):</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleAssignmentChange} />
        {assignmentFile && <p>Selected: {assignmentFile.name}</p>}
      </div>

      <div style={styles.formGroup}>
        <label>Upload Custom Thumbnail:</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        {preview?.thumbnail && <img src={preview.thumbnail} alt="Thumbnail Preview" width="200" style={styles.preview} />}
      </div>

      <button onClick={handleUpload} style={styles.button}>Upload All</button>
    </div>
  );
};

// Helper function to extract video ID from YouTube URL
const extractVideoID = (url) => {
  const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : '';
};

const styles = {
  section: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
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
  preview: {
    marginTop: '10px',
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

export default FileUpload;
