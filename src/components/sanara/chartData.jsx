// ── All values extracted directly from combined_metric_results.csv & summary.csv ──

export const specialties = ['CARDIAC', 'HALO', 'NEURO', 'OB', 'RESP', 'TRAUMA'];

// Word Accuracy (hits / N * 100)
export const wordAccuracy = {
  CARDIAC: { clean: 76.03, med: 76.35, hard: 72.38 },
  HALO:    { clean: 80.77, med: 7.94,  hard: 7.82  },
  NEURO:   { clean: 81.65, med: 81.73, hard: 73.73 },
  OB:      { clean: 79.28, med: 76.90, hard: 73.27 },
  RESP:    { clean: 80.21, med: 79.68, hard: 77.34 },
  TRAUMA:  { clean: 70.50, med: 72.54, hard: 68.47 },
};

// WER (jiwer.wer() * 100)
export const werData = {
  CARDIAC: { clean: 27.62, med: 27.78, hard: 33.02 },
  HALO:    { clean: 24.94, med: 92.56, hard: 92.56 },
  NEURO:   { clean: 20.29, med: 20.78, hard: 29.67 },
  OB:      { clean: 45.75, med: 49.04, hard: 57.53 },
  RESP:    { clean: 25.53, med: 25.53, hard: 29.47 },
  TRAUMA:  { clean: 34.89, med: 33.93, hard: 41.01 },
};

// CER (jiwer.cer() * 100)
export const cerData = {
  CARDIAC: { clean: 11.77, med: 12.02, hard: 14.93 },
  HALO:    { clean: 12.58, med: 69.86, hard: 69.96 },
  NEURO:   { clean: 7.55,  med: 7.82,  hard: 15.37 },
  OB:      { clean: 34.09, med: 35.39, hard: 39.00 },
  RESP:    { clean: 12.85, med: 13.53, hard: 16.18 },
  TRAUMA:  { clean: 15.89, med: 15.18, hard: 20.31 },
};

// WIP (jiwer.wip() * 100)
export const wipData = {
  CARDIAC: { clean: 60.10, med: 59.23, hard: 53.41 },
  HALO:    { clean: 65.64, med: 0.79,  hard: 0.74  },
  NEURO:   { clean: 68.27, med: 67.51, hard: 55.71 },
  OB:      { clean: 51.77, med: 48.35, hard: 42.25 },
  RESP:    { clean: 62.74, med: 62.43, hard: 57.73 },
  TRAUMA:  { clean: 52.68, med: 52.62, hard: 45.04 },
};

// Error type breakdown (clean audio only, raw counts)
export const errorBreakdown = {
  CARDIAC: { hits: 479, subs: 104, deletions: 47, insertions: 23 },
  HALO:    { hits: 651, subs: 104, deletions: 51, insertions: 46 },
  NEURO:   { hits: 1010, subs: 174, deletions: 53, insertions: 24 },
  OB:      { hits: 700, subs: 151, deletions: 32, insertions: 221 },
  RESP:    { hits: 754, subs: 156, deletions: 30, insertions: 54 },
  TRAUMA:  { hits: 588, subs: 154, deletions: 92, insertions: 45 },
};

// Error type rates % of total errors (clean audio)
export const errorRates = {
  CARDIAC: { sub: 59.77, del: 27.01, ins: 13.22 },
  HALO:    { sub: 51.74, del: 25.37, ins: 22.89 },
  NEURO:   { sub: 69.32, del: 21.12, ins: 9.56  },
  OB:      { sub: 37.38, del: 7.92,  ins: 54.70 },
  RESP:    { sub: 65.00, del: 12.50, ins: 22.50 },
  TRAUMA:  { sub: 52.92, del: 31.62, ins: 15.46 },
};

export const tierColors = {
  clean: '#4fc3f7',
  med:   '#1565c0',
  hard:  '#3a5a7a',
};

export const tierLabels = { clean: 'Clean', med: 'Medium', hard: 'Hard' };
export const tiers = ['clean', 'med', 'hard'];