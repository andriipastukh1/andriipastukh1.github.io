import React from 'react';
import Progress from '../components/Progress';

const ProgressPage = () => {
  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Твій Прогрес</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Аналітика твоїх досягнень</p>
      </header>
      <Progress />
    </div>
  );
};

export default ProgressPage;
