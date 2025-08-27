// Usage example in a page component
// pages/dashboard.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute } from '../components/protectedRoute';

export default function Dashboard(): JSX.Element {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.firstName} {user?.lastName}!</p>
        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}