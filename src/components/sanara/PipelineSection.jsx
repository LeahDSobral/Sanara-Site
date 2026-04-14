import React from 'react';
import SectionLabel from './SectionLabel';
import SectionHeading from './SectionHeading';
import PipelineStage from './PipelineStage';

const specialties = [
  {
    code: 'HALO',
    name: 'High-Acuity Low-Frequency',
    scenarios: 'Massive Pulmonary Embolism, Anaphylactic Shock, Malignant Hyperthermia, Aortic Dissection, Tension Pneumothorax, Airway Fire, Amniotic Fluid Embolism, Fat Embolism Syndrome',
  },
  {
    code: 'NEURO',
    name: 'Neurocritical Care',
    scenarios: 'Traumatic Brain Injury, Subarachnoid Haemorrhage, Status Epilepticus, Ischaemic Stroke, Intracerebral Haemorrhage, Raised Intracranial Pressure, Guillain-Barre Syndrome, Myasthenic Crisis',
  },
  {
    code: 'CARDIAC',
    name: 'Cardiac ICU',
    scenarios: 'STEMI with Cardiogenic Shock, Ventricular Tachycardia Storm, Cardiac Tamponade, Acute Decompensated Heart Failure, Post Cardiac Arrest, Aortic Stenosis Crisis, Right Heart Failure, Hypertensive Emergency',
  },
  {
    code: 'RESP',
    name: 'Respiratory ICU',
    scenarios: 'Severe ARDS, Status Asthmaticus, COPD Exacerbation requiring intubation, Difficult Ventilator Weaning, Pneumothorax requiring chest drain, Pulmonary Embolism, Haemoptysis, Reintubation after failed extubation',
  },
  {
    code: 'TRAUMA',
    name: 'Trauma and Surgical ICU',
    scenarios: 'Damage Control Resuscitation, Haemorrhagic Shock, Abdominal Compartment Syndrome, TBI with polytrauma, Burns with inhalation injury, Penetrating chest trauma, Post-op anastomotic leak, Necrotising Fasciitis',
  },
  {
    code: 'OB',
    name: 'Maternal and Obstetric ICU',
    scenarios: 'Severe Preeclampsia with Eclampsia, HELLP Syndrome, Postpartum Haemorrhage, Amniotic Fluid Embolism, Peripartum Cardiomyopathy, Septic Shock in Pregnancy, Placental Abruption, Uterine Rupture',
  },
];

export default function PipelineSection() {
  return (
    <section
      id="pipeline"
      className="px-6 md:px-12 lg:px-32 py-24"
      style={{ borderTop: '1px solid #0d1b2e' }}
    >
      <SectionLabel>The Data Pipeline</SectionLabel>
      <SectionHeading>
        From blank prompt to fine-tuning manifest in five automated stages
      </SectionHeading>

      <p style={{ fontSize: '0.92rem', color: '#6a85b0', lineHeight: 1.7, maxWidth: '740px', marginBottom: '3rem' }}>
        No real patient audio was used. The team built a fully synthetic data factory grounded in
        medical accuracy, scripted realism, and programmatic acoustic augmentation. Each stage feeds
        directly into the next, tracked by a deterministic progress system (run_state.json) that
        allows batch restarts and per-case retries without duplicating work.
      </p>

      {/* STAGE 1 */}
      <PipelineStage
        number="01"
        label="Blueprint Generator  (stage1_blueprints.py)"
        title="Two-Pass LLM Blueprint Generation"
        description={`Each case begins with two sequential LLM API calls through a vLLM endpoint acting as a "senior ICU simulation architect at a Tier-1 academic medical centre." Pass 1 generates a complete patient profile: age, sex, weight, height, presenting vitals (BP, HR, SpO2, GCS, temperature), past medical history, current medications, labs, and imaging findings. Pass 2 receives the Pass 1 JSON as context and generates the simulation logic layer: a clinical deterioration arc spanning at least 4 time points over 30 minutes, an intervention sequence of at least 5 steps, at least 8 seed dialogue cues, expected learner errors, debriefing points, and fidelity markers (boolean flags like magnesium_dosing_correct, airway_secured_early). JSON validation runs after every merge; Pass 2 retries up to max_retries times on failure. Successful blueprints are written to blueprints/CASE_ID.json and the case is marked done in the progress tracker.`}
        takeaway="The two-pass architecture separates clinical facts (Pass 1) from clinical reasoning (Pass 2), producing internally consistent blueprints where vitals, labs, medications, and the deterioration arc all agree. Automatic retry logic means the pipeline self-heals on transient JSON failures."
      >
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#ccd6f6', marginBottom: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Six Medical Specialties, Eight Scenarios Each:
          </p>
          <div style={{ display: 'grid', gap: '1px', background: '#0d1b2e' }} className="spec-grid-pipeline">
            {specialties.map((s) => (
              <div key={s.code} style={{ background: '#080e1a', padding: '1rem' }}>
                <span style={{ color: '#4fc3f7', fontSize: '0.75rem', fontWeight: 700 }}>{s.code}</span>
                <span style={{ color: '#6a85b0', fontSize: '0.75rem' }}>&nbsp;&nbsp;{s.name}</span>
                <p style={{ color: '#4a6080', fontSize: '0.75rem', marginTop: '0.4rem', lineHeight: 1.5 }}>{s.scenarios}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6a85b0', marginTop: '1rem', lineHeight: 1.6 }}>
            Scenario selection uses case_number modulo 8, ensuring each case in a specialty gets
            a distinct scenario before cycling. OB cases include fetal heart rate category and
            magnesium sulfate dosing fields. HALO cases include rare presentation details and
            specific diagnostic criteria for low-frequency diagnoses.
          </p>
        </div>
        <style>{`
          .spec-grid-pipeline { grid-template-columns: 1fr 1fr; }
          @media (max-width: 700px) { .spec-grid-pipeline { grid-template-columns: 1fr !important; } }
        `}</style>
      </PipelineStage>

      {/* STAGE 2 */}
      <PipelineStage
        number="02"
        label="Script Generator  (stage2_scripts.py)"
        title="60-Plus Line Clinical Dialogue Scripts with Disfluency Control"
        description={`Stage 2 converts each blueprint JSON into a realistic 65-line ICU simulation dialogue script. The LLM is prompted as a "clinical simulation scriptwriter" and receives a compacted version of the blueprint: patient demographics, chief complaint, presenting vitals, the deterioration arc, intervention sequence, seed dialogue cues, expected learner errors, and fidelity markers.

Speaker roles in every script: [ATTENDING], [FELLOW], [RESIDENT], [NURSE], [RT] (respiratory therapist), [PHARMACIST], [CHARGE_NURSE]. Each role has a word-count ceiling that reflects real clinical communication patterns under pressure -- ATTENDING and CHARGE_NURSE lines cap at 12 words (clipped, decisive), NURSE and RT at 15 words (observation reporting), FELLOW and PHARMACIST at 18 words (clinical reasoning), and RESIDENT at 20 words (still learning conciseness).

A deterministic disfluency level is assigned per case via MD5 hash modulo 100: 40 percent of cases are clean (fluent, no hesitations), 35 percent mild (2 to 3 hesitations, 1 self-correction), 20 percent moderate (4 to 5 hesitations, 2 self-corrections, extra interruptions), and 5 percent heavy (6+ hesitations, truncated words, sentences that restart, extreme cognitive load). Scripts must include at least 3 instances of one clinician interrupting another, at least 2 requests for spoken confirmation ("Did you say ten of morphine or two?"), and at least 1 cross-room call. Clinical language mixes formal terms with realistic shortcuts: "sat" instead of SpO2, "pressors" for vasopressors, "lytes" for electrolytes, "trop" for troponin, "crumping" for rapid deterioration.

Validation requires at least 55 speaker-tagged lines. On failure the system injects a correction message into the conversation history and retries, passing the previous attempt's output as assistant context. Scripts are written to scripts/CASE_ID.txt alongside a metadata JSON recording disfluency level and line count.`}
        takeaway="Disfluency stratification is a deliberate design choice. Real ICU recordings contain heavy disfluency under pressure. Training on a controlled mix of clean, mild, moderate, and heavy speech teaches the model to handle realistic clinical conditions rather than only idealized speech."
      />

      {/* STAGE 3 */}
      <PipelineStage
        number="03"
        label="Audio Synthesis  (stage3_audio.py)"
        title="Multi-Speaker TTS with Magpie-TTS (NeMo, 357M Parameters)"
        description={`Stage 3 converts each text script into a multi-speaker .wav file using the Magpie-TTS multilingual model (357M parameters, loaded once per batch run via NeMo's MagpieTTSModel). The model offers five distinct voices (indices 0 to 4, approximately: Jason, Leo, John Van Stan, Sofia, Aria). Voice assignment across the seven speaker roles is deterministic per case via MD5 seeding: the five pool indices are shuffled and mapped to ATTENDING, FELLOW, RESIDENT, NURSE, and RT. PHARMACIST shares FELLOW's voice; CHARGE_NURSE shares NURSE's voice, reflecting how paired roles sound similar in real ICU teams.

Before synthesis, all text is cleaned through an extensive normalization pipeline: numbers are converted to words (num2words), blood pressure patterns like "180/110" become "one hundred and eighty over one hundred and ten," dosage strings like "4mg/kg/min" become "four milligrams per kilo per minute," and a sorted abbreviation table expands terms like "PEEP," "SpO2," "MAP," "CRRT," "SOFA," and "G2P1" into speakable forms. Joules, millimoles, millimetres of mercury, centimetres of water, and litres are all handled. Digit ranges like "1-2 grams" become "one to two grams."

Each synthesized line is resampled from Magpie's native 22050 Hz to the target 16000 Hz using librosa. Silence gaps are inserted between turns: 0.2 seconds between consecutive lines from the same speaker, 0.5 seconds between different speakers. All audio chunks are concatenated and written as a 16 kHz mono PCM-16 WAV to audio/CASE_ID.wav. A metadata JSON records duration, speaker list, voice mapping, and sample rate.`}
        takeaway="Distinct voices per speaker role create realistic multi-talker audio. The silence gap strategy mimics real clinical turn-taking patterns and provides the ASR model with natural acoustic boundaries between speakers."
      />

      {/* STAGE 4 */}
      <PipelineStage
        number="04"
        label="Acoustic Augmentation  (stage4_augment.py)"
        title="Five-Layer ICU Noise Simulation for Smartphone Recordings"
        description={`Stage 4 transforms each clean TTS recording into two acoustically degraded versions ("med" and "hard") that simulate an iPhone recording made inside a busy ICU bay. Five ordered processing layers are applied:`}
        takeaway="The five-layer stack is not random noise. Each layer models a specific physical phenomenon present in real ICU recordings. This makes the augmented data acoustically representative rather than merely statistically perturbed, which is critical for training a model that will generalize to real deployment environments."
      >
        <div style={{ marginTop: '1.5rem', fontFamily: "'Courier New', monospace" }}>
          {[
            { num: '01', name: 'Room Acoustics', desc: 'Room Impulse Response (RIR) computed via pyroomacoustics. Room dimensions, mic position, and speaker distance drawn from configurable ranges. Convolved with the clean signal, adding realistic reverberation and early reflections.' },
            { num: '02', name: 'Dynamic Speaker Distance (40% of cases)', desc: 'Audio segmented with independent gain adjustments plus high-frequency rolloff via a low-pass Butterworth filter. Simulates a clinician turning away from or walking toward the recording device.' },
            { num: '03', name: 'ICU Ambient Noise', desc: '2-3 noise sources mixed at controlled SNR: ventilator hum (80-120 Hz sine wave with breathing-cycle modulation), cardiac monitor beeps (880/1100 Hz with tachycardia bursts, PVC events, arrhythmia patterns), shaped speech noise (300-3400 Hz bandpass, simulating distant conversation), optional PA announcement, and breathing noise.' },
            { num: '04', name: 'Speech Disfluency Augmentation (25%)', desc: 'Random segments time-stretched (simulating mumbling or drug-induced slurring) or speed-compressed (simulating clipped urgent speech).' },
            { num: '05', name: 'iPhone Mic Simulation', desc: 'Biquad peaking EQ filter shapes frequency response to approximate smartphone mic curve. Subset of cases receive codec artifacts (bit-crushing or MP3-style degradation).' },
          ].map((layer) => (
            <div
              key={layer.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '1rem',
                padding: '0.8rem 0',
                borderBottom: '1px solid #0d1b2e',
              }}
            >
              <span style={{ color: '#4fc3f7', fontSize: '0.82rem', fontWeight: 700 }}>{layer.num}</span>
              <div>
                <span style={{ color: '#ccd6f6', fontSize: '0.82rem', fontWeight: 700 }}>{layer.name}</span>
                <p style={{ color: '#6a85b0', fontSize: '0.82rem', marginTop: '0.3rem', lineHeight: 1.6 }}>{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.82rem', color: '#6a85b0', marginTop: '1.2rem', lineHeight: 1.6 }}>
          Additionally, 20 percent of cases receive overlapping speech from a randomly selected
          different case, mixed at a lower SNR, simulating cross-talk from an adjacent ICU bay.
          Difficulty is classified from the resulting parameters: SNR below 12 dB or the
          combination of disfluency and overlap augmentations classify a version as "hard";
          SNR at or below 18 dB or either disfluency or overlap alone classify it as "medium."
          All processing uses float32 at 16 kHz mono. Every augmentation decision is
          deterministic per case_id via MD5-seeded RandomState, making the dataset fully reproducible.
        </p>
      </PipelineStage>

      {/* STAGE 5 */}
      <PipelineStage
        number="05"
        label="Manifest Builder  (stage5_manifests.py)"
        title="NeMo-Format JSONL Manifests for Parakeet Fine-Tuning"
        description={`Stage 5 assembles the clean and augmented audio files into NeMo-format JSONL manifest files ready for Parakeet ASR fine-tuning. The split assignment is deterministic per case_id using MD5 hash modulo 100: the first 90 percent of the hash space goes to training, the next 5 percent to validation, and the final 5 percent to evaluation.

Training cases contribute three manifest entries each: one for the clean TTS audio, one for the medium augmented version, and one for the hard augmented version. This 3x multiplication maximizes training diversity from each case. Validation cases contribute only the medium augmented version (evaluating on harder conditions than the clean baseline). Evaluation cases contribute only the hard augmented version (worst-case acoustic conditions).

Each manifest entry is a JSON object with: audio_filepath (absolute path), duration (seconds), text (the ground-truth transcript), case_id, audio_type (clean or augmented), difficulty (clean, medium, or hard), and category (CARDIAC, HALO, NEURO, OB, RESP, or TRAUMA).

Transcripts are cleaned before writing: leading line numbers are stripped, speaker tags are removed, NARRATOR lines are discarded entirely, em dashes become commas, angle brackets become "less than" and "greater than," percent signs become "percent," and forward slashes become "per."

A GO/NO-GO check runs after manifest generation: PASS if training hours are at or above 15, WARN if between 8 and 15, ABORT if below 8. A summary.json is written to the manifests directory recording case counts and hours broken down by difficulty tier and split.`}
        takeaway='The 90/5/5 split with audio-tier stratification ensures the model is validated and evaluated on acoustically harder conditions than its clean training baseline -- a deliberate choice that prevents overfitting to ideal-quality audio while maximizing the training signal from each generated case.'
      />
    </section>
  );
}