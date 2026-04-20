import React, { useState, useEffect } from 'react';
import GoalCard from '../components/GoalCard';

const MyGoals = () => {
  const [filter, setFilter] = useState('всі');
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [targetDate, setTargetDate] = useState('');
  
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goalstream_data');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, title: 'Вивчити React Hooks', description: 'Опанувати useState, useEffect та власні хуки для створення гнучких інтерфейсів.', status: 'активні', progress: 65, deadline: '2024-04-25' },
      { id: 2, title: 'Завершити Lab 3', description: 'Реалізувати SPA на React з використанням Router та стильного дизайну.', status: 'завершені', progress: 100, deadline: '2024-04-19' },
      { id: 3, title: 'Прочитати "Refactoring UI"', description: 'Вивчити основи дизайну для розробників.', status: 'активні', progress: 30, deadline: '2024-05-01' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('goalstream_data', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      status: 'активні',
      progress: 0,
      deadline: targetDate
    };

    setGoals([goal, ...goals]);
    setNewGoal({ title: '', description: '' });
    setTargetDate('');
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const isCompleted = g.status === 'завершені';
        return {
          ...g,
          status: isCompleted ? 'активні' : 'завершені',
          progress: isCompleted ? 0 : 100
        };
      }
      return g;
    }));
  };

  const filteredGoals = filter === 'всі' 
    ? goals 
    : goals.filter(g => g.status === filter);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Цілі</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Керуйте своїми планами та досягненнями</p>
      </header>

      <form className="add-goal-form" onSubmit={addGoal}>
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Назва цілі..." 
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            style={{ flex: 1 }}
          />
          <input 
            type="date" 
            className="date-input"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Короткий опис..." 
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            style={{ flex: 1 }}
          />
          <button type="submit">Додати</button>
        </div>
      </form>

      <div className="filter-bar">
        {['всі', 'активні', 'завершені', 'відкладені'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn-filter ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="goals-grid">
        {filteredGoals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onDelete={deleteGoal}
            onToggle={toggleGoal}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGoals;
