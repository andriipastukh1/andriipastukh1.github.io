import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const CommunityComments = ({ comments }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="avatar">
            {comment.author[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{comment.author}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{comment.date}</span>
            </div>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
              {comment.text}
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                <Heart size={14} />
                <span style={{ fontSize: '0.8rem' }}>{comment.likes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                <MessageSquare size={14} />
                <span style={{ fontSize: '0.8rem' }}>{comment.replies}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityComments;
