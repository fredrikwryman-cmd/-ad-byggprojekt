import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hem"
      className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with parallax zoom */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={import.meta.env.BASE_URL + "adlogoherobanner.png"}
          alt="AD Byggprojekt"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/76 via-[#020617]/64 to-[#020617]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/72 via-transparent to-[#020617]/32" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-bg-dark opacity-10" />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-safe py-32 md:py-40"
        style={{ opacity: contentOpacity }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="eyebrow mb-4"
          >
            Byggledning &amp; projektledning · Stockholm
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.92] tracking-tight text-balance mb-6"
          >
            VI LEDER
            <br />
            <span className="gradient-text-hero text-glow">
              DITT BYGGE
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-lg md:text-xl text-[#cbd5e1] max-w-2xl leading-relaxed mb-10"
          >
            Erfaren byggledning, platsledning och projektledning i Stockholm.
            Vi styr ditt projekt i mål – med kvalitet, arbetsmiljö och ekonomi i fokus.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col items-center sm:flex-row sm:items-center gap-6 mb-14"
          >
            <a
              href={import.meta.env.BASE_URL + 'kontakt'}
              className="btn-primary w-full sm:w-auto group"
            >
              Få en offert
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={import.meta.env.BASE_URL + 'projekt'}
              className="btn-outline-light w-full sm:w-auto group"
            >
              Se våra projekt
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>


        </div>
      </motion.div>
    </section>
  );
}
