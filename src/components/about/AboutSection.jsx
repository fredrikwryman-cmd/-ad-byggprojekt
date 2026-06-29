import { motion } from 'framer-motion';
import { Award, Shield, Wallet, ArrowRight, Clock } from '../icons.jsx';

const values = [
  { title: 'Kvalitet', desc: 'Högsta standard i varje detalj', icon: Award, cls: 'value-icon--quality' },
  { title: 'Arbetsmiljö', desc: 'Säkra arbetsplatser med ordning och reda', icon: Shield, cls: 'value-icon--trust' },
  { title: 'Ekonomi', desc: 'Kostnadskontroll och förutsägbar ekonomi', icon: Wallet, cls: 'value-icon--innovation' },
  { title: 'Över 30 år', desc: 'Från hantverk till platschef', icon: Clock, cls: 'value-icon--quality' },
];

export default function AboutSection() {
  return (
    <section id="om-oss" className="about-section section-padding bp-dark">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0078D4]/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-stretch">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full"
          >
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <img
                src={import.meta.env.BASE_URL + 'om-oss-bild.jpg'}
                alt="AD Byggprojekt – byggledning på plats"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                  WebkitMaskComposite: 'source-in',
                  maskComposite: 'intersect',
                  maskMode: 'alpha',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              />
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow font-bold">Om oss</span>
            <h2>
              Byggledning med hantverket i <span className="gradient-text">ryggen</span>
            </h2>
            <p className="mb-6">
              AD Byggprojekt Stockholm AB hjälper byggherrar och entreprenörer att driva
              sina projekt i mål — som byggledare, platschef och projektledare. Här köper
              du erfaren styrning, inte bara armar och ben.
            </p>
            <p className="mb-8">
              Med en far och farfar som drivit byggfirma, och en egen uppväxt på
              byggarbetsplatser, sitter hantverket i ryggmärgen. Det märks i en tydlig
              styrning på kvalitet, arbetsmiljö och ekonomi genom hela projektet.
            </p>

            <a
              href={import.meta.env.BASE_URL + 'cv'}
              className="inline-flex items-center gap-2 px-6 py-3 mb-10 border border-[#0078D4] rounded-full text-[#0078D4] font-semibold hover:bg-[#0078D4] hover:text-white transition-all duration-300 group"
            >
              Läs Andreas CV
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>

            <div className="values-grid">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="value-item"
                  >
                    <div className={`value-icon ${v.cls}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3>{v.title}</h3>
                      <p>{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
