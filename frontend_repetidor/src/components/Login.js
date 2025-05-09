import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setToken } from '../utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('/auth/login', { username, password });
    setToken(response.data.token);
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
