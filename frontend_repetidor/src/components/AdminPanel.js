import React, { useEffect, useState } from 'react';
import api from '../services/api';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  const handleCreate = async () => {
    await api.post('/users', newUser);
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Usuários</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.username} ({u.role})</li>
        ))}
      </ul>
      <h3>Criar Usuário</h3>
      <input
        type="text"
        placeholder="Usuário"
        value={newUser.username}
        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
      /><br/>
      <input
        type="password"
        placeholder="Senha"
        value={newUser.password}
        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
      /><br/>
      <select
        value={newUser.role}
        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select><br/>
      <button onClick={handleCreate}>Criar</button>
    </div>
  );
}

export default AdminPanel;
