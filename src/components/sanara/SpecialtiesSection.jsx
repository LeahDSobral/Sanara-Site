import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';
import { wordAccuracy, werData, cerData, wipData } from './chartData';

const specialties = [
  {
    code: 'NEURO',
    title: 'Neurocritical Care',
    wa:  { clean: 81.65, med: 81.73, hard: 73.73 },
    wer: { clean: 20.29, med: 20.78, hard: 29.67 },
    cer: { clean: 7.55,  med: 7.82,  hard: 15.37 },
    wip: { clean: 68.27, med: 67.51, hard: 55.71 },
    badge: 'BEST OVERALL',
    badgeColor: '#1D9E75',
    note: 'Virtually zero degradation from clean to medium (WA: 81.65 → 81.73, WER: 20.29 → 20.78). Best CER of any specialty at 7.55% on clean audio. Neurocritical vocabulary (GCS, ICP, RASS, seizure medications) appears well-represented in baseline training data.',
  },
  {
    code: 'RESP',
    title: 'Respiratory ICU',
    wa:  { clean: 80.21, med: 79.68, hard: 77.34 },
    wer: { clean: 25.53, med: 25.53, hard: 29.47 },
    cer: { clean: 12.85, med: 13.53, hard: 16.18 },
    wip: { clean: 62.74, med: 62.43, hard: 57.73 },
    badge: 'MOST ROBUST',
    badgeColor: '#3266ad',
    note: 'Identical WER clean → medium (25.53%). Word accuracy drops only 2.87 points clean to hard. This is the strongest demonstration of the augmentation training strategy: training on degraded audio builds real acoustic robustness.',
  },
  {
    code: 'CARDIAC',
    title: 'Cardiac ICU',
    wa:  { clean: 76.03, med: 76.35, hard: 72.38 },
    wer: { clean: 27.62, med: 27.78, hard: 33.02 },
    cer: { clean: 11.77, med: 12.02, hard: 14.93 },
    wip: { clean: 60.10, med: 59.23, hard: 53.41 },
    badge: null,
    badgeColor: null,
    note: 'Consistent across clean and medium tiers. Moderate hard-audio degradation. CER of 11.77% on clean audio reflects solid character-level accuracy for cardiac terminology (STEMI, pressors, cardiac output). Mid-tier stable performer.',
  },
  {
    code: 'OB',
    title: 'Maternal and Obstetric ICU',
    wa:  { clean: 79.28, med: 76.90, hard: 73.27 },
    wer: { clean: 45.75, med: 49.04, hard: 57.53 },
    cer: { clean: 34.09, med: 35.39, hard: 39.00 },
    wip: { clean: 51.77, med: 48.35, hard: 42.25 },
    badge: 'HIGH INSERTION RATE',
    badgeColor: '#D85A30',
    note: '54.70% of all OB errors on clean audio are insertions (221 insertions vs 32 deletions). WA of 79.28% on clean confirms the model captures correct words — it also adds many extra ones. This hallucination pattern is a targeted fine-tuning problem, not a general model failure.',
  },
  {
    code: 'TRAUMA',
    title: 'Trauma and Surgical ICU',
    wa:  { clean: 70.50, med: 72.54, hard: 68.47 },
    wer: { clean: 34.89, med: 33.93, hard: 41.01 },
    cer: { clean: 15.89, med: 15.18, hard: 20.31 },
    wip: { clean: 52.68, med: 52.62, hard: 45.04 },
    badge: 'NEEDS FINE-TUNING',
    badgeColor: '#e67e22',
    note: 'Lowest clean WA of the primary specialties (70.50%). Trauma vocabulary (damage control resuscitation, FAST exam, MTP) is likely underrepresented in baseline training. Strongest candidate for targeted additional fine-tuning data.',
  },
  {
    code: 'HALO',
    title: 'High-Acuity Low-Frequency Events',
    wa:  { clean: 80.77, med: 7.94,  hard: 7.82  },
    wer: { clean: 24.94, med: 92.56, hard: 92.56 },
    cer: { clean: 12.58, med: 69.86, hard: 69.96 },
    wip: { clean: 65.64, med: 0.79,  hard: 0.74  },
    badge: 'ANOMALY DETECTED',
    badgeColor: '#9b59b6',
    note: 'Clean audio results are competitive (WA 80.77%, WER 24.94%, CER 12.58%). Medium and hard audio collapse catastrophically (WER 92.56%, WA ~7.9%). This is inconsistent with all other specialties where degradation is gradual, indicating a batch-level audio preprocessing anomaly specific to HALO augmented outputs. Clean HALO results are valid.',
  },
];

function StatBar({ label, val, max, color }) {
  const pct = Math.min((val / max) * 100, 100);
  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
        <span style={{ fontSize: '0.72rem', color: '#6a85b0', fontFamily: "'Courier New', monospace" }}>{label}</span>
        <span style={{ fontSize: '0.72rem', color: '#ccd6f6', fontFamily: "'Courier New', monospace" }}>{val.toFixed(1)}%</span>
      </div>
      <div style={{ height: 4, background: '#0d1b2e', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

export default function SpecialtiesSection() {
  const [selected, setSelected] = useState('NEURO');
  const spec = specialties.find(s => s.code === selected);

  return (
    <section id="specialties" className="px-6 md:px-12 lg:px-32 py-24" style={{ borderTop: '1px solid #0d1b2e' }}>
      <SectionLabel>Specialty Breakdown</SectionLabel>
      <SectionHeading>How each specialty performed across audio conditions</SectionHeading>

      {/* Tab selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: '#0d1b2e', marginBottom: '2rem' }}>
        {specialties.map(s => (
          <button key={s.code} onClick={() => setSelected(s.code)} style={{
            background: selected === s.code ? '#0d1b2e' : '#080e1a',
            color: selected === s.code ? '#4fc3f7' : '#6a85b0',
            border: 'none', padding: '0.75rem 1.4rem', cursor: 'pointer',
            fontSize: '0.78rem', fontFamily: "'Courier New', monospace",
            letterSpacing: '0.06em', textTransform: 'uppercase',
            borderBottom: selected === s.code ? '2px solid #4fc3f7' : '2px solid transparent',
            transition: 'all 0.15s',
          }}>{s.code}</button>
        ))}
      </div>

      {/* Detail card */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: '#080e1a', border: '1px solid #0d1b2e', padding: '2rem' }}
      >
        <div className="spec-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
          {/* Left: title, badge, note */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: '#ccd6f6', fontWeight: 400 }}>{spec.title}</h3>
              {spec.badge && (
                <span style={{ fontSize: '0.65rem', color: spec.badgeColor, border: `1px solid ${spec.badgeColor}`, padding: '0.2rem 0.6rem', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                  {spec.badge}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.88rem', color: '#6a85b0', lineHeight: 1.75, marginBottom: '2rem' }}>{spec.note}</p>

            {/* Raw data table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: "'Courier New', monospace" }}>
              <thead>
                <tr>
                  {['Metric', 'Clean', 'Medium', 'Hard'].map(h => (
                    <th key={h} style={{ color: '#4fc3f7', textAlign: 'left', paddingBottom: '0.5rem', borderBottom: '1px solid #0d1b2e', paddingRight: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Word Acc.', data: spec.wa },
                  { label: 'WER', data: spec.wer },
                  { label: 'CER', data: spec.cer },
                  { label: 'WIP', data: spec.wip },
                ].map(row => (
                  <tr key={row.label}>
                    <td style={{ color: '#ccd6f6', padding: '0.4rem 1rem 0.4rem 0', borderBottom: '1px solid #0d1b2e' }}>{row.label}</td>
                    {['clean', 'med', 'hard'].map(tier => (
                      <td key={tier} style={{ color: '#6a85b0', padding: '0.4rem 1rem 0.4rem 0', borderBottom: '1px solid #0d1b2e' }}>{row.data[tier].toFixed(1)}%</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: visual stat bars */}
          <div>
            <p style={{ fontSize: '0.68rem', color: '#4fc3f7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.2rem' }}>Word Accuracy across tiers</p>
            <StatBar label="Clean" val={spec.wa.clean} max={100} color="#4fc3f7" />
            <StatBar label="Medium" val={spec.wa.med}  max={100} color="#1565c0" />
            <StatBar label="Hard"  val={spec.wa.hard}  max={100} color="#3a5a7a" />

            <p style={{ fontSize: '0.68rem', color: '#4fc3f7', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '1.5rem 0 1.2rem' }}>WIP (Word Information Preserved)</p>
            <StatBar label="Clean" val={spec.wip.clean} max={100} color="#4fc3f7" />
            <StatBar label="Medium" val={spec.wip.med}  max={100} color="#1565c0" />
            <StatBar label="Hard"  val={spec.wip.hard}  max={100} color="#3a5a7a" />

            <p style={{ fontSize: '0.68rem', color: '#4fc3f7', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '1.5rem 0 1.2rem' }}>CER (lower is better)</p>
            <StatBar label="Clean"  val={spec.cer.clean} max={50} color="#1D9E75" />
            <StatBar label="Medium" val={spec.cer.med}   max={50} color="#3266ad" />
            <StatBar label="Hard"   val={spec.cer.hard}  max={50} color="#D85A30" />
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 800px) {
          .spec-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}