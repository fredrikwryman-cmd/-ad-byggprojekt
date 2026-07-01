import { motion, MotionConfig } from 'framer-motion';
import { CheckCircle2, Shield, Wallet, Users } from '../icons.jsx';

// Flyttade från Tjänster-sidan (ServicesPage) – oförändrat innehåll/utseende.
const values = [
  { icon: CheckCircle2, title: 'Kvalitet', text: 'Högsta standard i varje detalj, med egenkontroll och noggrann uppföljning hela vägen till slutbesiktning.' },
  { icon: Shield, title: 'Arbetsmiljö', text: 'Säkra arbetsplatser med ordning och reda. Som Bas-U tar vi arbetsmiljöansvaret på största allvar.' },
  { icon: Wallet, title: 'Ekonomi', text: 'Kostnadskontroll och förutsägbar ekonomi. Du har alltid koll på status, kostnader och nästa steg.' },
  { icon: Users, title: 'Närhet', text: 'Personlig kontakt och löpande dialog genom hela projektet. Du har alltid en namngiven kontaktperson.' },
];

const process = [
  { step: '01', title: 'Kostnadsfritt möte', text: 'Vi lyssnar på dina idéer, gör en första bedömning och ger en indikativ kostnadsbild. Mötet är förutsättningslöst och kostar dig ingenting – vi vill förstå dina behov innan vi pratar pris.' },
  { step: '02', title: 'Planering & offert', text: 'Du får en detaljerad projektplan, tidsplan och en tydlig offert. Vi går igenom upplägg, lösningar och varje moment tillsammans så att du vet exakt vad som ingår. Inga överraskningar längre fram.' },
  { step: '03', title: 'Produktion', text: 'Erfarna hantverkare och en dedikerad projektledare genomför arbetet med hög kvalitet och säkerhet. Du får löpande uppdateringar och en tydlig kontaktperson genom hela bygget.' },
  { step: '04', title: 'Överlämning', text: 'Vi avslutar med slutbesiktning, fullständig dokumentation och garanti. Eventuella synpunkter åtgärdas innan du får nycklarna till ett färdigt och kontrollerat resultat.' },
];

export default function ValuesProcess() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Values – mörk navy (matchar "Så arbetar vi" nedan) */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden bp-dark">
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              Varför välja oss
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Byggt på <span className="gradient-text-hero">pålitliga värderingar</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center p-6 sm:p-8 bg-[#0f172a] rounded-3xl border border-white/5 hover:border-[#0078D4]/30 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0078D4] to-[#4a9eff] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#0078D4]/25">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-[#94a3b8]">{value.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#020617] relative overflow-hidden bp-dark">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#0078D4]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-safe relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a9eff] mb-4">
              Så arbetar vi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Från idé till <span className="gradient-text-hero">inflyttning</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative bg-[#0f172a] border border-white/5 rounded-3xl p-8 hover:border-[#0078D4]/30 transition-colors duration-300"
              >
                <span className="font-display text-5xl text-[#0078D4]/30 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
