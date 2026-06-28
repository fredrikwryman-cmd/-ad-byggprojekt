import { useState } from 'react';

const words = ['BYGGLEDNING', 'PLATSLEDNING', 'PROJEKTLEDNING', 'RÅDGIVNING', 'KVALITET', 'ARBETSMILJÖ', 'EKONOMI'];

export default function MarqueeSection() {
  const [paused, setPaused] = useState(false);

  return (
    // Sektionen är INTE aria-hidden (då skulle paus-kontrollen bli oåtkomlig).
    // Bara den rullande, duplicerade ordlistan döljs för skärmläsare – samma
    // tjänster listas tillgängligt i tjänste-sektionen.
    <section className="marquee-section py-10 overflow-hidden relative z-10">
      <div
        className={`marquee-track${paused ? ' is-paused' : ''}`}
        aria-hidden="true"
        role="presentation"
      >
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center">
            <span className="font-black font-display text-white whitespace-nowrap leading-none">
              {word}
            </span>
            <span className="w-3 h-3 rounded-full bg-[#0078D4] animate-pulse-glow flex-shrink-0 mx-8" />
          </div>
        ))}
      </div>

      {/* Paus/spela-kontroll (WCAG 2.2.2). Osynlig i normalläge – tonar in vid
          hover på bården och vid tangentbordsfokus, så utseendet är oförändrat. */}
      <button
        type="button"
        className="marquee-toggle"
        aria-label={paused ? 'Spela rullande text' : 'Pausa rullande text'}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? (
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        )}
      </button>
    </section>
  );
}
