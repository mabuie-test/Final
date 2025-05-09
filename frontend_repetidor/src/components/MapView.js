import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

function MapView() {
  const [reps, setReps] = useState([]);

  useEffect(() => {
    api.get('/logs/status').then(res => setReps(res.data));
  }, []);

  return (
    <MapContainer center={[-25.96, 32.57]} zoom={7} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {reps.map(r => (
        <Marker key={r._id} position={[r.latitude, r.longitude]}>
          <Popup>
            <strong>{r._id}</strong><br />
            Status: {r.status}<br />
            Tensão: {r.tensao}V
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
