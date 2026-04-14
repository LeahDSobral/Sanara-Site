import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';
import Takeaway from './Takeaway';
import DGrid from './DGrid';
import WordAccuracyChart from './WordAccuracyChart';
import CERChart from './CERChart';
import ErrorBreakdownChart from './ErrorBreakdownChart';
import WIPRadarChart from './WIPRadarChart';

const summaryStats = [
  { value: '81.73%', label: 'Peak Word Accuracy — NEURO clean/med' },
  { value: '7.55%',  label: 'Lowest CER — NEURO clean audio' },
  { value: '2.87 pts', label: 'RESP accuracy drop, clean → hard' },
  { value: '77.34%', label: 'RESP Word Accuracy on hard audio' },
  { value: '54.70%', label: 'OB insertion rate — clean audio' },
];

const metricDefs = [
  { value: 'Word Accuracy', label: 'Correct words ÷ total reference words. The most intuitive positive-framing accuracy metric.' },
  { value: 'WER', label: 'Word Error Rate. Standard ASR benchmark. Counts substitutions, deletions, insertions. Lower is better.' },
  { value: 'CER', label: 'Character Error Rate. Granular signal; best indicator for clinical terms where spelling accuracy matters.' },
  { value: 'WIP', label: 'Word Information Preserved. Fraction of word-level information retained. Penalises both insertions and deletions.' },
];

function ChartBlock({ num, label, title, children, takeaway }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '4rem' }}
    >
      <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#4fc3f7', marginBottom: '0.8rem' }}>
        Visualization {num}&nbsp;&nbsp;{label}
      </p>
      <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 400, color: '#ccd6f6', marginBottom: '1.5rem' }}>
        {title}
      </h3>
      {children}
      {takeaway && <Takeaway>{takeaway}</Takeaway>}
    </motion.div>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="px-6 md:px-12 lg:px-32 py-24" style={{ borderTop: '1px solid #0d1b2e' }}>
      <SectionLabel>Performance Metrics</SectionLabel>
      <SectionHeading>
        Whisper benchmarked across six specialties and three audio tiers
      </SectionHeading>

      <p style={{ fontSize: '0.92rem', color: '#6a85b0', lineHeight: 1.7, maxWidth: '740px', marginBottom: '2rem' }}>
        All values are sourced directly from <em style={{ color: '#ccd6f6' }}>combined_metric_results.csv</em> and computed
        using the jiwer library against ground-truth transcripts. Four metrics are reported:
        Word Accuracy, WER, CER, and WIP — across clean, medium, and hard audio conditions for every specialty.
      </p>

      <DGrid items={metricDefs} cols={4} />

      {/* Top KPI strip */}
      <DGrid items={summaryStats} cols={5} />

      {/* Chart 1: Word Accuracy / WER grouped bars */}
      <ChartBlock
        num="01" label="D3.js · Interactive · Toggle"
        title="Word Accuracy & WER by Specialty across Audio Quality Tiers"
        takeaway="NEURO achieves 81.65% word accuracy on clean audio, essentially unchanged at 81.73% on medium — validating acoustic robustness. RESP drops only 2.87 percentage points from clean (80.21%) to hard (77.34%), the smallest degradation of any specialty."
      >
        <WordAccuracyChart />
      </ChartBlock>

      {/* Chart 2: CER horizontal bars */}
      <ChartBlock
        num="02" label="D3.js · Horizontal Bar · Clean Audio"
        title="Character Error Rate — Clean Audio (lower is better)"
        takeaway="NEURO's 7.55% CER on clean audio is the standout result. CER is less forgiving than WER for clinical documentation — a single wrong character in a medication name can change the meaning entirely. OB's 34.09% CER is driven almost entirely by its abnormal insertion pattern (54.70% of OB errors are insertions on clean audio)."
      >
        <CERChart />
      </ChartBlock>

      {/* Chart 3: Error breakdown stacked bars */}
      <ChartBlock
        num="03" label="D3.js · Stacked Bar · Clean Audio"
        title="Error Type Breakdown — Word Counts by Category (Clean Audio)"
        takeaway="OB is the outlier: 221 insertions vs 32 deletions on clean audio. Every other specialty shows deletions and substitutions dominating, which is the expected pattern for clinical vocabulary not in training data. OB's hallucination pattern is a targeted fine-tuning problem — the model adds words rather than missing them."
      >
        <ErrorBreakdownChart />
      </ChartBlock>

      {/* Chart 4: WIP Radar */}
      <ChartBlock
        num="04" label="D3.js · Radar · WIP across tiers"
        title="Word Information Preserved — Acoustic Robustness Radar"
        takeaway="The radar shows which specialties hold their WIP score as audio quality degrades from clean to hard. NEURO and RESP maintain the tightest polygon (smallest area loss), confirming they are the most acoustically robust. OB and TRAUMA show the largest collapse — the gap between their clean and hard polygons represents the performance headroom that additional fine-tuning can recover."
      >
        <WIPRadarChart />
      </ChartBlock>
    </section>
  );
}