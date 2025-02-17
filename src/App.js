import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function AppContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app">
      {/* Only show nav bar if user is logged in */}
      {user && (
        <nav className="nav-bar">
          <span className="user-greeting">Welcome, {user.forename}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      )}

      <Routes>
        {/* Protected route */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        {/* Public routes - only accessible when logged out */}
        <Route path="/login" element={
          !user ? <LoginForm /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !user ? <RegisterForm /> : <Navigate to="/" />
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
