import React from 'react';

export default function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.3em',
        color: '#4fc3f7',
        marginBottom: '1.2rem',
      }}
    >
      {children}
    </p>
  );
}