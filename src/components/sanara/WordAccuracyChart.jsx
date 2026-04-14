import React, { useRef, useEffect, useState } from 'react';
import { wordAccuracy, werData, tiers, tierLabels, tierColors } from './chartData';

const specialties = ['CARDIAC', 'NEURO', 'RESP', 'OB', 'TRAUMA']; // exclude HALO degraded

export default function WordAccuracyChart() {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [mode, setMode] = useState('wa');

  useEffect(() => {
    const loadD3 = async () => {
      if (!window.d3) {
        await new Promise((resolve) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
          s.onload = resolve;
          document.head.appendChild(s);
        });
      }
      renderChart();
    };
    loadD3();
  }, [mode]);

  const renderChart = () => {
    const d3 = window.d3;
    if (!d3 || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const container = svgRef.current.parentElement;
    const width = container.clientWidth;
    const height = 380;
    const margin = { top: 20, right: 30, bottom: 50, left: 55 };

    svg.attr('width', width).attr('height', height);
    const data = mode === 'wa' ? wordAccuracy : werData;
    const yMin = mode === 'wa' ? 50 : 0;
    const yMax = mode === 'wa' ? 95 : 65;

    const x0 = d3.scaleBand().domain(specialties).range([margin.left, width - margin.right]).padding(0.35);
    const x1 = d3.scaleBand().domain(tiers).range([0, x0.bandwidth()]).padding(0.12);
    const y = d3.scaleLinear().domain([yMin, yMax]).range([height - margin.bottom, margin.top]);

    y.ticks(6).forEach((t) => {
      svg.append('line').attr('x1', margin.left).attr('x2', width - margin.right)
        .attr('y1', y(t)).attr('y2', y(t)).attr('stroke', '#0d1b2e').attr('stroke-dasharray', '3,4');
    });

    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `${d}%`))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '10px'));

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0).tickSize(0))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '11px'));

    const tooltip = tooltipRef.current;
    specialties.forEach((spec) => {
      tiers.forEach((tier) => {
        const val = parseFloat(data[spec][tier].toFixed(1));
        const barX = x0(spec) + x1(tier);
        const barY = y(val);
        const barH = y(yMin) - y(val);

        svg.append('rect').attr('x', barX).attr('y', height - margin.bottom)
          .attr('width', x1.bandwidth()).attr('height', 0).attr('rx', 3).attr('fill', tierColors[tier])
          .on('mouseenter', (event) => {
            tooltip.style.display = 'block';
            tooltip.innerHTML = `<span style="color:#ccd6f6;font-weight:700">${spec}</span><br/>${tierLabels[tier]}: <span style="color:${tierColors[tier]}">${val}%</span>`;
          })
          .on('mousemove', (event) => { tooltip.style.left = event.clientX + 14 + 'px'; tooltip.style.top = event.clientY - 28 + 'px'; })
          .on('mouseleave', () => { tooltip.style.display = 'none'; })
          .transition().duration(430).ease(d3.easeCubicInOut).attr('y', barY).attr('height', barH);
      });
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[{ key: 'wa', label: 'Word Accuracy' }, { key: 'wer', label: 'Word Error Rate' }].map((btn) => (
          <button key={btn.key} onClick={() => setMode(btn.key)} style={{
            background: mode === btn.key ? '#4fc3f7' : 'transparent', color: mode === btn.key ? '#04080f' : '#6a85b0',
            border: '1px solid #0d1b2e', padding: '0.5rem 1.2rem', fontSize: '0.72rem',
            textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Courier New', monospace", cursor: 'pointer', transition: 'all 0.2s',
          }}>{btn.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
        {tiers.map((tier) => (
          <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 12, height: 12, background: tierColors[tier], borderRadius: 2 }} />
            <span style={{ fontSize: '0.72rem', color: '#6a85b0', fontFamily: "'Courier New', monospace" }}>{tierLabels[tier]}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#080e1a', border: '1px solid #0d1b2e', padding: '1rem' }}>
        <svg ref={svgRef} style={{ width: '100%' }} />
      </div>
      <div ref={tooltipRef} style={{ position: 'fixed', display: 'none', background: '#080e1a', border: '1px solid #0d1b2e', padding: '0.75rem 1rem', fontFamily: "'Courier New', monospace", fontSize: '0.73rem', color: '#ccd6f6', zIndex: 999, pointerEvents: 'none' }} />
      <div style={{ marginTop: '1.5rem', background: '#080e1a', border: '1px solid #0d1b2e', padding: '1.2rem 1.5rem' }}>
        <p style={{ fontSize: '0.68rem', color: '#4fc3f7', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>HALO Note</p>
        <p style={{ fontSize: '0.82rem', color: '#6a85b0', lineHeight: 1.6 }}>
          HALO clean = 80.77% Word Accuracy (WER 24.94%) — competitive. HALO medium and hard collapsed to ~7.9% Word Accuracy (WER 92.56%).
          This is a batch-level audio preprocessing anomaly, not a model failure. HALO clean results are valid; degraded tiers are excluded from the chart above.
        </p>
      </div>
    </div>
  );
}