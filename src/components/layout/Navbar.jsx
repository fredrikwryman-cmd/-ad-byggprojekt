import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// BASE_URL inkluderar avslutande slash (t.ex. '/-ad-byggprojekt/'),
// så länkar konkateneras utan inledande slash. Följer automatiskt med om base ändras.
const BASE = import.meta.env.BASE_URL;

// Normaliserar bort avslutande slash så jämförelser funkar oavsett om sidan
// serveras som "/projekt" eller "/projekt/" (och oavsett base-path).
const normalizePath = (p) => {
  const path = (p || '/').split('#')[0].split('?')[0];
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
};

const sections = [
  { id: 'hem', label: 'Hem', href: BASE },
  { id: 'projekt', label: 'Projekt', href: BASE + 'projekt' },
  { id: 'tjanster', label: 'Tjänster', href: BASE + 'tjanster' },
  { id: 'cm-uppdrag', label: 'CM-uppdrag', href: BASE + 'tjanster#cm-uppdrag' },
  { id: 'om-oss', label: 'Om oss', href: BASE + 'om-oss' },
  { id: 'cv', label: 'CV', href: BASE + 'cv' },
  { id: 'kontakt', label: 'Kontakt', href: BASE + 'kontakt' },
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
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // Aktiv sektion på startsidan (scroll-spy). På GitHub Pages är startsidans
  // path BASE (t.ex. "/-ad-byggprojekt/"), aldrig "/", så vi jämför mot BASE.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPathname(window.location.pathname);
    if (normalizePath(window.location.pathname) !== normalizePath(BASE)) return;

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

  // Mobilmeny: fokus-fälla + Escape medan den är öppen, och återställ fokus till
  // hamburger-knappen när den stängs (WCAG 2.1.2 / 2.4.3).
  useEffect(() => {
    if (!mobileOpen) return;
    const menu = mobileMenuRef.current;
    const focusables = menu
      ? Array.prototype.slice.call(menu.querySelectorAll('a[href], button:not([disabled])'))
      : [];
    if (focusables.length) focusables[0].focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setMobileOpen(false); return; }
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (hamburgerRef.current) hamburgerRef.current.focus();
    };
  }, [mobileOpen]);

  // På startsidan följer markeringen scrollen (activeSection från scroll-spy).
  // På undersidor matchar vi i stället nuvarande URL mot länkens sökväg, så
  // markeringen blir permanent på den sida man är inne på.
  const isHome = normalizePath(pathname) === normalizePath(BASE);
  const isActive = (id, href) => {
    if (id === 'cm-uppdrag') return false; // ankarlänk till tjänster, ej egen sida
    if (isHome) return activeSection === id;
    return normalizePath(pathname) === normalizePath(href);
  };

  const logoHref = isHome ? BASE + '#hem' : BASE;
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
          className={`max-w-7xl mx-auto pl-3 pr-6 md:pl-4 md:pr-8 flex items-center justify-between ${trans}`}
          style={{ height: scrolled ? '60px' : '80px' }}
        >
          {/* Logga */}
          <a href={logoHref} className="flex items-center shrink-0" aria-label="AD Byggprojekt AB – till startsidan">
            <img
              src={BASE + 'ad-logo-vit-navbar.png'}
              alt="AD Byggprojekt AB"
              className={`w-auto ${trans}`}
              style={{ height: scrolled ? '41px' : '53px' }}
            />
          </a>

          {/* Menylänkar */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
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

          {/* Fråga Heidi – TILLFÄLLIGT DOLD (återaktivera genom att avkommentera nedan
              samt <AndreasChat /> i Layout.astro):
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-andreas-chat'))}
            className={`hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#1F5FA5] to-[#3b82f6] shadow-[0_4px_14px_rgba(31,95,165,0.4)] hover:brightness-110 ${
              reduced ? '' : 'transition-all duration-300'
            }`}
            aria-label="Öppna Fråga Heidi"
          >
            <svg aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
            Fråga Heidi
          </button>
          */}

          {/* Få en offert (diskret outline) */}
          <a
            href={BASE + 'offert'}
            className={`hidden lg:inline-flex items-center justify-center px-5 py-2.5 border border-white/30 rounded-lg text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-white/10 hover:border-white/60 ${
              reduced ? '' : 'transition-all duration-300'
            }`}
          >
            Få en offert
          </a>

          {/* Hamburger (mobil) */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? 'mobile-menu' : undefined}
          >
            <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-6 right-6 bg-[rgba(15,23,42,0.95)] border border-white/10 rounded-3xl p-8"
            >
              <div className="flex flex-col gap-2">
                {sections.map(({ id, label, href }) => {
                  const active = isActive(id, href);
                  return (
                    <a
                      key={id}
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-lg transition-colors ${
                        active
                          ? 'font-bold text-white underline underline-offset-4 decoration-[#60a5fa] bg-white/10'
                          : 'font-semibold text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
              {/* Fråga Heidi – TILLFÄLLIGT DOLD (avkommentera för att återaktivera):
              <button
                onClick={() => { setMobileOpen(false); window.dispatchEvent(new CustomEvent('open-andreas-chat')); }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-br from-[#1F5FA5] to-[#3b82f6] transition-all duration-300 mt-4"
              >
                <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 1 1 16.1-3.8z" /></svg>
                Fråga Heidi
              </button>
              */}
              <a
                href={BASE + 'offert'}
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
