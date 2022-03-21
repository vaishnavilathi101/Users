import Table from './Table.js';
import UserDetails from './UserDetails.js';

import React, { useEffect, useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json').then((resp) => resp.json()).then((users) => setUsers(users))
  }, [])
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Table
          users={users}
        />} />
        <Route exact path="/:user_id" element={<UserDetails users={users} />} />
      </Routes>


    </div>
  );
}

export default App;
