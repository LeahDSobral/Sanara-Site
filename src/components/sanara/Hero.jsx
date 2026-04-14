import React from 'react';
import { motion } from 'framer-motion';

const heroStats = [
  { value: '81.7%', label: 'Peak Word Accuracy (NEURO)' },
  { value: '7.6%', label: 'Lowest CER (NEURO clean)' },
  { value: '2.9 pts', label: 'RESP accuracy drop clean→hard' },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-32 pt-20">
      <div className="max-w-[1100px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            color: '#4fc3f7',
            marginBottom: '2rem',
          }}
        >
          MKTG 6606&nbsp;&nbsp;Data Analytics Practicum&nbsp;&nbsp;Northeastern University D'Amore-McKim School of Business
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ccd6f6',
            marginBottom: '2rem',
          }}
        >
          Can AI hear through the{' '}
          <em style={{ color: '#4fc3f7', fontStyle: 'italic' }}>noise</em>?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: '0.92rem',
            color: '#6a85b0',
            maxWidth: '740px',
            lineHeight: 1.7,
          }}
        >
          A five-stage synthetic data factory that generates medically accurate ICU dialogue,
          synthesizes multi-speaker audio, simulates acoustically hostile environments, and
          fine-tunes Parakeet ASR for real-world clinical deployment -- tested across six medical
          specialties and three audio quality tiers.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16"
        style={{ borderTop: '1px solid #0d1b2e', paddingTop: '2.5rem' }}
      >
        <div className="grid grid-cols-3 gap-8 max-w-[600px]">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 400, color: '#64b5f6' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6a85b0', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}