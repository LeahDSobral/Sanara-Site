import React from 'react';

export default function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)',
        fontWeight: 400,
        color: '#ccd6f6',
        lineHeight: 1.2,
        marginBottom: '2rem',
      }}
    >
      {children}
    </h2>
  );
}