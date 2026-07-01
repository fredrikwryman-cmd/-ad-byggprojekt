import { motion, MotionConfig } from 'framer-motion';
import { MessagesSquare, CheckCircle2 } from '../icons.jsx';

const paragraphs = [
  'Vi erbjuder strategisk och teknisk rådgivning redan innan ett projekt har påbörjats eller till och med innan anbudsskede. Genom tekniska bedömningar, kostnadsöversikter och lösningsförslag hjälper vi dig att fatta rätt beslut och skapa goda förutsättningar för ett framgångsrikt projekt.',
  'Vårt stöd kan sedan fortsätta genom hela projektets genomförande och anpassas efter projektets utveckling och behov.',
  'Vid komplexa projekt bidrar vi med senior kompetens och ett oberoende perspektiv för att identifiera möjligheter, risker och kostnadseffektiva lösningar. Vi kan även avlasta organisationen vid hög arbetsbelastning, stötta i ekonomiska frågor och ta fram merkostnadsbedömningar vid behov.',
  'Uppdragen anpassas efter behov och omfattar vanligtvis 1–2 arbetsdagar per vecka.',
];

const features = [
  'Stöttning vid komplexa & krävande projekt',
  'Kostnadsbedömningar',
  'Förstudier & second opinion',
  'Tekniska konsultationer',
  'Materialval & upphandlingsstöd',
  'Bygglovsstöd',
  'Besiktningsstöd',
  'Support',
  'Stöd',
  'Vägledning',
  'Bygglovsstöd samt besiktningsstöd',
  'Övrigt stöd, vägledning och support',
];

export default function AdvisoryBlock() {
  return (
    <MotionConfig reducedMotion="user">
    <section className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden bp-dark">
      <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
            Rådgivning / Stöd
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Rådgivning &amp; <span className="gradient-text-hero">stöd</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#0f172a] border border-white/5 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078D4] to-[#4a9eff] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#0078D4]/25">
            <MessagesSquare size={28} />
          </div>

          {paragraphs.map((para, i) => (
            <p key={i} className="text-[#94a3b8] leading-relaxed mb-5">{para}</p>
          ))}

          <ul className="space-y-3 mt-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-[#cbd5e1]">
                <span className="w-5 h-5 rounded-full bg-[#0078D4]/15 text-[#4a9eff] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={12} />
                </span>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
    </MotionConfig>
  );
}
