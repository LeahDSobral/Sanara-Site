import React, { useRef, useEffect } from 'react';
import { errorBreakdown } from './chartData';

// Stacked bar: Hits (correct), Substitutions, Deletions, Insertions — clean audio
const data = Object.entries(errorBreakdown).map(([spec, v]) => {
  const total = v.hits + v.subs + v.deletions + v.insertions;
  return {
    specialty: spec,
    hits: v.hits,
    subs: v.subs,
    dels: v.deletions,
    ins: v.insertions,
    total,
  };
}).sort((a, b) => b.hits / b.total - a.hits / a.total);

const colors = { hits: '#4fc3f7', subs: '#1565c0', dels: '#e67e22', ins: '#D85A30' };
const labels = { hits: 'Correct (Hits)', subs: 'Substitutions', dels: 'Deletions', ins: 'Insertions' };
const keys = ['hits', 'subs', 'dels', 'ins'];

export default function ErrorBreakdownChart() {
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
    const height = 340;
    const margin = { top: 20, right: 20, bottom: 40, left: 70 };
    svg.attr('width', width).attr('height', height);

    const x = d3.scaleBand().domain(data.map(d => d.specialty)).range([margin.left, width - margin.right]).padding(0.3);
    const maxTotal = d3.max(data, d => d.total);
    const y = d3.scaleLinear().domain([0, maxTotal + 50]).range([height - margin.bottom, margin.top]);

    y.ticks(6).forEach((t) => {
      svg.append('line').attr('x1', margin.left).attr('x2', width - margin.right)
        .attr('y1', y(t)).attr('y2', y(t)).attr('stroke', '#0d1b2e').attr('stroke-dasharray', '3,4');
    });

    svg.append('g').attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => d))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '10px'));

    svg.append('g').attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select('.domain').attr('stroke', '#1e3358'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6a85b0').style('font-family', "'Courier New', monospace").style('font-size', '11px'));

    const tooltip = tooltipRef.current;

    data.forEach((d) => {
      let cumulative = 0;
      keys.forEach((key) => {
        const val = d[key];
        const yStart = y(cumulative + val);
        const yEnd = y(cumulative);
        const barH = yEnd - yStart;

        svg.append('rect')
          .attr('x', x(d.specialty))
          .attr('y', yStart)
          .attr('width', x.bandwidth())
          .attr('height', barH)
          .attr('fill', colors[key])
          .attr('opacity', key === 'hits' ? 0.9 : 0.8)
          .on('mouseenter', (event) => {
            tooltip.style.display = 'block';
            const pct = ((val / d.total) * 100).toFixed(1);
            tooltip.innerHTML = `<span style="color:#ccd6f6;font-weight:700">${d.specialty}</span><br/><span style="color:${colors[key]}">${labels[key]}</span>: ${val} <span style="color:#6a85b0">(${pct}%)</span>`;
          })
          .on('mousemove', (event) => { tooltip.style.left = event.clientX + 14 + 'px'; tooltip.style.top = event.clientY - 28 + 'px'; })
          .on('mouseleave', () => { tooltip.style.display = 'none'; });

        cumulative += val;
      });
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '1rem' }}>
        {keys.map(k => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: 12, height: 12, background: colors[k], borderRadius: 2 }} />
            <span style={{ fontSize: '0.72rem', color: '#6a85b0', fontFamily: "'Courier New', monospace" }}>{labels[k]}</span>
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