// src/App.js
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import LoginPage           from './pages/LoginPage';
import DashboardPage       from './pages/DashboardPage';
import RepeaterList        from './components/RepeaterList';
import MapView             from './components/MapView';
import UsersManagement     from './components/UsersManagement';
import AuditLog            from './components/AuditLog';
import RepeaterManagement  from './components/RepeaterManagement'; // 📌 import do painel de repetidores

import { setToken } from './services/api';

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const r     = localStorage.getItem('role');
    if (token && r) {
      setToken(token);
      setAuth(true);
      setRole(r);
    }
  }, []);

  const handleLogin = (loginRole) => {
    setAuth(true);
    setRole(loginRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth(false);
    setRole(null);
  };

  return (
    <div className="app-container">
      <Router>
        {auth && (
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/list">Lista</Link>
            <Link to="/map">Mapa</Link>
            {role === 'admin' && (
              <>
                <Link to="/repeaters">Gerenciar Repetidores</Link>
                <Link to="/users">Usuários</Link>
                <Link to="/audit">Histórico</Link>
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}

        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/list"
            element={
              <PrivateRoute>
                <RepeaterList />
              </PrivateRoute>
            }
          />

          <Route
            path="/map"
            element={
              <PrivateRoute>
                <MapView />
              </PrivateRoute>
            }
          />

          <Route
            path="/repeaters"
            element={
              <PrivateRoute roles={['admin']}>
                <RepeaterManagement />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute roles={['admin']}>
                <UsersManagement />
              </PrivateRoute>
            }
          />

          <Route
            path="/audit"
            element={
              <PrivateRoute roles={['admin']}>
                <AuditLog />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={auth ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
