import React from 'react';
import { motion } from 'framer-motion';
import Takeaway from './Takeaway';

export default function PipelineStage({ number, label, title, description, takeaway, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '4rem' }}
    >
      <p
        style={{
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: '#4fc3f7',
          marginBottom: '0.8rem',
        }}
      >
        Stage {number}&nbsp;&nbsp;{label}
      </p>

      <h3
        style={{
          fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 400,
          color: '#ccd6f6',
          marginBottom: '1.5rem',
        }}
      >
        {title}
      </h3>

      <div
        style={{
          background: '#080e1a',
          border: '1px solid #0d1b2e',
          padding: '2rem',
          marginBottom: '1rem',
        }}
      >
        <p style={{ fontSize: '0.88rem', color: '#6a85b0', lineHeight: 1.75 }}>
          {description}
        </p>
        {children}
      </div>

      <Takeaway>{takeaway}</Takeaway>
    </motion.div>
  );
}