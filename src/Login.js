import React, { useState, useEffect } from 'react';
import students from './data/students.js';
import teachers from './data/users.js';

const Login = ({ onLogin }) => {
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if there's any saved user in localStorage on page load
    const savedUid = localStorage.getItem('uid');
    const savedPassword = localStorage.getItem('password');
    
    if (savedUid && savedPassword) {
      // Attempt to auto-login with saved credentials
      const user =
        students.find(u => u.uid.toLowerCase() === savedUid.toLowerCase() && u.password === savedPassword) ||
        teachers.find(t => t.uid.toLowerCase() === savedUid.toLowerCase() && t.password === savedPassword);
  
      if (user) {
        onLogin(user); // If user found, log in automatically
      }
    }
  }, [onLogin]);

  const handleLogin = () => {
    const enteredUid = uid.trim().toLowerCase(); // normalize user input
    const user =
      students.find(u => u.uid.toLowerCase() === enteredUid && u.password === password) ||
      teachers.find(t => t.uid.toLowerCase() === enteredUid && t.password === password);

    if (user) {
      // Store UID and Password in localStorage on successful login
      localStorage.setItem('uid', enteredUid);
      localStorage.setItem('password', password);
      
      onLogin(user);
    } else {
      setError('Invalid UID or Password');
    }
  };

  

  const styles = {
    container: {
      backgroundColor: '#f8f8f8', // White with a little grey
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: 'white',
      color: '#7F00FF', // Violet
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      width: '320px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '16px',
    },
    button: {
      backgroundColor: '#7F00FF',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#5e00c0',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    title: {
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Enter UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handleLogin}
          style={styles.button}
          onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
