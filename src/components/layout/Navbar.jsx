import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = '/-ad-byggprojekt';

const sections = [
  { id: 'hem', label: 'Hem', href: BASE + '/' },
  { id: 'projekt', label: 'Projekt', href: BASE + '/projekt' },
  { id: 'tjanster', label: 'Tjänster', href: BASE + '/tjanster' },
  { id: 'cm-uppdrag', label: 'CM-uppdrag', href: BASE + '/tjanster#cm-uppdrag' },
  { id: 'om-oss', label: 'Om oss', href: BASE + '/om-oss' },
  { id: 'cv', label: 'CV', href: BASE + '/cv' },
  { id: 'offert', label: 'Offert', href: BASE + '/offert' },
  { id: 'kontakt', label: 'Kontakt', href: BASE + '/kontakt' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hem');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathname, setPathname] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Scroll-shrink + progress-bar
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrolled(y > 50);
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Aktiv sektion på startsidan
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPathname(window.location.pathname);
    if (window.location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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
  const trans = reduced ? '' : 'transition-all duration-300';

  return (
    <>
      <motion.nav
        aria-label="Huvudmeny"
        initial={reduced ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 ${trans} ${
          scrolled
            ? 'bg-[#020617]/80 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'bg-[#0b1120] border-b border-white/5'
        }`}
      >
        {/* Progress-bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#1F5FA5] to-[#60a5fa]"
          style={{ width: progress + '%' }}
        />

        <div
          className={`max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between ${trans}`}
          style={{ height: scrolled ? '60px' : '80px' }}
        >
          {/* Logga */}
          <a href={logoHref} className="flex items-center shrink-0" aria-label="AD Byggprojekt AB – till startsidan">
            <img
              src={BASE + '/ad-logo-vit-navbar.png'}
              alt="AD Byggprojekt AB"
              className={`w-auto ${trans}`}
              style={{ height: scrolled ? '34px' : '44px' }}
            />
          </a>

          {/* Menylänkar */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {sections.map(({ id, label, href }) => {
              const active = isActive(id, href);
              return (
                <a
                  key={id}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-1 text-xs font-bold uppercase tracking-[0.15em] ${
                    reduced ? '' : 'transition-colors duration-300'
                  } ${active ? 'text-white' : 'text-[#94a3b8] hover:text-white'}`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-[#60a5fa] ${
                      reduced ? '' : 'transition-[width] duration-300 ease-out'
                    } ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </a>
              );
            })}
          </div>

          {/* Fråga Heidi */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-andreas-chat'))}
            className={`hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#1F5FA5] to-[#3b82f6] shadow-[0_4px_14px_rgba(31,95,165,0.4)] hover:brightness-110 ${
              reduced ? '' : 'transition-all duration-300'
            }`}
            aria-label="Öppna Fråga Heidi"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
            Fråga Heidi
          </button>

          {/* Få en offert (diskret outline) */}
          <a
            href={BASE + '/offert'}
            className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 border border-white/30 rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:border-white/60 ${
              reduced ? '' : 'transition-all duration-300'
            }`}
          >
            Få en offert
          </a>

          {/* Hamburger (mobil) */}
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
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#1F5FA5] to-[#3b82f6] transition-all duration-300 mt-4"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
                Fråga Heidi
              </button>
              <a
                href={BASE + '/offert'}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-6 py-3 border border-white/30 rounded-lg text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 mt-4"
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
