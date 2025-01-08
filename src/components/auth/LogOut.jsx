// Logout.js
import React from 'react';
import { useUser } from './UserContext';

function Logout() {
  const { dispatch } = useUser();

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
