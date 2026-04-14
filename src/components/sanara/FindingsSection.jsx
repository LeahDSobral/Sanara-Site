import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';

const findings = [
  {
    num: '01',
    title: 'The pipeline successfully addresses the project brief',
    text: 'The five-stage factory delivers what the project description asked for: a framework that identifies approaches optimizing AI STT performance in acoustically hostile environments. By generating medically accurate scripts, synthesizing realistic multi-speaker audio, and applying physically grounded ICU noise augmentation, the team created a reproducible methodology for training and evaluating ASR in ICU conditions -- without requiring real protected patient recordings.',
  },
  {
    num: '02',
    title: 'NEURO and RESP demonstrate that the system works',
    text: 'Four of the six specialties achieve word accuracy above 75% on clean audio and above 70% on hard audio. NEURO\'s stability from clean (81.6%) to medium (81.7%) audio and RESP\'s resilience from clean (80.2%) to hard (77.3%) audio directly validate the augmentation training strategy: training on degraded audio improves robustness to degraded audio conditions.',
  },
  {
    num: '03',
    title: 'CER is the right metric for clinical deployment decisions',
    text: 'Character Error Rate is less punishing than WER for minor transcription differences and more sensitive than Word Accuracy to character-level errors in medication names and dosage values. NEURO\'s 7.5% CER makes it a viable candidate for real deployment. Specialties above 15% CER (TRAUMA, OB) require additional fine-tuning before clinical documentation use.',
  },
  {
    num: '04',
    title: 'OB and TRAUMA identify the next training priorities',
    text: 'OB\'s insertion-dominated error pattern and TRAUMA\'s across-the-board lower accuracy are actionable signals. Both specialties have been successfully benchmarked, and the synthetic data factory can generate additional targeted cases -- more OB insertion suppression training examples and more TRAUMA-specific vocabulary coverage -- without any new data collection effort.',
  },
  {
    num: '05',
    title: 'The pipeline is production-ready for further scaling',
    text: 'Every stage is deterministic, resumable, and batch-capable. The GO/NO-GO manifest check (PASS at 15+ training hours) ensures quality control before any fine-tuning run begins. The modular five-stage design means any stage can be independently iterated -- for example, swapping Magpie-TTS for a different voice model in Stage 3 or adding additional noise types to Stage 4 -- without redesigning the rest of the pipeline.',
  },
];

export default function FindingsSection() {
  return (
    <section
      id="findings"
      className="px-6 md:px-12 lg:px-32 py-24"
      style={{ borderTop: '1px solid #0d1b2e' }}
    >
      <SectionLabel>Findings</SectionLabel>
      <SectionHeading>
        What the data tells us about the system's readiness
      </SectionHeading>

      <div style={{ display: 'grid', gap: '1px', background: '#0d1b2e' }}>
        {findings.map((f, i) => (
          <motion.div
            key={f.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="finding-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '1.5rem',
              background: '#080e1a',
              padding: '2rem',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                fontSize: '3.5rem',
                fontWeight: 400,
                color: '#1e88e5',
                lineHeight: 1,
                fontFamily: "'Courier New', monospace",
              }}
            >
              {f.num}
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#ccd6f6', fontWeight: 700, marginBottom: '0.7rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6a85b0', lineHeight: 1.7 }}>
                {f.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .finding-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}