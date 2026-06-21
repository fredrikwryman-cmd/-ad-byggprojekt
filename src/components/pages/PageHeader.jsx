import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, subtitle, dark = true }) {
  const bgClass = dark ? 'bg-[#020617]' : 'bg-white';
  const textClass = dark ? 'text-white' : 'text-[#020617]';
  const subtitleClass = dark ? 'text-[#94a3b8]' : 'text-[#64748b]';

  return (
    <section className={`relative pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-28 overflow-hidden ${bgClass}`}>
      {dark && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        </>
      )}
      {!dark && (
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078D4]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-4 md:mb-6 ${textClass}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${subtitleClass}`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
