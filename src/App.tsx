import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import App from './pages/App';
import { useAuth } from './hooks/useAuth';
import Onboarding from "./pages/Onboarding.tsx";


const AppRouter: React.FC = () => {
  const userPrefersDark = localStorage.getItem('theme') === 'dark';
  if (userPrefersDark) {
    document.documentElement.classList.add('dark');
  }
  const { user, loading } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(userPrefersDark);



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
        path="/app/onboarding"
        element={<Onboarding />}
        ></Route>
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