import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import StudentDashboard from './StudentDashboard';

import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const renderDashboard = () => {
    if (!loggedInUser) return <Login onLogin={setLoggedInUser} />;

    switch (loggedInUser.role) {
      case 'admin':
        return <AdminDashboard user={loggedInUser} />;
      case 'student':
        return <StudentDashboard user={loggedInUser} />;
     
      default:
        return <div>Unknown role</div>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default App;
