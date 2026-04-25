import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import MyGoals from './pages/MyGoals';
import ProgressPage from './pages/ProgressPage';
import AuthPage from './pages/AuthPage';
import './index.css';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add(`dark-theme`);
    } else {
      document.body.classList.remove(`dark-theme`);
    }
  }, [isDark]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: `flex`, height: `100vh`, alignItems: `center`, justifyContent: `center`, fontSize: `1.2rem` }}>
        Завантаження...
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        {user && (
          <nav>
            <div className="logo">GoalStream</div>
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? `active` : ``}>
                Цілі
              </NavLink>
              <NavLink to="/progress" className={({ isActive }) => isActive ? `active` : ``}>
                Прогрес
              </NavLink>
              <button 
                className="theme-toggle" 
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDark ? `Світла` : `Темна`}</span>
              </button>
              <button 
                className="theme-toggle" 
                onClick={() => signOut(auth)}
                style={{ marginLeft: `0.5rem` }}
              >
                <LogOut size={16} />
                <span>Вийти</span>
              </button>
            </div>
          </nav>
        )}

        <main>
          <Routes>
            {!user ? (
              <Route path="*" element={<AuthPage />} />
            ) : (
              <>
                <Route path="/" element={<MyGoals />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
