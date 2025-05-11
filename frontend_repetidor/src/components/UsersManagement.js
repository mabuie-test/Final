// src/components/UsersManagement.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);

  // Carrega a lista de usuários
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      alert('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  // Cria um novo usuário
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/users', form);
      setForm({ username: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  // Deleta um usuário
  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente deletar este usuário?')) return;
    try {
      setLoading(true);
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao deletar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestão de Usuários</h2>

      {/* Formulário de criação */}
      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input
          placeholder="Usuário"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />{' '}
        <input
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />{' '}
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>{' '}
        <button type="submit" disabled={loading}>
          {loading ? 'Aguarde...' : 'Criar Usuário'}
        </button>
      </form>

      {/* Lista de usuários */}
      {loading && users.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(u._id)}
                    disabled={loading}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
