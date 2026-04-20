import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '4rem',
      padding: '2rem 1.5rem',
      borderTop: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        fontWeight: '500'
      }}>
        © 2026 GoalStream — Платформа твоїх досягнень
      </p>
    </footer>
  );
};

export default Footer;
