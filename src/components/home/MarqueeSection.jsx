import { motion } from 'framer-motion';

const words = ['NYBYGGE', 'RENOVERING', 'PROJEKTLEDNING', 'RÅDGIVNING', 'KVALITET', 'HÅLLBARHET'];

export default function MarqueeSection() {
  return (
    <section aria-hidden="true" className="py-10 overflow-hidden relative z-30">
      <div className="marquee-track">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-black font-display text-white/[0.06] whitespace-nowrap leading-none">
              {word}
            </span>
            <span className="w-3 h-3 rounded-full bg-[#0078D4] animate-pulse-glow flex-shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
