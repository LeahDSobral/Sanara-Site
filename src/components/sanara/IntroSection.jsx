import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';
import DGrid from './DGrid';

const introStats = [
  { value: '6', label: 'ICU Specialties' },
  { value: '48', label: 'Distinct Scenarios' },
  { value: '16 kHz', label: 'Audio Sample Rate' },
  { value: '65', label: 'Script Lines per Case' },
  { value: '5-Stage', label: 'Automated Pipeline' },
];

export default function IntroSection() {
  return (
    <section
      id="intro"
      className="px-6 md:px-12 lg:px-32 py-24"
      style={{ borderTop: '1px solid #0d1b2e' }}
    >
      <SectionLabel>Introduction</SectionLabel>
      <SectionHeading>
        AI scribes work in quiet exam rooms. ICUs are not quiet.
      </SectionHeading>

      <div
        className="intro-cols"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '0.92rem', color: '#6a85b0', lineHeight: 1.7 }}
        >
          The project tackles a recognized gap in healthcare AI. Commercial speech-to-text systems
          like Nuance, Abridge, Ambience Healthcare, Suki, Nabla, and DeepScribe have proven highly
          effective in controlled outpatient settings. The intensive care unit presents a fundamentally
          different acoustic environment: multiple simultaneous speakers at variable distances from
          the microphone, overlapping commands and clinical reports, ventilator hum, cardiac monitor
          beeps, PA announcements, and unpredictable background noise. These conditions cause
          significant performance degradation in existing tools, leaving critical care settings
          largely without reliable AI documentation support.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ fontSize: '0.92rem', color: '#6a85b0', lineHeight: 1.7 }}
        >
          This project was commissioned by Sanara Healthcare and FuzionX to design and evaluate a
          system that optimizes AI-powered STT performance in acoustically hostile environments.
          The team built a fully automated five-stage synthetic data factory capable of generating
          high-fidelity ICU simulation audio, augmenting it to mimic smartphone recordings inside
          a busy ICU bay, and producing NeMo-format training manifests ready for Parakeet ASR
          fine-tuning. Performance was benchmarked using Word Error Rate, Character Error Rate,
          Word Accuracy, and Word Information metrics across six medical specialties.
        </motion.p>
      </div>

      <DGrid items={introStats} cols={5} />

      <style>{`
        @media (max-width: 900px) {
          .intro-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}