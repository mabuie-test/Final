import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../services/api';

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function MapView() {
  const [reps, setReps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/logs')
      .then(res => {
        setReps(res.data.filter(r => r.latitude && r.longitude));
        setError('');
      })
      .catch(err => {
        console.error('Erro ao buscar dados do mapa:', err);
        setError('Não foi possível carregar o mapa.');
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer center={[-25.96, 32.58]} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {reps.map((r, idx) => (
          <Marker key={idx} position={[r.latitude, r.longitude]}>
            <Popup>
              <strong>{r.deviceId}</strong><br />
              Status: {r.status}<br />
              {r.tensao !== undefined && <>Tensão: {r.tensao}V<br /></>}
              {new Date(r.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
