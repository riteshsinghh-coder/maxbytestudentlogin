import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <div>
      {!loggedInUser ? (
        <Login onLogin={setLoggedInUser} />
      ) : (
        <Dashboard user={loggedInUser} />
      )}
    </div>
  );
};

export default App;
