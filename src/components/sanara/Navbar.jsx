import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '#intro', label: 'Intro' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#metrics', label: 'Metrics' },
  { href: '#specialties', label: 'Specialties' },
  { href: '#findings', label: 'Findings' },
  { href: '#refs', label: 'Refs' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(4,8,15,0.92)' : 'rgba(4,8,15,0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #0d1b2e',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: '#6a85b0', fontSize: '0.68rem', letterSpacing: '0.12em' }}
        >
          Sanara Health x Northeastern&nbsp;&nbsp;MKTG 6606
        </span>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-[#4fc3f7]"
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6a85b0',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}