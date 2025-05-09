import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/logs/status').then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/map">Ver Mapa</Link> | <Link to="/admin">Admin</Link>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            {log._id}: {log.status} (Tensão: {log.tensao}V) - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
