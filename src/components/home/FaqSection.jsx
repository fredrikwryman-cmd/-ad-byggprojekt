import { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'Vilka områden arbetar ni i?',
    a: 'Vi är verksamma i Stockholm med omnejd – hela Storstockholm samt Uppsala. Hör av dig om du är osäker på om vi täcker just din ort.',
  },
  {
    q: 'Är det första mötet kostnadsfritt?',
    a: 'Ja. Vi börjar alltid med ett förutsättningslöst möte där vi lyssnar på dina idéer och gör en första bedömning – helt utan kostnad eller förpliktelse.',
  },
  {
    q: 'Hur lång tid tar ett projekt?',
    a: 'Det beror helt på omfattningen. Du får alltid en realistisk tidsplan i offerten, och vi håller dig uppdaterad om status genom hela projektet.',
  },
  {
    q: 'Kan jag använda ROT-avdrag?',
    a: 'För privatpersoner kan ROT-avdrag oftast användas vid renovering och ombyggnad, och vi hjälper dig att hantera avdraget direkt på fakturan. Hör av dig så går vi igenom vad som gäller för just ditt projekt.',
  },
  {
    q: 'Har ni F-skatt och försäkring?',
    a: 'Ja, vi är godkända för F-skatt och har ansvarsförsäkring. Du arbetar alltid med en seriös och trygg motpart.',
  },
  {
    q: 'Lämnar ni fast pris?',
    a: 'I de allra flesta fall lämnar vi fast pris efter att vi planerat projektet tillsammans. Då vet du exakt vad som ingår – inga överraskningar längre fram.',
  },
  {
    q: 'Vilken garanti gäller?',
    a: 'Vi lämnar garanti enligt branschens regler och dokumenterar arbetet vid överlämningen. Du får tydliga avtal och vet alltid vad som gäller.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-safe relative z-10">
        <div className="text-center mb-12">
          <span className="eyebrow mb-3 font-bold" style={{ color: '#005A9E' }}>Vanliga frågor</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#020617]">
            Bra att <span className="gradient-text">veta</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-semibold text-[#020617]"
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className="text-[#0078D4] text-2xl flex-shrink-0 leading-none">
                  {open === i ? '–' : '+'}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[#475569] leading-relaxed">{faq.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
