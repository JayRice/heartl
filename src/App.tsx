import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import App from './pages/App';
import { useAuth } from './hooks/useAuth';

const AppRouter: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/app" /> : <Welcome />} 
        />
        <Route 
          path="/app"
          element={<App /> }

            // element={user ? <App /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;