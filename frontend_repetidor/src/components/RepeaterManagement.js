 // src/components/RepeaterManagement.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function RepeaterManagement() {
  const [reps, setReps] = useState([]);
  const [form, setForm] = useState({ deviceId:'', status:'ativo', latitude:'', longitude:'' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetch(); }, []);
  const fetch = async () => {
    const res = await api.get('/repeaters');
    setReps(res.data);
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/repeaters', form);
      setForm({ deviceId:'', status:'ativo', latitude:'', longitude:'' });
      fetch();
    } catch(err) { alert(err.response?.data?.message||'Erro'); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (id) => {
    const newStatus = prompt('Novo status (ativo/inativo):');
    if (!newStatus) return;
    await api.put(`/repeaters/${id}`, { status:newStatus });
    fetch();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja remover este repetidor?')) return;
    await api.delete(`/repeaters/${id}`);
    fetch();
  };

  return (
    <div className="app-container">
      <h2>Gestão de Repetidores</h2>
      <form onSubmit={handleCreate}>
        <input
          placeholder="ID do dispositivo"
          value={form.deviceId}
          onChange={e=>setForm({...form,deviceId:e.target.value})} required
        />
        <select
          value={form.status}
          onChange={e=>setForm({...form,status:e.target.value})}
        >
          <option value="ativo">ativo</option>
          <option value="inativo">inativo</option>
        </select>
        <input
          placeholder="Latitude"
          value={form.latitude}
          onChange={e=>setForm({...form,latitude:e.target.value})} required
        />
        <input
          placeholder="Longitude"
          value={form.longitude}
          onChange={e=>setForm({...form,longitude:e.target.value})} required
        />
        <button type="submit" disabled={loading}>
          {loading?'…':'Adicionar'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Status</th><th>Lat</th><th>Lng</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reps.map(r=>(
            <tr key={r._id}>
              <td>{r.deviceId}</td>
              <td>{r.status}</td>
              <td>{r.latitude}</td>
              <td>{r.longitude}</td>
              <td>
              
                <button onClick={()=>handleDelete(r._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
