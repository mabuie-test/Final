import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import AdminPanel from './components/AdminPanel';
import { isAuthenticated, getUserRole } from './util/auth';

function PrivateRoute({ children, roles }) {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  const role = getUserRole();
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute roles={['user', 'admin']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/map"
        element={
          <PrivateRoute roles={['user', 'admin']}>
            <MapView />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={['admin']}>
            <AdminPanel />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
