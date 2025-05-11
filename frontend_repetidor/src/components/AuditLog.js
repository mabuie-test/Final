// src/components/AuditLog.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AuditLog() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    api.get('/audit')
      .then(res => setEntries(res.data))
      .catch(err => {
        console.error(err);
        alert('Não foi possível carregar o histórico');
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Histórico de Atividades</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Ação</th>
            <th>Executado por</th>
            <th>Alvo</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{new Date(e.timestamp).toLocaleString()}</td>
              <td>{e.action}</td>
              <td>{e.performedBy}</td>
              <td>{e.targetUser || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
