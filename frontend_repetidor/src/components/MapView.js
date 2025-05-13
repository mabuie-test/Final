import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';


import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});


export default function MapView() {
const \[repeaters, setRepeaters] = useState(\[]);

useEffect(() => {
api.get('/repeaters')
.then(res => setRepeaters(res.data))
.catch(err => console.error('Erro ao buscar repetidores:', err));
}, \[]);

return (
\<MapContainer center={\[-25.96, 32.58]} zoom={6} style={{ height: '300px' }}> <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
{repeaters.map((r, idx) => (
\<Marker key={r.\_id || idx} position={\[r.latitude, r.longitude]}> <Popup> <strong>{r.deviceId}</strong><br />
Status: {r.status} </Popup> </Marker>
))} </MapContainer>
);
}
