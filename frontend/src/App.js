import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { setToken } from './services/api';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setAuth(true);
    }
  }, []);

  return auth ? <DashboardPage /> : <LoginPage onLogin={() => setAuth(true)} />;
}

export default App;
