import jwtDecode from 'jwt-decode';

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getUserRole() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.role;
}

export function logout() {
  localStorage.removeItem('token');
}
