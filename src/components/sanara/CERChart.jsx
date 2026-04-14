import React, { useRef, useEffect } from 'react';
import { cerData } from './chartData';

// Clean audio CER sorted best to worst (excluding HALO degraded anomaly — use clean)
const data = [
  { specialty: 'NEURO',   cer: 7.55  },
  { specialty: 'CARDIAC', cer: 11.77 },
  { specialty: 'HALO',    cer: 12.58 },
  { specialty: 'RESP',    cer: 12.85 },
  { specialty: 'TRAUMA',  cer: 15.89 },
  { specialty: 'OB',      cer: 34.09 },
];

function getBarColor(cer) {
  if (cer < 10) return '#1D9E75';
  if (cer <= 17) return '#3266ad';
  return '#D85A30';
}

export default function CERChart() {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

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
    const width = container.clientWidth;
    const height = 300;
    const margin = { top: 15, right: 80, bottom: 30, left: 80 };
    svg.attr('width', width).attr('height', height);

    const y = d3.scaleBand().domain(data.map(d => d.specialty)).range([margin.top, height - margin.bottom]).padding(0.3);
    const x = d3.scaleLinear().domain([0, 40]).range([margin.left, width - margin.right]);

    x.ticks(8).forEach((t) => {
      svg.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', margin.top).attr('y2', height - margin.bottom)
        .attr('stroke', '#0d1b2e').attr('stroke-dasharray', '3,4');
    });

    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '11px'));

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(8).tickFormat(d => `${d}%`))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '10px'));

    const tooltip = tooltipRef.current;
    data.forEach((d) => {
      const color = getBarColor(d.cer);
      svg.append('rect').attr('x', margin.left).attr('y', y(d.specialty)).attr('width', 0).attr('height', y.bandwidth()).attr('rx', 2).attr('fill', color)
        .on('mouseenter', (event) => { tooltip.style.display = 'block'; tooltip.innerHTML = `<span style="color:#ccd6f6;font-weight:700">${d.specialty}</span><br/>CER (clean): <span style="color:${color}">${d.cer}%</span>`; })
        .on('mousemove', (event) => { tooltip.style.left = event.clientX + 14 + 'px'; tooltip.style.top = event.clientY - 28 + 'px'; })
        .on('mouseleave', () => { tooltip.style.display = 'none'; })
        .transition().duration(600).ease(d3.easeCubicInOut).attr('width', x(d.cer) - margin.left);
      svg.append('text').attr('x', x(d.cer) + 8).attr('y', y(d.specialty) + y.bandwidth() / 2 + 4)
        .attr('fill', '#ccd6f6').style('font-family', "'Courier New', monospace").style('font-size', '11px')
        .text(`${d.cer}%`).attr('opacity', 0).transition().delay(500).duration(300).attr('opacity', 1);
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1rem' }}>
        {[{ color: '#1D9E75', label: '< 10% — Excellent' }, { color: '#3266ad', label: '10–17% — Good' }, { color: '#D85A30', label: '> 17% — Needs work' }].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 12, height: 12, background: item.color, borderRadius: 2 }} />
            <span style={{ fontSize: '0.72rem', color: '#6a85b0', fontFamily: "'Courier New', monospace" }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#080e1a', border: '1px solid #0d1b2e', padding: '1rem' }}>
        <svg ref={svgRef} style={{ width: '100%' }} />
      </div>
      <div ref={tooltipRef} style={{ position: 'fixed', display: 'none', background: '#080e1a', border: '1px solid #0d1b2e', padding: '0.75rem 1rem', fontFamily: "'Courier New', monospace", fontSize: '0.73rem', color: '#ccd6f6', zIndex: 999, pointerEvents: 'none' }} />
    </div>
  );
}