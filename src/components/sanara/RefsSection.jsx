import React from 'react';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';

const refs = [
  { num: 1, text: 'NVIDIA NeMo Toolkit -- ASR and TTS framework used for Magpie-TTS synthesis and Parakeet manifest format.', url: 'https://github.com/NVIDIA/NeMo' },
  { num: 2, text: 'Magpie-TTS -- Multilingual 357M parameter TTS model used in Stage 3 for multi-speaker audio synthesis. NeMo Collections.', url: null },
  { num: 3, text: 'Parakeet ASR -- Target fine-tuning model for NeMo-format JSONL manifests generated in Stage 5.', url: null },
  { num: 4, text: 'jiwer -- Python library used for WER, CER, MER, WIL, and WIP metric computation.', url: 'https://github.com/jitsi/jiwer' },
  { num: 5, text: 'pyroomacoustics -- Room impulse response simulation used in Stage 4 Layer 1 acoustic augmentation.', url: 'https://github.com/LCAV/pyroomacoustics' },
  { num: 6, text: 'librosa -- Audio resampling (22050 Hz to 16 kHz) used in Stage 3.', url: 'https://librosa.org' },
  { num: 7, text: 'SciPy -- Butterworth filter design (high-pass, low-pass, band-pass, biquad EQ) used throughout Stage 4 signal processing.', url: null },
  { num: 8, text: 'soundfile -- WAV file reading and writing across Stages 3, 4, and 5.', url: null },
  { num: 9, text: 'num2words -- Number-to-text conversion used in the Stage 3 TTS text cleaning pipeline.', url: null },
  { num: 10, text: 'Sanara Healthcare / FuzionX -- Project sponsor. Contact: Dr. Harrison Kaplan, hkaplan@sanarahealth.com. Tom Stanford, tstanford@fuzionx.com.', url: null },
];

export default function RefsSection() {
  return (
    <section
      id="refs"
      className="px-6 md:px-12 lg:px-32 py-24"
      style={{ borderTop: '1px solid #0d1b2e' }}
    >
      <SectionLabel>References</SectionLabel>
      <SectionHeading>Tools and Models</SectionHeading>

      <div style={{ maxWidth: '740px' }}>
        {refs.map((ref) => (
          <div
            key={ref.num}
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr',
              gap: '1rem',
              padding: '1rem 0',
              borderBottom: '1px solid #0d1b2e',
              alignItems: 'baseline',
            }}
          >
            <span style={{ color: '#4fc3f7', fontSize: '0.82rem', fontWeight: 700 }}>{ref.num}.</span>
            <p style={{ fontSize: '0.85rem', color: '#6a85b0', lineHeight: 1.6 }}>
              {ref.text}
              {ref.url && (
                <>
                  {' '}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4fc3f7', textDecoration: 'none', borderBottom: '1px solid #1565c0' }}
                  >
                    {ref.url}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}