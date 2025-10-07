"use client";
import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#careers', label: 'Careers' },
  { href: '#blogs', label: 'Blogs' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact Us' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header
      className={
        `fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b 
        ${scrolled ? 'bg-[#0b0713]/85 backdrop-blur-md border-violet-900/40 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]' : 'bg-transparent border-transparent'} `
      }
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
          <span className="relative">
            <span className="absolute inset-0 blur-sm bg-gradient-to-r from-fuchsia-500 to-violet-500 opacity-60 rounded" />
            <span className="relative px-2 py-1 rounded bg-gradient-to-r from-fuchsia-600 to-violet-600 text-xs font-bold uppercase tracking-wider text-white">D</span>
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-300">Diffuzio</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-violet-200/70 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-fuchsia-400 to-violet-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-violet-500/30 text-violet-200 hover:bg-violet-800/30 transition-colors"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-400 overflow-hidden backdrop-blur-md bg-[#0b0713]/92 border-t border-violet-900/40 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-violet-200/80 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
