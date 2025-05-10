import React, { useState } from 'react';
import api, { setToken } from '../services/api';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      const { token, role } = res.data;
      localStorage.setItem('token', token);
      setToken(token);
      onLogin(role);
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={login}>
      <input placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}
