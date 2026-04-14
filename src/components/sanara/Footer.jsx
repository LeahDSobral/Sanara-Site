import React from 'react';

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 lg:px-32 py-8"
      style={{
        borderTop: '1px solid #0d1b2e',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <p style={{ fontSize: '0.72rem', color: '#6a85b0', letterSpacing: '0.06em' }}>
        Sanara Health&nbsp;&nbsp;ICU STT Project&nbsp;&nbsp;MKTG 6606&nbsp;&nbsp;Northeastern University&nbsp;&nbsp;2025-2026
      </p>
      <p style={{ fontSize: '0.72rem', color: '#6a85b0', letterSpacing: '0.06em' }}>
        D'Amore-McKim School of Business
      </p>
    </footer>
  );
}