import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function RepeaterList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/logs').then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Repetidores</h2>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.deviceId}</strong> - {log.status} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
