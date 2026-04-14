import React from 'react';

export default function Takeaway({ children }) {
  return (
    <div
      style={{
        borderLeft: '2px solid #1565c0',
        paddingLeft: '1.5rem',
        marginTop: '2rem',
      }}
    >
      <p
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#ccd6f6',
          marginBottom: '0.5rem',
          letterSpacing: '0.12em',
        }}
      >
        TAKEAWAY
      </p>
      <p style={{ fontSize: '0.92rem', color: '#6a85b0', lineHeight: 1.7 }}>
        {children}
      </p>
    </div>
  );
}