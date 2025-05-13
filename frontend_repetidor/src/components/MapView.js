// src/components/MapView.js

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';

// 1) Importar as imagens
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// 2) Ajustar o Default Icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize:     [25, 41],
  iconAnchor:   [12, 41],
  popupAnchor:  [1, -34],
  shadowSize:   [41, 41],
  shadowAnchor: [12, 41],
});

export default function MapView() {
  const [repeaters, setRepeaters] = useState([]);

  useEffect(() => {
    api.get('/repeaters')
      .then(res => setRepeaters(res.data))
      .catch(err => console.error('Erro ao buscar repetidores:', err));
  }, []);

  return (
    <MapContainer center={[-25.96, 32.58]} zoom={6} style={{ height: '300px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {repeaters.map((r) => (
        <Marker key={r._id} position={[r.latitude, r.longitude]}>
          <Popup>
            <strong>{r.deviceId}</strong><br />
            Status: {r.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
