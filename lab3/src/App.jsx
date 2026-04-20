import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import MyGoals from './pages/MyGoals';
import ProgressPage from './pages/ProgressPage';
import CommunityPage from './pages/CommunityPage';
import Footer from './components/Footer';
import './index.css';

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="app-container">
        <nav>
          <div className="logo">GoalStream</div>
          <div className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              Цілі
            </NavLink>
            <NavLink to="/progress" className={({ isActive }) => isActive ? 'active' : ''}>
              Прогрес
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => isActive ? 'active' : ''}>
              Спільнота
            </NavLink>
            <button 
              className="theme-toggle" 
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              <span>{isDark ? 'Світла' : 'Темна'}</span>
            </button>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<MyGoals />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
