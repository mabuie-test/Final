// src/App.js
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import LoginPage       from './pages/LoginPage';
import DashboardPage   from './pages/DashboardPage';
import RepeaterList    from './components/RepeaterList';
import MapView         from './components/MapView';
import UsersManagement from './components/UsersManagement'; // novo

import { setToken } from './services/api';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      {auth && (
        <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
          <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/list" style={{ marginRight: 10 }}>Lista</Link>
          <Link to="/map" style={{ marginRight: 10 }}>Mapa</Link>
          <Link to="/users" style={{ marginRight: 10 }}>Usuários</Link> {/* novo */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setAuth(false);
            }}
          >Logout</button>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setAuth(true)} />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
        <Route path="/list"      element={<PrivateRoute><RepeaterList/></PrivateRoute>} />
        <Route path="/map"       element={<PrivateRoute><MapView/></PrivateRoute>} />
        <Route path="/users"     element={<PrivateRoute><UsersManagement/></PrivateRoute>} /> {/* novo */}
        <Route path="*"          element={<Navigate to={auth ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
