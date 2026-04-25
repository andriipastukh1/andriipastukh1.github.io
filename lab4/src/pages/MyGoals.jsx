import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import { Calendar, BarChart3, Trash2 } from 'lucide-react';

const MyGoals = () => {
  const [filter, setFilter] = useState(`всі`);
  const [newGoal, setNewGoal] = useState({ title: ``, description: `` });
  const [targetDate, setTargetDate] = useState(``);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, `goals`), 
      where(`userId`, `==`, auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const goalsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGoals(goalsData);
    });
    return () => unsubscribe();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title.trim() || !auth.currentUser) return;

    await addDoc(collection(db, `goals`), {
      title: newGoal.title,
      description: newGoal.description,
      deadline: targetDate,
      status: `активні`,
      progress: 0,
      userId: auth.currentUser.uid
    });

    setNewGoal({ title: ``, description: `` });
    setTargetDate(``);
  };

  const deleteGoal = async (id) => {
    await deleteDoc(doc(db, `goals`, id));
  };

  const toggleGoal = async (id) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    const isCompleted = goal.status === `завершені`;
    await updateDoc(doc(db, `goals`, id), {
      status: isCompleted ? `активні` : `завершені`,
      progress: isCompleted ? 0 : 100
    });
  };

  const filteredGoals = filter === `всі` 
    ? goals 
    : goals.filter(g => g.status === filter);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Цілі</h1>
        <p style={{ color: `var(--text-muted)`, fontSize: `0.9rem` }}>Керуйте своїми планами та досягненнями</p>
      </header>

      {filter === `всі` && (
        <form className="add-goal-form" onSubmit={addGoal}>
          <div style={{ display: `flex`, gap: `0.75rem`, width: `100%` }}>
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
          <div style={{ display: `flex`, gap: `0.75rem`, width: `100%` }}>
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
      )}
    
      <div className="filter-bar">
        {[`всі`, `активні`, `завершені`, `відкладені`].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn-filter ${filter === f ? `active` : ``}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="goals-grid">
        {filteredGoals.map((goal) => (
          <div className="goal-card" key={goal.id}>
            <div style={{ display: `flex`, justifyContent: `space-between`, alignItems: `center` }}>
              <div style={{ display: `flex`, alignItems: `center`, gap: `0.75rem` }}>
                <input 
                  type="checkbox" 
                  className="goal-checkbox"
                  checked={goal.status === `завершені`}
                  onChange={() => toggleGoal(goal.id)}
                />
                <h3 style={{ 
                  fontSize: `1rem`, 
                  fontWeight: `600`,
                  textDecoration: goal.status === `завершені` ? `line-through` : `none`,
                  color: goal.status === `завершені` ? `var(--text-muted)` : `var(--text-main)`
                }}>
                  {goal.title}
                </h3>
              </div>
              <button 
                onClick={() => deleteGoal(goal.id)}
                style={{ background: `transparent`, border: `none`, color: `var(--text-muted)`, cursor: `pointer` }}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <p style={{ color: `var(--text-muted)`, fontSize: `0.85rem`, marginLeft: `2rem` }}>
              {goal.description}
            </p>

            <div style={{ display: `flex`, gap: `1rem`, color: `var(--text-muted)`, fontSize: `0.75rem`, marginLeft: `2rem` }}>
              <div style={{ display: `flex`, alignItems: `center`, gap: `0.3rem` }}>
                <Calendar size={12} />
                <span>{goal.deadline ? `До: ${goal.deadline}` : `Без дедлайну`}</span>
              </div>
              <div style={{ display: `flex`, alignItems: `center`, gap: `0.3rem` }}>
                <BarChart3 size={12} />
                <span>{goal.progress}%</span>
                <span className={`status-badge status-${goal.status === `завершені` ? `completed` : goal.status === `відкладені` ? `postponed` : `active`}`}>
                  {goal.status}
                </span>
              </div>
            </div>

            <div className="progress-container" style={{ marginLeft: `2rem` }}>
              <div className="progress-fill" style={{ width: `${goal.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGoals;
