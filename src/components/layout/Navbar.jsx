import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';

const BASE = '/-ad-byggprojekt';

const sections = [
  { id: 'hem', label: 'Hem', href: BASE + '/' },
  { id: 'projekt', label: 'Projekt', href: BASE + '/projekt' },
  { id: 'tjanster', label: 'Tjänster', href: BASE + '/tjanster' },
  { id: 'cm-uppdrag', label: 'CM-uppdrag', href: BASE + '/tjanster#cm-uppdrag' },
  { id: 'om-oss', label: 'Om oss', href: BASE + '/om-oss' },
  { id: 'cv', label: 'CV', href: BASE + '/cv' },
  { id: 'kontakt', label: 'Kontakt', href: BASE + '/kontakt' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hem');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPathname(window.location.pathname);

    // Only observe home-page sections when on the start page
    if (window.location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const isActive = (id, href) => {
    if (pathname === '/' && id === 'hem') return activeSection === 'hem';
    if (href.startsWith('/#')) return pathname === '/' && activeSection === id;
    return pathname === href;
  };

  const logoHref = pathname === '/' ? BASE + '/#hem' : BASE + '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0f172a] border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <a href={logoHref} className="flex items-center group">
            <Logo className="w-40 md:w-44 h-auto text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.65)] transition-transform duration-300 group-hover:scale-[1.02]" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {sections.map(({ id, label, href }) => {
              const active = isActive(id, href);
              return (
                <a
                  key={id}
                  href={href}
                  className="relative py-1 text-xs font-bold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-all duration-300"
                >
                  {label}
                  {active && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0078D4] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-andreas-chat'))}
            className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#0078D4] to-[#4a9eff] shadow-[0_4px_14px_rgba(0,120,212,0.4)] hover:brightness-110 transition-all duration-300"
            aria-label="Öppna AI-assistenten Fråga Andreas"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
            AI-assistent
          </button>

          <a
            href={BASE + '/kontakt'}
            className="hidden md:inline-flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg text-[0.875rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[#020617] hover:border-white transition-all duration-300"
          >
            Få en offert
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label={mobileOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-6 right-6 bg-[rgba(15,23,42,0.95)] border border-white/10 rounded-3xl p-8"
            >
              <div className="flex flex-col gap-2">
                {sections.map(({ id, label, href }) => (
                  <a
                    key={id}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
              <button
                onClick={() => { setMobileOpen(false); window.dispatchEvent(new CustomEvent('open-andreas-chat')); }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#0078D4] to-[#4a9eff] transition-all duration-300 mt-4"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
                AI-assistent
              </button>
              <a
                href={BASE + '/kontakt'}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[#020617] transition-all duration-300 mt-4"
              >
                Få en offert
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
