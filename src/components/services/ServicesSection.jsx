import { motion } from 'framer-motion';
import { Building2, PaintRoller, ClipboardCheck, MessagesSquare } from '../icons.jsx';

const services = [
  {
    title: 'Byggledning & platsledning',
    text: 'Vi går in som byggledare eller platschef och driver ditt projekt på plats, med full kontroll på tid, kvalitet, arbetsmiljö och ekonomi.',
    icon: ClipboardCheck,
  },
  {
    title: 'Projektledning',
    text: 'Komplett ledning av projektet från start till mål. Vi samordnar entreprenörer, tidplan och budget.',
    icon: Building2,
  },
  {
    title: 'Rådgivning / Stöd',
    text: 'Expertis genom hela byggprocessen. Vi hjälper dig fatta rätt beslut tidigt och undvika dyra misstag.',
    icon: MessagesSquare,
  },
  {
    title: 'Bygg & renovering',
    text: 'Vid behov tar vi även ansvar för utförandet, nybyggnad och renovering med samma omsorg om kvaliteten.',
    icon: PaintRoller,
  },
];

export default function ServicesSection() {
  return (
    <section id="tjanster" className="py-16 md:py-24 lg:py-36 bg-white relative overflow-hidden bp-light seam-to-dark">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0078D4]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <div>
            <span className="eyebrow font-bold">Vad vi gör</span>
            <h2>
              Våra <span className="gradient-text">tjänster</span>
            </h2>
          </div>
          <p>
            Vår tyngdpunkt ligger på byggledning, platsledning och projektledning — vi styr ditt projekt i mål.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="service-card"
              >
                <div className="icon-circle">
                  <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a
                  href={import.meta.env.BASE_URL + 'tjanster'}
                  className="link-arrow"
                  aria-label={`Läs mer om ${service.title}`}
                >
                  Läs mer
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
