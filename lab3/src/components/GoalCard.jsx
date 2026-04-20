import React from 'react';
import { Calendar, BarChart3, Trash2 } from 'lucide-react';

const GoalCard = ({ goal, onDelete, onToggle }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'активні': return 'status-active';
      case 'завершені': return 'status-completed';
      case 'відкладені': return 'status-postponed';
      default: return '';
    }
  };

  return (
    <div className="goal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input 
            type="checkbox" 
            className="goal-checkbox"
            checked={goal.status === 'завершені'}
            onChange={() => onToggle(goal.id)}
          />
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600',
            textDecoration: goal.status === 'завершені' ? 'line-through' : 'none',
            color: goal.status === 'завершені' ? 'var(--text-muted)' : 'var(--text-main)'
          }}>
            {goal.title}
          </h3>
        </div>
        <button 
          onClick={() => onDelete(goal.id)}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-muted)', 
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <p style={{ 
        color: 'var(--text-muted)', 
        fontSize: '0.85rem', 
        lineHeight: '1.5',
        marginLeft: '2rem'
      }}>
        {goal.description}
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        color: 'var(--text-muted)', 
        fontSize: '0.75rem',
        marginLeft: '2rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Calendar size={12} />
          <span>{goal.deadline ? `До: ${goal.deadline}` : 'Без дедлайну'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <BarChart3 size={12} />
          <span>{goal.progress}%</span>
          <span className={`status-badge ${getStatusClass(goal.status)}`} style={{ marginLeft: '0.5rem' }}>
            {goal.status}
          </span>
        </div>
      </div>

      <div className="progress-container" style={{ marginLeft: '2rem' }}>
        <div 
          className="progress-fill" 
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalCard;
