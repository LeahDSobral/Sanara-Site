import React, { useRef, useEffect } from 'react';
import { wipData } from './chartData';

// Spider/Radar chart showing WIP (Word Information Preserved) across specialties for each tier
// Excludes HALO med/hard anomaly

const specialties = ['NEURO', 'RESP', 'CARDIAC', 'TRAUMA', 'OB'];
const tiers = [
  { key: 'clean', color: '#4fc3f7', label: 'Clean' },
  { key: 'med',   color: '#1565c0', label: 'Medium' },
  { key: 'hard',  color: '#3a5a7a', label: 'Hard' },
];

export default function WIPRadarChart() {
  const svgRef = useRef(null);

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
  }, []);

  const renderChart = () => {
    const d3 = window.d3;
    if (!d3 || !svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const container = svgRef.current.parentElement;
    const size = Math.min(container.clientWidth, 420);
    const cx = size / 2, cy = size / 2;
    const radius = size * 0.36;
    const levels = 5;
    const maxVal = 80; // WIP % cap for radar

    svg.attr('width', size).attr('height', size);

    const n = specialties.length;
    const angleSlice = (Math.PI * 2) / n;

    const getX = (angle, r) => cx + r * Math.cos(angle - Math.PI / 2);
    const getY = (angle, r) => cy + r * Math.sin(angle - Math.PI / 2);
    const scale = d3.scaleLinear().domain([0, maxVal]).range([0, radius]);

    // Grid circles
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius / levels) * lvl;
      svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r)
        .attr('fill', 'none').attr('stroke', '#0d1b2e').attr('stroke-width', 1);
      svg.append('text').attr('x', cx + 4).attr('y', cy - r + 4)
        .attr('fill', '#4a6080').style('font-size', '9px').style('font-family', "'Courier New', monospace")
        .text(`${Math.round((maxVal / levels) * lvl)}%`);
    }

    // Axes
    specialties.forEach((spec, i) => {
      const angle = angleSlice * i;
      svg.append('line').attr('x1', cx).attr('y1', cy)
        .attr('x2', getX(angle, radius)).attr('y2', getY(angle, radius))
        .attr('stroke', '#0d1b2e').attr('stroke-width', 1);

      const labelR = radius + 22;
      const lx = getX(angle, labelR);
      const ly = getY(angle, labelR);
      svg.append('text').attr('x', lx).attr('y', ly + 4)
        .attr('text-anchor', 'middle').attr('fill', '#6a85b0')
        .style('font-size', '11px').style('font-family', "'Courier New', monospace")
        .text(spec);
    });

    // Polygons per tier
    tiers.forEach(({ key, color }) => {
      const points = specialties.map((spec, i) => {
        const val = Math.min(wipData[spec][key], maxVal);
        const r = scale(val);
        return [getX(angleSlice * i, r), getY(angleSlice * i, r)];
      });

      svg.append('polygon')
        .attr('points', points.map(p => p.join(',')).join(' '))
        .attr('fill', color).attr('fill-opacity', 0.12)
        .attr('stroke', color).attr('stroke-width', 2);

      // Dots
      points.forEach(([px, py], i) => {
        svg.append('circle').attr('cx', px).attr('cy', py).attr('r', 4)
          .attr('fill', color).attr('stroke', '#04080f').attr('stroke-width', 1.5);
      });
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {tiers.map(t => (
          <div key={t.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 12, height: 12, background: t.color, borderRadius: 2 }} />
            <span style={{ fontSize: '0.72rem', color: '#6a85b0', fontFamily: "'Courier New', monospace" }}>{t.label}</span>
          </div>
        ))}
        <span style={{ fontSize: '0.72rem', color: '#4a6080', fontFamily: "'Courier New', monospace", marginLeft: 'auto' }}>HALO excluded (augmentation anomaly)</span>
      </div>
      <div style={{ background: '#080e1a', border: '1px solid #0d1b2e', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <svg ref={svgRef} />
      </div>
    </div>
  );
}