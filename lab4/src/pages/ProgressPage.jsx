import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { TrendingUp, Award, Zap } from 'lucide-react';

const ProgressPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    percentage: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!auth.currentUser) return;
      
      const q = query(
        collection(db, `goals`),
        where(`userId`, `==`, auth.currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const goals = querySnapshot.docs.map(doc => doc.data());
      
      const total = goals.length;
      const completed = goals.filter(g => g.status === `завершені`).length;
      const active = goals.filter(g => g.status === `активні`).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      setStats({ total, completed, active, percentage });
    };

    fetchStats();
  }, []);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Твій Прогрес</h1>
        <p style={{ color: `var(--text-muted)` }}>Аналітика твоїх досягнень</p>
      </header>

      <div style={{ display: `grid`, gap: `2rem` }}>
        <div style={{ display: `grid`, gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: `1rem` }}>
          <div className="goal-card" style={{ padding: `1rem` }}>
            <Award size={20} color="var(--accent)" />
            <h4 style={{ fontSize: `0.9rem`, marginTop: `0.5rem` }}>{stats.completed} цілей виконано</h4>
            <span style={{ fontSize: `0.75rem`, color: `var(--text-muted)` }}>Ваш загальний результат</span>
          </div>
          <div className="goal-card" style={{ padding: `1rem` }}>
            <Zap size={20} color="var(--status-postponed-text)" />
            <h4 style={{ fontSize: `0.9rem`, marginTop: `0.5rem` }}>{stats.active} активних цілей</h4>
            <span style={{ fontSize: `0.75rem`, color: `var(--text-muted)` }}>У процесі виконання</span>
          </div>
          <div className="goal-card" style={{ padding: `1rem` }}>
            <TrendingUp size={20} color="var(--status-active-text)" />
            <h4 style={{ fontSize: `0.9rem`, marginTop: `0.5rem` }}>{stats.total} всього цілей</h4>
            <span style={{ fontSize: `0.75rem`, color: `var(--text-muted)` }}>Заплановано в системі</span>
          </div>
        </div>
        
        <div className="goal-card" style={{ textAlign: `center`, padding: `2rem` }}>
          <div className="progress-circle-container">
            <span style={{ fontSize: `2rem`, fontWeight: `700` }}>{stats.percentage}%</span>
            <span style={{ fontSize: `0.8rem`, color: `var(--text-muted)` }}>Загальний успіх</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
