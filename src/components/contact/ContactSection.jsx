import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from '../icons.jsx';

const BASE = import.meta.env.BASE_URL;

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '+46 70 462 99 43', href: 'tel:+46704629943' },
  { icon: Mail, label: 'E-post', value: 'andreas@adbyggprojekt.se', href: 'mailto:andreas@adbyggprojekt.se' },
  { icon: MapPin, label: 'Adress', value: 'Kantarellvägen 4, 184 34 Åkersberga', href: 'https://maps.google.com/?q=Kantarellvägen+4,184+34+Åkersberga' },
];

export default function ContactSection() {
  return (
    <section id="kontakt" className="contact-section section-padding relative overflow-hidden bp-dark">
      <div className="max-w-7xl mx-auto px-safe relative z-10">
        <div className="contact-wrapper">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="contact-card white-info-card"
          >
            <div className="mb-6">
              <span className="eyebrow mb-3 font-bold">Kontakt</span>
              <h2 className="text-balance">
                Låt oss prata om ditt <span className="gradient-text-on-light">projekt</span>
              </h2>
            </div>
            <p className="text-lg text-[#64748b] leading-relaxed mb-12">
              Berätta om dina planer så återkommer vi med en kostnadsfri offert så snart vi kan.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="info-card"
                  >
                    <span className="icon-box">
                      <Icon size={24} />
                    </span>
                    <div>
                      <div className="info-label">{item.label}</div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right CTA – pekar mot det riktiga offertformuläret på /offert
             (vi har inte längre ett konkurrerande formulär här). */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-card form-container"
          >
            <div className="flex flex-col justify-center items-center h-full text-center py-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-balance">
                Redo att <span className="gradient-text">starta</span> ditt projekt?
              </h3>
              <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-8 max-w-md">
                Fyll i vårt offertformulär så återkommer vi med en kostnadsfri offert och en
                preliminär tidsplan – helt utan förpliktelse.
              </p>
              <a href={BASE + 'offert'} className="btn-primary">
                Begär offert
                <ArrowRight size={20} />
              </a>
              <p className="text-white/60 text-sm mt-6">
                Eller ring{' '}
                <a
                  href="tel:+46704629943"
                  className="text-[#4a9eff] hover:text-white font-semibold transition-colors"
                >
                  +46 70 462 99 43
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
