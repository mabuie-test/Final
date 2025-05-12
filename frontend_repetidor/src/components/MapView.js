import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
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
      {repeaters.map((r, idx) => (
        <Marker key={r._id || idx} position={[r.latitude, r.longitude]}>
          <Popup>
            <strong>{r.deviceId}</strong><br />
            Status: {r.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
