import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';

const AuthPage = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(``);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(``);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      display: `flex`, 
      justifyContent: `center`, 
      alignItems: `center`, 
      minHeight: `60vh` 
    }}>
      <div className="goal-card" style={{ width: `100%`, maxWidth: `400px`, padding: `2rem` }}>
        <h2 style={{ marginBottom: `1.5rem`, textAlign: `center` }}>
          {isLogin ? `Вхід` : `Реєстрація`}
        </h2>
        <form onSubmit={handleSubmit} className="add-goal-form" style={{ background: `transparent`, border: `none`, padding: 0 }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: `1rem` }}
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: `1rem` }}
          />
          {error && <p style={{ color: `#ef4444`, fontSize: `0.8rem`, marginBottom: `1rem` }}>{error}</p>}
          <button type="submit" style={{ width: `100%` }}>
            {isLogin ? `Увійти` : `Зареєструватися`}
          </button>
        </form>
        <p style={{ marginTop: `1.5rem`, textAlign: `center`, fontSize: `0.9rem`, color: `var(--text-muted)` }}>
          {isLogin ? `Немає акаунту? ` : `Вже є акаунт? `}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: `var(--accent)`, cursor: `pointer`, fontWeight: `600` }}
          >
            {isLogin ? `Створити` : `Увійти`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
