import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function RepeaterList() {
  const [repeaters, setRepeaters] = useState([]);

  useEffect(() => {
    api.get('/repeaters')
      .then(res => setRepeaters(res.data))
      .catch(err => console.error('Erro ao buscar repetidores:', err));
  }, []);

  return (
    <div>
      <h2>Repetidores Cadastrados</h2>
      {repeaters.length === 0 ? (
        <p>Nenhum repetidor cadastrado.</p>
      ) : (
        <ul>
          {repeaters.map((r, idx) => (
            <li key={r._id || idx}>
              <strong>{r.deviceId}</strong> — {r.status} —{' '}
              {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
