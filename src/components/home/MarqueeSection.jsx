import { motion } from 'framer-motion';

const words = ['BYGGLEDNING', 'PLATSLEDNING', 'PROJEKTLEDNING', 'RÅDGIVNING', 'KVALITET', 'ARBETSMILJÖ', 'EKONOMI'];

export default function MarqueeSection() {
  return (
    // Purely decorative scrolling marquee. The same services are listed
    // accessibly in the services section, so the entire marquee is hidden
    // from assistive tech to avoid screen readers reading the looped,
    // duplicated word list over and over.
    <section aria-hidden="true" role="presentation" className="py-10 overflow-hidden relative z-10">
      <div className="marquee-track">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-black font-display text-white whitespace-nowrap leading-none">
              {word}
            </span>
            <span className="w-3 h-3 rounded-full bg-[#0078D4] animate-pulse-glow flex-shrink-0 mx-8" />
          </div>
        ))}
      </div>
    </section>
  );
}
