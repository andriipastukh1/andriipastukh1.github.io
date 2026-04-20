import React, { useState } from 'react';
import CommunityComments from '../components/CommunityComments';

const CommunityPage = () => {
  const [comments] = useState([
    { id: 1, author: 'Олександр К.', text: 'Сьогодні закрив свою третю велику ціль! Система відстеження прогресу реально допомагає тримати темп.', date: '1 год. тому', likes: 24, replies: 3 },
    { id: 2, author: 'Марина С.', text: 'Хтось має поради, як краще планувати навчання паралельно з роботою? Мої цілі часто відкладаються.', date: '3 год. тому', likes: 12, replies: 8 },
    { id: 3, author: 'Ігор М.', text: 'Прочитав книгу за порадою з цієї платформи. Дизайн інтерфейсу надихає працювати ще більше!', date: '5 год. тому', likes: 45, replies: 2 }
  ]);

  return (
    <div>
      <header className="page-header">
        <h1 className="page-title">Спільнота</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Надихайся успіхами інших та ділися власними</p>
      </header>
      <CommunityComments comments={comments} />
    </div>
  );
};

export default CommunityPage;
