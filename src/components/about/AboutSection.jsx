import { motion } from 'framer-motion';
import { Award, Shield, Leaf, Lightbulb, ArrowRight } from '../icons.jsx';

const values = [
  { title: 'Kvalitet', desc: 'Högsta standard i varje detalj', icon: Award, cls: 'value-icon--quality' },
  { title: 'Hållbarhet', desc: 'Miljömedvetna val', icon: Leaf, cls: 'value-icon--sustainability' },
  { title: 'Trygghet', desc: 'Vi håller vad vi lovar', icon: Shield, cls: 'value-icon--trust' },
  { title: 'Innovation', desc: 'Moderna metoder', icon: Lightbulb, cls: 'value-icon--innovation' },
];

export default function AboutSection() {
  return (
    <section id="om-oss" className="about-section section-padding">
      <div className="absolute inset-0 grid-bg-dark opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0078D4]/10 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src={import.meta.env.BASE_URL + 'om-oss-hantverk.jpg'}
                alt="AD Byggprojekt på arbetsplats i solnedgång"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 to-transparent" />
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
              Med hantverk som <span className="gradient-text">grund</span>
            </h2>
            <p className="mb-6">
              AD Byggprojekt Stockholm AB drivs sedan starten av samma drivkraft:
              att skapa byggnader som höjer standard och håller i generationer.
            </p>
            <p className="mb-8">
              Vi är ett team av certifierade hantverkare och projektledare som arbetar tätt
              tillsammans med våra kunder. Varje projekt är unikt, och vi lägger stor omsorg
              i att förstå just dina behov.
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
                      <h4>{v.title}</h4>
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
