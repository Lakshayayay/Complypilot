import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './components/Landing';
import { Login } from './components/Login';
import { ComplyNavigator } from './components/ComplyNavigator';
import { PerformancePilot } from './components/PerformancePilot';
import MarketInsights from './components/MarketInsights';
import { ComplyBot } from './components/ComplyBot';
import { SubscriptionModal } from './components/SubscriptionModal';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Wrapper component to use navigate hook
function MarketInsightsWrapper() {
  const navigate = useNavigate();
  return <MarketInsights onNavigateToCompliance={() => navigate('/comply')} />;
}

export default function App() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('complypilot_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const handleLogin = (email: string, name: string) => {
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('complypilot_current_user', JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('complypilot_current_user');
  };
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            {user && <Navbar user={user} onLogout={handleLogout} />}
            <Routes>
              <Route 
                path="/login" 
                element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/" 
                element={user ? <Landing /> : <Navigate to="/login" replace />} 
              />
              <Route 
                path="/comply" 
                element={user ? <ComplyNavigator /> : <Navigate to="/login" replace />} 
              />
              <Route 
                path="/performance" 
                element={user ? <PerformancePilot /> : <Navigate to="/login" replace />} 
              />
              <Route 
                path="/market-insights" 
                element={user ? <MarketInsightsWrapper /> : <Navigate to="/login" replace />} 
              />
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
            </Routes>
            {user && <ComplyBot />}
            {user && <SubscriptionModal />}
            <Toaster />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
